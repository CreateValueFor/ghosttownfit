import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

const FooterCopyright = ({ footerLogo, spaceBottomClass, colorClass }) => {
  return (
    <div
      className={`copyright ${spaceBottomClass ? spaceBottomClass : ""} ${colorClass ? colorClass : ""
        }`}
    >
      {/* <div className="footer-logo">
        <Link to={process.env.PUBLIC_URL + "/"}>
          <img alt="" src={process.env.PUBLIC_URL + footerLogo} />
        </Link>
      </div> */}

      <p class="copyright">
        <span>상호명: 고스트타운</span><br />
        <span>대표자명: 박창진, 이남열</span><br />
        <span>사업자등록번호: 594-02-02002 <a href="https://www.ftc.go.kr/www/bizCommView.do?key=232&amp;apv_perm_no=2021449037530201200&amp;pageUnit=10&amp;searchCnd=wrkr_no&amp;searchKrwd=5940202002&amp;pageIndex=1" target="_blank"> 확인</a></span><br />
        <span>통신판매신고번호: 제 2021-충남천안-1199 호</span><br />
        <span>입금계좌: 국민은행 479401-04-387243 이남열(고스트타운)</span><br />
        Copyright© GhostTown.All Rights Reserved.
      </p>

    </div>
  );
};

FooterCopyright.propTypes = {
  footerLogo: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  colorClass: PropTypes.string
};

export default FooterCopyright;
