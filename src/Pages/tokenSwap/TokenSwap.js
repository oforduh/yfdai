import React, { useState } from "react";
import styles from "./tokenSwap.module.scss";
import logo from "../../assets/YFDAI2.png";

const TokenSwap = () => {
  const [hide, ] = useState(false);
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.navBarParent}>
          <div className={styles.logoParent}>
            <img src={logo} alt={logo} />
          </div>
          <div className={styles.walletConnectDiv}>
            <button>Connect Wallet</button>
          </div>
        </div>
        { hide ? (
          <div className={styles.swapParentContainer}>
            <div className={styles.swapParentContent}>
              <div className={styles.firstSection}>
                <div className={styles.flexParent}>
                  <div className={styles.flexItemsDiv}>
                    <span>Old $YFDAI Balance</span>
                    <span>0.00000 YFDAI</span>
                  </div>
                  <div className={styles.flexItemsDiv}>
                    <span>New $YFDAI2 Balance</span>
                    <span>0.00000 YFDA2</span>
                  </div>
                  <div className={styles.flexItemsDiv}>
                    <span>Free NFT Claimed</span>
                    <span>NO</span>
                  </div>
                </div>
              </div>
              <div className={styles.secondSection}>
                <div className={styles.flexParent2}>
                  <div className={styles.flexItemsDiv2}>
                    <div className={styles.formParent}>
                      <div className={styles.formGroup}>
                        <label>
                          SWAP YFDAI <span>(Deposit $YFDAI (ERC-20)</span>
                        </label>
                        <input type="text" />
                      </div>
                    </div>
                    <div className={styles.approveParent}>
                      <button>Approve</button>
                      <button>Swap</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.noTokenContainer}>
            <div className={styles.noTokenContent}>
              <h1>This offer is only exclusive for YFDAI holders only</h1>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TokenSwap;
