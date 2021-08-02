import React, { useState, useEffect } from "react";
import "./../scss/Layout.scss";
import Information from "./Information";

function Layout(props) {
  const [TDATA, setTDATA] = useState({
    buy: [],
    saved: [],
    blog: [],
    seller: [],
    products: [],
  });

  useEffect(() => {
    let D = getDataFromLocal();
    fetch("js/electronic.json")
      .then(function (r) {
        return r.json();
      })
      .then(function (data) {
        fetch("js/gaming.json")
          .then(function (r2) {
            return r2.json();
          })
          .then(function (data2) {
            fetch("js/phone.json")
              .then(function (r3) {
                return r3.json();
              })
              .then(function (data3) {
                updateSave(D.saved, [...data, ...data2, ...data3]);
                setTDATA({
                  ...TDATA,
                  ...D,
                  products: [...data, ...data2, ...data3],
                });
              });
          });
      });
  }, []);
  const value = { TDATA, setTDATA };

  const getDataFromLocal = () => {
    return {
      buy: localStorage.getItem("buy")
        ? localStorage.getItem("buy").split(",")
        : [],
      saved: localStorage.getItem("saved")
        ? localStorage.getItem("saved").split(",")
        : [],
      blog: localStorage.getItem("blog")
        ? localStorage.getItem("blog").split(",")
        : [],
      seller: localStorage.getItem("seller")
        ? localStorage.getItem("seller").split(",")
        : [],
    };
  };

  useEffect(() => {
    updateSave(TDATA.saved, TDATA.products);
  }, [TDATA.saved]);

  const [savedObj, setSavedObj] = useState([]);
  function updateSave(D, T) {
    let H = D.map((save) => {
      return T.find((P, index) => {
        if (P.id === save) {
          return P;
        }
      });
    });
    setSavedObj(H);
  }

  return (
    <>
      <Information.Provider value={value}>
        <div className="__Layout">
          <div className="mainPageArea">
            <div className="centreColArea customcontrols centerColAreaW75">
              <div className="searchBar fixed">
                <form
                  action=""
                  id="headersearch"
                  noValidate="novalidate"
                  method="get"
                >
                  <button
                    name="submit"
                    className="searchleft"
                    type="submit"
                  ></button>
                  <div className="searchLeftShadow" />
                  <div className="searchin">
                    <input
                      name="s"
                      className="ac_input"
                      autoComplete="off"
                      id="stext"
                      placeholder="Start a new search"
                      type="text"
                      maxLength={100}
                    />
                  </div>
                  <div className="searchright">
                    <button type="submit" style={{ opacity: 0 }}></button>
                  </div>
                  <div className="searchDropDown" id="searchDropDown">
                    <ul className="primary" id="primary">
                      <li className="all" alt="All" name="mainDis">
                        <div className="search-all" />
                        <span className="search-all-top" name="mainDis">
                          All
                        </span>
                        <ul className="supCatDropDown" id="supCatDropDownAll">
                          <li id={1} alt="Gaming" className="superCat1">
                            <div className="addShine" />
                            <span>Gaming</span>
                          </li>
                          <li id={4} alt="Phones" className="superCat4">
                            <div className="addShine" />
                            <span>Phones</span>
                          </li>
                          <li id={5} alt="Electronics" className="superCat5">
                            <div className="addShine" />
                            <span>Electronics</span>
                          </li>
                          <li className="all" id="all" alt="All">
                            <div className="addShine" />
                            <span>All</span>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </form>
              </div>
              {/* Child Element */}
              {props.children}
            </div>
            <div className="rightColArea">
              <div className="social-links">
                <a target="_blank" rel="nofollow noopener noreferrer">
                  <img
                    src="https://uk.webuy.com/images/social/facebook_d.svg"
                    className="facebook"
                  />
                </a>
                <a target="_blank" rel="nofollow noopener noreferrer">
                  <img
                    src="https://uk.webuy.com/images/social/twitter_d.svg"
                    className="twitter"
                  />
                </a>
                <a target="_blank" rel="nofollow noopener noreferrer">
                  <img
                    src="https://uk.webuy.com/images/social/youtube_d.svg"
                    className="youtube"
                  />
                </a>
                <a target="_blank" rel="nofollow noopener noreferrer">
                  <img
                    src="https://uk.webuy.com/images/social/instagram_d.svg"
                    className="instagram"
                  />
                </a>
              </div>

              <span id="scrollToBasket" />
              <div className="buyBasketArea" style={{}}>
                <div className="buyBasketTop">
                  <div className="basketImg" />
                  <div>
                    <div className="basketTitle1">I want to buy </div>
                    <div className="basketTitle2">
                      <span>these item/s</span>
                    </div>
                  </div>
                </div>
                <div className="buyBasketContent">
                  <table
                    border={0}
                    cellPadding={0}
                    cellSpacing={0}
                    width="100%"
                  >
                    <tbody>
                      <tr id="buyBasketRow">
                        <td className="basketTableCell" style={{}}>
                          <span id="buyBasketCount">{TDATA.buy.length}</span>{" "}
                          item/s
                        </td>
                        <td className="basketTableCellLnk">
                          <a href="/basket" className>
                            View Basket
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div style={{ display: "unset" }} id="saveforlaterlist">
                <div className="featureBox">
                  <div className="featureBoxTop">
                    <div className="featureBoxTitle">
                      Saved Items ({TDATA.saved.length})
                    </div>
                  </div>
                  <div className="featureBoxContent">
                    <ul className="bgColGrey">
                      {savedObj.map((save, i) => {
                        return (
                          <li className={i % 2 === 0 ? "bgColWhite" : ""}>
                            <a href={`/product?id=${save.id}`} className>
                              {save.name}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
              <div id="latestBlog">
                <div className="featureBox">
                  <div className="featureBoxTop">
                    <div className="featureBoxTitle">Blog Latest</div>
                  </div>
                  <div className="featureBoxContent">
                    <ul className="bgColGrey">
                      <li className="bgColWhite">
                        <a href="#" className>
                          WE REPAIR CONSOLES &amp; TECH!
                        </a>
                      </li>
                      <li>
                        <a href="#" className>
                          Wired Recommend For Refurbished Tech!
                        </a>
                      </li>
                      <li className="moreLink bgColWhite">
                        <a href="#" className>
                          More Blog Articles ...
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="featureBox">
                <div className="featureBoxTop">
                  <div className="featureBoxTitle">Top Seller</div>
                </div>
                <div className="featureBoxContent">
                  <table
                    border={0}
                    cellPadding={0}
                    cellSpacing={0}
                    className="topSellersTable"
                  >
                    <thead>
                      <tr>
                        <td className="topSellers center colWidth">&nbsp;</td>
                        <td className="topSellers center bold">WeSell for</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bgColGrey">
                        <td className="topSellers center colWidth">
                          <a href="#" className>
                            New Pokemon Snap
                          </a>
                        </td>
                        <td className="topSellers center">£42.00</td>
                      </tr>
                      <tr>
                        <td className="topSellers center colWidth">
                          <a href="#" className>
                            Wonder Woman 1984 (12) 2020
                          </a>
                        </td>
                        <td className="topSellers center">£10.00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Information.Provider>
    </>
  );
}

export default Layout;
