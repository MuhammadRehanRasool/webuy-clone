import React, { useState, useEffect } from "react";
import "./../scss/Basket.scss";

function Basket(props) {
  const [TDATA, setTDATA] = useState({
    buy: [],
    saved: [],
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
                updateBuy(D.buy, [...data, ...data2, ...data3]);
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

  const getDataFromLocal = () => {
    return {
      buy: localStorage.getItem("buy")
        ? localStorage.getItem("buy").split(",")
        : [],
      saved: localStorage.getItem("saved")
        ? localStorage.getItem("saved").split(",")
        : [],
    };
  };

  useEffect(() => {
    updateBuy(TDATA.buy, TDATA.products);
  }, [TDATA.buy]);

  const [buyObj, setBuyObj] = useState([]);
  function updateBuy(D, T) {
    let H = D.map((save) => {
      console.log(save);
      return T.find((P, index) => {
        if (P.id === save) {
          return P;
        }
      });
    });
    setBuyObj(H);
  }

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

  const saveProduct = (e) => {
    if (!TDATA.saved.includes(e.target.getAttribute("productid"))) {
      localStorage.setItem("saved", [
        ...TDATA.saved,
        e.target.getAttribute("productid"),
      ]);
      setTDATA({
        ...TDATA,
        saved: [...TDATA.saved, e.target.getAttribute("productid")],
      });
    } else {
      let index = TDATA.saved.indexOf(e.target.getAttribute("productid"));
      if (index > -1) {
        TDATA.saved.splice(index, 1);
      }
      localStorage.setItem("saved", [...TDATA.saved]);
      setTDATA({
        ...TDATA,
        saved: [...TDATA.saved],
      });
    }
  };

  const buyProduct = (e) => {
    if (TDATA.buy.includes(e.target.getAttribute("productid"))) {
      let index = TDATA.buy.indexOf(e.target.getAttribute("productid"));
      if (index > -1) {
        TDATA.buy.splice(index, 1);
      }
      localStorage.setItem("buy", [...TDATA.buy]);
      setTDATA({
        ...TDATA,
        buy: [...TDATA.buy],
      });
    }
  };

  const [SC, setSC] = useState(11.7);
  const [ST, setST] = useState();

  useEffect(() => {
    let subtotal = 0;
    buyObj.map((B) => {
      subtotal += parseFloat(B.price);
    });
    setST(subtotal);
  }, [buyObj]);

  return (
    <>
      <div className="__Basket">
        <div className="checkout-wrap">
          <div className="searchBar fixed">
            <form
              action="/"
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
          <div className>
            <div className="checkout-wrap">
              <div className="custm_container custm_containerpadfix">
                <div className="ckoutflt-Left">
                  <h3 className="checkout_title marBot15">
                    <span className="checkouttitleIcon" /> Items you are buying{" "}
                  </h3>
                  <div className="savedeletmsg" />
                  <div className="savedeletmsg" />
                  <div className="no-item-Div" style={{ display: "none" }}>
                    <p className="no-item-txt">
                      <span className="no-item-Icn" />
                      <span>Item(s) not available!</span>
                      <a style={{ cursor: "pointer" }}>
                        <span className="item-remove-Icn" /> Remove All
                      </a>
                      <a
                        style={{ cursor: "pointer" }}
                        className="no-item-heart-icn"
                      >
                        <span className="heart-Icn" /> Save for Later
                      </a>
                    </p>
                    <p className="item-txt">
                      Sorry, some item(s) in your basket are not available.
                      Please remove them or save them for later to proceed.
                    </p>
                  </div>
                  <div className="no-item-Div" style={{ display: "none" }}>
                    <p className="item-txt">Items Removed</p>
                  </div>
                  {/**/}
                  {/**/}
                  <div className="clickAndCollect chktableout">
                    <table width="100%" cellPadding={0} cellSpacing={0}>
                      <tbody>
                        <tr>
                          <th width="34%" align="left">
                            Product Name{" "}
                          </th>
                          <th width="11%" align>
                            Quantity{" "}
                          </th>
                          <th width="14%" align>
                            Unit Price{" "}
                          </th>
                          <th width="10%" align>
                            Subtotal{" "}
                          </th>
                          <th width="14%" align>
                            Delivery Method{" "}
                          </th>
                        </tr>
                        {/**/}
                        <tr>
                          <td colSpan={5} className="forDelivery">
                            For Delivery {/**/}
                            {/**/}
                          </td>
                        </tr>
                        {buyObj.map((data) => {
                          return (
                            <>
                              <tr className>
                                <td>
                                  <a href={`/product?id=${data.id}`} className>
                                    {data.name}
                                  </a>
                                  <p
                                    style={{
                                      fontSize: "12px",
                                      color: "rgb(119, 119, 119)",
                                    }}
                                  >
                                    {data.supCat} {data.subCat}
                                  </p>
                                  <div>
                                    <a
                                      style={{ cursor: "pointer" }}
                                      className="removeCls"
                                      onClick={buyProduct}
                                      productid={data.id}
                                    >
                                      {`${
                                        TDATA.buy.includes(data.id)
                                          ? "Remove"
                                          : ""
                                      }`}
                                    </a>
                                    <a
                                      style={{ cursor: "pointer" }}
                                      className="save-later-txt-chk"
                                      onClick={saveProduct}
                                      productid={data.id}
                                    >
                                      <span className="chkheartIcon" />{" "}
                                      {`${
                                        TDATA.saved.includes(data.id)
                                          ? "Un Save"
                                          : "Save for Later"
                                      }`}
                                    </a>
                                  </div>
                                </td>
                                <td className="txtcenter">
                                  <select>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                  </select>
                                </td>
                                <td className="txtcenter">£ {data.price}</td>
                                <td className="txtcenter">£ {data.price}</td>
                                {/**/}
                                {/**/}
                                <td className="txtcenter" style={{}}>
                                  <label className="delivery-method" style={{}}>
                                    <p>
                                      Delivery<span>FREE</span>
                                    </p>
                                    <input
                                      type="radio"
                                      name="sappixr64gprunlb1"
                                      defaultValue={1}
                                    />
                                    <span className="radiomark" />
                                  </label>
                                </td>
                              </tr>
                            </>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <div className="cex_continueBar">
                    <a href="/" className="whtBtn floatLeft">
                      Back
                    </a>
                    <a
                      style={{ cursor: "pointer" }}
                      className="redBtn padlft62Imp floatRight"
                    >
                      <span className="basketIcons" />
                      PAY NOW
                    </a>
                    <span className="tooltiptext">
                      To make Pay Now button enable please answer the question
                      above.
                    </span>
                    <div className="clear" />
                  </div>
                  <div />
                </div>
                <div className="ckoutflt-Right">
                  <div className="leftTextCls">
                    <label>Subtotal</label>
                    <span>£{ST}</span>
                  </div>
                  <div className="dividersolid" />
                  <div className="leftTextCls">
                    <label>Shipping Cost</label>
                    <span>£{SC}</span>
                  </div>
                  <div className="dividerimg" />
                  <div className="leftTextCls">
                    <label className="redcolorbigFont">GRAND TOTAL</label>
                    <span className="redcolorbigFont">£{SC + ST}</span>
                  </div>
                </div>
              </div>
              {/**/}
              {/**/}
              {/**/}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Basket;
