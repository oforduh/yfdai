import React, { useState } from "react";
import styles from "./navbar.module.scss";
import navLogo from "../../assets/YFDAI2.png";
import { IoIosArrowDown } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";

const Navbar = ({ noScroll, setNoScroll }) => {
  const [toggleIcon, setToggleIcon] = useState(false);
  const [state, setState] = useState({
    product: false,
    resource: false,
  });
  const handleToggleNavIcon = () => {
    setToggleIcon(!toggleIcon);
    setNoScroll(!noScroll);
  };

  // functionality that handle the nav item toggle
  const handleShowExtras = (id) => {
    let newObj = { ...state };
    newObj[id] = !newObj[id];
    setState(newObj);
  };

  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <div className={styles.imgContainer}>
          <img src={navLogo} alt={navLogo} />
        </div>
        <div className={styles.navLink}>
          <ul>
            <li>
              <div>
                <Link to="/tokenSwap">Swap YF-DAI</Link>
              </div>
            </li>
            <li>
              <div>
                <a
                  href="https://yfdai2.com/token"
                  target="_blank"
                  rel="noreferrer"
                >
                  Token
                </a>
              </div>
            </li>
            <li>
              <div className={styles.extra}>
                <span>
                  <a href="#profile">Products </a>
                </span>
                <span className={styles.arrowLogo}>
                  <IoIosArrowDown />
                </span>
                <div>
                  <ul>
                    <li>
                      <Link to="/tokenSwap">Staking Pool (DeFi)</Link>
                    </li>
                    <li>
                      <Link to="/tokenSwap">Wallet App</Link>
                    </li>
                    <li>
                      <Link to="/tokenSwap">YFDAI2 City (Metaverse)</Link>
                    </li>
                    <li>
                      <Link to="/tokenSwap">LaunchPad</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
            <li>
              <div className={styles.extra}>
                <span>
                  <a href="#profile">Resources</a>
                </span>
                <span className={styles.arrowLogo}>
                  <IoIosArrowDown />
                </span>
                <div>
                  <ul>
                    <li>
                      <a
                        href="https://yfdai2.com/token"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Roadmap
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
            <li>
              <div>
                <a
                  href="  https://yfdai2.com/about"
                  target="_blank"
                  rel="noreferrer"
                >
                  About us
                </a>
              </div>
            </li>
            <li>
              <div>
                <button>
                  {" "}
                  <Link to="/tokenSwap">Swap YF-DAI</Link>
                </button>
              </div>
            </li>
          </ul>
          <div
            className={styles.hamburgerContainer}
            onClick={() => {
              handleToggleNavIcon();
            }}
          >
            {toggleIcon ? <AiOutlineClose /> : <GiHamburgerMenu />}
          </div>
        </div>
      </div>

      {toggleIcon && (
        <div className={styles.fullPage}>
          <div className={styles.fullPageContent}>
            <ul>
              <li>
                <div>
                  <Link to="/tokenSwap">Swap YF-DAI</Link>
                </div>
              </li>
              <li>
                <div>
                  <a
                    href="https://yfdai2.com/token"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Token
                  </a>
                </div>
              </li>
              <li
                className={styles.productContainer}
                onClick={() => {
                  handleShowExtras("product");
                }}
              >
                <div className={styles.extra}>
                  <span>
                    <a href="#profile">Products </a>{" "}
                    <IoIosArrowForward
                      style={{ transform: state.product && "rotate(90deg)" }}
                    />
                  </span>
                </div>
                <div
                  className={styles.productExtra}
                  style={{ maxHeight: state.product && "300px" }}
                >
                  <ul>
                    <li>
                      <Link to="/tokenSwap">Staking Pool (DeFi)</Link>
                    </li>
                    <li>
                      <Link to="/tokenSwap">Wallet App</Link>
                    </li>
                    <li>
                      <Link to="/tokenSwap">YFDAI2 City (Metaverse)</Link>
                    </li>
                    <li>
                      <Link to="/tokenSwap">LaunchPad</Link>
                    </li>
                  </ul>
                </div>
              </li>
              <li
                className={styles.productContainer}
                onClick={() => {
                  handleShowExtras("resource");
                }}
              >
                <div className={styles.extra}>
                  <span>
                    <a href="#profile">Resources </a>{" "}
                    <IoIosArrowForward
                      style={{ transform: state.resource && "rotate(90deg)" }}
                    />
                  </span>
                </div>
                <div
                  className={styles.resourceExtra}
                  style={{ maxHeight: state.resource && "300px" }}
                >
                  <ul>
                    <li>
                      <a href="/https://yfdai2.com/roadmap">Roadmap</a>
                    </li>
                  </ul>
                </div>
              </li>

              <li>
                <div>
                  <a
                    href="  https://yfdai2.com/about"
                    target="_blank"
                    rel="noreferrer"
                  >
                    About us
                  </a>
                </div>
              </li>
              <li>
                <div>
                  <button>
                    {" "}
                    <Link to="/tokenSwap">Swap YF-DAI</Link>
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
