import React from "react";

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Footer */}
      <footer
        style={{
          padding: "20px 40px",
          fontSize: "14px",
          color: "#555",
          textAlign: "center",
          borderTop: "1px solid #ccc",
        }}
      >
        © 2025 Kirubasagar Jeevan Tech, All Rights Reserved.
      </footer>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        style={{
          position: "fixed",
          bottom: "30px",
          right: "30px",
          background: "#555",
          color: "#fff",
          border: "none",
          borderRadius: "50%",
          width: "45px",
          height: "45px",
          cursor: "pointer",
          fontSize: "14px",
          zIndex: 1000,
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        }}
        aria-label="Back to Top"
      >
        ↑
      </button>
    </>
  );
};

export default Footer;
