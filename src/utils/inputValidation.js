const validateCredentials = (email, password) => {
  if (!email.trim()) {
    return "Email is required";
  }

  if (!email.includes("@")) {
    return "Invalid email";
  }

  if (!password.trim()) {
    return "Password is required";
  }

  if (password.length < 6) {
    return "Password must be at least 6 characters";
  }

  return null;
};
export const validateSignUpCredentials = ({
  firstName,
  lastName,
  email,
  password,
  age,
  gender,
}) => {
  if (validateCredentials(email, password)) {
    return validateCredentials(email, password);
  }
  if (!firstName.trim()) {
    return "First name is required";
  }

  if (firstName.length < 2) {
    return "First name must be at least 2 characters";
  }

  if (!lastName.trim()) {
    return "Last name is required";
  }

  if (lastName.length < 2) {
    return "Last name must be at least 2 characters";
  }

  if (!age) {
    return "Age is required";
  }

  if (age < 1 || age > 120) {
    return "Enter a valid age";
  }

  const allowedGenders = ["male", "female", "other"];

  if (!gender.trim()) {
    return "Gender is required";
  }

  if (!allowedGenders.includes(gender.toLowerCase())) {
    return "Invalid gender";
  }

  return null;
};
export const onInputValidation = (data, key) => {
  let validationMessage = "";
  switch (key) {
    case "login":
      validationMessage = validateCredentials(data?.email, data?.password);
      break;

    case "signup":
      validationMessage = validateSignUpCredentials(data);
      break;

    default:
      break;
  }

  return validationMessage;
};
