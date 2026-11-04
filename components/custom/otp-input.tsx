import { View, Text } from 'react-native';
import { OTPInput, type OTPInputRef, type SlotProps } from 'input-otp-native';
import { useEffect, useRef } from 'react';

import Animated, {
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  useSharedValue,
} from 'react-native-reanimated';
import { cn } from '@gluestack-ui/utils/nativewind-utils';
import { PROFILE_COLORS } from '@/constants/design';


type AppleOTPInputProps = {
  setCode: (code: string) => void;
  code: string
}

export default function AppleOTPInput({ setCode, code }: AppleOTPInputProps) {
  const ref = useRef<OTPInputRef>(null);

  return (
    <OTPInput
      ref={ref}
      maxLength={5}
      onChange={e => setCode(e)}
      render={({ slots }) => (
        <View className="flex-row gap-2 items-center justify-center my-4">
          {slots.map((slot, idx) => (
            <Slot key={idx} {...slot} />
          ))}
        </View>
      )}
    />
  );
}

function Slot({ char, isActive, hasFakeCaret }: SlotProps) {
  return (
    <View
      className={cn(
        'w-[50px] h-[50px] items-center justify-center border border-gray-200 rounded-lg bg-white',
        {
          'border-primary-500 border-2': isActive,
        }
      )}
    >
      {char !== null && (
        <Text className="text-2xl font-medium text-gray-900">{char}</Text>
      )}
      {hasFakeCaret && <FakeCaret />}
    </View>
  );
}

function FakeCaret() {
  const opacity = useSharedValue(1);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0, { duration: 500 }),
        withTiming(1, { duration: 500 })
      ),
      -1,
      true
    );
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const baseStyle = {
    width: 2,
    height: 28,
    backgroundColor: PROFILE_COLORS.accent,
    borderRadius: 1,
  };

  return (
    <View className="absolute w-full h-full items-center justify-center">
      <Animated.View style={[baseStyle, animatedStyle]} />
    </View>
  );
}
