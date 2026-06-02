"use client";

import { useEffect, useState } from "react";

const WHATSAPP_NUMBER = "919447590954"; // Change to desired number (no + or spaces)

export function ShareFloating() {
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  useEffect(() => {
    const footer = document.getElementById("footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFooterVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      target="_blank"
      rel="noopener noreferrer"
      title="Chat with us"
      aria-label="Chat with us on WhatsApp"
      className={`group fixed bottom-8 right-6 z-50 flex items-center gap-3 transition-all duration-500 ${
        isFooterVisible ? "opacity-0 pointer-events-none translate-y-10" : "opacity-100 translate-y-0"
      }`}
    >
      {/* Tooltip label */}
      <span className="opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300 bg-[#25D366] text-white text-sm font-semibold px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap">
        Chat with us
      </span>

      {/* WhatsApp button */}
      <div className="relative w-14 h-14 rounded-full bg-[#25D366] shadow-lg shadow-[#25D366]/40 flex items-center justify-center hover:scale-110 transition-transform duration-300">
        {/* Ping animation */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
        {/* WhatsApp SVG icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="w-8 h-8 fill-white relative z-10"
        >
          <path d="M16 0C7.163 0 0 7.163 0 16c0 2.822.736 5.47 2.027 7.774L0 32l8.466-2.002A15.94 15.94 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.28 13.28 0 01-6.773-1.853l-.486-.29-5.027 1.188 1.213-4.887-.317-.502A13.267 13.267 0 012.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.273-9.878c-.398-.199-2.355-1.162-2.72-1.295-.365-.133-.63-.199-.896.199-.265.398-1.029 1.295-1.261 1.56-.232.266-.465.299-.863.1-.398-.2-1.681-.619-3.202-1.977-1.183-1.056-1.981-2.36-2.213-2.758-.232-.398-.025-.613.174-.811.179-.178.398-.465.597-.698.199-.232.265-.398.398-.663.133-.266.066-.498-.033-.697-.1-.2-.896-2.16-1.228-2.957-.323-.777-.651-.671-.896-.683l-.763-.013c-.266 0-.697.1-1.062.498-.365.398-1.394 1.362-1.394 3.321s1.427 3.852 1.626 4.118c.199.265 2.808 4.286 6.804 6.013.951.41 1.693.655 2.272.839.954.303 1.823.26 2.51.158.766-.114 2.355-.963 2.687-1.893.332-.93.332-1.727.232-1.893-.1-.166-.365-.266-.763-.465z" />
        </svg>
      </div>
    </a>
  );
}
