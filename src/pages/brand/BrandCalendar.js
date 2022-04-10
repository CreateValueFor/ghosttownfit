import React, { Fragment, useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import LayoutOne from "../../layouts/LayoutOne";
import HeroSliderOne from "../../wrappers/hero-slider/HeroSliderOne";
import FeatureIcon from "../../wrappers/feature-icon/FeatureIcon";
import TabProduct from "../../wrappers/product/TabProduct";
import BlogFeatured from "../../wrappers/blog-featured/BlogFeatured";

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import styled from 'styled-components';
import { getCalendar } from "../../api/api";





const HomeFashion = () => {
    return (
        <Fragment>
            <MetaTags>
                <title>Flone | Fashion Home</title>
                <meta
                    name="description"
                    content="Fashion home of flone react minimalist eCommerce template."
                />
            </MetaTags>
            <LayoutOne
                headerContainerClass="container-fluid"
                headerPaddingClass="header-padding-1"
            >
                <CalendarView />
            </LayoutOne>
        </Fragment>
    );
};

export default HomeFashion;


function CalendarView() {

    const [plans, setPlans] = useState([]);

    useEffect(async () => {
        const res = await getCalendar();
        setPlans(res);
    }, [])

    moment.locale('ko-KR')
    const localizer = momentLocalizer(moment)
    return (
        <div className="gt-container">
            <p text="고스트타운 입고 달력" fontSize="24px" fontWeight={700} />
            <StyledCalendar
                localizer={localizer}
                events={plans}
                view="month"
                views={["month"]}
                components={{
                    toolbar: Toolbar,
                }}
                style={{ height: "500px", maxWidth: 800, margin: '50px auto 0px' }}
            />
        </div>
    );
}


function Toolbar(props) {
    const {
        date,
    } = props;

    const navigate = (action) => {
        props.onNavigate(action);
    };

    return (
        <StyledToolBar className="rbc-toolbar" style={{ marginBottom: 30 }}>
            <button
                onClick={navigate.bind(null, 'PREV')}
                text="이전"
                style={{ marginRight: 16 }}
            >
                이전
            </button>
            <p fontWeight={500} >

                {`${date.getFullYear()}년 ${date.getMonth() + 1}월`}
            </p>
            <button
                onClick={navigate.bind(null, 'NEXT')}
                text="다음"
                style={{ marginLeft: 16 }}
            >
                다음
            </button>
        </StyledToolBar>
    );
}

const StyledCalendar = styled(Calendar)`
  .rbc-event{
    background: #232323;
  }
  
`;

const StyledToolBar = styled.div`
  display: flex;
  align-items:center;
  button{
      background: #232323;
      color:#fff;

    margin-right: 16px;
  }
  p{
      font-weight:500;
      font-size:20px;
      margin-bottom:0px;
  }
`;