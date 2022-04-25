import React, { Fragment, useState } from 'react'
import MetaTags from 'react-meta-tags'
import LayoutOne from '../../layouts/LayoutOne'
import HeroSliderOne from '../../wrappers/hero-slider/HeroSliderOne'
import FeatureIcon from '../../wrappers/feature-icon/FeatureIcon'
import TabProduct from '../../wrappers/product/TabProduct'
import BlogFeatured from '../../wrappers/blog-featured/BlogFeatured'
import { Modal, Button } from 'react-bootstrap'
import styled from 'styled-components'

const HomeFashion = () => {
  const [noticeOpen, setNoticeOpen] = useState(true)
  return (
    <Fragment>
      <MetaTags>
        <title>고스트타운 | 홈</title>
        <meta
          name="description"
          content="Fashion home of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <NoticeModal show={noticeOpen} onHide={() => setNoticeOpen(false)} />
      <LayoutOne
        headerContainerClass="container-fluid"
        headerPaddingClass="header-padding-1"
      >
        {/* hero slider */}
        <HeroSliderOne />

        {/* featured icon */}
        {/* <FeatureIcon spaceTopClass="pt-100" spaceBottomClass="pb-60" /> */}

        {/* tab product */}
        <TabProduct spaceBottomClass="pb-60" category="fashion" />

        {/* blog featured */}
        <BlogFeatured spaceBottomClass="pb-55" />
      </LayoutOne>
    </Fragment>
  )
}

export default HomeFashion

function NoticeModal(props) {
  return (
    <StyledModal {...props} size="md" centered>
      <a href="https://smartstore.naver.com/ghosttownfit">
        <img
          style={{ objectFit: 'cover', width: '100%' }}
          src={process.env.PUBLIC_URL + '/assets/notice.png'}
          alt="notice"
        />
      </a>
      {/* <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
    </StyledModal>
  )
}

const StyledModal = styled(Modal)`
  .modal {
    height: 100vh !important;
  }
`
