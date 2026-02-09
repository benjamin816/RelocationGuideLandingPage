import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";

// --- CONFIGURATION ---
const HERO_IMAGE_URL = "https://lh3.googleusercontent.com/d/1ad8y4w1SQCXcnZzF7RDCF7FJue2IF6Fb";
const KIT_SCRIPT_URL = "https://f.convertkit.com/ckjs/ck.5.js"; 
const KIT_FORM_UID = "e79dbafbfd"; 

// --- Icons ---
const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" /></svg>
);
const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
);

const App = () => {
  // 1. Load Calendly Widget (Global)
  useEffect(() => {
    const head = document.querySelector("head");
    const calendlyScript = document.createElement("script");
    calendlyScript.src = "https://assets.calendly.com/assets/external/widget.js";
    head?.appendChild(calendlyScript);
    return () => { if (head?.contains(calendlyScript)) head.removeChild(calendlyScript); };
  }, []);

  // 2. Load ConvertKit Script - Native Modal
  useEffect(() => {
    if (!document.querySelector(`script[src="${KIT_SCRIPT_URL}"]`)) {
      const script = document.createElement("script");
      script.src = KIT_SCRIPT_URL;
      script.dataset.uid = KIT_FORM_UID;
      script.async = true;
      document.body.appendChild(script);
    }
  }, []); 

  return (
    <div className="page-container">
      <style>{`
        /* --- GLOBAL RESET & SCROLL FIX --- */
        * {
          box-sizing: border-box;
        }
        html, body {
          margin: 0;
          padding: 0;
          width: 100%;
          overflow-x: hidden;
          font-family: 'Inter', sans-serif;
          background-color: #E8F5E9;
          color: #1F2937;
        }

        /* --- VARIABLES --- */
        :root {
          --primary-green: #2F5233;
          --secondary-green: #5F8C63;
          --accent-light: #E8F5E9;
          --text-dark: #1F2937;
          --white: #FFFFFF;
        }

        /* --- LAYOUT --- */
        .page-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          padding-bottom: 60px;
          width: 100%;
          overflow-x: hidden;
        }
        
        /* Hero - Full width */
        .hero-container {
          width: 100%;
          position: relative;
          background-color: var(--primary-green);
          line-height: 0;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }
        .hero-image {
          width: 100%;
          height: auto;
          display: block;
        }
        
        /* Content - Strictly Centered */
        .main-content {
          width: 100%;
          max-width: 800px;
          margin: 40px auto 0;
          padding: 0 20px;
          position: relative;
          z-index: 10;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        h1 {
          font-size: 3.2rem;
          font-weight: 800;
          color: var(--primary-green);
          margin-bottom: 0.1em;
          text-transform: uppercase;
          line-height: 1.1;
        }
        h2 {
          font-size: 1.4rem;
          font-weight: 600;
          color: var(--secondary-green);
          margin-top: 0.5rem;
          margin-bottom: 2.5rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
        }
        
        /* Buttons */
        .download-btn {
          background-color: var(--primary-green);
          color: white;
          border: none;
          padding: 1.1rem 2.8rem;
          font-size: 1.2rem;
          font-weight: 600;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 10px 20px rgba(47, 82, 51, 0.2);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          max-width: 100%;
          white-space: normal;
          text-align: center;
        }
        .download-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 30px rgba(47, 82, 51, 0.3);
          background-color: #264229;
        }
        
        /* Consultation Section */
        .consultation-card {
          background: var(--white);
          margin-top: 4rem;
          padding: 2.5rem 1.5rem;
          border-radius: 20px;
          box-shadow: 0 10px 40px rgba(47, 82, 51, 0.08);
          border: 1px solid rgba(47, 82, 51, 0.1);
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .consultation-title {
          font-size: 1.6rem;
          color: var(--primary-green);
          margin-bottom: 1rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }
        .consultation-desc {
          color: #666;
          margin-bottom: 2rem;
          font-size: 1rem;
          max-width: 500px;
        }

        /* CALENDLY VIEWPORT CROP - No internal scroll, locked view */
        .calendly-viewport {
          width: 100%;
          height: 520px; /* This is the visible window */
          overflow: hidden;
          position: relative;
          border-radius: 12px;
          background: #fafafa;
        }
        .calendly-inline-widget {
          width: 100% !important;
          height: 750px !important; /* Make it tall enough to avoid internal scrollbar */
          margin-top: -75px !important; /* Hide the top header/profile area */
        }

        /* Responsive */
        @media (max-width: 640px) {
          h1 { font-size: 2.2rem; }
          h2 { font-size: 1.1rem; margin-bottom: 2rem; }
          .download-btn { width: 100%; padding: 1rem; }
          .consultation-card { padding: 1.5rem 1rem; margin-top: 3rem; }
          .consultation-title { font-size: 1.3rem; }
          .calendly-viewport { height: 580px; }
          .calendly-inline-widget { margin-top: -60px !important; }
        }
      `}</style>

      {/* Hero Section */}
      <div className="hero-container">
        <img src={HERO_IMAGE_URL} alt="Living in Raleigh Banner" className="hero-image" referrerPolicy="no-referrer" />
      </div>

      {/* Main Content */}
      <main className="main-content">
        <h1>RALEIGH RELOCATION GUIDE</h1>
        <h2>2026 EDITION</h2>
        
        <button 
          className="download-btn" 
          data-formkit-toggle={KIT_FORM_UID}
        >
          DOWNLOAD YOUR FREE COPY <DownloadIcon />
        </button>

        <div className="consultation-card">
          <div className="consultation-title">
            <CalendarIcon />
            <span>Relocation Consultation</span>
          </div>
          <p className="consultation-desc">Ready to make the move? Book a free 15-minute intro call with our team.</p>
          
          {/* Viewport wrapper for cropping */}
          <div className="calendly-viewport">
            <div 
              className="calendly-inline-widget" 
              data-url="https://calendly.com/living-in-raleigh-nc/consultation?hide_event_type_details=1&hide_gdpr_banner=1&primary_color=2f5233"
            ></div>
          </div>
        </div>
      </main>

    </div>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(<App />);
