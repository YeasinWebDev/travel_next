import React from 'react';
import Link from 'next/link';
import { Home, ArrowRight, Search, Compass, Navigation } from 'lucide-react';

function NotFound() {
  const popularRoutes = [
    { name: 'Home', href: '/', icon: <Home className="w-4 h-4" /> },
    { name: 'Destinations', href: '/destinations', icon: <Compass className="w-4 h-4" /> },
    { name: 'Search', href: '/search', icon: <Search className="w-4 h-4" /> },
    { name: 'Contact', href: '/contact', icon: <Navigation className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center px-4 py-12">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* Error Code Display */}
        <div className="mb-8">
          <div className="relative inline-block">
            <span className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              404
            </span>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full animate-ping"></div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full"></div>
          </div>
          <div className="w-48 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Main Message */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Lost in <span className="text-blue-600">Digital Space</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-lg mx-auto">
          The page you're looking for has drifted off course. Don't worry, let's navigate back to familiar territory.
        </p>

        {/* Animated Compass */}
        <div className="mb-12">
          <div className="relative w-32 h-32 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-blue-200 rounded-full animate-pulse"></div>
            <div className="absolute inset-4 border-4 border-purple-200 rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg animate-spin-slow">
                <Compass className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="absolute top-1/2 left-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent transform -translate-x-1/2 -translate-y-1/2 rotate-45"></div>
          </div>
        </div>


        {/* Main Action Button */}
        <Link
          href="/"
          className="group inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-0.5"
        >
          <Home className="w-5 h-5" />
          <span>Return to Homepage</span>
          <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
        </Link>


        {/* Footer Note */}
        <p className="mt-8 text-sm text-gray-500">
          Error code: 404 • Page not found •{" "}
          <span className="text-blue-600 font-medium">Let's find our way back together</span>
        </p>
      </div>
    </div>
  );
}

export default NotFound;