import PropTypes from 'prop-types'
import React, { Fragment, useEffect, useState } from 'react'
import { LightgalleryProvider, LightgalleryItem } from 'react-lightgallery'
import Swiper from 'react-id-swiper'
import ProductImageSlider from './ProductImageSlider'

import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  CarouselStoreInterface,
} from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css'

const PUBLIC_URL =
  'https://ghost.callenge.co.kr/public/products/11/displaies/be0097f8-4cbb-4970-b86c-08b1548a9c1e'

const ProductImageGallery = ({ product }) => {
  const [gallerySwiper, getGallerySwiper] = useState(null)
  const [thumbnailSwiper, getThumbnailSwiper] = useState(null)
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    console.log(currentSlide)
    console.log(product.image[1])
  }, [currentSlide])

  // effect for swiper slider synchronize
  useEffect(() => {
    if (
      gallerySwiper !== null &&
      gallerySwiper.controller &&
      thumbnailSwiper !== null &&
      thumbnailSwiper.controller
    ) {
      gallerySwiper.controller.control = thumbnailSwiper
      thumbnailSwiper.controller.control = gallerySwiper
    }
  }, [gallerySwiper, thumbnailSwiper])

  // swiper slider settings
  const gallerySwiperParams = {
    getSwiper: getGallerySwiper,
    spaceBetween: 10,
    loopedSlides: 4,
    loop: false,
    effect: 'fade',
    slideToClickedSlide: true,
  }

  return (
    <Fragment>
      <div className="product-large-image-wrapper">
        {product.discount || product.new ? (
          <div className="product-img-badges">
            {product.discount ? (
              <span className="pink">-{product.discount}%</span>
            ) : (
              ''
            )}
            {product.new ? <span className="purple">New</span> : ''}
          </div>
        ) : (
          ''
        )}
        <LightgalleryProvider>
          {/* <Swiper {...gallerySwiperParams}>
            {product.image &&
              product.image.map((single, key) => {
                return (
                  <div key={key}>
                    <LightgalleryItem
                      group="any"
                      src={process.env.PUBLIC_URL + single}
                    >
                      <button>
                        <i className="pe-7s-expand1"></i>
                      </button>
                    </LightgalleryItem>
                    <div
                      className="single-image"
                      style={{
                        position: 'relative',
                        width: '100%',
                        height: 0,
                        paddingBottom: '150%',
                      }}
                    >
                      <img
                        src={process.env.PUBLIC_URL + single}
                        className="img-fluid"
                        alt=""
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                        }}
                      />
                    </div>
                  </div>
                )
              })}
          </Swiper> */}
          <div>
            <LightgalleryItem
              group="any"
              src={process.env.PUBLIC_URL + product.image[currentSlide]}
            >
              <button>
                <i className="pe-7s-expand1"></i>
              </button>
            </LightgalleryItem>
            <div
              className="single-image"
              style={{
                position: 'relative',
                width: '100%',
                height: 0,
                paddingBottom: '150%',
              }}
            >
              <img
                src={process.env.PUBLIC_URL + product.image[currentSlide]}
                className="img-fluid"
                alt=""
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                }}
              />
            </div>
          </div>
        </LightgalleryProvider>
      </div>
      <div className="product-small-image-wrapper mt-15">
        <CarouselProvider
          naturalSlideWidth={500}
          naturalSlideHeight={800}
          totalSlides={product.image.length}
          visibleSlides={4}
          currentSlide={0}
          touchEnabled={true}
          dragEnabled={true}
        >
          <Slider style={{ marginRight: -10, position: 'relative' }}>
            {product.image.map((single, key) => {
              return (
                <Slide index={key}>
                  <div
                    className="single-image "
                    style={{
                      position: 'relative',
                      width: '100%',

                      // width: 100,
                      height: 0,
                      paddingBottom: '150%',
                    }}
                    onClick={() => {
                      setCurrentSlide(key)
                    }}
                  >
                    {key}
                    <img
                      src={process.env.PUBLIC_URL + single}
                      className={[
                        'img-fluid ' + key,
                        key == currentSlide ? 'selected' : '',
                      ].join(' ')}
                      alt={'product ' + key}
                      style={{
                        objectFit: 'cover',
                        position: 'absolute',
                        // paddingRight: key + 10,
                        top: 0,
                        left: 0,
                        width: 'calc(100% - 10px)',
                        height: '100%',
                      }}
                    />
                  </div>
                </Slide>
              )
            })}
          </Slider>
          <ButtonBack
            style={{
              position: 'absolute',
              top: '50%',
              transform: 'translateY(-100%)',
              background: 'none',
              border: 'none',
              outline: 'none',
            }}
          >
            <img
              onClick={() => {
                setCurrentSlide((prev) => {
                  console.log(prev)
                  if (prev === 0) {
                    return prev
                  }
                  return prev - 1
                })
              }}
              style={{ width: 20 }}
              src={process.env.PUBLIC_URL + '/assets/img/slider/prev.png'}
              alt="prev"
            />
          </ButtonBack>
          <ButtonNext
            style={{
              position: 'absolute',
              top: '50%',
              right: 0,
              transform: 'translateY(-100%)',
              background: 'none',
              border: 'none',
              outline: 'none',
            }}
          >
            <img
              style={{ width: 20 }}
              onClick={() => {
                setCurrentSlide((prev) => {
                  console.log(prev)
                  console.log(product.image.length)
                  if (prev === product.image.length - 1) {
                    return prev
                  }
                  return prev + 1
                })
              }}
              src={process.env.PUBLIC_URL + '/assets/img/slider/next.png'}
              alt="next"
            />
          </ButtonNext>
        </CarouselProvider>
      </div>
    </Fragment>
  )
}

ProductImageGallery.propTypes = {
  product: PropTypes.object,
}

export default ProductImageGallery
