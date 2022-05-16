import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from 'react';
import MetaTags from 'react-meta-tags';
import Paginator from 'react-hooks-paginator';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import { connect } from 'react-redux';
import { getSortedProducts, getProducts } from '../../helpers/product';
import LayoutOne from '../../layouts/LayoutOne';
import Breadcrumb from '../../wrappers/breadcrumb/Breadcrumb';
import ShopSidebar from '../../wrappers/product/ShopSidebar';
import ShopTopbar from '../../wrappers/product/ShopTopbar';
import ShopProducts from '../../wrappers/product/ShopProducts';

const ShopGridStandard = ({ location, products }) => {
    const [layout, setLayout] = useState('grid three-column');
    const [sortType, setSortType] = useState('');
    const [sortValue, setSortValue] = useState('');
    const [filterSortType, setFilterSortType] = useState('');
    const [filterSortValue, setFilterSortValue] = useState('');
    const [offset, setOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentData, setCurrentData] = useState([]);
    const [sortedProducts, setSortedProducts] = useState([]);
    const [category, setCategory] = useState('all')
    const [productCount, setProductCount] = useState({
        'all': 0,
        't-shirts': 0,
        'sleeveless': 0,
        'hoodies&sweatshirt': 0,
        'jackets': 0,
        'shorts': 0,
        'pants&joggers': 0,
        'socks': 0
    })


    const pageLimit = 15;
    const { pathname } = location;

    const getLayout = (layout) => {
        setLayout(layout)
    }

    const getSortParams = (sortType, sortValue) => {
        setSortType(sortType);
        setSortValue(sortValue);
    }

    const getFilterSortParams = (sortType, sortValue) => {
        setFilterSortType(sortType);
        setFilterSortValue(sortValue);
    }

    const onClick = (theme) => {
        console.log(theme);
    }


    useEffect(() => {

        setProductCount({
            'all': products.length,
            't-shirts': getProducts(products, 't-shirts').length,
            'sleeveless': getProducts(products, 'sleeveless').length,
            'hoodies&sweatshirt': getProducts(products, 'hoodies&sweatshirt').length,
            'jackets': getProducts(products, 'jackets').length,
            'shorts': getProducts(products, 'shorts').length,
            'pants&joggers': getProducts(products, 'pants&joggers').length,
            'socks': getProducts(products, 'socks').length

        })
        console.log(productCount)


        let newProduct = products;
        if (category !== 'all') {
            newProduct = getProducts(products, category)

        }

        let sortedProducts = getSortedProducts(newProduct, sortType, sortValue);
        console.log(sortedProducts)
        const filterSortedProducts = getSortedProducts(sortedProducts, filterSortType, filterSortValue);
        sortedProducts = filterSortedProducts;
        setSortedProducts(sortedProducts);
        setCurrentData(sortedProducts.slice(offset, offset + pageLimit));
    }, [category, offset, products, sortType, sortValue, filterSortType, filterSortValue]);

    const searchByCategory = (category) => {

        setCategory(category)
    }


    return (
        <Fragment>
            <MetaTags>
                <title>고스트타운 | 제품 목록</title>
                <meta name="description" content="Shop page of flone react minimalist eCommerce template." />
            </MetaTags>

            <BreadcrumbsItem to={process.env.PUBLIC_URL + '/shop'}>HOME</BreadcrumbsItem>

            <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>MEN</BreadcrumbsItem>

            <LayoutOne >
                {/* breadcrumb */}
                <Breadcrumb />

                <div className="shop-area pt-95 pb-100">
                    <div className="container">

                        <div className="row mb-3">
                            <ul className="my-5  d-flex justify-content-between product-tab-list " style={{ width: '100%' }}>
                                <li onClick={() => onClick('new')}>NEW RELEASES</li>
                                <li onClick={() => onClick('best')}>BESTSELLER</li>
                                <li onClick={() => onClick('sale')}>OUTLET - UP TO <span style={{ color: '#ff0000' }}>50% OFF</span></li>
                            </ul>
                            {/* <div className="col-lg-12 d-flex flex-nowrap">
                                <h4 className="pro-sidebar-title mr-2">신상품 </h4>
                                <h4 className="pro-sidebar-title mr-2">베스트셀러 </h4>
                                <h4 className="pro-sidebar-title mr-2">세일상품<span style={{ color: 'red' }}>(-50%)</span> </h4>

                            </div> */}
                        </div>
                        <div className="row">
                            <div className="shop-category col-lg-12 d-flex flex-nowrap" style={{ overflowX: "scroll" }}>
                                <p onClick={() => { searchByCategory('all') }} className={['title', 'mr-2', category === 'all' && 'selected'].join(' ')}>ALL({productCount.all}) </p>
                                <p onClick={() => { searchByCategory('t-shirts') }} className={['title', 'mr-2', category === 't-shirts' && 'selected'].join(' ')}>T-SHIRTS({productCount['t-shirts']}) </p>
                                <p onClick={() => { searchByCategory('sleeveless') }} className={['title', 'mr-2', category === 'sleeveless' && 'selected'].join(' ')}>SLEEVELESS({productCount['sleeveless']}) </p>
                                <p onClick={() => { searchByCategory('hoodies&sweatshirt') }} className={['title', 'mr-2', category === 'hoodies&sweatshirt' && 'selected'].join(' ')}>HOODIES & SWEATSHIRTS({productCount['hoodies&sweatshirt']}) </p>
                                <p onClick={() => { searchByCategory('jackets') }} className={['title', 'mr-2', category === 'jackets' && 'selected'].join(' ')}>JACKETS({productCount['jackets']}) </p>
                                <p onClick={() => { searchByCategory('shorts') }} className={['title', 'mr-2', category === 'shorts' && 'selected'].join(' ')}>SHORTS({productCount['shorts']}) </p>
                                <p onClick={() => { searchByCategory('pants&joggers') }} className={['title', 'mr-2', category === 'pants&joggers' && 'selected'].join(' ')}>JEANS & JOGGERS({productCount['pants&joggers']}) </p>
                                <p onClick={() => { searchByCategory('socks') }} className={['title', 'mr-2', category === 'socks' && 'selected'].join(' ')}>SOCKS({productCount['socks']})</p>
                            </div>
                        </div>
                        <div className="row">
                            {/* <div className="col-lg-3 order-2 order-lg-1"> */}
                            {/* shop sidebar */}
                            {/* <ShopSidebar products={products} getSortParams={getSortParams} sideSpaceClass="mr-30" /> */}
                            {/* </div> */}
                            <div className="col-lg-12 order-1 order-lg-2">
                                {/* shop topbar default */}
                                {/* <ShopTopbar getLayout={getLayout} getFilterSortParams={getFilterSortParams} productCount={products.length} sortedProductCount={currentData.length} /> */}

                                {/* shop page content default */}
                                <ShopProducts layout={layout} products={currentData} />

                                {/* shop product pagination */}
                                <div className="pro-pagination-style text-center mt-30">
                                    <Paginator
                                        totalRecords={sortedProducts.length}
                                        pageLimit={pageLimit}
                                        pageNeighbours={2}
                                        setOffset={setOffset}
                                        currentPage={currentPage}
                                        setCurrentPage={setCurrentPage}
                                        pageContainerClass="mb-0 mt-0"
                                        pagePrevText="«"
                                        pageNextText="»"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutOne>
        </Fragment>
    )
}

ShopGridStandard.propTypes = {
    location: PropTypes.object,
    products: PropTypes.array
}

const mapStateToProps = state => {
    return {
        products: state.productData.products
    }
}

export default connect(mapStateToProps)(ShopGridStandard);