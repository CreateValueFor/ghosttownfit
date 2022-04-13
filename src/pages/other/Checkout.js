import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import MetaTags from "react-meta-tags";
import { connect } from "react-redux";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { getDiscountPrice } from "../../helpers/product";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import DaumPostcode from 'react-daum-postcode'

const Checkout = ({ location, cartItems, currency }) => {
  const { pathname } = location;
  let cartTotalPrice = 0;
  const [address, setAddress] = useState(""); // 주소
  const [addressDetail, setAddressDetail] = useState("") // 상세주소

  const [isOpenPost, setIsOpenPost] = useState(true);



  const onChangeOpenPost = () => {
    setIsOpenPost(!isOpenPost);
  };

  const onCompletePost = (data) => {
    let fullAddr = data.address;
    let extraAddr = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddr += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddr += extraAddr !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddr += extraAddr !== '' ? ` (${extraAddr})` : '';
    }

    setAddress(data.zonecode);
    setAddressDetail(fullAddr);
    setIsOpenPost(false);
  };

  const postCodeStyle = {
    display: 'block',
    position: 'relative',
    top: '0%',
    width: '100%',
    height: '400px',
    padding: '7px',
  };

  return (
    <Fragment>
      <MetaTags>
        <title>고스트타운 | 주문서 작성</title>
        <meta
          name="description"
          content="고스트타운 주문확인 페이지입니다."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Checkout
      </BreadcrumbsItem>
      <LayoutOne >
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="checkout-area pt-95 pb-100">
          <div className="container">
            {cartItems && cartItems.length >= 1 ? (
              <div className="row">
                <div className="col-lg-7">
                  <div className="billing-info-wrap">
                    <h3>수령자 정보</h3>
                    <div className="row">
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>수령인</label>
                          <input type="text" placeholder="수령인 정보를 입력해주세요." />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>휴대전화</label>
                          <input type="number" placeholder=" '-' 를 제외하고 입력해주세요." />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="billing-info mb-20">
                          <label>배송지 주소</label>
                          <input
                            className="billing-address"
                            placeholder="배송지 주소를 입력해주세요."
                            type="text"
                            onClick={onChangeOpenPost}
                            value={address}
                          />
                          {isOpenPost ? (
                            <DaumPostcode style={postCodeStyle} autoClose onComplete={onCompletePost} />
                          ) : null}
                          <input
                            placeholder="상세 주소를 입력해주세요."
                            type="text"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="additional-info-wrap">

                      <div className="additional-info">
                        <label>배송 메모</label>
                        <textarea
                          placeholder="배송 메모를 입력해주세요."
                          name="message"
                          defaultValue={""}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-5">
                  <div className="your-order-area">
                    <h3>주문 확인</h3>
                    <div className="your-order-wrap gray-bg-4">
                      <div className="your-order-product-info">
                        <div className="your-order-top">
                          <ul>
                            <li>Product</li>
                            <li>Total</li>
                          </ul>
                        </div>
                        <div className="your-order-middle">
                          <ul>
                            {cartItems.map((cartItem, key) => {
                              const discountedPrice = getDiscountPrice(
                                cartItem.price,
                                cartItem.discount
                              );
                              const finalProductPrice = (
                                cartItem.price * currency.currencyRate
                              ).toFixed(2);
                              const finalDiscountedPrice = (
                                discountedPrice * currency.currencyRate
                              ).toFixed(2);

                              discountedPrice != null
                                ? (cartTotalPrice +=
                                  finalDiscountedPrice * cartItem.quantity)
                                : (cartTotalPrice +=
                                  finalProductPrice * cartItem.quantity);
                              return (
                                <li key={key}>
                                  <span className="order-middle-left">
                                    {cartItem.name} X {cartItem.quantity}
                                  </span>{" "}
                                  <span className="order-price">
                                    {discountedPrice !== null
                                      ? '₩' +
                                      (
                                        finalDiscountedPrice *
                                        cartItem.quantity
                                      ).toFixed(2)
                                      : '₩' +
                                      (
                                        finalProductPrice * cartItem.quantity
                                      ).toFixed(2)}
                                  </span>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                        <div className="your-order-bottom">
                          <ul>
                            <li className="your-order-shipping">배송료</li>
                            <li>{'₩' +
                              (3500).toFixed(2)}</li>
                          </ul>
                        </div>
                        <div className="your-order-total">
                          <ul>
                            <li className="order-total">주문금액</li>
                            <li>
                              {'₩' +
                                cartTotalPrice.toFixed(2)}
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="payment-method"></div>
                    </div>
                    <div className="place-order mt-25">
                      <button className="btn-hover">결제하기</button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cash"></i>
                    </div>
                    <div className="item-empty-area__text">
                      장바구니에 담긴 상품이 없습니다. <br />{" "}
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
    </Fragment>
  );
};

Checkout.propTypes = {
  cartItems: PropTypes.array,
  currency: PropTypes.object,
  location: PropTypes.object
};

const mapStateToProps = state => {
  return {
    cartItems: state.cartData,
    currency: state.currencyData
  };
};

export default connect(mapStateToProps)(Checkout);
