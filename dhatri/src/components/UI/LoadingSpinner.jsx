import React from "react";

const AnimatedLoader = ({ state, pagename }) => {
  const messages = {
    loading: `Authenticating...`,
    redirecting: `Success! Redirecting to ${pagename} dashboard...`,
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
      <p className="text-lg font-medium text-gray-700">{messages[state]}</p>
    </div>
  );
};

export default AnimatedLoader;