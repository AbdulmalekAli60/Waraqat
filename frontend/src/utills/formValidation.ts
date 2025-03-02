// validations.ts
export interface ValidationErrors {
    name?: string;
    username?: string;
    email?: string;
    password?: string;
  }
  
  // Email validation using the same regex as backend
  export const validateEmail = (email: string): string | undefined => {
    if (!email.trim()) {
      return "Email should not be empty";
    }
    
    const emailRegex = /^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$/;
    if (!emailRegex.test(email)) {
      return "Email is not valid";
    }
    
    return undefined;
  };
  
  // Password validation matching backend rules
  export const validatePassword = (password: string): string | undefined => {
    if (!password) {
      return "Password should not be empty";
    }
    
    if (password.length < 6 || password.length > 12) {
      return "Password must be between 6 and 12 in size";
    }
    
    // Regex to check if password contains at least one letter, one number, and one special character
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return "Password must contain at least one letter, one number, and one special character";
    }
    
    return undefined;
  };
  
  // Name validation
  export const validateName = (name: string): string | undefined => {
    if (!name.trim()) {
      return "Name should not be null";
    }
    
    return undefined;
  };
  
  // Username validation
  export const validateUsername = (username: string): string | undefined => {
    if (!username.trim()) {
      return "Username should not be empty";
    }
    
    return undefined;
  };
  
  // Validate login form
  export const validateLoginForm = (email: string, password: string): ValidationErrors => {
    const errors: ValidationErrors = {};
    
    const emailError = validateEmail(email);
    if (emailError) errors.email = emailError;
    
    const passwordError = validatePassword(password);
    if (passwordError) errors.password = passwordError;
    
    return errors;
  };
  
  // Validate register form
  export const validateRegisterForm = (
    name: string,
    username: string,
    email: string,
    password: string
  ): ValidationErrors => {
    const errors: ValidationErrors = {};
    
    const nameError = validateName(name);
    if (nameError) errors.name = nameError;
    
    const usernameError = validateUsername(username);
    if (usernameError) errors.username = usernameError;
    
    const emailError = validateEmail(email);
    if (emailError) errors.email = emailError;
    
    const passwordError = validatePassword(password);
    if (passwordError) errors.password = passwordError;
    
    return errors;
  };