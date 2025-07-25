import React from "react";
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "./Footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playStore} alt="playstore" />
        <img src={appStore} alt="Appstore" />
      </div>

      <div className="midFooter">
        <h1>GRAB 'N GO</h1>
        <p>High Quality is our first priority</p>
         <p>Fast. Fresh. Always Ready.</p>
        <p>Copyrights 2025 &copy;All rights reserved.</p>
      </div>
 
      <div className="rightFooter">
        <h4>Follow Us</h4>
       
        <a href="http://instagram.com/sivahyyyb">Instagram</a>
        <a href="http://youtube.com/siva">Youtube</a>
        <a href="http://facebook.com/xyz">Facebook</a>           
      </div>
    
    </footer>
  );
};

export default Footer;