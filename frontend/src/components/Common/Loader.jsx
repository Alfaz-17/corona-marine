// Loader.jsx
import React from "react";

const Loader = () => {
  return (
    <div style={styles.loaderContainer}>
      {/* Wave background */}
      <div style={styles.wave}></div>
      <div style={styles.wave}></div>

      {/* Spinner + Text */}
      <div style={styles.loaderContent}>
        <div style={styles.spinner}></div>
        <h1 style={styles.text}>Corona Marine</h1>
        
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes fadeInOut {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }

        @keyframes waveMove {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(50%); }
        }
      `}</style>
    </div>
  );
};

const styles = {
  loaderContainer: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "linear-gradient(135deg, #2E8BC0, #0C2D48)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
    overflow: "hidden",
    flexDirection: "column",
  },
  wave: {
    position: "absolute",
    bottom: 0,
    left: "-50%",
    width: "200%",
    height: "100%",
    background:
      "radial-gradient(circle at center, rgba(255,255,255,0.05), transparent 70%)",
    animation: "waveMove 6s linear infinite",
  },
  loaderContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    zIndex: 10,
  },
  spinner: {
    width: "90px",
    height: "90px",
    border: "10px solid rgba(255, 255, 255, 0.2)",
    borderTop: "10px solid #61A5C2",
    borderRadius: "50%",
    boxShadow: "0 0 20px rgba(97, 165, 194, 0.6)",
    marginBottom: "25px",
    animation: "spin 1s linear infinite",
  },
  text: {
    color: "#ffffff",
    fontSize: "2.5rem",
    fontWeight: "800",
    letterSpacing: "3px",
    textShadow: "0 0 15px rgba(97,165,194,0.7), 0 0 30px rgba(46,139,192,0.5)",
    animation: "fadeInOut 1.5s infinite",
  },
};

export default Loader;
