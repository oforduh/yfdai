import React from "react";
import styles from "./landingCover.module.scss";
import banner1 from "../../assets/banner.png";
import banner2 from "../../assets/banner2.png";
import banner3 from "../../assets/banner3.png";
import bannerButton from "../../assets/bannerButton.jpg";

const LandingCover = () => {
  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <div className={styles.banner1}>
          <img src={banner1} alt={banner1} />
        </div>
        <div className={styles.banner2}>
          <div>
            <img src={banner2} alt={banner2} />
            <h3>DEFI PAYMENT & METAVERSE</h3>
          </div>
        </div>
        <div className={styles.banner3}>
          <img src={banner3} alt={banner3} />
        </div>
        <div className={styles.textSection}>
          <h1>Finally. The YFDAI we deserve.</h1>
          <h1>
            Swap 1 YF-DAI. Get 1 YF
            <span>DAI</span>2 + 1 Villa
          </h1>
          <span className={styles.tt}>
            Available for 6,0000 YF-DAI only. Jump in a radically better YFDAI
          </span>

          <div className={styles.bannerButton}>
            <img src={bannerButton} alt={bannerButton} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingCover;
