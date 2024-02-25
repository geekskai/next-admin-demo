import { useCustomTranslations } from "@/hooks/index";

import { renderHook } from "@testing-library/react";
import { useTranslations } from "next-intl";

// 明确地模拟 next-intl 模块
jest.mock("next-intl", () => ({
  useTranslations: jest.fn(),
}));

type MockTranslationFn = (key: string, values?: any) => string;

describe("useCustomTranslations", () => {
  // 测试替换占位符功能
  it("should replace placeholders in the translation string correctly", () => {
    const mockMessageWithPlaceholders = "Hello, <>. Welcome to <>.";
    const args = [["John", "our site"]];
    const expected = "Hello, John. Welcome to our site.";

    // 模拟 useTranslations 返回包含占位符的字符串
    (useTranslations as jest.Mock).mockImplementation(
      (): MockTranslationFn => (key: string) => mockMessageWithPlaceholders
    );

    // 使用 renderHook 测试 useCustomTranslations 钩子
    const { result } = renderHook(() => useCustomTranslations());

    // 断言替换后的字符串与预期相匹配
    expect(result.current("someKey", ...args)).toEqual(expected);
  });

  // 测试不包含占位符时的行为
  it("should return the original message if no placeholders are present", () => {
    const mockMessage = "Hello, world!";

    // 模拟 useTranslations 返回不包含占位符的字符串
    (useTranslations as jest.Mock).mockImplementation(
      (): MockTranslationFn => (key: string) => mockMessage
    );

    // 使用 renderHook 测试 useCustomTranslations 钩子
    const { result } = renderHook(() => useCustomTranslations());

    // 断言返回的字符串与原始字符串相匹配
    expect(result.current("hello")).toEqual(mockMessage);
  });
});
