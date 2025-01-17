import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';
import * as prettier from 'prettier/standalone';
import * as parserHtml from 'prettier/parser-html';

// Dil bilgisi ve format işlemi için context tipi
interface CodeEditorContextType {
  language: string; // Dil
  setLanguage: (language: string) => void; // Dil ayarlama fonksiyonu
  code: string; // Kod içeriği
  setCode: React.Dispatch<React.SetStateAction<string>>; // Kod içeriğini güncelleme fonksiyonu
  formatWithPrettier: () => Promise<void>; // Prettier format fonksiyonu
  minimapEnabled: boolean; // Minimap durumunu tutan state
  toggleMinimap: () => void; // Minimap'ı açma/kapama fonksiyonu
  title: string; // Başlık bilgisi
  setTitle: React.Dispatch<React.SetStateAction<string>>; // Başlık bilgisini güncelleme fonksiyonu
}

// Varsayılan değerler
const CodeEditorContext = createContext<CodeEditorContextType | undefined>(undefined);

interface CodeEditorProviderProps {
  children: React.ReactNode;
}

export const CodeEditorProvider: React.FC<CodeEditorProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<string>('plaintext'); // Dil bilgisi
  const [code, setCode] = useState<string>(''); // Kod içeriği
  const [minimapEnabled, setMinimapEnabled] = useState<boolean>(true); // Minimap durumunu başta true yapıyoruz
  const [title, setTitle] = useState<string>('untitled'); // Başlık bilgisi

  // Sayfa açıldığında, localStorage'dan kodu ve başlığı alıyoruz
  useEffect(() => {
    const storedCode = localStorage.getItem('code');
    if (storedCode) {
      setCode(storedCode); // localStorage'dan kod varsa, setCode ile yükle
    }
    
    const storedTitle = localStorage.getItem('navbarTitle');
    if (storedTitle) {
      setTitle(storedTitle); // localStorage'dan başlık varsa, setTitle ile yükle
    }
  }, []);

  // Prettier format fonksiyonu
  const formatWithPrettier = useCallback(async () => {
    let formattedCode = '';

    try {
      switch (language) {
        case 'html':
          formattedCode = await prettier.format(code, {
            parser: 'html',
            plugins: [parserHtml],
          });
          break;
        default:
          formattedCode = code;
          break;
      }

      setCode(formattedCode); // Güncellenmiş kodu set et
      localStorage.setItem('code', formattedCode); // localStorage'a kaydet
    } catch (error) {
      console.error('Prettier format error:', error);
    }
  }, [code, language]);

  // Minimap'ı açma/kapama fonksiyonu
  const toggleMinimap = () => {
    setMinimapEnabled((prev) => !prev); // Mevcut durumu tersine çevir
  };

  return (
    <CodeEditorContext.Provider
      value={{
        language,
        setLanguage,
        code,
        setCode,
        formatWithPrettier,
        minimapEnabled,
        toggleMinimap,
        title,
        setTitle, // Başlık bilgisini güncellemek için ekledik
      }}
    >
      {children}
    </CodeEditorContext.Provider>
  );
};

// Custom hook - CodeEditorContext kullanımı için
export const useCodeEditor = (): CodeEditorContextType => {
  const context = useContext(CodeEditorContext);
  if (!context) {
    throw new Error('useCodeEditor must be used within a CodeEditorProvider');
  }
  return context;
};
