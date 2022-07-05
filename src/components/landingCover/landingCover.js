import React from "react";
import styles from "./landingCover.module.scss";
import banner1 from "../../assets/banner.png";
import banner2 from "../../assets/banner2.png";
import banner3 from "../../assets/banner3.png";
import bannerButton from "../../assets/bannerButton.jpg";
import mobileImage from "../../assets/mobile.png";
import roboImage from "../../assets/robot.png";
import robotn1 from "../../assets/robotbtn1.png";
import robotn2 from "../../assets/robotbtn2.png";
import bottomBanner from "../../assets/bottom2.jpg";

const LandingCover = () => {
  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <div className={styles.contentContainerChild}>
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
      <div className={styles.mobileSection}>
        <div className={styles.mobileSectionContent}>
          <div className={styles.mobileText}>
            <div className={styles.h2HeaderContainer}>
              <h2>The World of Finance </h2>
              <h2>Meets DeF, NFT </h2>
              <h2>& Metaverse</h2>
            </div>

            <div className={styles.mobileErc20Logo}>
              <img src={banner3} alt={banner3} />
            </div>
            <div className={styles.h3HeaderContainer}>
              <h3>Swap YF-DAI for YFDAI1 and </h3>
              <h3>join the future of finance</h3>
            </div>
            <button>Swap Now</button>
          </div>
          <div className={styles.mobileImage}>
            <img src={mobileImage} alt={mobileImage} />
          </div>
        </div>
      </div>
      <div className={styles.robotSection}>
        <div className={styles.robotSectionContent}>
          <div className={styles.roboImage}>
            <img src={roboImage} alt={roboImage} />
          </div>
          <div className={styles.roboText}>
            <div className={styles.h2HeaderRobot}>
              <h2>
                Stake YF<span>DAI</span>2 & Earn up to{" "}
              </h2>
              <h2>
                ~2.77% per Week (<span>144% APR</span>).
              </h2>
              <h2>Free NFT for Early Holders</h2>

              <div className={styles.buttonContRobot}>
                <div className={styles.roboImage2}>
                  <img src={robotn1} alt={robotn1} />
                </div>
                <div className={styles.roboImage2}>
                  <img src={robotn2} alt={robotn2} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.c21ksection}>
        <div className={styles.c21ksectionContent}>
          <div></div>
          <div className={styles.h2SectionCont}>
            <h2>
              21,000 YF <span>DAI</span>2. Only.
            </h2>
            <h2>Same.Same.But Different</h2>
            <div className={styles.h3headerTagSection}>
              <h3>Don't miss it again.</h3>
              <h3>Swap you old YF-DAI for YFDAI2</h3>
              <h3>And be delivered. Finally</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingCover;
