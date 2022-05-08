import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getProductCartQuantity } from "../../helpers/product";
import { addToCart } from "../../redux/actions/cartActions";
import { addToWishlist } from "../../redux/actions/wishlistActions";
import { addToCompare } from "../../redux/actions/compareActions";
import Rating from "./sub-components/ProductRating";
import { toCurrency } from "../../api/custom";
import { getProfile, startOrder } from "../../api/api";

const ProductDescriptionInfo = ({
  product,
  discountedPrice,
  currency,
  finalDiscountedPrice,
  finalProductPrice,
  cartItems,
  wishlistItem,
  compareItem,
  addToast,
  addToCart,
  addToWishlist,
  addToCompare
}) => {
  const [selectedProductColor, setSelectedProductColor] = useState(
    product.variation ? product.variation[0].color : ""
  );
  const [selectedProductSize, setSelectedProductSize] = useState(
    product.variation ? product.variation[0].size[0].name : ""
  );
  const [productStock, setProductStock] = useState(
    product.variation ? product.variation[0].size[0].stock : product.stock
  );
  const [quantityCount, setQuantityCount] = useState(1);

  const productCartQty = getProductCartQuantity(
    cartItems,
    product,
    selectedProductColor,
    selectedProductSize
  );

  useEffect(async () => {

    const user = await getProfile();

    const { IMP } = window
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
            ? `${cartItems[0].name} ${cartItems[0].quantity}개 외 ${cartItems.length - 1
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
          // buyer_addr: orderData.address1,
          // buyer_postcode: orderData.postCode,
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
  }, [])

  return (
    <div className="product-details-content ml-70">
      <h2>{product.name}</h2>
      <div className="product-details-price">
        {discountedPrice !== null ? (
          <Fragment>
            {/* <span>{'₩' + toCurrency(finalDiscountedPrice)}</span>{" "} */}
            {/* <span className="old">
              {'₩' + toCurrency(finalProductPrice)}
            </span> */}
            <span>{'₩' + toCurrency(finalDiscountedPrice)}</span>{" "}
            <span className="old">
              {'₩' + toCurrency(finalProductPrice)}
            </span>
          </Fragment>
        ) : (
          // <span>{'₩' + toCurrency(finalProductPrice)} </span>
          <span>{'₩' + toCurrency(finalProductPrice)} </span>
        )}
      </div>
      {product.rating && product.rating > 0 ? (
        <div className="pro-details-rating-wrap">
          <div className="pro-details-rating">
            <Rating ratingValue={product.rating} />
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="pro-details-list">
        <pre>{product.shortDescription}</pre>
      </div>

      {product.variation ? (
        <div className="pro-details-size-color">
          {/* <div className="pro-details-color-wrap">
            <span>Color</span>
            <div className="pro-details-color-content">
              {product.variation.map((single, key) => {
                return (
                  <label
                    className={`pro-details-color-content--single ${single.color}`}
                    key={key}
                  >
                    <input
                      type="radio"
                      value={single.color}
                      name="product-color"
                      checked={
                        single.color === selectedProductColor ? "checked" : ""
                      }
                      onChange={() => {
                        setSelectedProductColor(single.color);
                        setSelectedProductSize(single.size[0].name);
                        setProductStock(single.size[0].stock);
                        setQuantityCount(1);
                      }}
                    />
                    <span className="checkmark"></span>
                  </label>
                );
              })}
            </div>
          </div> */}
          <div className="pro-details-size">
            <span>Size</span>
            <div className="pro-details-size-content">
              {product.variation &&
                product.variation.map(single => {
                  return single.color === selectedProductColor
                    ? single.size.map((singleSize, key) => {
                      return (
                        <label
                          className={`pro-details-size-content--single`}
                          key={key}
                        >
                          <input
                            type="radio"
                            value={singleSize.name}
                            checked={
                              singleSize.name === selectedProductSize
                                ? "checked"
                                : ""
                            }
                            onChange={() => {
                              setSelectedProductSize(singleSize.name);
                              setProductStock(singleSize.stock);
                              setQuantityCount(1);
                            }}
                          />
                          <span className="size-name">{singleSize.name}</span>
                        </label>
                      );
                    })
                    : "";
                })}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {product.affiliateLink ? (
        <div className="pro-details-quality">
          <div className="pro-details-cart btn-hover ml-0">
            <a
              href={product.affiliateLink}
              rel="noopener noreferrer"
              target="_blank"
            >
              Buy Now
            </a>
          </div>
        </div>
      ) : (
        <div className="pro-details-quality">
          <div className="cart-plus-minus">
            <button
              onClick={() =>
                setQuantityCount(quantityCount > 1 ? quantityCount - 1 : 1)
              }
              className="dec qtybutton"
            >
              -
            </button>
            <input
              className="cart-plus-minus-box"
              type="text"
              value={quantityCount}
              readOnly
            />
            <button
              onClick={() =>
                setQuantityCount(
                  quantityCount < productStock - productCartQty
                    ? quantityCount + 1
                    : quantityCount
                )
              }
              className="inc qtybutton"
            >
              +
            </button>
          </div>
          <div className="pro-details-cart btn-hover">
            {productStock && productStock > 0 ? (
              <button
                onClick={() =>
                  addToCart(
                    product,
                    addToast,
                    quantityCount,
                    selectedProductColor,
                    selectedProductSize
                  )
                }
                disabled={productCartQty >= productStock}
              >
                {" "}
                Add To Cart{" "}
              </button>
            ) : (
              <button disabled>Out of Stock</button>
            )}
          </div>
          <button id="naverpay-btn" />
          <div className="pro-details-wishlist">
            <button
              className={wishlistItem !== undefined ? "active" : ""}
              disabled={wishlistItem !== undefined}
              title={
                wishlistItem !== undefined
                  ? "Added to wishlist"
                  : "Add to wishlist"
              }
              onClick={() => addToWishlist(product, addToast)}
            >
              <i className="pe-7s-like" />
            </button>
          </div>
          {/* <div className="pro-details-compare">
            <button
              className={compareItem !== undefined ? "active" : ""}
              disabled={compareItem !== undefined}
              title={
                compareItem !== undefined
                  ? "Added to compare"
                  : "Add to compare"
              }
              onClick={() => addToCompare(product, addToast)}
            >
              <i className="pe-7s-shuffle" />
            </button>
          </div> */}
        </div>
      )}
      {product.category ? (
        <div className="pro-details-meta">
          <span>Categories :</span>
          <ul>
            {product.category.map((single, key) => {
              return (
                <li key={key}>
                  <Link to={process.env.PUBLIC_URL + "/shop"}>
                    {single}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        ""
      )}
      {/* {product.tag ? (
        <div className="pro-details-meta">
          <span>Tags :</span>
          <ul>
            {product.tag.map((single, key) => {
              return (
                <li key={key}>
                  <Link to={process.env.PUBLIC_URL + "/shop"}>
                    {single}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        ""
      )} */}

      {/* <div className="pro-details-social">
        <ul>
          <li>
            <a href="//facebook.com">
              <i className="fa fa-facebook" />
            </a>
          </li>
          <li>
            <a href="//dribbble.com">
              <i className="fa fa-dribbble" />
            </a>
          </li>
          <li>
            <a href="//pinterest.com">
              <i className="fa fa-pinterest-p" />
            </a>
          </li>
          <li>
            <a href="//twitter.com">
              <i className="fa fa-twitter" />
            </a>
          </li>
          <li>
            <a href="//linkedin.com">
              <i className="fa fa-linkedin" />
            </a>
          </li>
        </ul>
      </div> */}
    </div>
  );
};

ProductDescriptionInfo.propTypes = {
  addToCart: PropTypes.func,
  addToCompare: PropTypes.func,
  addToWishlist: PropTypes.func,
  addToast: PropTypes.func,
  cartItems: PropTypes.array,
  compareItem: PropTypes.array,
  currency: PropTypes.object,
  discountedPrice: PropTypes.number,
  finalDiscountedPrice: PropTypes.number,
  finalProductPrice: PropTypes.number,
  product: PropTypes.object,
  wishlistItem: PropTypes.object
};

const mapDispatchToProps = dispatch => {
  return {
    addToCart: (
      item,
      addToast,
      quantityCount,
      selectedProductColor,
      selectedProductSize
    ) => {
      dispatch(
        addToCart(
          item,
          addToast,
          quantityCount,
          selectedProductColor,
          selectedProductSize
        )
      );
    },
    addToWishlist: (item, addToast) => {
      dispatch(addToWishlist(item, addToast));
    },
    addToCompare: (item, addToast) => {
      dispatch(addToCompare(item, addToast));
    }
  };
};

export default connect(null, mapDispatchToProps)(ProductDescriptionInfo);
