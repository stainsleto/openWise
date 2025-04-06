import zod from "zod";

const SigninSchema = zod.object({
  email: zod.string(),
  password: zod.string(),
});

const SignupSchema = zod.object({
  email: zod.string().email(),
  password: zod.string(),
  name: zod.string(),
  phoneNumber: zod.string(),
});

export { SigninSchema, SignupSchema };
