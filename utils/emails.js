const { PORT } = process.env;
export const createVerificationEmail = (to, token) => ({
  to,
  subject: "Rest Api verification email",
  html: `<a target="_blanc" href="http://localhost:${PORT}/api/users/verify/${token}">Verify email</a>`,
});
