import React from "react";
import CodeEditor from "./components/CodeEditor/CodeEditor";
import { Navbar } from "./components/Navbar/Navbar";
import { CodeEditorProvider } from "./components/context/CodeEditorContext";

const App: React.FC = () => {
  return (
    <div className="app">
      <CodeEditorProvider>
        <Navbar />
        <CodeEditor />
      </CodeEditorProvider>
    </div>
  );
};

export default App;
