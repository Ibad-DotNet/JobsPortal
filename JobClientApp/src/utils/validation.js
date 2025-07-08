// Validation utilities

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  // Password requirements: min 8 chars, 1 uppercase, 1 number, 1 special char, no spaces
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const hasSpaces = /\s/.test(password);
  
  return {
    isValid: passwordRegex.test(password) && !hasSpaces,
    errors: {
      minLength: password.length < 8,
      uppercase: !/[A-Z]/.test(password),
      number: !/\d/.test(password),
      specialChar: !/[@$!%*?&]/.test(password),
      noSpaces: hasSpaces
    }
  };
};

export const validateName = (name) => {
  // Name should not contain special characters except spaces
  const nameRegex = /^[a-zA-Z\s]+$/;
  return nameRegex.test(name.trim());
};

export const validateRequired = (value) => {
  return value && value.toString().trim().length > 0;
};

export const validateSalaryRange = (min, max) => {
  const minNum = Number(min);
  const maxNum = Number(max);
  
  return {
    isValid: minNum > 0 && maxNum > 0 && maxNum >= minNum,
    errors: {
      minInvalid: minNum <= 0,
      maxInvalid: maxNum <= 0,
      rangeInvalid: maxNum < minNum
    }
  };
};

export default {
  validateEmail,
  validatePassword,
  validateName,
  validateRequired,
  validateSalaryRange
};