import React from "react";
import { MDBFooter, MDBContainer } from "mdb-react-ui-kit";

function Footer() {
  const currentYear = new Date().getFullYear();
  const versionNumber = "1.0.0";
  return (
    <MDBFooter className="footer">
      <MDBContainer className="p-4">
        <div className="row">
          <div className="col-sm-4">
            <div className="links">
              <a href="http://localhost:3000">Terms of Use</a>
              <a href="http://localhost:3000">Privacy Policy</a>
              <a href="http://localhost:3000">Contact Us</a>
            </div>
          </div>
          <div className="col-sm-4 copyRight">
            <span>Safarifone Inc. &copy; {currentYear}</span>
          </div>
          <div className="col-sm-4 version">
            <span>Version: {versionNumber}</span>
          </div>
        </div>
      </MDBContainer>
    </MDBFooter>
  );
}

export default Footer;
