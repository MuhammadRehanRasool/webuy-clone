import React, { useState, useEffect, useContext } from "react";
import "./../scss/Product.scss";
import Information from "./../components/Information";
import { useLocation, useHistory } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Product(props) {
  let history = useHistory();
  const { TDATA, setTDATA } = React.useContext(Information);
  let query = useQuery();
  const [data, setData] = useState({
    id: "",
    name: "",
    subCat: "",
    supCat: "",
    image: "",
    price: "",
    rating: "",
    quantity: "",
  });
  useEffect(() => {
    if (query.get("id")) {
      let H = TDATA.products.find((P, index) => {
        if (P.id === query.get("id")) {
          return P;
        }
      });
      if (H) {
        setData(H);
      }
    } else {
      history.push("/");
    }
  }, [TDATA.products]);

  useEffect(() => {}, []);

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
    if (!TDATA.buy.includes(e.target.getAttribute("productid"))) {
      localStorage.setItem("buy", [
        ...TDATA.buy,
        e.target.getAttribute("productid"),
      ]);
      setTDATA({
        ...TDATA,
        buy: [...TDATA.buy, e.target.getAttribute("productid")],
      });
    } else {
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

  return (
    <>
      <div className="__Product">
        <div className="productArea marginTop customproductArea overflow-show">
          <div style={{}}>
            <div className="superCatLink">
              <b>{data.supCat}</b>/<i>{data.subCat}</i>
              <div className="addTop icnphones" />
            </div>
            <div className="productInfoImageArea overflow-show">
              <div className="productImg">
                <div
                  className="t058-badge-container t058-sappix64ggrunlb t058-pdp"
                  style={{ margin: "0 auto", width: "0px" }}
                >
                  <div className="t058-badge-container-inner">
                    <img
                      className="t058-badge-img t058-trending-sappix64ggrunlb t058-badge-size-pdp"
                      src="https://dd6zx4ibq538k.cloudfront.net/static/images/3188/297be6754968d5df3f22a8b8258bdb18_845_711.png"
                      style={{ filter: "hue-rotate(210deg)" }}
                    />
                  </div>
                </div>
                <img
                  src={data.image}
                  alt="Product photo"
                  className="center t058-product-img"
                />
              </div>
              <div className="productDetails">
                {/**/}
                <div>
                  <table
                    width="100%"
                    cellSpacing={0}
                    cellPadding={0}
                    border={0}
                  >
                    <tbody>
                      <tr>
                        <td colSpan={2} className="productName">
                          <div className="productNamecustm">
                            <text className="head">{data.name}</text>
                            <div className="heartdiv svlpro-det">
                              <div
                                className={`heartIcon heartIcon_hover ${
                                  TDATA.saved.includes(data.id)
                                    ? "heartIcon_Saved"
                                    : ""
                                }`}
                                onClick={saveProduct}
                                productid={data.id}
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr id="itemDetailsDiv" style={{ display: "block" }}>
                        <td
                          colSpan={2}
                          align="left"
                          style={{
                            display: "table",
                            width: "100%",
                            padding: "0px",
                          }}
                        >
                          <table
                            width="100%"
                            cellSpacing={0}
                            cellPadding={0}
                            border={0}
                          >
                            <tbody>
                              <tr valign="top">
                                <td
                                  id="sellTitle"
                                  className="productInfoCat priceInfo bold right"
                                >
                                  WeSell for
                                </td>
                                <td
                                  id="Asellprice"
                                  className="productInfo priceInfo sellPrice"
                                >
                                  £{data.price}
                                </td>
                              </tr>
                              <tr
                                valign="top"
                                className="greenBtmBordr top"
                                style={{ borderBottom: "0px" }}
                              >
                                <td
                                  className="productInfoCat bold right bottomclsbordcs"
                                  style={{ borderBottom: "0px" }}
                                >
                                  In stock online
                                </td>
                                <td
                                  id="Astockonline"
                                  className="productInfo bottomclsbordcs"
                                  style={{ borderBottom: "0px" }}
                                >
                                  <span />
                                </td>
                                <td>
                                  <div className="rating-static ratingDiv">
                                    <div
                                      className="rating-static filed-star"
                                      style={{
                                        width: `${
                                          (data.rating / 5) * 80 + "px"
                                        }`,
                                      }}
                                    />
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      <tr
                        id="noItemDetailsMsg"
                        valign="top"
                        align="center"
                        className="top"
                        style={{ display: "none" }}
                      >
                        <td colSpan={2} className="productInfoCat">
                          We currently don't have this item listed
                        </td>
                      </tr>
                      <tr
                        valign="top"
                        className="top"
                        style={{ display: "none" }}
                      >
                        <td
                          colSpan={2}
                          align="left"
                          style={{
                            borderTop: "1px dotted rgb(204, 204, 204)",
                            borderBottom: "0px",
                            display: "table",
                            width: "100%",
                          }}
                        >
                          <table
                            width="100%"
                            className="PhonePriceArea PhonePriceAreaNew"
                          >
                            <tbody>
                              <tr>
                                <td className="left" style={{ width: "20%" }}>
                                  Network:
                                </td>
                                <td className="bold left">
                                  <select
                                    id="networkDropdown"
                                    name="networkDropdown"
                                  >
                                    <option value="-" selected="selected">
                                      -
                                    </option>
                                    <option value={1}>Unlocked</option>
                                    <option value={3}>Vodafone</option>
                                    <option value={5}>O2</option>
                                    <option value={6}>3</option>
                                    <option value={7}>Tesco</option>
                                    <option value={8}>Virgin</option>
                                    <option value={9}>EE</option>
                                  </select>
                                </td>
                              </tr>
                              <tr>
                                <td className="left" style={{ width: "35%" }}>
                                  Condition:{" "}
                                  <a href="#" className>
                                    <img
                                      src="https://uk.webuy.com/_nuxt/e038dfccac7a493e4c8a80f8d0efce91.png"
                                      className="product-guide-hint"
                                    />
                                  </a>
                                </td>
                                <td
                                  id="displayGradeDropdown"
                                  className="bold left"
                                >
                                  <select id="condition" name="gradeDropDown">
                                    <option value="-" selected="selected">
                                      -
                                    </option>
                                    <option value={1}>Mint</option>
                                    <option value={2}>Good</option>
                                    <option value={3}>Poor</option>
                                  </select>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div style={{ borderTop: "1px dotted rgb(204, 204, 204)" }} />
                  <div
                    id="prodcutCheckButtons"
                    className="btnSection customButtonsCs btnParentOverlay"
                    style={{ borderBottom: "0px", display: "block" }}
                  >
                    <div>
                      <a
                        style={{ cursor: "pointer" }}
                        title="Add to Basket!"
                        productid={data.id}
                        onClick={buyProduct}
                      >
                        <div
                          id="buyNowButton"
                          className="buyNowButton"
                          style={{ width: "100%" }}
                          productid={data.id}
                        >
                          <span
                            style={{
                              lineHeight: "17px !important",
                              margin: "1px 1px 3px",
                            }}
                            productid={data.id}
                          >
                            {`${
                              TDATA.buy.includes(data.id)
                                ? "Remove from cart"
                                : "I want to buy this item"
                            }`}
                          </span>
                        </div>
                      </a>
                    </div>
                    <div className="btnSection" style={{ display: "none" }}>
                      <div
                        id="outOfStockBtn"
                        className="buyNowButton"
                        style={{ height: "auto" }}
                      >
                        <span>Out of stock online</span>
                      </div>
                      <div className="clear" />
                    </div>
                    <div className="click-reserve-div">{/**/}</div>
                    <div className="overlaybutton" style={{ display: "none" }}>
                      <div />
                    </div>
                    <div className="clear" />
                  </div>
                  {/**/}
                  <div id="stockContainer" style={{ display: "block" }}>
                    <div
                      id="stockBox"
                      className="stockBox stockBoxClsse"
                      style={{ borderTop: "0px none" }}
                    >
                      <div id="displayDialog" />
                      <div className="collection-content">
                        <p className="enabled">
                          <img src="https://uk.webuy.com/_nuxt/0511e13d9feef528a7d68e2b2f796b28.png" />
                          Collection Available
                        </p>
                        <p className="enabled">
                          <img src="https://uk.webuy.com/_nuxt/c17545f77628ed8bff694167cbc19f24.png" />
                          Delivery Available
                        </p>
                      </div>
                      <div className="doteddivider" />
                    </div>
                    <div
                      id="storeStockContainer"
                      className="customfeaturbox"
                      style={{ display: "none" }}
                    >
                      {/**/}
                      <div className="custompopheader collection-div">
                        <table width="100%" cellSpacing={0} cellPadding={0}>
                          <tbody>
                            <tr>
                              <th>Stores</th>
                              <th>In Stock</th>
                              <th>
                                Click &amp; Collect{" "}
                                <div className="tooltip-container">
                                  <i className="material-icons">info</i>
                                  <span className="tooltiptext">
                                    Add the item to your basket. View your
                                    basket to choose between Click &amp; Collect
                                    or Delivery.
                                  </span>
                                </div>
                              </th>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="custompopbx collection-div">
                        <table
                          id="stockListTable"
                          name="stockListTable"
                          cellSpacing={0}
                          cellPadding={0}
                          border={0}
                          className="stockListTable"
                        >
                          {/**/}
                          <tbody>
                            <tr style={{ display: "none" }}>
                              <td
                                style={{
                                  border: "1px solid red",
                                  color: "red",
                                  textAlign: "center",
                                }}
                              >
                                Out of stock in store
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="productDescriptionArea productDescriptionAreacustom">
              <div />
              <h2>{data.name}</h2>
              <div className="prod-det-wrap" style={{ display: "none" }}>
                <p className="head">Product Details</p>
                <ul className="prod-details-div">
                  <li>
                    <span> Manufacturer:</span>Apple
                  </li>
                  <li>
                    <span> Model:</span>iPhone X
                  </li>
                  <li>
                    <span> Network:</span>Unlocked
                  </li>
                  <li>
                    <span> Grade:</span>B
                  </li>
                  <li>
                    <span> Capacity:</span>64GB
                  </li>
                  <li>
                    <span> Colour:</span>Space Grey
                  </li>
                  <li>
                    <span> Main Colour:</span>Grey
                  </li>
                  <li>
                    <span> Operating System:</span>iOS
                  </li>
                  <li>
                    <span> Physical SIM Slots:</span>1
                  </li>
                </ul>
              </div>
              <div />
              <div className="productGuide" />
              <div />
              <div className="clear" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;
