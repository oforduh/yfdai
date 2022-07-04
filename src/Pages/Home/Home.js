import React from "react";
import LandingCover from "../../components/landingCover/landingCover";
import Navbar from "../../components/navbar/navbar";
import styles from "./home.module.scss";

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.navbarContainer}>
        <Navbar />
      </div>
      <div className={styles.bannerContainer}>
        <LandingCover />
      </div>
    </div>
  );
};

export default Home;
