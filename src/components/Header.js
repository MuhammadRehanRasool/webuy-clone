import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel";
import "./../scss/Header.scss";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";

function Header(props) {
  const [gaming, setGaming] = useState([]);
  const [phone, setPhone] = useState([]);
  const [electronic, setElectronic] = useState([]);
  useEffect(() => {
    fetch("js/electronic.json")
      .then(function (r) {
        return r.json();
      })
      .then(function (data) {
        setElectronic(distinctItem(data));
      });

    fetch("js/gaming.json")
      .then(function (r) {
        return r.json();
      })
      .then(function (data) {
        setGaming(distinctItem(data));
      });

    fetch("js/phone.json")
      .then(function (r) {
        return r.json();
      })
      .then(function (data) {
        setPhone(distinctItem(data));
      });
  }, []);

  const distinctItem = (data) => {
    let __temp = [];
    data.map((item) => {
      if (!__temp.includes(item.subCat)) {
        __temp.push(item.subCat);
      }
    });
    return __temp;
  };

  return (
    <>
      <div className="__Header">
        <header className="uk">
          <div className="header-section positionLeft">
            <div className="headerArea positionLeft">
              <div className="header-bg-container">
                <div className="header-bg-1" />
                <div className="header-bg-2" />
                <div className="header-bg-3" />
              </div>
              <div className="navBar">
                <div className="topLinksArea" id="topLinksArea">
                  <ul className="clsRepair">
                    <li>
                      <a href="#" className="helpTopLink">
                        Support
                      </a>
                    </li>
                    <li>
                      <a className="franchisingTopLink" href="#">
                        Franchising
                      </a>
                    </li>
                    <li>
                      <a href="#" className="repairs">
                        Repairs
                      </a>
                    </li>
                    <li>
                      <a className="stores" href="#">
                        Stores
                      </a>
                    </li>
                    <li>
                      <a className="careers" href="#" target="_blank">
                        Careers
                      </a>
                    </li>
                    <li>
                      <a className="about" href="#">
                        About
                      </a>
                    </li>
                    <li>
                      <a className="myaccount" href="#" id="myaccount_manage">
                        My Account
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="catbar" id="topMenuContainer">
                  <a
                    className="cex-logo-link router-link-exact-active nuxt-link-active"
                    href="/"
                  >
                    <img className="cexLogo" src="/img/logo2.png" />
                  </a>
                  <ul>
                    <li>
                      <a href="/?cat=gaming" className="tabbox" id="tab-cat1" />
                    </li>
                    <li>
                      <a href="/?cat=phone" className="tabbox" id="tab-cat4" />
                    </li>
                    <li>
                      <a
                        href="/?cat=electronic"
                        className="tabbox"
                        id="tab-cat5"
                      />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <Navbar
              className="__navbar"
              bg="light"
              expand="lg"
              sticky="top"
              style={{ display: "none" }}
            >
              <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                    <NavDropdown title="GAMING" id="basic-nav-dropdown">
                      {gaming.map((item) => {
                        return (
                          <NavDropdown.Item
                            href={`/?subcat=${item.replace(/\s/g, "")}`}
                          >
                            {item}
                          </NavDropdown.Item>
                        );
                      })}
                    </NavDropdown>
                    <NavDropdown title="PHONE" id="basic-nav-dropdown">
                      {phone.map((item) => {
                        return (
                          <NavDropdown.Item
                            href={`/?subcat=${item.replace(/\s/g, "")}`}
                          >
                            {item}
                          </NavDropdown.Item>
                        );
                      })}
                    </NavDropdown>
                    <NavDropdown title="ELECTRONIC" id="basic-nav-dropdown">
                      {electronic.map((item) => {
                        return (
                          <NavDropdown.Item
                            href={`/?subcat=${item.replace(/\s/g, "")}`}
                          >
                            {item}
                          </NavDropdown.Item>
                        );
                      })}
                    </NavDropdown>
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
            <div style={{}} id="headerBanner">
              <Carousel prevLabel="" nextLabel="">
                <Carousel.Item>
                  <img className="d-block w-100" src="img/s1.jpeg" />
                </Carousel.Item>
                <Carousel.Item>
                  <img className="d-block w-100" src="img/s2.webp" />
                </Carousel.Item>
                <Carousel.Item>
                  <img className="d-block w-100" src="img/s3.jpeg" />
                </Carousel.Item>
                <Carousel.Item>
                  <img className="d-block w-100" src="img/s4.jpeg" />
                </Carousel.Item>
                <Carousel.Item>
                  <img className="d-block w-100" src="img/s5.jpeg" />
                </Carousel.Item>
                <Carousel.Item>
                  <img className="d-block w-100" src="img/s6.jpeg" />
                </Carousel.Item>
                <Carousel.Item>
                  <img className="d-block w-100" src="img/s7.jpeg" />
                </Carousel.Item>
              </Carousel>
            </div>
            <div />
            <div />
          </div>
        </header>
      </div>
    </>
  );
}

export default Header;
