import React from 'react';

export default function App() {
  return (
    <div className="flex flex-col h-screen w-full max-w-[850px] mx-auto px-4 justify-between">
      {/* Top Header Section */}
      <header className="flex justify-between items-center py-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">✨</span>
          <h1 className="text-2xl font-medium tracking-tight bg-gradient-to-r from-[#4285f4] via-[#9b72cb] to-[#d96570] bg-clip-text text-transparent">
            Plock AI
          </h1>
        </div>
        {/* Curved Settings Icon Button */}
        <button className="w-10 h-10 rounded-full flex items-center justify-center text-[#c4c7c5] hover:bg-[#282a2c] transition-colors cursor-pointer">
          ⚙️
        </button>
      </header>

      {/* Primary Message Area */}
      <main className="flex-1 overflow-y-auto py-6 flex flex-col gap-6">
        <div className="flex gap-4 max-w-[85%]">
          <div className="w-9 h-9 rounded-full bg-[#1e1f20] flex items-center justify-center shrink-0 text-sm">
            ✨
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-medium text-white">Hello! I am Plock AI.</h3>
            <p className="text-[#c4c7c5] leading-relaxed">
              How can I help you today? Ask me any questions.
            </p>
          </div>
        </div>
      </main>

      {/* Bottom Interface Bar Section */}
      <footer className="flex flex-col items-center gap-3 pb-6">
        {/* Animated Question Bar Wrapper Container */}
        <div className="w-full plock-input-glow-wrapper">
          {/* Internal Input Layout Box */}
          <div className="flex items-center justify-between bg-[#1e1f20] rounded-full py-2 pl-6 pr-2 w-full">
            <input 
              type="text" 
              placeholder="Ask Plock AI anything..." 
              className="flex-1 bg-transparent border-none outline-none text-[#e3e3e3] text-base placeholder-[#747775] pr-3"
            />
            {/* Neatly Aligned Operational Actions */}
            <div className="flex items-center gap-1.5">
              <button className="w-10 h-10 rounded-full flex items-center justify-center text-[#c4c7c5] hover:bg-[#282a2c] transition-colors cursor-pointer" title="Add Image">
                🖼️
              </button>
              <button className="w-10 h-10 rounded-full flex items-center justify-center text-[#c4c7c5] hover:bg-[#282a2c] transition-colors cursor-pointer" title="Voice Input">
                🎙️
              </button>
              {/* Perfectly Rounded Action Call button */}
              <button className="bg-[#4285f4] text-white px-5 h-10 rounded-full font-medium hover:bg-[#3367d6] transition-colors ml-1 cursor-pointer">
                Send
              </button>
            </div>
          </div>
        </div>
        
        <p className="text-xs text-[#747775] text-center">
          Plock AI can make errors. Verify important information.
        </p>
      </footer>
    </div>
  );
}
