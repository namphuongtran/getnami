import { createHighlighter, type BundledLanguage } from "shiki";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";

export type CodeLang = "csharp" | "jsonc" | "bash" | "xml";

// One highlighter per build process. Runs only in Server Components, so no highlighting JS ships.
const highlighter = createHighlighter({
  themes: ["github-light-default", "github-dark-default"],
  langs: ["csharp", "jsonc", "bash", "xml"] satisfies BundledLanguage[],
  engine: createJavaScriptRegexEngine(),
});

export async function highlight(code: string, lang: CodeLang): Promise<string> {
  const h = await highlighter;
  return h.codeToHtml(code.trim(), {
    lang,
    themes: { light: "github-light-default", dark: "github-dark-default" },
    defaultColor: false,
  });
}
