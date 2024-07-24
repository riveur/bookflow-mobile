import { BorrowBookSchema } from "@/lib/validation";

describe("BorrowBookSchema", () => {
  it("should validate a correct borrow book object", () => {
    const validData = {
      expected_return_date: new Date(),
      example_id: "example123",
    };
    expect(() => BorrowBookSchema.parse(validData)).not.toThrow();
  });

  it("should invalidate a borrow book object with missing expected_return_date", () => {
    const invalidData = {
      example_id: "example123",
    };
    expect(() => BorrowBookSchema.parse(invalidData)).toThrow();
  });

  it("should invalidate a borrow book object with missing example_id", () => {
    const invalidData = {
      expected_return_date: new Date(),
    };
    expect(() => BorrowBookSchema.parse(invalidData)).toThrow();
  });

  it("should invalidate a borrow book object with empty example_id", () => {
    const invalidData = {
      expected_return_date: new Date(),
      example_id: "",
    };
    expect(() => BorrowBookSchema.parse(invalidData)).toThrow();
  });

  it("should invalidate a borrow book object with invalid expected_return_date", () => {
    const invalidData = {
      expected_return_date: "invalid-date",
      example_id: "example123",
    };
    expect(() => BorrowBookSchema.parse(invalidData)).toThrow();
  });
});
