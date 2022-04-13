import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { multilanguage } from "redux-multilanguage";

const MobileNavMenu = ({ strings }) => {
  return (
    <nav className="offcanvas-navigation" id="offcanvas-navigation">
      <ul>
        <li >
          <Link to={process.env.PUBLIC_URL + "/"}>{strings["home"]}</Link>

        </li>
        <li className="menu-item-has-children">
          <Link to={process.env.PUBLIC_URL + "/brand-news"}>BRAND NEWS</Link>
          <ul className="sub-menu">
            <li>
              <Link to={process.env.PUBLIC_URL + "/brand-news"}>
                브랜드 뉴스
              </Link>
            </li>
            <li>
              <Link to={process.env.PUBLIC_URL + "/brand-calendar"}>
                입고 일정 달력
              </Link>
            </li>
          </ul>
        </li>

        <li >
          <Link to={process.env.PUBLIC_URL + "/shop"}>
            {strings["shop"]}
          </Link>
        </li>
        <li>
          <Link to={process.env.PUBLIC_URL + "/partnership"}>
            PARTNERSHIP
          </Link>
        </li>

        <li >
          <Link to={process.env.PUBLIC_URL + "/lookbook"}>
            LOOK BOOk
          </Link>
        </li>
        <li>
          <Link to={process.env.PUBLIC_URL + "/cscenter"}>
            CSCENTER(Q&A)
          </Link>
        </li>
      </ul>
    </nav>
  );
};

MobileNavMenu.propTypes = {
  strings: PropTypes.object
};

export default multilanguage(MobileNavMenu);
