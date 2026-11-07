import {
  FormControl,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Input, InputField, InputIcon, InputSlot } from "../ui/input";
import {
  isValidPassword,
  PASSWORD_REQUIREMENTS,
} from "@/src/utils/validate-password";
import { EyeOffIcon, EyeIcon } from "../ui/icon";
import { useState } from "react";
import type { ReturnKeyTypeOptions } from "react-native";

type PasswordInputProps = {
  password: string;
  setPassword: (password: string) => void;
  label?: string;
  placeholder?: string;
  validateStrength?: boolean;
  onSubmitEditing?: () => void;
  returnKeyType?: ReturnKeyTypeOptions;
};

export function PasswordInput({
  password,
  setPassword,
  label = "Password",
  placeholder = "Enter your password",
  validateStrength = false,
  onSubmitEditing,
  returnKeyType,
}: PasswordInputProps) {
  const [show, setShow] = useState<boolean>(false);

  return (
    <FormControl
      isInvalid={
        validateStrength && password.length > 0 && !isValidPassword(password)
      }
    >
      <FormControlLabel>
        <FormControlLabelText size="lg">{label}</FormControlLabelText>
      </FormControlLabel>
      <Input size="lg">
        <InputField
          type={show ? "text" : "password"}
          placeholder={placeholder}
          onChangeText={setPassword}
          value={password}
          onSubmitEditing={onSubmitEditing}
          returnKeyType={returnKeyType}
        />
        <InputSlot className="pr-3" onPressIn={() => setShow((c) => !c)}>
          <InputIcon
            className="text-secondary-800"
            as={show ? EyeOffIcon : EyeIcon}
            size="xl"
          />
        </InputSlot>
      </Input>
      <FormControlHelper>
        <FormControlHelperText size="lg">
          {validateStrength ? PASSWORD_REQUIREMENTS : "Enter your password."}
        </FormControlHelperText>
      </FormControlHelper>
    </FormControl>
  );
}
