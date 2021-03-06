import { Col, Row } from "react-bootstrap"
import styled from "styled-components"


export const StyledRow = styled(Row)`
  /* padding: 100px 50px; */
  text-align: start;
`

export const StyledProduct = styled(Col)`
  padding-left: 14px;
  padding-right: 14px;
  text-align:center;
  cursor : pointer;
  .product--image {
    .product--buy-container {
      opacity: 0;
      overflow: hidden;
      transition: 0.2s all;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      padding: 15px;
      background: rgba(0, 0, 0, 0.1);
      padding: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;
      .product--buy{
        width: 100%;
        /* height : 150px; */
        border-radius: 9px;
        background: #fff;
        padding: 15px;
      }
    }
    &:hover {
      .product--buy-container {
        opacity: 1;
      }
    }
  }
`