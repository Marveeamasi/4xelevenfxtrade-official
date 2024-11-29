'use client';
import { useEffect } from 'react';

export default function SmartsuppChat() {
  useEffect(() => {
    window._smartsupp = window._smartsupp || {};
    window._smartsupp.key = '8a6f7c70029cfefd1d07950f9dd6cde9c92068c5';

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.charset = 'utf-8';
    script.async = true;
    script.src = 'https://www.smartsuppchat.com/loader.js?';

    script.onload = () => {
      console.log('Smartsupp script loaded successfully.');
    };

    script.onerror = () => {
      console.error('Failed to load Smartsupp script.');
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
      delete window._smartsupp;
      delete window.smartsupp;
    };
  }, []);

  return null;
}
