import PropTypes from 'prop-types'
import React, { useRef, useState } from 'react'
import Tab from 'react-bootstrap/Tab'
import Nav from 'react-bootstrap/Nav'
import SectionTitle from '../../components/section-title/SectionTitle'
import ProductGrid from './ProductGrid'
import { Link } from 'react-router-dom'

const TabProduct = ({
  spaceTopClass,
  spaceBottomClass,
  bgColorClass,
  category,
}) => {
  const [theme, setTheme] = useState('')

  const newRef = useRef()
  const bestRef = useRef()
  const saleRef = useRef()

  const onClick = (theme) => {
    switch (theme) {
      case 'new':
        newRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
        break
      case 'best':
        bestRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
        break
      case 'sale':
        saleRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
        break
    }
    console.log(theme)
  }

  return (
    <div
      className={`product-area ${spaceTopClass ? spaceTopClass : ''} ${spaceBottomClass ? spaceBottomClass : ''
        } ${bgColorClass ? bgColorClass : ''}`}
    >
      <div className="container mt-5">
        {/* <SectionTitle titleText="메인 상품" positionClass="text-center" /> */}
        <ul className="my-5  d-flex justify-content-between product-tab-list">
          <li onClick={() => onClick('new')}>NEW RELEASES</li>
          <li onClick={() => onClick('best')}>BESTSELLER</li>
          <li onClick={() => onClick('sale')}>OUTLET - UP TO <span style={{ color: '#ff0000' }}>50% OFF</span></li>
        </ul>
        <div className="tab-product-wrap">
          <h2 className="product-tab-item--title mb-5 mt-5" ref={newRef}>
            <div /> NEW RELEASES <div />
          </h2>
          <div className="product-tab-item--view-all">
            <Link to="/shop/new">View All</Link>
          </div>
          <div className="row">
            <ProductGrid
              category={category}
              type="new"
              limit={4}
              spaceBottomClass="mb-25"
            />
          </div>
          <img
            src={`https://ghosttown.s3.ap-northeast-2.amazonaws.com/브랜드스토리 (2)/1.PNG`}
            alt={`home-1`}
            style={{ width: '100%' }}
          />
          <h2 className="product-tab-item--title mb-5 mt-5" ref={bestRef}>
            <div /> BEST SELLER <div />
          </h2>
          <div className="product-tab-item--view-all">
            <Link to="/shop/best">View All</Link>
          </div>
          <div className="row">
            <ProductGrid
              category={category}
              type="bestSeller"
              limit={4}
              spaceBottomClass="mb-25"
            />
          </div>
          <img
            src={`https://ghosttown.s3.ap-northeast-2.amazonaws.com/브랜드스토리 (2)/1.PNG`}
            alt={`home-1`}
            style={{ width: '100%' }}
          />
          <h2 className="product-tab-item--title mb-5 mt-5" ref={saleRef}>
            <div /> OUTLET - UP TO 50% OFF <div />
          </h2>
          <div className="product-tab-item--view-all">
            <Link to="/shop/sale">View All</Link>
          </div>
          <div className="row">
            <ProductGrid
              category={category}
              type="saleItems"
              limit={4}
              spaceBottomClass="mb-25"
            />
          </div>
        </div>

        {/* <Tab.Container defaultActiveKey="bestSeller">
          <Nav
            variant="pills"
            className="product-tab-list pt-30 pb-55 text-center"
          >
            <Nav.Item>
              <Nav.Link eventKey="newArrival">
                <h4>신상품</h4>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="bestSeller">
                <h4>베스트 셀러</h4>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="saleItems">
                <h4>세일 상품 (-50%)</h4>
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content className="tab-product-wrap">
            <Tab.Pane eventKey="newArrival">
              <div className="row">
                <ProductGrid
                  category={category}
                  type="new"
                  limit={8}
                  spaceBottomClass="mb-25"
                />
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="bestSeller">
              <div className="row ">
                <ProductGrid
                  category={category}
                  type="bestSeller"
                  limit={8}
                  spaceBottomClass="mb-25"
                />
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="saleItems">
              <div className="row">
                <ProductGrid
                  category={category}
                  type="saleItems"
                  limit={8}
                  spaceBottomClass="mb-25"
                />
              </div>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container> */}
      </div>
    </div>
  )
}

TabProduct.propTypes = {
  bgColorClass: PropTypes.string,
  category: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
}

export default TabProduct
