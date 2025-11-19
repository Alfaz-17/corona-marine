import React from "react";

const MarineLoader = () => {
  return (
    <div style={styles.loaderContainer}>
      <div style={styles.loaderContent}>
        <div style={styles.spinner}></div>
        <h1 style={styles.text}></h1>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes fadeInOut {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

const styles = {
  loaderContainer: {
    width: "100%",
    height: "350px",           // <-- Page loader size
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "12px",
  },
  loaderContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  spinner: {
    width: "80px",
    height: "80px",
    border: "10px solid rgba(255, 255, 255, 0.2)",
    borderTop: "10px solid #3DB9C8",
    borderRadius: "70%",
    animation: "spin 1s linear infinite",
  },
  text: {
    marginTop: "15px",
    color: "#0A3D62",
    fontSize: "1.5rem",
    fontWeight: "700",
    
  },
};

export default MarineLoader;
