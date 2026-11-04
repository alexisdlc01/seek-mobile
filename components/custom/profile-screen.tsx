import { BackButton } from "@/components/custom/back-button";
import { Text } from "@/components/ui/text";
import {
  PROFILE_COLORS,
  PROFILE_LAYOUT,
} from "@/constants/design";
import { Href } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ChevronRightIcon } from "lucide-react-native";
import React, { ReactNode } from "react";
import {
  KeyboardTypeOptions,
  Pressable,
  ScrollView,
  ScrollViewProps,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ProfileScreenProps = {
  title: string;
  children: ReactNode;
  showBack?: boolean;
  fallbackHref?: Href;
  scroll?: boolean;
  contentContainerStyle?: StyleProp<ViewStyle>;
  scrollViewProps?: Omit<ScrollViewProps, "contentContainerStyle">;
  alwaysReturnToFallback?: boolean;
};

export function ProfileScreen({
  title,
  children,
  showBack = true,
  fallbackHref = "/(app)/profile",
  scroll = true,
  contentContainerStyle,
  scrollViewProps,
  alwaysReturnToFallback = false,
}: ProfileScreenProps) {
  const content = scroll ? (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      {...scrollViewProps}
      contentContainerStyle={[styles.content, contentContainerStyle]}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.nonScrollingContent, contentContainerStyle]}>
      {children}
    </View>
  );

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <BackButton
          title={title}
          showBack={showBack}
          fallbackHref={fallbackHref}
          alwaysReturnToFallback={alwaysReturnToFallback}
        />
      </View>
      {content}
    </SafeAreaView>
  );
}

type ProfileActionRowProps = {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  onPress: () => void;
  destructive?: boolean;
  showChevron?: boolean;
  testID?: string;
};

export function ProfileActionRow({
  title,
  subtitle,
  icon,
  onPress,
  destructive = false,
  showChevron = true,
  testID,
}: ProfileActionRowProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      testID={testID}
      onPress={onPress}
      style={styles.actionRow}
    >
      {icon ? <View style={styles.actionIcon}>{icon}</View> : null}
      <View style={styles.actionTextContainer}>
        <Text
          style={[
            styles.actionTitle,
            destructive && styles.destructiveText,
          ]}
        >
          {title}
        </Text>
        {subtitle ? <Text style={styles.actionSubtitle}>{subtitle}</Text> : null}
      </View>
      {showChevron ? (
        <ChevronRightIcon
          color={destructive ? PROFILE_COLORS.danger : PROFILE_COLORS.accent}
          size={22}
          strokeWidth={2}
        />
      ) : null}
    </Pressable>
  );
}

type ProfileTextFieldProps = Omit<
  TextInputProps,
  "style" | "keyboardType"
> & {
  label: string;
  error?: string;
  helperText?: string;
  multiline?: boolean;
  keyboardType?: KeyboardTypeOptions;
  inputStyle?: StyleProp<TextStyle>;
};

export function ProfileTextField({
  label,
  error,
  helperText,
  multiline = false,
  inputStyle,
  ...inputProps
}: ProfileTextFieldProps) {
  return (
    <View style={styles.fieldGroup}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        accessibilityLabel={label}
        placeholderTextColor="#858585"
        selectionColor={PROFILE_COLORS.accent}
        textAlignVertical={multiline ? "top" : "center"}
        multiline={multiline}
        {...inputProps}
        style={[
          styles.field,
          multiline && styles.multilineField,
          error && styles.fieldError,
          inputStyle,
        ]}
      />
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : helperText ? (
        <Text style={styles.helperText}>{helperText}</Text>
      ) : null}
    </View>
  );
}

type ProfilePrimaryButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
};

export function ProfilePrimaryButton({
  title,
  onPress,
  disabled = false,
  loading = false,
}: ProfilePrimaryButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      disabled={disabled || loading}
      onPress={onPress}
      style={[
        styles.primaryButton,
        (disabled || loading) && styles.primaryButtonDisabled,
      ]}
    >
      <Text style={styles.primaryButtonText}>
        {loading ? "Please wait…" : title}
      </Text>
    </Pressable>
  );
}

export function ProfileSectionTitle({ children }: { children: ReactNode }) {
  return <Text style={styles.sectionTitle}>{children}</Text>;
}

export const profileTypography = StyleSheet.create({
  pageTitle: {
    color: PROFILE_COLORS.accent,
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "700",
  },
  heroName: {
    color: PROFILE_COLORS.accent,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: "700",
    textAlign: "center",
  },
  sectionTitle: {
    color: PROFILE_COLORS.accent,
    fontSize: 20,
    lineHeight: 26,
    fontWeight: "700",
  },
  body: {
    color: PROFILE_COLORS.text,
    fontSize: 16,
    lineHeight: 23,
    fontWeight: "400",
  },
  metadata: {
    color: PROFILE_COLORS.mutedText,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "400",
  },
});

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: PROFILE_COLORS.background,
  },
  header: {
    height: PROFILE_LAYOUT.headerHeight,
    paddingHorizontal: PROFILE_LAYOUT.horizontalPadding,
    backgroundColor: PROFILE_COLORS.background,
    zIndex: 2,
  },
  content: {
    paddingHorizontal: PROFILE_LAYOUT.horizontalPadding,
    paddingTop: 16,
    paddingBottom: 36,
    gap: 20,
  },
  nonScrollingContent: {
    flex: 1,
    paddingHorizontal: PROFILE_LAYOUT.horizontalPadding,
    paddingTop: 16,
    paddingBottom: 24,
  },
  actionRow: {
    minHeight: 68,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderWidth: 1.25,
    borderColor: PROFILE_COLORS.border,
    borderRadius: PROFILE_LAYOUT.cardRadius,
    backgroundColor: "transparent",
  },
  actionIcon: {
    width: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  actionTextContainer: {
    flex: 1,
    gap: 2,
  },
  actionTitle: {
    color: PROFILE_COLORS.accent,
    fontSize: 17,
    lineHeight: 22,
    fontWeight: "600",
  },
  actionSubtitle: {
    color: PROFILE_COLORS.mutedText,
    fontSize: 14,
    lineHeight: 19,
  },
  destructiveText: {
    color: PROFILE_COLORS.danger,
  },
  fieldGroup: {
    width: "100%",
    gap: 8,
  },
  fieldLabel: {
    color: PROFILE_COLORS.accent,
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "600",
  },
  field: {
    minHeight: 52,
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: PROFILE_LAYOUT.fieldRadius,
    borderWidth: 1.25,
    borderColor: PROFILE_COLORS.border,
    backgroundColor: PROFILE_COLORS.surface,
    color: PROFILE_COLORS.text,
    fontSize: 16,
    lineHeight: 21,
  },
  multilineField: {
    minHeight: 136,
    paddingTop: 15,
  },
  fieldError: {
    borderColor: PROFILE_COLORS.danger,
  },
  errorText: {
    color: PROFILE_COLORS.danger,
    fontSize: 13,
    lineHeight: 18,
  },
  helperText: {
    color: PROFILE_COLORS.mutedText,
    fontSize: 13,
    lineHeight: 18,
  },
  primaryButton: {
    minHeight: 52,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 22,
    borderRadius: 26,
    backgroundColor: PROFILE_COLORS.accent,
  },
  primaryButtonDisabled: {
    opacity: 0.45,
  },
  primaryButtonText: {
    color: PROFILE_COLORS.surface,
    fontSize: 17,
    lineHeight: 22,
    fontWeight: "700",
  },
  sectionTitle: {
    color: PROFILE_COLORS.accent,
    fontSize: 20,
    lineHeight: 26,
    fontWeight: "700",
  },
});
