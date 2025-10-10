import React from "react";

export default function AnimatedLoader({ state,pagename }) {
  const isLoading = state === "loading";
  const isRedirecting = state === "redirecting";

  // The CSS keyframes remain the same
  return (
    <>
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .loader-spinner {
          animation: spin 2s linear infinite;
        }
        
        .loader-text {
          animation: pulse 2s ease-in-out infinite;
        }
        
        .bounce-text {
          display: inline-block;
          animation: bounce 1.4s ease-in-out infinite;
        }
        
        .bounce-text:nth-child(2) { animation-delay: 0.2s; }
        .bounce-text:nth-child(3) { animation-delay: 0.4s; }
        .bounce-text:nth-child(4) { animation-delay: 0.6s; }
        .bounce-text:nth-child(5) { animation-delay: 0.8s; }
        .bounce-text:nth-child(6) { animation-delay: 1s; }
        .bounce-text:nth-child(7) { animation-delay: 1.2s; }
        .bounce-text:nth-child(8) { animation-delay: 1.4s; }
        .bounce-text:nth-child(9) { animation-delay: 1.6s; }
        .bounce-text:nth-child(10) { animation-delay: 1.8s; }
        .bounce-text:nth-child(11) { animation-delay: 2s; }
        .bounce-text:nth-child(12) { animation-delay: 2.2s; }
        .bounce-text:nth-child(13) { animation-delay: 2.4s; }
      `}</style>

      {isLoading && (
        // **MODIFIED HERE:** Removed h-screen and background classes
        <div className="flex flex-col items-center justify-center">
          <div className="mb-8 flex justify-center">
            <div className="relative w-24 h-24">
              <svg
                className="loader-spinner w-full h-full"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="url(#gradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="70 180"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#d97706" />
                  </linearGradient>
                </defs>
              </svg>

              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-amber-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <p className="text-xl font-semibold text-amber-900 loader-text">
               Logging in ...
          </p>

          <p className="text-sm text-amber-700 mt-4 font-medium">Please wait</p>
        </div>
      )}

      {isRedirecting && (
        // **MODIFIED HERE:** Removed h-screen and background classes
        <div className="flex flex-col items-center justify-center">
          <div className="mb-8 flex justify-center">
            <div className="relative w-20 h-20">
              <svg
                className="loader-spinner w-full h-full"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="url(#gradientBlue)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray="60 150"
                />
                <defs>
                  <linearGradient id="gradientBlue" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#0ea5e9" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </div>

          <p className="text-lg font-semibold text-blue-900">
            Redirecting to {pagename} page
            <span className="loader-text">...</span>
          </p>
          <p className="text-sm text-blue-700 mt-3">Almost there</p>
        </div>
      )}
    </>
  );
}