import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import LayoutOne from "../../layouts/LayoutOne";
import HeroSliderOne from "../../wrappers/hero-slider/HeroSliderOne";
import FeatureIcon from "../../wrappers/feature-icon/FeatureIcon";
import TabProduct from "../../wrappers/product/TabProduct";
import BlogFeatured from "../../wrappers/blog-featured/BlogFeatured";
import styled from 'styled-components'



const BrandNews = () => {
    return (
        <Fragment>
            <MetaTags>
                <title>고스트타운 | 브랜드 뉴스</title>
                <meta
                    name="description"
                    content="고스트타운 브랜드 뉴스 페이지 입니다."
                />
            </MetaTags>
            <LayoutOne
                headerContainerClass="container-fluid"
                headerPaddingClass="header-padding-1"
            >
                <News />

            </LayoutOne>
        </Fragment>
    );
};

export default BrandNews;

const BrandStory = [
    '14..PNG',
    '13.공식후원선수.PNG',
    "12. 배철형 원본.PNG",
    '11.공식후원선수.PNG',
    '10.임성재 원본.PNG',
    '9.마왕파트쉽.PNG',
    '8. 마왕 메인.PNG',
    '7.덩어리갓대 파트너쉽.PNG',
    '6. 덩어리갓대 메인.PNG',
    '5.공식후원선수.PNG',
    '4.문성훈 공식후원선수.PNG',
    '3. 운동의 즐거움과 (2).PNG',
    '2.목표.PNG',
    '1.PNG',






]
const StyledBrandStory = styled.div`
  
  max-width: 800px;
  margin-right: auto;
  margin-left: auto;
  img{
    margin-bottom: 50px;
    width: 100%;
  }
`;

function News() {
    return (
        <StyledBrandStory className="gt-container">
            {/* <p className="gt-title" text="고스트타운 브랜드스토리" fontSize="24px" fontWeight={700}>


            </p> */}
            <ul style={{ padding: "0px 15px 15px" }}>
                {BrandStory.map((item, idx) => (
                    <img key={idx} src={`https://ghosttown.s3.ap-northeast-2.amazonaws.com/브랜드스토리 (2)/${item}`} alt={`brandstory-${idx}`} />
                ))}
            </ul>
        </StyledBrandStory>
    );
}
