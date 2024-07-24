import { CreateExampleSchema } from "@/lib/validation";

describe("CreateExampleSchema", () => {
  it("should validate a correct example object with state and boolean available", () => {
    const validData = {
      state: "NEUF",
      available: true,
    };
    expect(() => CreateExampleSchema.parse(validData)).not.toThrow();
  });

  it("should validate a correct example object with state and string available", () => {
    const validData = {
      state: "BON",
      available: "true",
    };
    expect(() => CreateExampleSchema.parse(validData)).not.toThrow();
  });

  it("should invalidate an example object with invalid state", () => {
    const invalidData = {
      state: "EXCELLENT",
      available: true,
    };
    expect(() => CreateExampleSchema.parse(invalidData)).toThrow();
  });

  it("should invalidate an example object with missing state", () => {
    const invalidData = {
      available: true,
    };
    expect(() => CreateExampleSchema.parse(invalidData)).toThrow();
  });

  it("should invalidate an example object with invalid available value", () => {
    const invalidData = {
      state: "MOYEN",
      available: "yes",
    };
    expect(() => CreateExampleSchema.parse(invalidData)).toThrow();
  });

  it("should invalidate an example object with missing available", () => {
    const invalidData = {
      state: "MAUVAIS",
    };
    expect(() => CreateExampleSchema.parse(invalidData)).toThrow();
  });
});
