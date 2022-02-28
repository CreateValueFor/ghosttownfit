import Button from '../components/atom/Button'
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import styled from 'styled-components'
import main from '../assets/images/main.png'
import mainThumb from '../assets/images/main_thumb.png'
import Text from '../components/atom/Text'
import womenBg from '../assets/images/women-bg.jpeg'
import more1 from '../assets/images/more_1.jpeg'
import { dummy } from '../dummy/product'
import { StyledProduct, StyledRow } from '../components/molecule/Container'

const StyledMain = styled(Container)`
  .video {
    position: relative;
    video {
      height: 100vh;
      width: 100%;
      object-fit: cover;
    }
    .video-detail {
      position: absolute;
      bottom: 100px;
      left: 53px;
      text-align: start;
    }
  }
  .summary {
    padding: 10% 50px;
    img {
      width: 100%;
    }
    .detail {
      text-align: start;
    }
  }
`

const StyledWomenBg = styled(StyledRow)`
  position: relative;
  height: 700px;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.1);
    background: url(${womenBg});
    /* opacity: 0.8; */
    background-position: center;
    z-index: -1;
  }
  &::after {
    content: '';
  }
`

const StyledMore = styled(StyledRow)`
  img {
    object-fit: cover;
  }
`

function Main() {
  return (
    <StyledMain fluid>
      <Row>
        <Col lg={9} className="video" style={{ padding: 0 }}>
          <img src={main} alt="main" />
          <div className="video-detail">
            <Text
              fontWeight={700}
              color="#fff"
              text="우리는 곧 준비운동을 시작합니다."
              fontSize="28px"
              style={{ marginBottom: 17, letterSpacing: 1.5 }}
            />
            <Text
              style={{ letterSpacing: 1.0 }}
              fontWeight={500}
              color="#fff"
              fontSize="17px"
              text="고스트타운은 건전한 헬스문화의 확산과 즐거움을 알리는데 목표를 두고있습니다. "
            />
            <Text
              style={{ letterSpacing: 1 }}
              fontWeight={500}
              color="#fff"
              fontSize="17px"
              text="최고의 품질의 옷으로 여러분의 성장에 아름다움을 드리겠습니다."
            />
          </div>
          {/* <video
            autoPlay
            loop
            muted
            playsInline
            poster
            src="https://drive.google.com/u/0/uc?id=1N67fLztq72uNtxt4kotngdfEK4T_LX5G&export=download"
          ></video> */}
        </Col>
        <Col lg={3} className="summary">
          <img src={mainThumb} alt="thumb" />
          <div className="detail">
            <Text
              fontSize=".875rem"
              fontWeight={500}
              text="고스트타운의 시작"
            />
            <Text fontSize="1.5rem" fontWeight={700} text="기본적인 아름다움" />
            <Text
              fontSize=".875rem"
              text="고스트타운의 첫 프로젝트,헬스의 즐거움과 아름다움의 가치에 당신을 더하다."
            />
            <Button text="상품 보기" />
          </div>
        </Col>
      </Row>
      <StyledRow style={{ paddingBottom: 0 }}>
        <Col>
          <Text
            style={{ marginBottom: 60 }}
            fontWeight={700}
            fontSize="28px"
            text="남성을 위한 의류"
          />
        </Col>
      </StyledRow>
      <StyledRow style={{ paddingTop: 0 }}>
        {dummy.map((item) => (
          <StyledProduct
            xs={6}
            lg={4}
            xl={3}
            style={{ marginBottom: 28, position: 'relative' }}
          >
            <div className="product--image" style={{ position: 'relative' }}>
              <img style={{ width: '100%' }} src={item.img} alt="pic" />
              <div
                className="product--buy"
                style={{ position: 'absolute', bottom: 0 }}
              >
                <div style={{ display: 'flex', marginBottom: 10 }}>
                  <Button color="#232323" bgColor="#fff" text="lg" />
                  <Button color="#232323" bgColor="#fff" text="m" />
                </div>
                <Button text="장바구니 담기"></Button>
              </div>
            </div>
            {/* Text align center  */}
            <Text
              fontWeight={700}
              text={item.title}
              style={{ textAlign: 'center' }}
            />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Text text={'₩' + item.price} />
              <div
                style={{
                  marginLeft: 10,
                  display: 'inline',
                  background: 'yellow',
                }}
              >
                NEW
              </div>
            </div>
          </StyledProduct>
        ))}
      </StyledRow>
      <StyledWomenBg>
        <Col>
          <div style={{ maxWidth: 600 }}>
            <Text
              fontWeight={700}
              color="#fff"
              fontSize="28px"
              text="여성을 위한 의류도 곧 출시됩니다."
              style={{ marginBottom: 15 }}
            />
            <Text
              fontWeight={500}
              color="#fff"
              fontSize="17px"
              text="선수복같이 너무 과하지 않으면서 운동 시 충분한 근육 움직임을 확인할 수 있는 완벽한 패턴으로 고급 면사를 사용한 고스트타운만의 과하지 않는 포인트 자수를 겸해 당신을 위한 최고의 운동복을 제시할 예정입니다."
              style={{ marginBottom: 50 }}
            />

            <Button color="#232323" bgColor="#fff" text="Comming Soon" />
          </div>
        </Col>
      </StyledWomenBg>
      <StyledMore>
        <Col xl={4}>
          <img src={more1} alt="more_1" />
          <Text
            style={{ marginTop: 15 }}
            fontSize="17px"
            fontWeight={500}
            text="탄생 과정"
          />
          <Text
            style={{ marginTop: 5 }}
            fontSize="14px"
            text="고스트타운의 제조과정을 소개합니다."
          />
          <Button text="공개 예정" style={{ marginTop: 15 }} />
        </Col>
        <Col xl={4}>
          <img src={more1} alt="more_1" />
          <Text
            style={{ marginTop: 15 }}
            fontSize="17px"
            fontWeight={500}
            text="탄생 과정"
          />
          <Text
            style={{ marginTop: 5 }}
            fontSize="14px"
            text="고스트타운의 제조과정을 소개합니다."
          />
          <Button text="공개 예정" style={{ marginTop: 15 }} />
        </Col>
        <Col xl={4}>
          <img src={more1} alt="more_1" />
          <Text
            style={{ marginTop: 15 }}
            fontSize="17px"
            fontWeight={500}
            text="탄생 과정"
          />
          <Text
            style={{ marginTop: 5 }}
            fontSize="14px"
            text="고스트타운의 제조과정을 소개합니다."
          />
          <Button text="공개 예정" style={{ marginTop: 15 }} />
        </Col>
      </StyledMore>
    </StyledMain>
  )
}

export default Main
