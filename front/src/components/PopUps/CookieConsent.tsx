'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = Cookies.get('cookie-consent');
    if (!consent) {
      setShowBanner(true);
      setTimeout(() => setIsVisible(true), 100);
    }
  }, []);

  const handleCookieChoice = (choice: 'accepted' | 'declined') => {
    setIsVisible(false);
    setTimeout(() => {
      Cookies.set('cookie-consent', choice, { expires: 365 });
      setShowBanner(false);
    }, 500);
  };

  if (!showBanner) return null;

  return (
    <div className={`fixed bottom-0 left-0 right-0 bg-black/95 shadow-lg p-4 md:p-6 z-50 transition-all duration-500 ease-in-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
      <div className="relative">
        <div className="absolute top-1/2 -left-24 w-96 h-96 bg-[#8B5CF6]/20 rounded-full blur-[128px]"></div>
        <div className="absolute top-1/2 -right-24 w-96 h-96 bg-[#00A3FF]/20 rounded-full blur-[128px]"></div>
        
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 relative">
          <div className="text-gray-300 text-sm md:text-base font-outfit">
            Nós utilizamos cookies para melhorar sua experiência em nosso site. 
            Ao continuar navegando, você concorda com nossa{' '}
            <a href="/politica-privacidade" className="bg-gradient-to-r from-[#8B5CF6] to-[#00A3FF] bg-clip-text text-transparent hover:underline">
              Política de Privacidade
            </a>
            .
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => handleCookieChoice('declined')}
              className="px-4 py-2 text-sm font-medium text-gray-300 border border-gray-700 rounded-xl hover:bg-gray-800 transition-all duration-300"
            >
              Recusar
            </button>
            <button
              onClick={() => handleCookieChoice('accepted')}
              className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#8B5CF6] to-[#00A3FF] rounded-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:scale-105"
            >
              Aceitar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent; 