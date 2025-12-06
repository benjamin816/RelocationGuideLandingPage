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
    // Check if script already exists to avoid duplicates
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
          overflow-x: hidden; /* CRITICAL: Prevents mobile horizontal scroll */
          font-family: 'Inter', sans-serif;
          background-color: #E8F5E9; /* accent-light */
          color: #1F2937; /* text-dark */
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
          padding-bottom: 40px;
          width: 100%;
          overflow-x: hidden;
        }
        
        /* Hero */
        .hero-container {
          width: 100%;
          position: relative;
          background-color: var(--primary-green);
          line-height: 0;
          box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        }
        .hero-image {
          width: 100%;
          height: auto;
          display: block;
        }
        .hero-fade {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 40%;
          background: linear-gradient(to bottom, transparent 0%, rgba(232, 245, 233, 0.2) 60%, var(--accent-light) 100%);
          pointer-events: none;
        }
        
        /* Content */
        .main-content {
          width: 100%;
          max-width: 800px;
          margin: 40px auto 0;
          padding: 0 20px;
          position: relative;
          z-index: 10;
          text-align: center;
        }
        h1 {
          font-size: 3.5rem;
          font-weight: 800;
          color: var(--primary-green);
          margin-bottom: 0.2em;
          text-transform: uppercase;
          line-height: 1.1;
        }
        h2 {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--secondary-green);
          margin-top: 0.5rem;
          margin-bottom: 3rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
        }
        
        /* Buttons */
        .download-btn {
          background-color: var(--primary-green);
          color: white;
          border: none;
          padding: 1.25rem 3rem;
          font-size: 1.25rem;
          font-weight: 600;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 10px 20px rgba(47, 82, 51, 0.2);
          display: inline-flex;
          align-items: center;
          gap: 12px;
          max-width: 100%;
          /* Ensure text wraps on very small screens */
          white-space: normal;
          text-align: center;
        }
        .download-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 30px rgba(47, 82, 51, 0.3);
          background-color: #264229;
        }
        
        /* Consultation */
        .consultation-card {
          background: var(--white);
          margin-top: 5rem;
          padding: 3rem;
          border-radius: 20px;
          box-shadow: 0 10px 40px rgba(47, 82, 51, 0.08);
          border: 1px solid rgba(47, 82, 51, 0.1);
        }
        .consultation-title {
          font-size: 1.8rem;
          color: var(--primary-green);
          margin-bottom: 1.5rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          flex-wrap: wrap;
        }
        .calendly-container {
          min-width: 320px;
          height: 700px;
          width: 100%;
        }

        /* Responsive Tweaks */
        @media (max-width: 640px) {
          h1 { font-size: 2.25rem; }
          .download-btn { width: 100%; justify-content: center; padding: 1rem; }
          .consultation-card { padding: 1.5rem; }
        }
      `}</style>

      {/* Hero */}
      <div className="hero-container">
        <img src={HERO_IMAGE_URL} alt="Banner" className="hero-image" referrerPolicy="no-referrer" onError={(e) => e.currentTarget.style.display = 'none'} />
        <div className="hero-fade"></div>
      </div>

      {/* Main Content */}
      <main className="main-content">
        <h1>RALEIGH RELOCATION GUIDE</h1>
        <h2>2026 EDITION</h2>
        
        {/* Trigger Button using ConvertKit Native Toggle */}
        <button 
          className="download-btn" 
          data-formkit-toggle={KIT_FORM_UID}
        >
          DOWNLOAD YOUR FREE COPY <DownloadIcon />
        </button>

        <div className="consultation-card">
          <div className="consultation-title"><CalendarIcon /><span>Schedule Your Relocation Consultation</span></div>
          <p style={{ color: "#666", marginBottom: "2rem" }}>Ready to make the move? Book a free 15-minute intro call.</p>
          <div className="calendly-inline-widget calendly-container" data-url="https://calendly.com/living-in-raleigh-nc/consultation?hide_event_type_details=1&hide_gdpr_banner=1&primary_color=2f5233"></div>
        </div>
      </main>

    </div>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(<App />);
