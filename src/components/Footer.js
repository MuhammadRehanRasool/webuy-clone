import React from "react";
import "./../scss/Footer.scss";

function Footer(props) {
  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  return (
    <>
      <div className="__Footer">
        <footer className="uk-footer">
          <div className="footerArea clsRepairFooter">
            <div className="footerLinks">
              <ul>
                <li>
                  <a
                    className="router-link-exact-active nuxt-link-active home"
                    href="/"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a className="gaming" href="?cat=gaming">
                    Gaming
                  </a>
                </li>
                <li>
                  <a className="phones" href="?cat=phone">
                    Phones
                  </a>
                </li>
                <li>
                  <a className="electronics" href="?cat=electronic">
                    Electronics
                  </a>
                </li>
              </ul>
            </div>
            <ul className="policyLinks">
              <li>
                <a href="term" className>
                  Terms &amp; Conditions
                </a>
              </li>
              <li>
                <a href="privacy" className>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="cookies" className>
                  Cookies Policy
                </a>
              </li>
              {/**/}
            </ul>
            <div style={{}} id="payformcontainer">
              <a href="#">
                <ul>
                  <li className="paypal" style={{}} id="paypal" />
                  <li className="mastercard" style={{}} id="mastercard" />
                  <li className="visa" style={{}} id="visa" />
                  <li className="americanExpress" style={{}} />
                  <li
                    className="ideal"
                    style={{ display: "none" }}
                    id="ideal"
                  />
                  <li
                    className="discover_us"
                    style={{ display: "none" }}
                    id="ideal"
                  />
                  <li
                    className="jcb_us"
                    style={{ display: "none" }}
                    id="ideal"
                  />
                  <li className="dotpay" style={{ display: "none" }} />
                  <li
                    className="przelewy"
                    style={{ display: "none" }}
                    id="przelewy"
                  />
                  <li className="apple-pay-li" style={{ display: "none" }}>
                    <img src="/images/logos/apple-pay.svg" />
                  </li>
                </ul>
              </a>
            </div>
            <div className="footerMobileLink" align="center">
              <a style={{ cursor: "pointer" }} id="mobileLnk">
                Switch to Mobile View
              </a>
            </div>
            <div className="copyrightText">
              <span>
                © 2021 AW Communications Powered by{" "}
                <b>
                  <a href="https://clicktaketech.com">ClickTake Technologies</a>
                </b>
              </span>
              <div> </div>
            </div>
            <div className="clear">&nbsp;</div>
          </div>
          <a
            className="back-to-top"
            onClick={topFunction}
            id="backToTop"
            style={{ display: "block" }}
          >
            &nbsp;
          </a>
        </footer>
      </div>
    </>
  );
}

export default Footer;
