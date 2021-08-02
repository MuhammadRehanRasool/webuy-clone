import "./../scss/App.scss";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Layout from "../components/Layout";
import Home from "./Home";
import Product from "./Product";
import Basket from "./Basket";
import TermsAndConditions from "./TermsAndConditions";
import PrivacyPolicy from "./PrivacyPolicy";
import CookiesPolicy from "./CookiesPolicy";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Router>
        <Switch>
          <Route path="/product">
            <Layout>
              <Product />
            </Layout>
          </Route>
          <Route path="/term">
            <Layout>
              <TermsAndConditions />
            </Layout>
          </Route>
          <Route path="/privacy">
            <Layout>
              <PrivacyPolicy />
            </Layout>
          </Route>
          <Route path="/cookies">
            <Layout>
              <CookiesPolicy />
            </Layout>
          </Route>
          <Route exact path="/basket">
            <Basket />
          </Route>
          <Route path="/">
            <Layout>
              <Home />
            </Layout>
          </Route>
        </Switch>
      </Router>
      <Footer />
    </>
  );
}

export default App;
