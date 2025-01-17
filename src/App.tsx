import React from "react";
import CodeEditor from "./components/CodeEditor/CodeEditor";
import { Navbar } from "./components/Navbar/Navbar";
import { LanguageProvider } from "./components/context/LanguageContext";

const App: React.FC = () => {
  return (
    <div className="app">
        <LanguageProvider>
         <Navbar/>
          <CodeEditor />
      </LanguageProvider>

    </div>
  );
};

export default App;
