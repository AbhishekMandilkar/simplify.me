/* eslint-disable no-useless-escape */
/* eslint-disable sonarjs/prefer-single-boolean-return */
export function ValidateEmail(mail: string) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }
  return false;
}

export function validatePassword(password: string): string {
  const errors: string[] = [];

  // Password length should be at least 8 characters
  if (password.length < 8) {
    errors.push("Password should be at least 8 characters long");
  }

  // Password should contain at least one lowercase letter
  if (!/[a-z]/.test(password)) {
    errors.push("Password should contain at least one lowercase letter");
  }

  // Password should contain at least one digit
  if (!/\d/.test(password)) {
    errors.push("Password should contain at least one digit");
  }

  // Password should contain at least one special character

  // Join error messages into a well-formatted string
  if (errors.length > 0) {
    return `${errors.join(". \n")}.`;
  }

  // Return empty string for a valid password
  return "";
}
