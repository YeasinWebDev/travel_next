// components/GlobalErrorPage.tsx
"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCw, Home, Shield, Bug, AlertCircle, Activity } from 'lucide-react';

interface GlobalErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const GlobalErrorPage: React.FC<GlobalErrorPageProps> = ({ error, reset }) => {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global error caught:', error);
  }, [error]);

  const errorActions = [
    {
      label: 'Try Again',
      icon: <RefreshCw className="w-5 h-5" />,
      action: () => window.location.reload(),
      variant: 'primary' as const,
    },
    {
      label: 'Go Home',
      icon: <Home className="w-5 h-5" />,
      href: '/',
      variant: 'secondary' as const,
    }
  ];

  const errorDetails = [
    { label: 'Error Type', value: error.name || 'Unknown Error' },
    { label: 'Error Message', value: error.message || 'An unexpected error occurred' },
    { label: 'Error Code', value: error.digest || 'N/A' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        {/* Error Icon with Animation */}
        <div className="mb-8">
          <div className="relative">
            <div className="w-32 h-32 bg-gradient-to-br from-red-100 to-red-50 rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg border-4 border-white">
              <AlertTriangle className="w-16 h-16 text-red-500 animate-pulse" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full animate-ping"></div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full"></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Something <span className="text-red-600">Went Wrong</span>
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            We've encountered an unexpected error. Our team has been notified and is working to fix it.
          </p>
          
          {/* Error Details Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-sm mb-8 text-left">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-5 h-5 text-gray-500" />
              <h3 className="font-semibold text-gray-800">Error Details</h3>
            </div>
            <div className="space-y-3">
              {errorDetails.map((detail, index) => (
                <div key={index} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                  <span className="text-sm font-medium text-gray-500 w-32">{detail.label}:</span>
                  <code className="text-sm bg-gray-100 px-3 py-1.5 rounded-lg font-mono text-gray-800 overflow-x-auto">
                    {detail.value}
                  </code>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          {errorActions.map((action, index) => {
            const buttonClass = {
              primary: 'bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white shadow-lg hover:shadow-xl',
              secondary: 'bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white shadow-md hover:shadow-lg',
              outline: 'bg-white border border-gray-300 hover:border-gray-400 text-gray-800 hover:bg-gray-50 shadow-sm hover:shadow-md',
            }[action.variant];

            const content = (
              <>
                {action.icon}
                <span className="font-semibold cursor-pointer">{action.label}</span>
              </>
            );

            const commonProps = {
              className: `flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-medium transition-all duration-300 transform hover:-translate-y-0.5 ${buttonClass}`,
            };

            if (action.href) {
              return (
                <Link key={index} href={action.href} {...commonProps}>
                  {content}
                </Link>
              );
            }

            return (
              <button key={index} onClick={action.action} {...commonProps}>
                {content}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GlobalErrorPage;