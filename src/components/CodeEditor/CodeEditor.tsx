import React, { useEffect } from 'react';
import { Editor } from '@monaco-editor/react';
import { useCodeEditor } from '../context/CodeEditorContext'; // useCodeEditor'i kullanıyoruz
import * as monaco from 'monaco-editor';
import HtmlPreview from '../preview/Preview';
import { Box, Stack } from '@mui/material';

const CodeEditor: React.FC = () => {
  const { language, code, setCode, minimapEnabled } = useCodeEditor(); // Context'ten dil, kod ve minimap durumu alıyoruz

  useEffect(() => {
    // Monaco Editor için dil seçimini ayarlıyoruz
    monaco.editor.defineTheme('vs-dark', {
      base: 'vs',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#1e1e1e',
      },
    });
  }, []);

  // Editor değiştiğinde kodu güncelliyoruz ve localStorage'a kaydediyoruz
  const handleEditorChange = (value: string | undefined) => {
    if (value) {
      setCode(value);
      localStorage.setItem('code', value); // Kod değiştikçe localStorage'a kaydet
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Stack direction="row" sx={{ flex: 1 }}>
        {/* Code Editor ve Preview bölmelerini yan yana yerleştiriyoruz */}
        <Box sx={{ flex: 1, height: '80vh' }}>
          <Editor
            height="100%"
            language={language} // Dil seçimi context'ten geliyor
            value={code} // Kod içeriği context'ten geliyor
            onChange={handleEditorChange}
            theme="vs-dark" // Editor teması
            options={{
              minimap: {
                enabled: minimapEnabled, // Minimap açma/kapama durumu
              },
            }}
          />
        </Box>
{language=== "html" && 

<Box sx={{ flex: 1, height: '80vh' }}>
{/* HTML Preview bileşenini buraya ekliyoruz */}
<HtmlPreview />
</Box>}
      </Stack>
    </div>
  );
};

export default CodeEditor;
