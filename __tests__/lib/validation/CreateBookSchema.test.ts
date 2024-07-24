import { CreateBookSchema } from "@/lib/validation";

describe("CreateBookSchema", () => {
  it("should validate a correct book object", () => {
    const validData = {
      isbn: "1234567890",
      title: "A Great Book",
      cover_url: "http://example.com/cover.jpg",
      author_id: "author123",
      category_id: "category123",
    };
    expect(() => CreateBookSchema.parse(validData)).not.toThrow();
  });

  it("should invalidate a book object with missing prop", () => {
    const invalidData = {
      title: "A Great Book",
      cover_url: "http://example.com/cover.jpg",
      author_id: "author123",
      category_id: "category123",
    };
    expect(() => CreateBookSchema.parse(invalidData)).toThrow();
  });

  it("should invalidate a book object with missing author and author_id", () => {
    const invalidData = {
      isbn: "1234567890",
      title: "A Great Book",
      cover_url: "http://example.com/cover.jpg",
      category_id: "category123",
    };
    expect(() => CreateBookSchema.parse(invalidData)).toThrow();
  });

  it("should invalidate a book object with missing category and category_id", () => {
    const invalidData = {
      isbn: "1234567890",
      title: "A Great Book",
      cover_url: "http://example.com/cover.jpg",
      author_id: "author123",
    };
    expect(() => CreateBookSchema.parse(invalidData)).toThrow();
  });
});
