import React from "react";
import { Link } from "react-router-dom";
import styles from "./apartment.module.scss";

const Apartment = () => {
  return (
    <div className={styles.container}>
      <div className={styles.containerContent}>
        <div className={styles.headerContainer}>
          <div className={styles.h2ApartmentDiv}>
            <h2>Swap your old YF-DAI</h2>
            <h2>
              for YF<span>DAI</span>2 & Get for Free
            </h2>
            <h2>1 Luxury Villa in YFDAI2 City</h2>
          </div>
          <div className={styles.h3ApartmentDiv}>
            <h3>YFDAI2 City is the metaverse Island</h3>
            <h3>built as a virtual heaven for the YFDAI2 Community</h3>
          </div>
          <div className={styles.buttonContainerSection}>
            <button>
              {" "}
              <Link to="/tokenswap">Swap old YF-DAI</Link>
            </button>
            <button>
              <Link to="/tokenswap">Swap old YF-DAI</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Apartment;
