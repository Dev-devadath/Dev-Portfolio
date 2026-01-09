'use client';

import { useState } from 'react';

export function EmailCopy() {
  const [showToast, setShowToast] = useState(false);
  const email = 'devadaths3@gmail.com';

  const handleCopy = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(email);
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  return (
    <span className="relative inline-block">
      <a
        href={`mailto:${email}`}
        onClick={handleCopy}
        className="hover:opacity-70 transition-opacity cursor-pointer inline-block"
        aria-label="Copy email"
        title={email}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      </a>
      
      {showToast && (
        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1.5 bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 text-xs rounded-md whitespace-nowrap animate-fade-in z-50 block">
          Email copied!
          <span className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800 dark:border-t-gray-200"></span>
        </span>
      )}
    </span>
  );
}

