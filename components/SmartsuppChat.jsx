'use client';
import { useEffect } from 'react';

export default function SmartsuppChat() {
  useEffect(() => {
    const _smartsupp = window._smartsupp || {};
    _smartsupp.key = '8a6f7c70029cfefd1d07950f9dd6cde9c92068c5';
    window.smartsupp = _smartsupp;

    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.charset = 'utf-8';
    s.async = true;
    s.src = 'https://www.smartsuppchat.com/loader.js?';
    document.getElementsByTagName('head')[0].appendChild(s);
  }, []);

  return null;
}
