import React from "react";

const MobileWidgets = () => {
  return (
    <div className="offcanvas-widget-area">
      <div className="off-canvas-contact-widget">
        <div className="header-contact-info">
          <ul className="header-contact-info__list">
            <li>
              <i className="fa fa-phone"></i>{" "}
              <a href="tel://070-5100-0799">070-5100-0799 </a>
            </li>
            <li>
              <i className="fa fa-envelope"></i>{" "}
              <a href="mailto:ghosttownfit@naver.com">ghosttownfit@naver.com</a>
            </li>
          </ul>
        </div>
      </div>
      {/*Off Canvas Widget Social Start*/}

      {/*Off Canvas Widget Social End*/}
    </div>
  );
};

export default MobileWidgets;
