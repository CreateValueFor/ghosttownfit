import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { connect } from "react-redux";
import { getDiscountPrice } from "../../helpers/product";
import {
    addToCart,
    decreaseQuantity,
    deleteFromCart,
    cartItemStock,
    deleteAllFromCart
} from "../../redux/actions/cartActions";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { startNaverOrder } from "../../api/api";

const Cart = ({
    location,
    cartItems,
    currency,
    decreaseQuantity,
    addToCart,
    deleteFromCart,
    deleteAllFromCart
}) => {
    const [quantityCount] = useState(1);
    const { addToast } = useToasts();
    const { pathname } = location;
    let cartTotalPrice = 0;

    useEffect(async () => {
        const { IMP } = window

        IMP.init('imp90851675')
        const naverBtnChild = document.querySelector('.npay_button')
        const naverBtnChildPopUp = document.querySelector('.npay_storebtn_bx')
        if (naverBtnChild) {
            naverBtnChild.remove()
        }
        if (naverBtnChildPopUp) {
            naverBtnChildPopUp.remove()
        }


        window.naver.NaverPayButton.apply({
            BUTTON_KEY: 'CF92B951-3C88-43F3-9016-93761C1EFD95',
            TYPE: 'A',
            COLOR: 1,
            COUNT: 2,
            ENABLE: 'Y',
            EMBED_ID: 'naverpay-btn',
            BUY_BUTTON_HANDLER: async function () {

                //중략
                // 주문 데이터 생성
                const order = {

                    receiver: 'grant naver',
                    phone: '00000',
                    address1: "grant naver",
                    address2: "grant naver",
                    postCode: "00000",
                    productList: cartItems.map((cart) => {
                        const selectedItem = cart.sizes.find(
                            (elem) => elem.name === cart.selectedProductSize
                        )
                        return {
                            id: selectedItem.id,
                            count: cart.quantity,
                            name: cart.name,
                            thumb: cart.thumb,
                            colorId: cart.id,
                            price: cart.price,
                        }
                    }),
                    purchaseMethod: 'naverco',
                    purchaseAmount:
                        cartItems.reduce((acc, cur, idx) => {
                            return (acc += cur.price * cur.quantity)
                        }, 0) + 3500,
                }

                const res = await startNaverOrder(order)

                if (!res.success) {
                    window.alert(
                        '시스템 에러가 발생하였습니다. 잠시 후 다시 시도해주세요.'
                    )
                    return
                }
                const { buyer, amount, serialNumber } = res
                const orderName =
                    cartItems.length > 1
                        ? `${cartItems[0].name} ${cartItems[0].quantity}개 외 ${cartItems.length - 1
                        }건`
                        : `${cartItems[0].name} ${cartItems[0].quantity}개`

                //핸들러 내에서 결제창 호출 함수 호출
                IMP.request_pay(
                    {
                        pg: 'naverco',
                        pay_method: 'card',
                        merchant_uid: serialNumber, //상점에서 생성한 고유 주문번호
                        name: orderName,
                        amount: amount,
                        // buyer_email: buyer.email,
                        // buyer_name: buyer.name,
                        // buyer_tel: buyer.phone,
                        m_redirect_url: window.location.href,

                        naverProducts: cartItems.map((cart) => {
                            const selectedItem = cart.sizes.find(
                                (elem) => elem.name === cart.selectedProductSize
                            )
                            return {
                                id: selectedItem.id,
                                quantity: cart.quantity,
                                name: cart.name,
                                imageUrl: cart.thumb,
                                infoUrl: `https://ghosttown.kr/product/${selectedItem.id}`,
                                colorId: cart.id,
                                basePrice: cart.price,
                                taxType: 'TAX',
                                shipping: {
                                    groupId: 'shipping-a',
                                    method: 'DELIVERY', //DELIVERY(택배·소포·등기), QUICK_SVC(퀵 서비스), DIRECT_DELIVERY(직접 전달), VISIT_RECEIPT(방문 수령), NOTHING(배송 없음)
                                    baseFee: 3500,
                                    feeRule: {
                                        freeByThreshold: 20000,
                                    },
                                    feePayType: 'PREPAYED', //PREPAYED(선불) 또는 CASH_ON_DELIVERY(착불)
                                },
                            }
                        }),
                    },
                    function (rsp) {
                        if (!rsp.success) {
                            var msg = '오류로 인해 결제가 시작되지 못하였습니다.'
                            msg += '에러내용: ' + rsp.error_msg
                            alert(msg)
                        }
                    }
                )
            },
            WISHLIST_BUTTON_HANDLER: function () {
                //중략
                //핸들러 내에서 찜하기 함수 호출
                IMP.naver_zzim({
                    naverProducts: cartItems.map((cart) => {
                        const selectedItem = cart.sizes.find(
                            (elem) => elem.name === cart.selectedProductSize
                        )
                        return {
                            id: selectedItem.id,

                            name: cart.name,
                            desc: cart.shortDescription,
                            uprice: cart.price,
                            url: `https://ghosttown.kr/product/${selectedItem.id}`,
                            thumb: cart.thumb,
                            image: cart.thumb,
                        }
                    }),
                })
            },
        })
    }, [])

    return (
        <Fragment>
            <MetaTags>
                <title>고스트타운 | 장바구니</title>
                <meta
                    name="description"
                    content="고스트타운 장바구니 페이지입니다."
                />
            </MetaTags>

            <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
            <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
                Cart
            </BreadcrumbsItem>

            <LayoutOne >
                {/* breadcrumb */}
                <Breadcrumb />
                <div className="cart-main-area pt-90 pb-100">
                    <div className="container">
                        {cartItems && cartItems.length >= 1 ? (
                            <Fragment>
                                <h3 className="cart-page-title">Your cart items</h3>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="table-content table-responsive cart-table-content">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>Image</th>
                                                        <th>Product Name</th>
                                                        <th>Unit Price</th>
                                                        <th>Qty</th>
                                                        <th>Subtotal</th>
                                                        <th>action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {cartItems.map((cartItem, key) => {
                                                        const discountedPrice = getDiscountPrice(
                                                            cartItem.price,
                                                            cartItem.discount
                                                        );
                                                        const finalProductPrice = (
                                                            cartItem.price * currency.currencyRate
                                                        );
                                                        const finalDiscountedPrice = (
                                                            discountedPrice * currency.currencyRate
                                                        );

                                                        discountedPrice != null
                                                            ? (cartTotalPrice +=
                                                                finalDiscountedPrice * cartItem.quantity)
                                                            : (cartTotalPrice +=
                                                                finalProductPrice * cartItem.quantity);
                                                        return (
                                                            <tr key={key}>
                                                                <td className="product-thumbnail">
                                                                    <Link
                                                                        to={
                                                                            process.env.PUBLIC_URL +
                                                                            "/product/" +
                                                                            cartItem.id
                                                                        }
                                                                    >
                                                                        <img
                                                                            className="img-fluid"
                                                                            src={
                                                                                process.env.PUBLIC_URL +
                                                                                cartItem.image[0]
                                                                            }
                                                                            alt=""
                                                                        />
                                                                    </Link>
                                                                </td>

                                                                <td className="product-name">
                                                                    <Link
                                                                        to={
                                                                            process.env.PUBLIC_URL +
                                                                            "/product/" +
                                                                            cartItem.id
                                                                        }
                                                                    >
                                                                        {cartItem.name}
                                                                    </Link>
                                                                    {cartItem.selectedProductColor &&
                                                                        cartItem.selectedProductSize ? (
                                                                        <div className="cart-item-variation">
                                                                            <span>
                                                                                Color: {cartItem.selectedProductColor}
                                                                            </span>
                                                                            <span>
                                                                                Size: {cartItem.selectedProductSize}
                                                                            </span>
                                                                        </div>
                                                                    ) : (
                                                                        ""
                                                                    )}
                                                                </td>

                                                                <td className="product-price-cart">
                                                                    {discountedPrice !== null ? (
                                                                        <Fragment>
                                                                            <span className="amount old">
                                                                                {'₩' +
                                                                                    finalProductPrice}
                                                                            </span>
                                                                            <span className="amount">
                                                                                {'₩' +
                                                                                    finalDiscountedPrice}
                                                                            </span>
                                                                        </Fragment>
                                                                    ) : (
                                                                        <span className="amount">
                                                                            {'₩' +
                                                                                finalProductPrice}
                                                                        </span>
                                                                    )}
                                                                </td>

                                                                <td className="product-quantity">
                                                                    <div className="cart-plus-minus">
                                                                        <button
                                                                            className="dec qtybutton"
                                                                            onClick={() =>
                                                                                decreaseQuantity(cartItem, addToast)
                                                                            }
                                                                        >
                                                                            -
                                                                        </button>
                                                                        <input
                                                                            className="cart-plus-minus-box"
                                                                            type="text"
                                                                            value={cartItem.quantity}
                                                                            readOnly
                                                                        />
                                                                        <button
                                                                            className="inc qtybutton"
                                                                            onClick={() =>
                                                                                addToCart(
                                                                                    cartItem,
                                                                                    addToast,
                                                                                    quantityCount
                                                                                )
                                                                            }
                                                                            disabled={
                                                                                cartItem !== undefined &&
                                                                                cartItem.quantity &&
                                                                                cartItem.quantity >=
                                                                                cartItemStock(
                                                                                    cartItem,
                                                                                    cartItem.selectedProductColor,
                                                                                    cartItem.selectedProductSize
                                                                                )
                                                                            }
                                                                        >
                                                                            +
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                                <td className="product-subtotal">
                                                                    {discountedPrice !== null
                                                                        ? '₩' +
                                                                        (
                                                                            finalDiscountedPrice * cartItem.quantity
                                                                        )
                                                                        : '₩' +
                                                                        (
                                                                            finalProductPrice * cartItem.quantity
                                                                        )}
                                                                </td>

                                                                <td className="product-remove">
                                                                    <button
                                                                        onClick={() =>
                                                                            deleteFromCart(cartItem, addToast)
                                                                        }
                                                                    >
                                                                        <i className="fa fa-times"></i>
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="cart-shiping-update-wrapper">
                                            <div className="cart-shiping-update">
                                                <Link
                                                    to={process.env.PUBLIC_URL + "/shop"}
                                                >
                                                    쇼핑 계속하기
                                                </Link>
                                            </div>
                                            <div className="cart-clear">
                                                <button onClick={() => deleteAllFromCart(addToast)}>
                                                    장바구니 비우기
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    {/* <div className="col-lg-4 col-md-6">
                    <div className="cart-tax">
                      <div className="title-wrap">
                        <h4 className="cart-bottom-title section-bg-gray">
                          Estimate Shipping And Tax
                        </h4>
                      </div>
                      <div className="tax-wrapper">
                        <p>
                          Enter your destination to get a shipping estimate.
                        </p>
                        <div className="tax-select-wrapper">
                          <div className="tax-select">
                            <label>* Country</label>
                            <select className="email s-email s-wid">
                              <option>Bangladesh</option>
                              <option>Albania</option>
                              <option>Åland Islands</option>
                              <option>Afghanistan</option>
                              <option>Belgium</option>
                            </select>
                          </div>
                          <div className="tax-select">
                            <label>* Region / State</label>
                            <select className="email s-email s-wid">
                              <option>Bangladesh</option>
                              <option>Albania</option>
                              <option>Åland Islands</option>
                              <option>Afghanistan</option>
                              <option>Belgium</option>
                            </select>
                          </div>
                          <div className="tax-select">
                            <label>* Zip/Postal Code</label>
                            <input type="text" />
                          </div>
                          <button className="cart-btn-2" type="submit">
                            Get A Quote
                          </button>
                        </div>
                      </div>
                    </div>
                  </div> */}

                                    {/* <div className="col-lg-4 col-md-6">
                    <div className="discount-code-wrapper">
                      <div className="title-wrap">
                        <h4 className="cart-bottom-title section-bg-gray">
                          Use Coupon Code
                        </h4>
                      </div>
                      <div className="discount-code">
                        <p>Enter your coupon code if you have one.</p>
                        <form>
                          <input type="text" required name="name" />
                          <button className="cart-btn-2" type="submit">
                            Apply Coupon
                          </button>
                        </form>
                      </div>
                    </div>
                  </div> */}

                                    <div className="col-lg-12 col-md-12">
                                        <div className="grand-totall">
                                            <div className="title-wrap">
                                                <h4 className="cart-bottom-title section-bg-gary-cart">
                                                    장바구니 전체
                                                </h4>
                                            </div>
                                            <h5>
                                                Total products{" "}
                                                <span>
                                                    {'₩' + cartTotalPrice}
                                                </span>
                                            </h5>

                                            <h4 className="grand-totall-title">
                                                Grand Total{" "}
                                                <span>
                                                    {'₩' + cartTotalPrice}
                                                </span>
                                            </h4>
                                            <div className="d-flex  flex-wrap justify-content-center" style={{ gap: 12 }}>
                                                <button
                                                    id="naverpay-btn"
                                                    style={{
                                                        background: 'none',
                                                        border: 'none',
                                                        marginRight: 10
                                                    }}
                                                ></button>
                                                <Link style={{ flex: 1, borderRadius: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }} to={process.env.PUBLIC_URL + "/naver/checkout"}>
                                                    checkout
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Fragment>
                        ) : (
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="item-empty-area text-center">
                                        <div className="item-empty-area__icon mb-30">
                                            <i className="pe-7s-cart"></i>
                                        </div>
                                        <div className="item-empty-area__text">
                                            No items found in cart <br />{" "}
                                            <Link to={process.env.PUBLIC_URL + "/shop"}>
                                                Shop Now
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </LayoutOne>
        </Fragment >
    );
};

Cart.propTypes = {
    addToCart: PropTypes.func,
    cartItems: PropTypes.array,
    currency: PropTypes.object,
    decreaseQuantity: PropTypes.func,
    location: PropTypes.object,
    deleteAllFromCart: PropTypes.func,
    deleteFromCart: PropTypes.func
};

const mapStateToProps = state => {
    return {
        cartItems: state.cartData,
        currency: state.currencyData
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addToCart: (item, addToast, quantityCount) => {
            dispatch(addToCart(item, addToast, quantityCount));
        },
        decreaseQuantity: (item, addToast) => {
            dispatch(decreaseQuantity(item, addToast));
        },
        deleteFromCart: (item, addToast) => {
            dispatch(deleteFromCart(item, addToast));
        },
        deleteAllFromCart: addToast => {
            dispatch(deleteAllFromCart(addToast));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
