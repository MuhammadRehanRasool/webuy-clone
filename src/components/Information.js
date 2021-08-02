import React from "react";

const Information = React.createContext({
  TDATA: {
    buy: [],
    saved: [],
    blog: [],
    seller: [],
    products: [],
  },
  setTDATA: () => {},
});

export default Information;
