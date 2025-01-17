import React, { useEffect } from "react";
import { Editor } from "@monaco-editor/react";
import { useLanguage } from "../context/LanguageContext"; // useLanguage hook'unu import ediyoruz

const CodeEditor: React.FC = () => {
  const { language } = useLanguage(); // Dil bilgisini context'ten alıyoruz
  useEffect(() => {
    console.log(language);
  },[language])
  return (
    <Editor
      height="300px"
      width="100%"
      key={language}  // Dil değiştiğinde Monaco Editor'u yeniden oluşturmak için 'key' kullanıyoruz
      language={language}  // Dinamik olarak context'ten alınan dil
      defaultValue="// Code here"
      theme="vs-dark"
    />
  );
};

export default CodeEditor;
