import React, { useEffect, useState } from "react";
import ProductCard from "./../components/ProductCard";
import "./../scss/Home.scss";
import { useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Home(props) {
  const [gaming, setGaming] = useState([]);
  const [phone, setPhone] = useState([]);
  const [electronic, setElectronic] = useState([]);
  const [AP, setAP] = useState([]);
  const [loadRows, setLoadRows] = useState(10);
  const [cat, setCat] = useState("all");
  const [subcat, setSubcat] = useState("");
  const [search, setSearch] = useState("");
  let query = useQuery();
  useEffect(() => {
    if (query.get("cat") === "phone") {
      setCat(query.get("cat"));
    } else if (query.get("cat") === "gaming") {
      setCat(query.get("cat"));
    } else if (query.get("cat") === "electronic") {
      setCat(query.get("cat"));
    }
    if (query.get("s")) {
      setSearch(query.get("s"));
    }
    if (query.get("subcat")) {
      setSubcat(query.get("subcat"));
    }

    fetch("js/electronic.json")
      .then(function (r) {
        return r.json();
      })
      .then(function (data) {
        setElectronic(data);
      });

    fetch("js/gaming.json")
      .then(function (r) {
        return r.json();
      })
      .then(function (data) {
        setGaming(data);
      });

    fetch("js/phone.json")
      .then(function (r) {
        return r.json();
      })
      .then(function (data) {
        setPhone(data);
      });
  }, []);

  const [F, setF] = useState([]);
  useEffect(() => {
    setAP([...phone, ...gaming, ...electronic]);
    setF(
      [...phone, ...gaming, ...electronic].filter((P) => {
        return (
          P.name.toLowerCase().includes(search.toLowerCase()) ||
          P.supCat.toLowerCase().includes(search.toLowerCase()) ||
          P.subCat.toLowerCase().includes(search.toLowerCase()) ||
          P.image.toLowerCase().includes(search.toLowerCase())
        );
      })
    );
  }, [phone, electronic, gaming]);

  return (
    <div className="__Home">
      {search !== ""
        ? F.slice(0, loadRows).map((info, i) => {
            return <ProductCard key={i} info={info} />;
          })
        : subcat !== ""
        ? [...phone, ...gaming, ...electronic]
            .filter((P) => {
              return P.subCat
                .replace(/\s/g, "")
                .toLowerCase()
                .includes(subcat.toLowerCase());
            })
            .slice(0, loadRows)
            .map((info, i) => {
              return <ProductCard key={i} info={info} />;
            })
        : gaming.slice(0, loadRows).map((info, i) => {
            return cat === "all" ? (
              <>
                <ProductCard key={"phone[" + i + "]"} info={phone[i]} />
                <ProductCard key={"gaming[" + i + "]"} info={gaming[i]} />
                <ProductCard
                  key={"electronic[" + i + "]"}
                  info={electronic[i]}
                />
              </>
            ) : cat === "phone" ? (
              <ProductCard key={"phone[" + i + "]"} info={phone[i]} />
            ) : cat === "electronic" ? (
              <ProductCard key={"electronic[" + i + "]"} info={electronic[i]} />
            ) : cat === "gaming" ? (
              <ProductCard key={"gaming[" + i + "]"} info={gaming[i]} />
            ) : (
              ""
            );
          })}
      <div id="showmore">
        <a
          onClick={() => {
            setLoadRows(loadRows + 10);
          }}
          id="showmoreresult"
        >
          Show more products
        </a>
      </div>
    </div>
  );
}

export default Home;
