export function isValidPassword(password: string): boolean {
  return (
    password.length >= 8 &&
    /[a-z]/.test(password) &&
    /[A-Z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[-#!$@£%^&*()_+|~=`{}\[\]:";'<>?,./\\ ]/.test(password)
  );
}

export const PASSWORD_REQUIREMENTS =
  "Use at least 8 characters with uppercase, lowercase, a number, and a symbol.";
