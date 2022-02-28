import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import productImg from '../assets/images/product1.jpeg'
import sizeGuide from '../assets/images/sizeGuide.png'
import guideArrow from '../assets/images/guideArrow.png'
import Button from '../components/atom/Button'
import Text from '../components/atom/Text'
import { dummyDetail } from '../dummy/product'

const StyledProduct = styled.div`
  display: flex;
  .product-img {
    width: 50%;
    /* height: 100vh; */
    object-fit: cover;
  }
  .product-detail {
    width: 50%;
    padding: 100px 50px;
    text-align: start;
  }

  .product-alter {
    ul {
      padding: 0;

      .product-alter-item {
        display: inline-block;
        width: 100px;
        margin-right: 15px;
      }
    }
  }
  .product-size {
    button {
      border-right: none !important;
      width: 75px;
      height: 50px;
    }
    button:last-child {
      border-right: 1px solid #ddd !important;
    }
  }
  .size-guide {
    display: flex;
    align-items: center;
    .guide {
      /* width: 2px; */
      height: 9px;
      margin-right: 5px;
    }
    .guideArrow {
      height: 12px;
      margin-left: 8px;
    }
  }
`

function Product() {
  const { productId } = useParams()
  const [detail, setDetail] = useState({
    title: '',
    detail: '',
    price: 0,
    others: [],
    size: [],
  })

  useEffect(() => {
    console.log(dummyDetail)
    setDetail(dummyDetail)
  }, [])
  return (
    <StyledProduct>
      <img className="product-img" src={productImg} alt="product" />
      <div className="product-detail">
        <Text fontSize="32px" fontWeight={700} text={detail.title} />
        <Text
          fontSize="17px"
          fontWeight={700}
          color="#555"
          text={detail.price}
        />
        <Text
          fontSize="12px"
          color="#555"
          text={detail.detail}
          style={{ whiteSpace: 'pre-wrap', lineHeight: '10px' }}
        />

        <div className="product-alter">
          <Text
            fontWeight={700}
            color="#555"
            text="다른 색상"
            style={{ marginTop: 30 }}
          />
          <ul>
            {detail.others.map((item) => (
              <Link
                to={`/product/${item.productId}`}
                className="product-alter-item"
              >
                <img src={item.img} alt="product-img" />
              </Link>
            ))}
          </ul>
        </div>
        <div className="product-size">
          {detail.size.map((item, idx) => (
            <Button
              key={idx}
              bgColor="#fff"
              color="#21252f"
              style={{ border: '1px solid #ddd' }}
              text={item.size}
              disabled={!item.available}
            />
          ))}
        </div>
        <div className="size-guide">
          <img className="guide" src={sizeGuide} alt="guide" />
          <Text text="사이즈 가이드" fontWeight={700} />
          <img className="guideArrow" src={guideArrow} alt="guideArrow" />
        </div>
      </div>
    </StyledProduct>
  )
}

export default Product
