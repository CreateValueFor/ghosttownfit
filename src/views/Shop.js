import React from 'react'
import styled from 'styled-components'
import Text from '../components/atom/Text'
import Button from '../components/atom/Button'
import { dummy } from '../dummy/product'
import { StyledProduct, StyledRow } from '../components/molecule/Container'

const StyledShop = styled.div`
  padding: 100px 28px;
  .product-class {
    ul {
      margin: 0 auto;
      max-width: 600px;
      justify-content: space-between;
      display: flex;
    }
  }
`

function Shop() {
  return (
    <StyledShop>
      <div className="product-class">
        <ul>
          <li>
            <Text fontSize="25px" text="TOP" />
          </li>
          <li>
            <Text fontSize="25px" text="BOTTOM" />
          </li>
          <li>
            <Text fontSize="25px" text="ACC" />
          </li>
        </ul>
      </div>
      <StyledRow style={{ paddingTop: 0 }}>
        {dummy.map((item) => (
          <StyledProduct
            xs={6}
            lg={4}
            xl={3}
            style={{ marginBottom: 28, position: 'relative' }}
          >
            <div className="product--image" style={{ position: 'relative' }}>
              <img style={{ width: '100%' }} src={item.img} alt="pic" />
              <div
                className="product--buy"
                style={{ position: 'absolute', bottom: 0 }}
              >
                <div style={{ display: 'flex', marginBottom: 10 }}>
                  <Button color="#232323" bgColor="#fff" text="lg" />
                  <Button color="#232323" bgColor="#fff" text="m" />
                </div>
                <Button text="장바구니 담기"></Button>
              </div>
            </div>
            <Text fontWeight={700} text={item.title} />
            <Text text={'₩' + item.price} />
          </StyledProduct>
        ))}
      </StyledRow>
    </StyledShop>
  )
}

export default Shop
