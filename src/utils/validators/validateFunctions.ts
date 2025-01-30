import { validate as uuidValidate } from "uuid";

export function verifyMultipartUUID(
  uuidString: string,
  reqBodyPropName: string
) {
  const uuidArray = uuidString.split(",");
  uuidArray.forEach((uuid) => {
    if (!uuidValidate(uuid)) {
      throw new Error(
        `Invalid UUID present in the request body ${reqBodyPropName}`
      );
    }
  });
  return uuidArray;
}

export function validatePassword(password: string): void {
  const minLength = 8; // Minimum password length
  const minUpperCase = 1; // Minimum uppercase letters
  const minLowerCase = 1; // Minimum lowercase letters
  const minDigits = 1; // Minimum digits
  const minSpecialChars = 1; // Minimum special characters

  // Regular expressions for character types
  const upperCaseRegex = /[A-Z]/;
  const lowerCaseRegex = /[a-z]/;
  const digitRegex = /[0-9]/;
  const specialCharRegex = /[$@#&!%]/; // Add more special characters as needed

  // Validation checks
  if (password.length < minLength) {
    throw new Error("Password must be at least 8 characters long.");
  }

  if (
    !password.match(upperCaseRegex) ||
    password.match(upperCaseRegex).length < minUpperCase
  ) {
    throw new Error("Password must contain at least 1 uppercase letter.");
  }

  if (
    !password.match(lowerCaseRegex) ||
    password.match(lowerCaseRegex).length < minLowerCase
  ) {
    throw new Error("Password must contain at least 1 lowercase letter.");
  }

  if (
    !password.match(digitRegex) ||
    password.match(digitRegex).length < minDigits
  ) {
    throw new Error("Password must contain at least 1 digit.");
  }

  if (
    !password.match(specialCharRegex) ||
    password.match(specialCharRegex).length < minSpecialChars
  ) {
    throw new Error(
      "Password must contain at least 1 special character ($, @, #, &, or !)."
    );
  }
}
