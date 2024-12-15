import React, { createContext, useState, useContext, useEffect } from "react";
import enTranslations from "../translations/en.json";
import idTranslations from "../translations/id.json";

const translations = {
  en: enTranslations,
  id: idTranslations,
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(
    localStorage.getItem("preferredLanguage") || "id"
  );

  useEffect(() => {
    localStorage.setItem("preferredLanguage", language);
  }, [language]);

  const toggleLanguage = (newLang) => {
    setLanguage(newLang);
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
