import React from 'react';
import { useCodeEditor } from '../context/CodeEditorContext';
import { Box } from '@mui/material';

const HtmlPreview: React.FC = () => {
  const { code, language } = useCodeEditor(); // Context'ten kodu alıyoruz

  if (language !== 'html') {
    return <div>Preview is only available for HTML content.</div>;
  }

  return ( <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
    <iframe
      title="HTML Preview"
      style={{
        width: '100%',
        height: '100%',
        border: '1px solid #ccc',
        backgroundColor: '#fff',
        boxSizing: 'border-box',
      }}
      srcDoc={code} // HTML içeriğini buradan alıyoruz
    />
  </Box>
  );
};

export default HtmlPreview;
