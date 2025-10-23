import { useState, useEffect } from "react";
import Lottie from "lottie-react";
import low from "../../assets/animation/low.json";
import medium from "../../assets/animation/medium.json";
import high from "../../assets/animation/high.json";
import logo from "../../assets/logo/white.png";
import GradientBackground from "../GradientBackground/GradientBackground";

function GradientIntro({ tone, children }) {
  const [showLottie, setShowLottie] = useState(true);

  const getToneMessage = (tone) => {
    if (tone < 1.5) return "Let's take it slow today!";
    else if (tone <= 2.4) return "Energetic and motivated!";
    else return "High energy! Time to be productive!";
  };
  const getToneAnimation = (tone) => {
    if (tone < 1.5) return low;
    else if (tone <= 2.4) return medium;
    else return high;
  };

  const greeting = getToneMessage(tone);
  const animation = getToneAnimation(tone);

  return (
    <>
      <div
        style={{
          position: "relative",
          overflow: "hidden",
        }}
      >
        <GradientBackground tone={tone}>
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              opacity: showLottie ? 0 : 1,
            }}
          >
            {children}
          </div>
        </GradientBackground>

        {/* Lottie overlay */}
        {showLottie && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 9999,
              background: "#fff",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Lottie
              animationData={animation}
              loop={false}
              autoplay
              onComplete={() => setShowLottie(false)}
              style={{
                width: "100%",
                height: "100%",
              }}
              rendererSettings={{ preserveAspectRatio: "none" }}
            />

            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "#ffffffff",
                fontSize: "2rem",
                fontWeight: "bold",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <img src={logo} alt="logo" style={{ width: "10rem" }} />
              <span style={{ fontSize: "2rem", fontWeight: "bold" }}>
                {greeting}
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default GradientIntro;
