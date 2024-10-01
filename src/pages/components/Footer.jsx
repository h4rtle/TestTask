import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const handleHomeButton = () => {
    navigate("/");
  };

  return (
    <>
      <footer className="bg-primary-subtle">
        <div>
          <button onClick={handleHomeButton} className="btn btn-primary">
            На главаную
          </button>
        </div>
      </footer>
    </>
  );
};

export default Footer;
