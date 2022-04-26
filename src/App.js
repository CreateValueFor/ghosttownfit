import PropTypes from "prop-types";
import React, { useEffect, Suspense, lazy } from "react";
import ScrollToTop from "./helpers/scroll-top";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
import { multilanguage, loadLanguages } from "redux-multilanguage";
import { connect } from "react-redux";
import { BreadcrumbsProvider } from "react-breadcrumbs-dynamic";
import { BASE_URL, getProducts } from "./api/api";
import { fetchProducts } from "./redux/actions/productActions";
import "./App.css";


// home pages
const HomeFashion = lazy(() => import("./pages/home/HomeFashion"));

// Brand pages
const BrandCalendar = lazy(() => import("./pages/brand/BrandCalendar"));
const BrandNews = lazy(() => import("./pages/brand/BrandNews"));


// shop pages
const ShopGridStandard = lazy(() => import("./pages/shop/ShopGridStandard"));


// product pages
const Product = lazy(() => import("./pages/shop-product/Product"));

// partnership page
const Partnership = lazy(() => import("./pages/partner/Partner"))

// lookbook page
const LookBook = lazy(() => import("./pages/other/LookBook"))

// cscenter page
const CSCenter = lazy(() => import("./pages/other/CSCenter"))

// other pages
const About = lazy(() => import("./pages/other/About"));
const Contact = lazy(() => import("./pages/other/Contact"));
const MyAccount = lazy(() => import("./pages/other/MyAccount"));
const LoginRegister = lazy(() => import("./pages/other/LoginRegister"));

const Cart = lazy(() => import("./pages/other/Cart"));
const Wishlist = lazy(() => import("./pages/other/Wishlist"));
const Compare = lazy(() => import("./pages/other/Compare"));
const Checkout = lazy(() => import("./pages/other/Checkout"));

const NotFound = lazy(() => import("./pages/other/NotFound"));

const App = (props) => {
  useEffect(async () => {

    const res = await getProducts();
    console.log(res)
    if (!res.length) {
      return;
    }


    const filtedRes = res.map(item => {
      return {
        name: item.Product.title,
        price: item.Product.price,
        category: [item.Product.SubCategory.name, 'fashion'],
        thumb: `${BASE_URL}public/products/${item.id}/thumb/${item.thumb}`,
        sizes: item.ProductColorSizes.map(item => item.size),
        discount: item.salePercent,
        fullDescription: item.detail,
        id: item.id,
        image: [`${BASE_URL}public/products/${item.id}/thumb/${item.thumb}`, ...item.ProductDisplays.map(dp => `${BASE_URL}public/products/${item.id}/displaies/${dp.image}`)],
        descriptionImg: !item.ProductImages ? [] : item.ProductImages.map(img => `${BASE_URL}public/products/${item.id}/images/${img.image}`),
        new: item.new,
        rating: 4,
        saleCount: item.saleCount,
        shortDescription: item.Product.detail,
        sku: '12341234',
        tag: ['dd'],
        variation: [{
          color: item.name, image: "dd", size:
            item.ProductColorSizes.map(size => ({ name: size.size, stock: size.count }))
        }],
        sizes: item.ProductColorSizes.map(size => ({ name: size.size, id: size.id }))
      }
    })

    await props.dispatch(
      fetchProducts(filtedRes)
    )

    props.dispatch(
      loadLanguages({
        languages: {
          en: require("./translations/english.json"),
          fn: require("./translations/french.json"),
          de: require("./translations/germany.json")
        }
      })
    );
  }, []);

  return (
    <ToastProvider placement="bottom-left">
      <BreadcrumbsProvider>
        <Router>
          <ScrollToTop>
            <Suspense
              fallback={
                <div className="flone-preloader-wrapper">
                  <div className="flone-preloader">
                    <span></span>
                    <span></span>
                  </div>
                </div>
              }
            >
              <Switch>
                <Route
                  exact
                  path={process.env.PUBLIC_URL + "/"}
                  component={HomeFashion}
                />

                {/* Homepages */}
                <Route
                  path={process.env.PUBLIC_URL + "/home-fashion"}
                  component={HomeFashion}
                />

                {/* Brand News */}

                <Route
                  path={process.env.PUBLIC_URL + "/brand-news"}
                  component={BrandNews}
                />

                <Route
                  path={process.env.PUBLIC_URL + "/brand-calendar"}
                  component={BrandCalendar}
                />


                {/* Shop pages */}
                <Route
                  path={process.env.PUBLIC_URL + "/shop"}
                  component={ShopGridStandard}
                />

                {/* Shop product pages */}
                <Route
                  path={process.env.PUBLIC_URL + "/product/:id"}
                  render={(routeProps) => (
                    <Product {...routeProps} key={routeProps.match.params.id} />
                  )}
                />

                {/* Partnership */}
                <Route
                  path={process.env.PUBLIC_URL + "/partnership"}
                  component={Partnership}
                />

                {/* LookBook */}
                <Route
                  path={process.env.PUBLIC_URL + "/lookbook"}
                  component={LookBook}
                />

                {/* CSCenter */}
                <Route
                  path={process.env.PUBLIC_URL + "/cscenter"}
                  component={CSCenter}
                />

                {/* Other pages */}
                <Route
                  path={process.env.PUBLIC_URL + "/about"}
                  component={About}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/contact"}
                  component={Contact}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/my-account"}
                  component={MyAccount}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/login-register"}
                  component={LoginRegister}
                />

                <Route
                  path={process.env.PUBLIC_URL + "/cart"}
                  component={Cart}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/wishlist"}
                  component={Wishlist}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/compare"}
                  component={Compare}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/checkout"}
                  component={Checkout}
                />

                <Route
                  path={process.env.PUBLIC_URL + "/not-found"}
                  component={NotFound}
                />

                <Route exact component={NotFound} />
              </Switch>
            </Suspense>
          </ScrollToTop>
        </Router>

      </BreadcrumbsProvider>
    </ToastProvider>
  );
};

App.propTypes = {
  dispatch: PropTypes.func
};

export default connect()(multilanguage(App));
