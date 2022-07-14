import React, { useState } from "react";
import Apartment from "../../components/apartment/apartment";
import Footer from "../../components/footer/footer";
import LandingCover from "../../components/landingCover/landingCover";
import Navbar from "../../components/navbar/navbar";
import styles from "./home.module.scss";

const Home = () => {
  const [noScroll, setNoScroll] = useState(false);
  return (
    <div
      className={styles.container}
      style={{
        maxHeight: noScroll && "100vh",
        overflow: noScroll && "hidden",
      }}
    >
      <div className={styles.navbarContainer}>
        <Navbar setNoScroll={setNoScroll} noScroll={noScroll} />
      </div>
      <div className={styles.bannerContainer}>
        <LandingCover />
      </div>
      <div className={styles.apartmentContainer}>
        <Apartment />
      </div>
      <div className={styles.footerContainer}>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
