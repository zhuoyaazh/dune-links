"use client";

import { useState, useRef } from "react";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isGateOpening, setIsGateOpening] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Fungsi buat Mulai (Dipanggil pas klik tombol ENTER)
  const enterSite = () => {
    setIsGateOpening(true);
    
    if (audioRef.current) {
      audioRef.current.volume = 0.6;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.log("Autoplay blocked:", err);
      });
    }
    
    // Wait for gate animation to finish before showing content
    setTimeout(() => {
      setHasInteracted(true);
    }, 2100);
  };

  // Fungsi toggle manual (tombol pojok kanan bawah)
  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/DUNE-SOUNDTRACK.mp3#t=63" loop />

      {/* --- 1. WELCOME SCREEN (Hanya muncul sebelum user klik Enter) --- */}
      {!hasInteracted && (
        <>
          {/* Left Gate */}
          <div 
            className={`fixed top-0 left-0 w-1/2 h-screen z-100 transition-transform duration-[2000ms] ease-in-out ${isGateOpening ? '-translate-x-full' : 'translate-x-0'}`}
            style={{
              backgroundImage: "url('/DUNE-GATE4.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "left center",
              backgroundRepeat: "no-repeat",
              willChange: "transform",
            }}
          >
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none"></div>
          </div>

          {/* Right Gate */}
          <div 
            className={`fixed top-0 right-0 w-1/2 h-screen z-100 transition-transform duration-[2000ms] ease-in-out ${isGateOpening ? 'translate-x-full' : 'translate-x-0'}`}
            style={{
              backgroundImage: "url('/DUNE-GATE4.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "right center",
              backgroundRepeat: "no-repeat",
              willChange: "transform",
            }}
          >
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none"></div>
          </div>

          {/* Button Container */}
          {!isGateOpening && (
            <div className="fixed inset-0 z-[101] flex items-center justify-center pt-24 md:pt-0 pointer-events-none">
              <div className="pointer-events-auto text-center space-y-6 animate-fade-in-up">
                <button
                  onClick={enterSite}
                  className="px-6 py-3 md:px-10 md:py-5 border-2 border-dune-primary text-dune-primary font-dune text-xl md:text-4xl tracking-[0.2em] md:tracking-[0.3em] uppercase hover:bg-dune-primary hover:text-dune-bg transition-all duration-500 shadow-[0_0_40px_rgba(235,162,102,0.3)] hover:shadow-[0_0_60px_rgba(235,162,102,0.7)]"
                >
                Enter Arrakis
              </button>
            </div>
          </div>
          )}
        </>
      )}


      {/* --- 2. FLOATING BUTTON (Muncul terus di pojok) --- */}
      {/* Tombol ini akan tetap ada biar user bisa matiin lagu kalau bosan */}
      <div className={`fixed bottom-6 right-6 z-50 transition-opacity duration-1000 ${hasInteracted ? 'opacity-100' : 'opacity-0'}`}>
        <button
          onClick={toggleMusic}
          className={`
            flex items-center justify-center w-12 h-12 rounded-full border 
            transition-all duration-500 ease-out shadow-lg backdrop-blur-md
            ${
              isPlaying 
                ? "bg-dune-primary border-dune-primary text-dune-bg animate-pulse-slow shadow-[0_0_20px_rgba(235,162,102,0.6)]" 
                : "bg-dune-bg/50 border-dune-text/30 text-dune-text hover:border-dune-primary hover:text-dune-primary"
            }
          `}
        >
          {isPlaying ? (
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
               <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
             </svg>
          ) : (
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
               <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
             </svg>
          )}
        </button>
      </div>
    </>
  );
}