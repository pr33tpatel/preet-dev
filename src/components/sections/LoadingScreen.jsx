import { useEffect, useState } from "react";

export const LoadingScreen = ({ onComplete }) => {
  const [text, setText] = useState("");
  const fullText = "< turn your dreams into reality >";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText(fullText.substring(0, index));
      index++;

      if (index > fullText.length) {
        clearInterval(interval);

        setTimeout(() => {
          onComplete();
        }, 1000);
      }
    }, 70);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-black text-gray-100 flex items-center justify-center">
      <div className="relative flex flex-col items-center text-center">
        {/* Text Wrapper */}
        <div className="mb-4 text-4xl font-mono font-bold relative">
          {text}
          {/* Absolutely Positioned Cursor */}
          <span className="absolute animate-blink">|</span>
        </div>

        {/* Progress Bar */}
        <div className="w-[200px] h-[2px] bg-gray-800 rounded relative overflow-hidden">
          <div className="w-[40%] h-full bg-blue-500 shadow-[0_0_15px_#3b82f6] animate-loading-bar"></div>
        </div>
      </div>
    </div>
  );
};
