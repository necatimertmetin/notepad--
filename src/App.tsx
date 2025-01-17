import React from "react";
import AppBar from "./components/AppBar/AppBar";
import TabBar from "./components/TabBar/TabBar";
import CodeEditor from "./components/CodeEditor/CodeEditor";

const App: React.FC = () => {
  return (
    <div className="app">
      <AppBar />
      <TabBar />
      <CodeEditor />
    </div>
  );
};

export default App;
