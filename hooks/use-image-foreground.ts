import { Image } from "expo-image";
import { useEffect, useState } from "react";

export type ImageForegroundColor = "#111111" | "#FFFFFF";

type SamplePoint = {
  /** Horizontal position within the rendered image, from 0 to 1. */
  x: number;
  /** Vertical position within the rendered image, from 0 to 1. */
  y: number;
  containerWidth: number;
  containerHeight: number;
};

type BlurhashModel = {
  componentsX: number;
  componentsY: number;
  colors: [number, number, number][];
  imageWidth: number;
  imageHeight: number;
};

const modelCache = new Map<string, Promise<BlurhashModel>>();
const BASE83 =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz#$%*+,-.:;=?@[]^_{|}~";

function decode83(value: string): number {
  return [...value].reduce((result, character) => {
    const digit = BASE83.indexOf(character);
    if (digit < 0) throw new Error("Invalid blurhash");
    return result * 83 + digit;
  }, 0);
}

function srgbToLinear(value: number): number {
  const normalized = value / 255;
  return normalized <= 0.04045
    ? normalized / 12.92
    : Math.pow((normalized + 0.055) / 1.055, 2.4);
}

function linearToSrgb(value: number): number {
  const clamped = Math.max(0, Math.min(1, value));
  return clamped <= 0.0031308
    ? clamped * 12.92
    : 1.055 * Math.pow(clamped, 1 / 2.4) - 0.055;
}

function signedSquare(value: number): number {
  return Math.sign(value) * value * value;
}

function decodeBlurhash(
  blurhash: string,
  imageWidth: number,
  imageHeight: number,
): BlurhashModel {
  if (blurhash.length < 6) throw new Error("Invalid blurhash");

  const sizeFlag = decode83(blurhash[0]);
  const componentsX = (sizeFlag % 9) + 1;
  const componentsY = Math.floor(sizeFlag / 9) + 1;
  const expectedLength = 4 + 2 * componentsX * componentsY;
  if (blurhash.length !== expectedLength) throw new Error("Invalid blurhash");

  const maximumValue = (decode83(blurhash[1]) + 1) / 166;
  const colors: [number, number, number][] = [];

  for (let index = 0; index < componentsX * componentsY; index += 1) {
    if (index === 0) {
      const value = decode83(blurhash.substring(2, 6));
      colors.push([
        srgbToLinear(value >> 16),
        srgbToLinear((value >> 8) & 255),
        srgbToLinear(value & 255),
      ]);
      continue;
    }

    const value = decode83(blurhash.substring(4 + index * 2, 6 + index * 2));
    colors.push([
      signedSquare(Math.floor(value / (19 * 19)) - 9) / 81 * maximumValue,
      signedSquare(Math.floor(value / 19) % 19 - 9) / 81 * maximumValue,
      signedSquare(value % 19 - 9) / 81 * maximumValue,
    ]);
  }

  return { componentsX, componentsY, colors, imageWidth, imageHeight };
}

function getModel(imageUrl: string): Promise<BlurhashModel> {
  const cached = modelCache.get(imageUrl);
  if (cached) return cached;

  const promise = Image.loadAsync(imageUrl).then(async (image) => {
    const blurhash = await Image.generateBlurhashAsync(image, [5, 5]);
    if (!blurhash) throw new Error("Unable to analyze image");
    return decodeBlurhash(blurhash, image.width, image.height);
  });
  modelCache.set(imageUrl, promise);
  promise.catch(() => modelCache.delete(imageUrl));
  return promise;
}

function brightnessAt(model: BlurhashModel, x: number, y: number): number {
  let red = 0;
  let green = 0;
  let blue = 0;

  for (let componentY = 0; componentY < model.componentsY; componentY += 1) {
    for (let componentX = 0; componentX < model.componentsX; componentX += 1) {
      const basis =
        Math.cos(Math.PI * x * componentX) *
        Math.cos(Math.PI * y * componentY);
      const color = model.colors[componentX + componentY * model.componentsX];
      red += color[0] * basis;
      green += color[1] * basis;
      blue += color[2] * basis;
    }
  }

  // ITU-R BT.601 perceived brightness on the reconstructed local pixel.
  return (
    0.299 * linearToSrgb(red) +
    0.587 * linearToSrgb(green) +
    0.114 * linearToSrgb(blue)
  );
}

function foregroundAt(model: BlurhashModel, point: SamplePoint): ImageForegroundColor {
  const scale = Math.max(
    point.containerWidth / model.imageWidth,
    point.containerHeight / model.imageHeight,
  );
  const renderedWidth = model.imageWidth * scale;
  const renderedHeight = model.imageHeight * scale;
  const sourceX =
    (point.x * point.containerWidth + (renderedWidth - point.containerWidth) / 2) /
    renderedWidth;
  const sourceY =
    (point.y * point.containerHeight +
      (renderedHeight - point.containerHeight) / 2) /
    renderedHeight;

  const offsets = [-0.025, 0, 0.025];
  let brightness = 0;
  for (const yOffset of offsets) {
    for (const xOffset of offsets) {
      brightness += brightnessAt(
        model,
        Math.max(0, Math.min(1, sourceX + xOffset)),
        Math.max(0, Math.min(1, sourceY + yOffset)),
      );
    }
  }

  return brightness / 9 >= 0.52 ? "#111111" : "#FFFFFF";
}

/**
 * Chooses text/icon color from the perceived brightness directly behind one
 * element. Each caller supplies its own point, so nearby controls can switch
 * independently when they sit over different parts of the same photograph.
 */
export function useImageForeground(
  imageUrl: string | null | undefined,
  point: SamplePoint,
): ImageForegroundColor {
  const { x, y, containerWidth, containerHeight } = point;
  const [foreground, setForeground] = useState<ImageForegroundColor>(
    imageUrl ? "#FFFFFF" : "#111111",
  );

  useEffect(() => {
    let cancelled = false;
    if (!imageUrl || containerWidth <= 0 || containerHeight <= 0) {
      setForeground(imageUrl ? "#FFFFFF" : "#111111");
      return () => {
        cancelled = true;
      };
    }

    getModel(imageUrl)
      .then((model) => {
        if (!cancelled) {
          setForeground(
            foregroundAt(model, { x, y, containerWidth, containerHeight }),
          );
        }
      })
      .catch(() => {
        if (!cancelled) setForeground("#FFFFFF");
      });

    return () => {
      cancelled = true;
    };
  }, [
    imageUrl,
    containerHeight,
    containerWidth,
    x,
    y,
  ]);

  return foreground;
}
