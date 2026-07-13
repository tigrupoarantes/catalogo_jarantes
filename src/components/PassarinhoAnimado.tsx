import { useState, useEffect } from 'react';

export default function PassarinhoAnimado() {
  const [showBird, setShowBird] = useState(false);
  const [birdTop, setBirdTop] = useState("20%");

  useEffect(() => {
    const checkFlightStatus = async () => {
      const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
      
      // 1. Check Session Storage (once per session/access to catalog)
      const hasFlownSession = sessionStorage.getItem('bird_flown_session');
      if (hasFlownSession) {
        return; // Already flown during this browser session
      }

      // 2. Check Local Storage date (once per day per device/browser)
      const lastFlownDate = localStorage.getItem('bird_flown_date');
      if (lastFlownDate === today) {
        return; // Already flown today on this browser/device
      }

      // 3. Check IP via public API (once per day per IP address)
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        const currentIp = data.ip;
        
        const lastFlownIp = localStorage.getItem('bird_flown_ip');
        if (lastFlownIp === currentIp && lastFlownDate === today) {
          return; // Already flown today from this IP address
        }
        
        // Save the IP address of this flight
        localStorage.setItem('bird_flown_ip', currentIp);
      } catch (error) {
        console.error("Failed to fetch IP, falling back to local storage date checks:", error);
      }

      // If we pass all checks, set random height and let it fly
      const randomTop = Math.floor(Math.random() * 50) + 10;
      setBirdTop(`${randomTop}%`);
      setShowBird(true);
    };

    checkFlightStatus();
  }, []);

  const handleAnimationEnd = () => {
    const today = new Date().toISOString().split('T')[0];
    sessionStorage.setItem('bird_flown_session', 'true');
    localStorage.setItem('bird_flown_date', today);
    setShowBird(false);
  };

  if (!showBird) return null;

  return (
    <div 
      className="passarinho-animado"
      style={{ top: birdTop }}
      onAnimationEnd={handleAnimationEnd}
    >
      <svg 
        viewBox="0 0 64 64" 
        className="w-[100px] h-[100px] fill-[#426EA8] drop-shadow-md"
      >
        {/* Tail */}
        <path d="M12 36 L4 30 L6 42 Z" />
        
        {/* Body/Head */}
        <path d="M10 36 C18 24, 38 24, 46 32 C50 30, 54 30, 58 32 C58 35, 52 38, 48 38 C42 46, 22 46, 10 36 Z" />
        
        {/* Beak */}
        <path d="M58 32 L62 34 L56 36 Z" fill="#FFA500" />
        
        {/* Eye */}
        <circle cx="48" cy="32" r="2.5" fill="white" />
        <circle cx="48.5" cy="31.5" r="1" fill="black" />
        
        {/* Wing with flapping animation */}
        <path 
          className="animate-flapping" 
          d="M28 34 C24 18, 12 18, 16 34 C20 44, 28 44, 28 34 Z" 
          fill="#5283C4" 
        />
      </svg>
    </div>
  );
}
