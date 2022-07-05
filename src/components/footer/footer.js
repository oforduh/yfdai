import React from "react";
import navLogo from "../../assets/YFDAI2.png";
import styles from "./footer.module.scss";
const Footer = () => {
  return (
    <div className={styles.footerParent}>
      <div className={styles.footerContent}>
        <div className={styles.logoContainer}>
          <div className={styles.footerImage}>
            <img src={navLogo} alt={navLogo} />
          </div>
          <div className={styles.footerImageText}>
            <span>The world of Finance Meets DeFi,NFT & </span>
            <span>Metaverse</span>
          </div>
        </div>
        <div className={styles.copyrightContainer}>
          <span> ©yfdai2.com 2022.</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
