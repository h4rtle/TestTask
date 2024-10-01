import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleHomeButton = () => {
    navigate("/");
  };
  const handleInteractionsButton = () => {
    navigate("/interactions");
  };
  return (
    <>
      <header className="bg-primary-subtle">
        <button onClick={handleHomeButton} className="btn btn-primary">
          Главаная
        </button>
        <button onClick={handleInteractionsButton} className="btn btn-primary">
          Взаимодействовать с объектами
        </button>
      </header>
    </>
  );
};

export default Header;
