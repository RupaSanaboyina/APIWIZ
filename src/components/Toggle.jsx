import React from "react";

function Toggle({ theme, setTheme }) {
  return (
    <div className="theme-toggle">
      <span className="toggle-label">Dark/Light</span>
      <label className="switch">




        
        <input
          type="checkbox"
          checked={theme === "dark"}
          onChange={() => setTheme(theme === "light" ? "dark" : "light")}
        />
        <span className="slider round"></span>
      </label>
    </div>
  );
}

export default Toggle;
