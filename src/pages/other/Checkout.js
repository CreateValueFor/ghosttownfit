import PropTypes from 'prop-types'
import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MetaTags from 'react-meta-tags'
import { connect } from 'react-redux'
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic'
import { getDiscountPrice } from '../../helpers/product'
import LayoutOne from '../../layouts/LayoutOne'
import Breadcrumb from '../../wrappers/breadcrumb/Breadcrumb'

import { checkOrder, startOrder } from '../../api/api'
import useUserAction from '../../redux/actions/userActions'
import { deleteAllFromCart } from '../../redux/actions/cartActions'
import GetAddressModal from '../../components/checkout/GetAddressModal'

const Checkout = ({ location, cartItems, currency, history }) => {
  const { pathname } = location
  let cartTotalPrice = 0
  const [address, setAddress] = useState('') // 주소
  const [addressDetail, setAddressDetail] = useState('') // 상세주소

  const [orderData, setOrderData] = useState({})

  const [isOpenPost, setIsOpenPost] = useState(false)
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

    const { IMP } = window
    IMP.init('imp90851675')

    return () => {
      document.head.removeChild(jquery)
      document.head.removeChild(iamport)
    }
  }, [])

  useEffect(async () => {
    const { IMP } = window
    const naverBtnChild = document.querySelector('.npay_button')
    const naverBtnChildPopUp = document.querySelector('.npay_storebtn_bx')
    if (naverBtnChild) {
      naverBtnChild.remove()
    }
    if (naverBtnChildPopUp) {
      naverBtnChildPopUp.remove()
    }
    // document
    //   .getElementById('naverpay-btn')
    //   .removeChild(document.getElementById('naverpay-btn').lastChild)

    window.naver.NaverPayButton.apply({
      BUTTON_KEY: 'CF92B951-3C88-43F3-9016-93761C1EFD95',
      TYPE: 'A',
      COLOR: 1,
      COUNT: 2,
      ENABLE: 'Y',
      EMBED_ID: 'naverpay-btn',
      BUY_BUTTON_HANDLER: async function () {
        console.log(orderData)
        //중략
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
          purchaseMethod: 'naverco',
          purchaseAmount:
            cartItems.reduce((acc, cur, idx) => {
              return (acc += cur.price * cur.quantity)
            }, 0) + 3500,
        }

        const res = await startOrder(order)

        if (!res.success) {
          window.alert(
            '시스템 에러가 발생하였습니다. 잠시 후 다시 시도해주세요.'
          )
          return
        }
        const { buyer, amount, serialNumber } = res
        const orderName =
          cartItems.length > 1
            ? `${cartItems[0].name} ${cartItems[0].quantity}개 외 ${
                cartItems.length - 1
              }건`
            : `${cartItems[0].name} ${cartItems[0].quantity}개`

        const padyData = {
          pg: 'naverco',
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
          naverProducts: [
            {
              id: 'singleProductId', //선택된 옵션이 없는 상품
              name: '네이버페이 상품1',
              basePrice: 1000,
              taxType: 'TAX_FREE', //TAX or TAX_FREE
              quantity: 2,
              infoUrl: 'http://www.iamport.kr/product/detail',
              imageUrl: 'http://www.iamport.kr/product/detail/thumbnail',
              giftName: '사은품A',
              shipping: {
                groupId: 'shipping-a',
                method: 'DELIVERY', //DELIVERY(택배·소포·등기), QUICK_SVC(퀵 서비스), DIRECT_DELIVERY(직접 전달), VISIT_RECEIPT(방문 수령), NOTHING(배송 없음)
                baseFee: 2500,
                feeRule: {
                  freeByThreshold: 20000,
                },
                feePayType: 'PREPAYED', //PREPAYED(선불) 또는 CASH_ON_DELIVERY(착불)
              },
              supplements: [
                {
                  id: 'supplement-a',
                  name: '추가구성품 A',
                  price: 1000,
                  quantity: 1,
                },
                {
                  id: 'supplement-b',
                  name: '추가구성품 B',
                  price: 1200,
                  quantity: 2,
                },
              ],
            },
          ],
        }
        //핸들러 내에서 결제창 호출 함수 호출
        IMP.request_pay(
          {
            pg: 'naverco',
            pay_method: 'card',
            merchant_uid: 'order_no_00012341234', // 상점에서 관리하는 주문 번호
            name: '주문명:결제테스트',
            amount: 14000,
            buyer_email: 'iamport@siot.do',
            buyer_name: '구매자이름',
            buyer_tel: '010-1234-5678',
            buyer_addr: '서울특별시 강남구 삼성동',
            buyer_postcode: '123-456',

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
                  baseFee: 3000,
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
          test: cartItems.map((cart) => {
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
  }, [orderData])

  useEffect(() => {
    if (
      orderData.receiver &&
      orderData.phone &&
      orderData.postCode &&
      orderData.address1 &&
      orderData.address2
    ) {
      setValid(true)
    } else {
      setValid(false)
    }
  }, [address, orderData])

  const onClickDefaultPayment = async (payMethod) => {
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

  const payOrder = (issuedData, payMethod) => {
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
                        <label>배송지 주소</label>
                        <div className="billing-info mb-20 ">
                          <div className="d-flex">
                            <input
                              className="billing-address"
                              type="text"
                              placeholder="주소지를 검색해주세요."
                              style={{ width: 300, background: '#dce0dd' }}
                              readOnly
                              defaultValue={addressDetail}
                            />
                            <button onClick={onChangeOpenPost} id="address-btn">
                              검색
                            </button>
                          </div>
                          <GetAddressModal
                            show={isOpenPost}
                            onCompletePost={onCompletePost}
                            onHide={() => {
                              setIsOpenPost(false)
                            }}
                          />
                          {/* {isOpenPost ? (
                            <DaumPostcode
                              style={postCodeStyle}
                              autoClose
                              onComplete={onCompletePost}
                            />
                          ) : null} */}
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
                    {!valid && (
                      <p className="payment-guide">필수 정보를 입력해주세요 </p>
                    )}

                    <button
                      disabled={!valid}
                      id="payment-btn"
                      className="mb-3"
                      onClick={() => onClickDefaultPayment('uplus')}
                    >
                      결제하기
                    </button>

                    <div className="place-order mb-25">
                      <button
                        id="naverpay-btn"
                        style={{
                          background: 'none',
                          border: 'none',
                        }}
                      ></button>
                      <button
                        disabled={!valid}
                        onClick={() => {
                          setPayMethod('tosspay')
                          onClickDefaultPayment('tosspay')
                        }}
                        className={payMethod === 'tosspay' && 'selected'}
                      >
                        <img
                          src="https://ghosttown.s3.ap-northeast-2.amazonaws.com/toss.webp"
                          alt="tosspay"
                        />
                        <span>토스페이</span>
                      </button>
                      <button
                        disabled={!valid}
                        onClick={() => {
                          setPayMethod('kakaopay')
                          onClickDefaultPayment('kakaopay')
                        }}
                        className={payMethod === 'kakaopay' && 'selected'}
                      >
                        <img
                          src={process.env.PUBLIC_URL + '/assets/kakao.png'}
                          alt="nice payment"
                        />
                        <span>카카오페이</span>
                      </button>
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
