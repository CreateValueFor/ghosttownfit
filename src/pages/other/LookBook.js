import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import LayoutOne from "../../layouts/LayoutOne";
import styled from 'styled-components'



const LookBook = () => {
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
                <StyledLookBook className="gt-container container">
                    <p className="gt-title" text="" fontSize="24px" fontWeight={700}>Season 1</p>
                    <ul>
                        {LOOKBOOK.map((item, idx) => (
                            <img key={idx} src={`https://ghosttown.s3.ap-northeast-2.amazonaws.com/lookbook/${item}`} alt={`lookbook-${idx}`} />
                        ))}
                    </ul>
                </StyledLookBook>

            </LayoutOne>
        </Fragment>
    );
};

const StyledLookBook = styled.div`
  
  /* max-width: 800px; */
  margin-right: auto;
  margin-left: auto;
  img{
    margin-bottom: 50px;
    object-fit: cover;
    width:100%;
  }
`;

const LOOKBOOK = [
    "1.jpg",
    "2.jpeg",
    "3.jpg",
    "4.jpg",
    "5.jpeg",
    "6.jpg",
    "7.jpg",
    "8.jpg",
    "9.jpg",
    "10.jpg",
    "11.jpg",
    "12.jpg",
    "13.jpg",
    "14.jpg",
    "15.jpg",
    "16.jpg",
    "17.jpg",
    "18.jpg",
    "19.jpg",
    "20.jpg",
    "21.jpg",
    "22.jpg",
    "23.jpg",
    "24.jpeg",
    "25.jpg",
    "26.jpeg",
    "27.jpg",
    "28.jpeg",
    "29.jpeg",
    "30.jpeg",
    "31.jpeg",
    "32.jpeg",
    "33.jpeg",
    "34.jpeg",
    "35.jpeg",
    "36.jpeg",
    "37.jpeg",
    "38.jpeg",
    "39.jpg",
    "40.jpg",
    "41.jpg",
    "42.jpg",
    "43.jpg",
    "44.jpg",
    "45.jpg",
    "46.jpg",
    "47.jpg",
    "48.jpg",
    "49.jpg",
    "50.jpg",
]

export default LookBook;
