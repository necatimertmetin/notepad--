import React, { createContext, useContext, useState } from 'react';

// Dil bilgisini tutacak context
interface LanguageContextType {
  language: string;
  setLanguage: (language: string) => void;
}

// Varsayılan dil 'plaintext' olacak
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: React.ReactNode; // React children tipini doğru şekilde tanımlıyoruz
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<string>('plaintext'); // Başlangıçta dil 'plaintext' olsun

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Bu hook, dil bilgisini kullanmak için kullanılacak
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
