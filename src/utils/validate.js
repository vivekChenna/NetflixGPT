export const ValidateForm = (password, email) => {
  if (!password || !email) {
    return "password or email can not be empty";
  }

  // first we will write regex validation for email
  const emailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(
    email
  );
  // now we will do password regex validation
  const passwordValid =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
      password
    );

  if (!emailValid) {
    return "Incorrect email";
  }

  if (!passwordValid) {
    return "Incorrect password";
  }

  return null;
};
