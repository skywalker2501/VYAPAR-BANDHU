import React, { createContext, useContext, useState, useEffect } from "react";
import { translations } from "../i18n";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    // Persist language in localStorage 
    const [language, setLanguageState] = useState(() => {
        return localStorage.getItem("preferred_language") || "en"; // Defaulting to EN per user request to start clean
    });

    const setLanguage = (lang) => {
        setLanguageState(lang);
        localStorage.setItem("preferred_language", lang);
    };

    // Translation function
    const t = (key) => {
        const dict = translations[language] || translations["en"]; // Fallback to EN this time since user wants English correctly handled
        return dict[key] || translations["en"][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
