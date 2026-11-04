import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input";

type EmailInputProps = {
  email: string;
  setEmail: (email: string) => void;
};

export function EmailInput({ setEmail, email }: EmailInputProps) {
  return (
    <FormControl>
      <FormControlLabel>
        <FormControlLabelText size="lg">Email</FormControlLabelText>
      </FormControlLabel>
      <Input size="lg">
        <InputField
          type="text"
          placeholder="you@example.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="emailAddress"
        />
      </Input>
    </FormControl>
  );
}
