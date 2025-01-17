import React from "react";
import { Editor } from "@monaco-editor/react";

const CodeEditor: React.FC = () => {
  return (
    <Editor
      height="60vh"
      width="100%"
      defaultLanguage="txt"
      defaultValue="// Code here"
      theme="vs-dark"
    />
  );
};

export default CodeEditor;
