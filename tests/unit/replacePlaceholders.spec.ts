// FILEPATH: /Users/gankai/Desktop/span/videonut/tests/unit/replacePlaceholders.spec.ts
import { replacePlaceholders } from "@/hooks/index";

describe("replacePlaceholders", () => {
  it('should replace "<>" with the provided values in order', () => {
    const result = replacePlaceholders("<> <> <>", [
      "first",
      "second",
      "third",
    ]);
    expect(result).toBe("first second third");
  });

  it('should replace "<>" even when it appears more than once in a row', () => {
    const result = replacePlaceholders("<><>", ["first", "second"]);
    expect(result).toBe("firstsecond");
  });

  it('should not replace anything if there are no "<>" in the string', () => {
    const result = replacePlaceholders("no placeholders here", [
      "first",
      "second",
    ]);
    expect(result).toBe("no placeholders here");
  });

  it("should not replace anything if no values are provided", () => {
    const result = replacePlaceholders("<> <> <>", []);
    expect(result).toBe("<> <> <>");
  });

  it('should leave extra "<>" if there are not enough values', () => {
    const result = replacePlaceholders("<> <> <>", ["only one"]);
    expect(result).toBe("only one <> <>");
  });

  it('should ignore extra values if there are not enough "<>"', () => {
    const result = replacePlaceholders("<>", ["first", "second"]);
    expect(result).toBe("first");
  });
});
