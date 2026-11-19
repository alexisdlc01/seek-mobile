import React from 'react';
import { StyleSheet, type StyleProp, type TextStyle } from 'react-native';
import type { VariantProps } from '@gluestack-ui/utils/nativewind-utils';
import { textStyle } from './styles';

type ITextProps = React.ComponentProps<'span'> & VariantProps<typeof textStyle>;

const Text = React.forwardRef<React.ComponentRef<'span'>, ITextProps>(
  function Text(
    {
      className,
      isTruncated,
      bold,
      underline,
      strikeThrough,
      size = 'md',
      sub,
      italic,
      highlight,
      style,
      ...props
    }: { className?: string } & ITextProps,
    ref
  ) {
    return (
      <span
        className={textStyle({
          isTruncated: isTruncated as boolean,
          bold: bold as boolean,
          underline: underline as boolean,
          strikeThrough: strikeThrough as boolean,
          size,
          sub: sub as boolean,
          italic: italic as boolean,
          highlight: highlight as boolean,
          class: className,
        })}
        {...props}
        // Screens pass React Native style arrays; a DOM <span> crashes on an array, so flatten it.
        style={StyleSheet.flatten(style as StyleProp<TextStyle>) as React.CSSProperties}
        ref={ref}
      />
    );
  }
);

Text.displayName = 'Text';

export { Text };
