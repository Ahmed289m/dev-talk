"use client";
import { useState, useEffect } from "react";
import { Terminal } from "lucide-react";

export function LoadingScreen() {
  const [loadingText, setLoadingText] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [rotation, setRotation] = useState(0);

  const loadingSteps = ["while(alive)&#123;pray;eat;sleep;again;&#125;"];

  useEffect(() => {
    const textInterval = setInterval(() => {
      setLoadingText((current) => {
        const targetText = loadingSteps[currentStep];
        if (current === targetText) {
          setCurrentStep((step) => (step + 1) % loadingSteps.length);
          return "";
        }
        return targetText.slice(0, current.length + 1);
      });
    }, 75);

    return () => clearInterval(textInterval);
  }, [currentStep]);

  useEffect(() => {
    const rotateInterval = setInterval(() => {
      setRotation((prev) => (prev + 5) % 360);
    }, 20);

    return () => clearInterval(rotateInterval);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/40 backdrop-blur-md z-50">
      <div className="relative">
        <div className="w-[300px] h-[300px] rounded-full bg-gradient-to-br from-green-300/20 to-gray-200/20 backdrop-blur-2xl p-6 border border-gray-300/50 shadow-[0_0_100px_rgba(0,0,0,0.1)] flex items-center justify-center">
          <div
            className="absolute w-full h-full rounded-full border-2 border-transparent border-t-green-400 border-l-green-400"
            style={{ transform: `rotate(${rotation}deg)` }}
          ></div>
          <div
            className="absolute w-[90%] h-[90%] rounded-full border-2 border-transparent border-r-green-400 border-b-green-400"
            style={{ transform: `rotate(${-rotation * 1.5}deg)` }}
          ></div>

          <div className="w-[220px] h-[220px] rounded-full bg-gray-50/90 backdrop-blur-xl p-4 flex flex-col items-center justify-center border border-gray-300/50">
            <div className="flex gap-1.5 mb-3">
              <div className="w-2 h-2 rounded-full bg-gray-200 animate-pulse"></div>
              <div
                className="w-2 h-2 rounded-full bg-green-400 animate-pulse"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <div
                className="w-2 h-2 rounded-full bg-green-600 animate-pulse"
                style={{ animationDelay: "0.4s" }}
              ></div>
            </div>

            <div className="font-mono text-xs w-full max-w-[180px]">
              <div className="flex items-center text-green-600 mb-2">
                <Terminal className="h-3 w-3 mr-1" />
                <span className="text-green-600">~/</span>
                <span className="text-green-600">devtalk...</span>
                <span className="text-gray-500 ml-1">$</span>
              </div>

              <div className="text-gray-600 min-h-[2.5rem] text-[10px]">
                <span className="text-green-600">&gt;</span> {loadingText}
                <span className="animate-pulse">_</span>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-1.5">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce"
                  style={{
                    animationDelay: `${i * 0.15}s`,
                    opacity: 1 - i * 0.15,
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
