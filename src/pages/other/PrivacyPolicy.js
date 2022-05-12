import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import PrivacyAgreement from "../../components/agreeement/PrivacyAgreement";

const NotFound = ({ location }) => {
    const { pathname } = location;

    return (
        <Fragment>
            <MetaTags>
                <title>GHOSTTOWN | PrivacyPolicy</title>
                <meta
                    name="description"
                    content="고스트타운 개인정보처리방침"
                />
            </MetaTags>
            <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
            <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
                개인정보 처리방침
            </BreadcrumbsItem>
            <LayoutOne >
                {/* breadcrumb */}
                <Breadcrumb />
                <div className="error-area pt-40 pb-100">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-xl-7 col-lg-8 ">
                                <div class="error">
                                    <h1 style={{ fontSize: '2rem', letterSpacing: "0" }}>고스트타운 개인정보처리방침</h1>

                                    <PrivacyAgreement />
                                </div>
                                {/* <div className="error">
                                    <p>
                                        Sorry but the page you are looking for does not exist, have
                                        been removed, name changed or is temporarity unavailable.
                                    </p>
                                    <form className="searchform mb-50">
                                        <input
                                            type="text"
                                            name="search"
                                            id="error_search"
                                            placeholder="Search..."
                                            className="searchform__input"
                                        />
                                        <button type="submit" className="searchform__submit">
                                            <i className="fa fa-search" />
                                        </button>
                                    </form>
                                    <Link to={process.env.PUBLIC_URL + "/"} className="error-btn">
                                        Back to home page
                                    </Link>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutOne>
        </Fragment>
    );
};

NotFound.propTypes = {
    location: PropTypes.object
};

export default NotFound;
