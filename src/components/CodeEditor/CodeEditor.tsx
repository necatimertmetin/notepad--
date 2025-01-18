import React, { useEffect } from "react";
import { Editor } from "@monaco-editor/react";
import { useCodeEditor } from "../context/CodeEditorContext";
import * as monaco from "monaco-editor";
import { Box, Drawer, Stack, SwipeableDrawer } from "@mui/material";

const CodeEditor: React.FC = () => {
  const {
    language,
    code,
    setCode,
    minimapEnabled,
    previewEnabled,
    togglePreview,
  } = useCodeEditor();

  useEffect(() => {
    monaco.editor.defineTheme("vs-dark", {
      base: "vs",
      inherit: true,
      rules: [],
      colors: {
        "editor.background": "#1e1e1e",
      },
    });
  }, []);

  const handleEditorChange = (value: string | undefined) => {
    if (value) {
      setCode(value);
      localStorage.setItem("code", value);
    }
  };

  return (
    <Box>
      <Stack
        direction="row"
        sx={{ flex: 1, minHeight: "850px" }}
        flexWrap={"wrap"}
      >
        <Box sx={{ flex: 1 }}>
          <Editor
            language={language}
            value={code}
            onChange={handleEditorChange}
            theme="vs-dark"
            options={{
              minimap: {
                enabled: minimapEnabled,
              },
            }}
          />
        </Box>
      </Stack>

      <SwipeableDrawer
        open={previewEnabled}
        anchor="right"
        variant="temporary"
        onClose={togglePreview}
        onOpen={() => {}}
      >
        <Box
          sx={{
            width: "1366px",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#fff",
          }}
        >
          <iframe
            title="HTML Preview"
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              backgroundColor: "#fff",
              boxSizing: "border-box",
            }}
            srcDoc={code}
          />
        </Box>
      </SwipeableDrawer>
    </Box>
  );
};

export default CodeEditor;
