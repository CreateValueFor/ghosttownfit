import React, { useState } from 'react'
import styled from 'styled-components'
import Text from '../components/atom/Text'
import Button from '../components/atom/Button'
import { dummy } from '../dummy/product'
import { StyledProduct, StyledRow } from '../components/molecule/Container'
import { useNavigate } from 'react-router'

const StyledShop = styled.div`
  /* padding: 100px 28px; */
  .product-class {
    margin-bottom: 50px;
    ul {
      margin: 0 auto;
      max-width: 600px;
      justify-content: space-between;
      display: flex;
    }
  }
`

function Shop() {
  const navigator = useNavigate()
  const [size, setSize] = useState(null);

  const onProductClick = (id) => {
    console.log(navigator(`/product/${id}`))
  }

  const selectSize = (e) => {
    e.stopPropagation();
  }

  return (
    <StyledShop className="gt-container">
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
            onClick={() => onProductClick(item.id)}
            key={item.id}
          >
            <div className="product--image" style={{ position: 'relative' }}>
              <img style={{ width: '100%' }} src={item.img} alt="pic" />
              <div
                className="product--buy-container"
                style={{ position: 'absolute', bottom: 0 }}
              >
                <div className="product--buy">
                  <Text text="바로담기" fontWeight={700} style={{ marginBottom: 15 }} />
                  <div style={{ display: 'flex', marginBottom: 10, }}>
                    {item.size.map((item, idx) => (
                      <Button style={{ margin: 5 }} onClick={(e) => selectSize(e)} text={item} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <Text fontWeight={700} text={item.title} />
            <Text text={'₩' + item.price} />
          </StyledProduct>
        ))}
      </StyledRow>
    </StyledShop >
  )
}

export default Shop
