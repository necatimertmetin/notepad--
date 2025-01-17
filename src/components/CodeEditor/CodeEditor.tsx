import React, { useState, useEffect, useCallback } from "react";
import { Editor } from "@monaco-editor/react";
import { useLanguage } from "../context/LanguageContext";
import * as prettier from "prettier/standalone";
import * as parserBabel from "prettier/parser-babel"; // JavaScript için parser
import * as parserHtml from "prettier/parser-html"; // HTML için parser
import * as parserPostcss from "prettier/parser-postcss"; // CSS için parser
import * as monaco from "monaco-editor";

// Disable Monaco's default formatters for HTML, JS, CSS, etc.
const disableMonacoDefaultFormatters = () => {
  monaco.languages.html.htmlDefaults.setModeConfiguration({
    ...monaco.languages.html.htmlDefaults.modeConfiguration,
    documentFormattingEdits: true,
    documentRangeFormattingEdits: true,
  });

  monaco.languages.css.cssDefaults.setModeConfiguration({
    ...monaco.languages.css.cssDefaults.modeConfiguration,
    documentFormattingEdits: true,
    documentRangeFormattingEdits: true,
  });

};

const CodeEditor: React.FC = () => {
  const { language } = useLanguage();
  const [code, setCode] = useState<string>("");

  useEffect(() => {
    // Disable Monaco default formatters when component mounts
    disableMonacoDefaultFormatters();

    const savedCode = localStorage.getItem("code");
    if (savedCode) {
      setCode(savedCode);
    }
  }, []);

  const handleEditorChange = (value: string | undefined) => {
    if (value) {
      setCode(value);
      localStorage.setItem("code", value);
    }
  };

  const handleFormatWithPrettier = useCallback(async () => {
    let formattedCode = "";

    try {
      switch (language) {
        case "javascript":
          formattedCode = await prettier.format(code, {
            parser: "babel",
            plugins: [parserBabel],
          });
          break;
        case "html":
          formattedCode = await prettier.format(code, {
            parser: "html",
            plugins: [parserHtml],
          });
          break;
        case "css":
          formattedCode = await prettier.format(code, {
            parser: "css",
            plugins: [parserPostcss],
          });
          break;
        default:
          formattedCode = code;
          break;
      }

      // Update state and localStorage
      setCode(formattedCode);
      localStorage.setItem("code", formattedCode);
    } catch (error) {
      console.error("Prettier format error:", error);
    }
  }, [code, language]);

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1 }}>
        <Editor
          height="300px"
          width="100%"
          key={language}
          language={language}
          value={code}
          onChange={handleEditorChange}
          theme="vs-dark"
        />
      </div>

      <div style={{ marginTop: "10px" }}>
        <button onClick={handleFormatWithPrettier}>Format with Prettier</button>
      </div>

      <div style={{ flex: 1, paddingLeft: "20px", overflow: "auto" }}>
        {language === "html" ? (
          <iframe
            title="HTML Preview"
            style={{
              width: "100%",
              height: "300px",
              border: "1px solid #ccc",
              padding: "10px",
              boxSizing: "border-box",
            }}
            srcDoc={code}
          />
        ) : (
          <div>Preview is only available for HTML content.</div>
        )}
      </div>
    </div>
  );
};

export default CodeEditor;
