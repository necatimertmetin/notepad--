import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import * as prettier from "prettier/standalone";
import * as parserHtml from "prettier/parser-html";

interface CodeEditorContextType {
  language: string;
  setLanguage: (language: string) => void;
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
  formatWithPrettier: () => Promise<void>;
  minimapEnabled: boolean;
  previewEnabled: boolean;
  toggleMinimap: () => void;
  togglePreview: () => void;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
}

const CodeEditorContext = createContext<CodeEditorContextType | undefined>(
  undefined
);

interface CodeEditorProviderProps {
  children: React.ReactNode;
}

export const CodeEditorProvider: React.FC<CodeEditorProviderProps> = ({
  children,
}) => {
  const [language, setLanguage] = useState<string>("plaintext");
  const [code, setCode] = useState<string>("");
  const [minimapEnabled, setMinimapEnabled] = useState<boolean>(true);
  const [previewEnabled, setPreviewEnabled] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("untitled");

  useEffect(() => {
    const storedCode = localStorage.getItem("code");
    if (storedCode) {
      setCode(storedCode);
    }

    const storedTitle = localStorage.getItem("navbarTitle");
    if (storedTitle) {
      setTitle(storedTitle);
    }
  }, []);

  const formatWithPrettier = useCallback(async () => {
    let formattedCode = "";

    try {
      formattedCode =
        language === "html"
          ? await prettier.format(code, {
              parser: "html",
              plugins: [parserHtml],
            })
          : code;

      setCode(formattedCode);
      localStorage.setItem("code", formattedCode);
    } catch (error) {
      console.error("Prettier format error:", error);
    }
  }, [code, language]);

  const toggleMinimap = () => {
    setMinimapEnabled((prev) => !prev);
  };

  const togglePreview = () => {
    setPreviewEnabled((prev) => !prev);
  };

  const contextValue = useMemo(
    () => ({
      language,
      setLanguage,
      code,
      setCode,
      formatWithPrettier,
      minimapEnabled,
      toggleMinimap,
      previewEnabled,
      togglePreview,
      title,
      setTitle,
    }),
    [language, code, formatWithPrettier, minimapEnabled, previewEnabled, title]
  );

  return (
    <CodeEditorContext.Provider value={contextValue}>
      {children}
    </CodeEditorContext.Provider>
  );
};

export const useCodeEditor = (): CodeEditorContextType => {
  const context = useContext(CodeEditorContext);
  if (!context) {
    throw new Error("useCodeEditor must be used within a CodeEditorProvider");
  }
  return context;
};
