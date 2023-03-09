import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Confirmation from "./confirmation";

function Header() {
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleLogout = () => {
    setShowConfirmation(true);
  };

  const handleConfirmLogout = () => {
    // Perform any necessary logout operations here
    navigate("/");
  };

  const handleCancelLogout = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="header">
      <div className="logo">Safari Pay</div>
      <button className="link-button" onClick={handleLogout}>
        Logout?
      </button>
      {showConfirmation && (
        <Confirmation
          message="Are you sure you want to logout!"
          onConfirm={handleConfirmLogout}
          onCancel={handleCancelLogout}
        />
      )}
    </div>
  );
}

export default Header;
