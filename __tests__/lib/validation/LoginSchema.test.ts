import { LoginSchema } from "@/lib/validation";

describe("LoginSchema", () => {
  it("should validate a correct email and password", () => {
    const validData = {
      email: "test@example.com",
      password: "password123",
    };
    expect(() => LoginSchema.parse(validData)).not.toThrow();
  });

  it("should invalidate an incorrect email", () => {
    const invalidEmailData = {
      email: "invalid-email",
      password: "password123",
    };
    expect(() => LoginSchema.parse(invalidEmailData)).toThrow("Emain invalide");
  });

  it("should invalidate an empty password", () => {
    const emptyPasswordData = {
      email: "test@example.com",
      password: "",
    };
    expect(() => LoginSchema.parse(emptyPasswordData)).toThrow(
      "Renseignez votre mot de passe",
    );
  });
});
