export function generateAtuhError(message: string) {
  switch (message) {
    case "EMAIL_ALREADY_EXIST":
      return "This email is used";
    case "EMAIL_NOT_FOUND":
      return "Email address not found";
    case "INCORRECT_PASSWORD":
      return "Invalid password";
    case "PASSWORD_DONT_MATCH":
      return "Password don't match!";
    case "THIS_LINK_IS_NOT_ACTIVE":
      return "This link isn't active";
    default:
      break;
  }
}
