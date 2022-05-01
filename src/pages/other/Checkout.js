import PropTypes from 'prop-types'
import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MetaTags from 'react-meta-tags'
import { connect } from 'react-redux'
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic'
import { getDiscountPrice } from '../../helpers/product'
import LayoutOne from '../../layouts/LayoutOne'
import Breadcrumb from '../../wrappers/breadcrumb/Breadcrumb'
import DaumPostcode from 'react-daum-postcode'
import { checkOrder, startOrder } from '../../api/api'
import useUserAction from '../../redux/actions/userActions'
import { deleteAllFromCart } from '../../redux/actions/cartActions'

const Checkout = ({ location, cartItems, currency, history }) => {
  const { pathname } = location
  let cartTotalPrice = 0
  const [address, setAddress] = useState('') // 주소
  const [addressDetail, setAddressDetail] = useState('') // 상세주소

  const [orderData, setOrderData] = useState({})

  const [isOpenPost, setIsOpenPost] = useState(true)
  const [payMethod, setPayMethod] = useState('')
  const [valid, setValid] = useState(false)

  const { isLoggedIn } = useUserAction()

  useEffect(async () => {
    if (!isLoggedIn) {
      window.alert(
        '로그인 정보가 없습니다. 로그인 혹은 회원가입을 진행해주세요.'
      )
      history.push('/login-register')
    }

    //아임포트 불러오기
    const jquery = document.createElement('script')
    jquery.src = 'https://code.jquery.com/jquery-1.12.4.min.js'
    const iamport = document.createElement('script')
    iamport.src = 'https://cdn.iamport.kr/js/iamport.payment-1.1.7.js'
    document.head.appendChild(jquery)
    document.head.appendChild(iamport)
    // await startOrder(
    //   {
    //     receiver: "이민기",
    //     phone: "010-7179-6841",
    //     address1: "경기 성남시 수정구 창업로 18",
    //     postCode: "13449",
    //     address2: "디어스판교 865호",
    //     deliveryMessage: "배송 주의해주세요",
    //     productList: '[{"id":1,"count":2}]'
    //   }
    // )
    return () => {
      document.head.removeChild(jquery)
      document.head.removeChild(iamport)
    }
  }, [])

  useEffect(() => {
    if (
      orderData.receiver &&
      orderData.phone &&
      orderData.postCode &&
      orderData.address1 &&
      orderData.address2 &&
      payMethod
    ) {
      setValid(true)
    } else {
      setValid(false)
    }
    console.log(orderData)
  }, [payMethod, address, orderData])

  const onClickDefaultPayment = async () => {
    // 검증계 추가

    // 주문 데이터 생성
    const order = {
      ...orderData,
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
      purchaseMethod: payMethod,
      purchaseAmount:
        cartItems.reduce((acc, cur, idx) => {
          return (acc += cur.price * cur.quantity)
        }, 0) + 3500,
    }

    const res = await startOrder(order)

    if (res.success) {
      payOrder(res, payMethod)
    } else {
      window.alert(res.message)
    }
  }

  const payOrder = (issuedData) => {
    const { buyer, amount, serialNumber } = issuedData
    const { IMP } = window
    const orderName =
      cartItems.length > 1
        ? `${cartItems[0].name} ${cartItems[0].quantity}개 외 ${
            cartItems.length - 1
          }건`
        : `${cartItems[0].name} ${cartItems[0].quantity}개`
    IMP.init('imp90851675')

    const test = {
      pg: payMethod,
      pay_method: 'card',
      merchant_uid: serialNumber, //상점에서 생성한 고유 주문번호
      name: orderName,
      amount: amount,
      buyer_email: buyer.email,
      buyer_name: buyer.name,
      buyer_tel: buyer.phone,
      buyer_addr: orderData.address1,
      buyer_postcode: orderData.postCode,
      // m_redirect_url: 'https://ghosttown.kr',
      m_redirect_url: window.location.href,
    }
    IMP.request_pay(test, async function (rsp) {
      console.log(rsp)
      if (rsp.success) {
        console.log(rsp)
        const res = await checkOrder({
          imp_uid: rsp.imp_uid,
        })
        if (res.success) {
          deleteAllFromCart()
        }

        window.alert('결제 성공')
        history.push('/')
        console.log('결제 성공')
      } else {
        console.log(rsp)
        console.log('결제 실패')
      }
    })
  }

  const onChange = (e) => {
    const { name, value } = e.target
    setOrderData((prev) => {
      const newOrder = { ...prev }
      newOrder[name] = value

      return newOrder
    })
  }

  const onChangeOpenPost = () => {
    setIsOpenPost(!isOpenPost)
  }

  const onCompletePost = (data) => {
    let fullAddr = data.address
    let extraAddr = ''

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddr += data.bname
      }
      if (data.buildingName !== '') {
        extraAddr +=
          extraAddr !== '' ? `, ${data.buildingName}` : data.buildingName
      }
      fullAddr += extraAddr !== '' ? ` (${extraAddr})` : ''
    }

    setAddress(data.zonecode)
    setAddressDetail(fullAddr)
    setIsOpenPost(false)
    setOrderData((prev) => ({
      ...prev,
      postCode: data.zonecode,
      address1: fullAddr,
    }))
  }

  const postCodeStyle = {
    display: 'block',
    position: 'relative',
    top: '0%',
    width: '100%',
    height: '400px',
    padding: '7px',
  }

  return (
    <Fragment>
      <MetaTags>
        <title>고스트타운 | 주문서 작성</title>
        <meta name="description" content="고스트타운 주문확인 페이지입니다." />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + '/'}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Checkout
      </BreadcrumbsItem>
      <LayoutOne>
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
                          <input
                            onChange={onChange}
                            name="receiver"
                            type="text"
                            placeholder="수령인 정보를 입력해주세요."
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>휴대전화</label>
                          <input
                            onChange={onChange}
                            name="phone"
                            type="number"
                            placeholder=" '-' 를 제외하고 입력해주세요."
                          />
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
                            defaultValue={addressDetail}
                          />
                          {isOpenPost ? (
                            <DaumPostcode
                              style={postCodeStyle}
                              autoClose
                              onComplete={onCompletePost}
                            />
                          ) : null}
                          <input
                            placeholder="상세 주소를 입력해주세요."
                            type="text"
                            name="address2"
                            onChange={onChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="additional-info-wrap">
                      <div className="additional-info">
                        <label>배송 메모</label>
                        <textarea
                          placeholder="배송 메모를 입력해주세요."
                          name="deliveryMessage"
                          defaultValue={''}
                          onChange={onChange}
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
                              )
                              const finalProductPrice =
                                cartItem.price * currency.currencyRate
                              const finalDiscountedPrice =
                                discountedPrice * currency.currencyRate

                              discountedPrice != null
                                ? (cartTotalPrice +=
                                    finalDiscountedPrice * cartItem.quantity)
                                : (cartTotalPrice +=
                                    finalProductPrice * cartItem.quantity)
                              return (
                                <li key={key}>
                                  <span className="order-middle-left">
                                    {cartItem.name} X {cartItem.quantity}
                                  </span>{' '}
                                  <span className="order-price">
                                    {discountedPrice !== null
                                      ? '₩' +
                                        (finalDiscountedPrice *
                                          cartItem.quantity +
                                          '원')
                                      : '₩' +
                                        (finalProductPrice * cartItem.quantity +
                                          '원')}
                                  </span>
                                </li>
                              )
                            })}
                          </ul>
                        </div>
                        <div className="your-order-bottom">
                          <ul>
                            <li className="your-order-shipping">배송료</li>
                            <li>{'₩' + 3500 + '원'}</li>
                          </ul>
                        </div>
                        <div className="your-order-total">
                          <ul>
                            <li className="order-total">주문금액</li>
                            <li>
                              {'₩' + (Number(cartTotalPrice) + 3500) + '원'}
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="payment-method"></div>
                    </div>
                    <h3 className="mt-3">결제 방식을 선택해주세요.</h3>
                    <div className="place-order mb-25">
                      <button
                        onClick={() => setPayMethod('nice')}
                        className={payMethod === 'nice' && 'selected'}
                      >
                        <img
                          src={process.env.PUBLIC_URL + '/assets/nice.jpeg'}
                          alt="nice payment"
                        />
                        <span>나이스 페이먼츠</span>
                      </button>
                      <button
                        onClick={() => setPayMethod('naverpay')}
                        className={payMethod === 'naverpay' && 'selected'}
                      >
                        <img
                          src={process.env.PUBLIC_URL + '/assets/naver.webp'}
                          alt="nice payment"
                        />
                        <span>네이버페이</span>
                      </button>
                      <button
                        onClick={() => setPayMethod('uplus')}
                        // className="btn-hover"
                        className={payMethod === 'uplus' && 'selected'}
                      >
                        <img
                          src={process.env.PUBLIC_URL + '/assets/toss.webp'}
                          alt="nice payment"
                        />
                        <span>토스 페이먼츠</span>
                      </button>
                      <button
                        onClick={() => setPayMethod('tosspay')}
                        className={payMethod === 'tosspay' && 'selected'}
                      >
                        <img
                          src={process.env.PUBLIC_URL + '/assets/toss.webp'}
                          alt="nice payment"
                        />
                        <span>토스 간편결제</span>
                      </button>
                      <button
                        onClick={() => setPayMethod('kakaopay')}
                        className={payMethod === 'kakaopay' && 'selected'}
                      >
                        <img
                          src={process.env.PUBLIC_URL + '/assets/kakao.png'}
                          alt="nice payment"
                        />
                        <span>카카오페이</span>
                      </button>
                    </div>
                    <button
                      disabled={!valid}
                      id="payment-btn"
                      onClick={onClickDefaultPayment}
                    >
                      결제하기
                    </button>
                    {!valid && (
                      <p className="payment-guide">필수 정보를 입력해주세요 </p>
                    )}
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
                      장바구니에 담긴 상품이 없습니다. <br />{' '}
                      <Link to={process.env.PUBLIC_URL + '/shop'}>
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
  )
}

Checkout.propTypes = {
  cartItems: PropTypes.array,
  currency: PropTypes.object,
  location: PropTypes.object,
}

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
    currency: state.currencyData,
  }
}

export default connect(mapStateToProps)(Checkout)
