import { useTranslations } from "next-intl";

export const replacePlaceholders = (string: string, values: any[]) => {
  const regex = /<>/g;
  // 替换占位符
  return string.replace(regex, (math) => values.shift() || math);
};

export function useCustomTranslations(namespace?: string) {
  const t = useTranslations(namespace);

  const customT = (key: string, ...args: any) => {
    const message = t(key, ...args);

    if (message?.includes("<>")) {
      const [first] = args;
      if (Array.isArray(first) && first?.length) {
        return replacePlaceholders(message, first);
      }
    }

    // 对于正常的翻译逻辑，调用原始的 t 函数
    return message;
  };

  return customT;
}
