import React, { useEffect } from 'react';
import { Editor } from '@monaco-editor/react';
import { useCodeEditor } from '../context/CodeEditorContext'; 
import * as monaco from 'monaco-editor';
import HtmlPreview from '../preview/Preview';
import { Box, Stack } from '@mui/material';

const CodeEditor: React.FC = () => {
  const { language, code, setCode, minimapEnabled } = useCodeEditor(); 

  useEffect(() => {
    monaco.editor.defineTheme('vs-dark', {
      base: 'vs',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#1e1e1e',
      },
    });
  }, []);

  const handleEditorChange = (value: string | undefined) => {
    if (value) {
      setCode(value);
      localStorage.setItem('code', value); 
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Stack direction="row" sx={{ flex: 1 }}>
        <Box sx={{ flex: 1, height: '80vh' }}>
          <Editor
            height="100%"
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
{language=== "html" && 

<Box sx={{ flex: 1, height: '80vh' }}>
<HtmlPreview />
</Box>}
      </Stack>
    </div>
  );
};

export default CodeEditor;
