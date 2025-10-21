import "./GradientBackground.css";

const GradientBackground = ({ tone, children }) => {
  let color1, color2, color3, color4, color5;

  if (tone < 1.5) {
    color1 = "#f0f4f8";
    color2 = "#7a9defff";
    color3 = "#7191e8ff";
    color4 = "#3c51c9ff";
    color5 = "#3f51b5";
  } else if (tone <= 2.4) {
    color1 = "#f0fff0";
    color2 = "#b5e48c";
    color3 = "#4caf50";
    color4 = "#2e7d32";
    color5 = "#1b5e20";
  } else {
    color1 = "#fff9c4";
    color2 = "#ffe082";
    color3 = "#ffab91";
    color4 = "#ff7043";
    color5 = "#e91e63";
  }

  return (
    <div
      className="gradient-background"
      style={{
        "--color1": color1,
        "--color2": color2,
        "--color3": color3,
        "--color4": color4,
        "--color5": color5,
      }}
    >
      {children}
    </div>
  );
};

export default GradientBackground;
