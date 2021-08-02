import React, { useContext, useState, useEffect } from "react";
import "./../scss/ProductCard.scss";
import Information from "./Information";

function ProductCard(props) {
  const { TDATA, setTDATA } = useContext(Information);

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
    if (props.info) {
      setData(props.info);
    }
  }, [props.info]);

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
      <div className="__ProductCard">
        <div
          id="t049-SAPPIXR64GWUNLB"
          className="t049-rec hotproducts marginTop t049-rec-seen"
        >
          <div className="superCatLink">
            <span className="link">
              <b>{data.subCat}</b>
            </span>
            <span className="link">/ {data.subCat}</span>
            <div className="icnphones" />
          </div>
          <div className="hotProductDetails">
            <div className="prodImg t058-checked">
              <a
                href={`/product?id=${data.id}`}
                className="t049-toPDP t049-rec-SAPPIXR64GWUNLB"
                data-url={`/product?id=${data.id}`}
              >
                <img
                  src={data.image}
                  alt={data.name}
                  title={data.name}
                  border={0}
                />
              </a>
            </div>
            <div className="prodDetails">
              <div className="prodName">
                <div className="savdiv">
                  <a
                    href={`/product?id=${data.id}`}
                    data-url={`/product?id=${data.id}`}
                  >
                    {data.name}
                  </a>
                  <div className="rating-static ratingDiv">
                    <div
                      className="rating-static filed-star"
                      style={{ width: `${(data.rating / 5) * 80 + "px"}` }}
                    />
                  </div>
                </div>
                <div className="t049-heartdiv-SAPPIXR64GWUNLB heartdiv">
                  <div
                    className={`heartIcon heartIcon_hover ${
                      TDATA.saved.includes(data.id) ? "heartIcon_Saved" : ""
                    }`}
                    onClick={saveProduct}
                    productid={data.id}
                  />
                </div>
              </div>
              <div className="prodPrice">
                <div className="prodprisediv">
                  <div className="labelTxt">WeSell for </div>
                  <div className="priceTxt">£{data.price}</div>
                  <div className="clear" />
                </div>
              </div>
            </div>
          </div>
          <div className="btnSection">
            <a
              className="t049-button t049-rec-SAPPIXR64GWUNLB"
              style={{ cursor: "pointer" }}
              onClick={buyProduct}
              productid={data.id}
            >
              <div className="buyNowButton" productid={data.id}>
                <div className="addShine" productid={data.id} />
                <span productid={data.id}>{`${
                  TDATA.buy.includes(data.id)
                    ? "Remove from cart"
                    : "I want to buy this item"
                }`}</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductCard;
