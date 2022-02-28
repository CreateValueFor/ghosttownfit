import React from 'react'
import { Col, Row } from 'react-bootstrap'
import styled from 'styled-components'
import Text from '../atom/Text'

const StyledFooter = styled.div`
  width: 100%;
  text-align: start;
  padding: 0px 50px 50px;
  margin-top: 100px;
  .footer-list {
    padding-right: 100px;
  }
`

function Footer() {
  return (
    <StyledFooter>
      <Row className="footer-list" style={{ marginBottom: 30 }}>
        <Col
          className="footer-item"
          md={12}
          lg={3}
          style={{ marginBottom: 30 }}
        >
          <Text text="About" fontSize="14px" fontWeight={500} />
          <Text
            style={{ marginTop: 50, lineHeight: '1.3rem' }}
            text="고스트타운, 우리의 목표는 건전한 헬스 문화의 확산과 즐거움을 알리는데 있습니다. 고품질의 옷으로 당신의 근성장에 아름다움을 더하겠습니다. 헬스의 가치와 아름다움의 긍정적인 효과를 전달한 일원이 되십시오."
            fontSize="14px"
          />
        </Col>
        <Col className="footer-item">
          <Text text="Information" fontSize="14px" fontWeight={500} />
          <Text style={{ marginTop: 50 }} text="룩북" fontSize="14px" />
          <Text text="입고일정" fontSize="14px" />
          <Text text="파트너쉽" fontSize="14px" />
          <Text text="브랜드 스토리" fontSize="14px" />
          <Text text="고객센터" fontSize="14px" />
        </Col>
        <Col className="footer-item">
          <Text text="Address" fontSize="14px" fontWeight={500} />
          <Text
            style={{ marginTop: 50 }}
            text="충청남도 천안시 신부8길21 113-160"
            fontSize="14px"
          />
          <Text text="고스트타운" fontSize="14px" />
        </Col>
        <Col className="footer-item">
          <Text text="Contact" fontSize="14px" fontWeight={500} />
          <Text
            style={{ marginTop: 50 }}
            text="010-5215-0550"
            fontSize="14px"
          />
          <Text text="ghosttownfit@naver.com" fontSize="14px" />
        </Col>
        <Col className="footer-item">
          <Text text="Follow" fontSize="14px" fontWeight={500} />
          <Text style={{ marginTop: 50 }} text="인스타그램" fontSize="14px" />
        </Col>
      </Row>
      <Row>
        <Col>
          <Text text="상호명: 고스트타운" fontSize="13px" color="#555" />
          <Text text="대표자명: 박창진, 이남열" fontSize="13px" color="#555" />
          <Text
            text="사업자등록번호: 594-02-02002 확인"
            fontSize="13px"
            color="#555"
          />
          <Text
            text="통신판매신고번호: 제 2021-충남천안-1199 호"
            fontSize="13px"
            color="#555"
          />
          <Text
            text="입금계좌: 국민은행 479401-04-387243"
            fontSize="13px"
            color="#555"
          />
          <Text
            text="Copyright© GhostTown. All Rights Reserved."
            fontSize="13px"
            color="#555"
          />
        </Col>
      </Row>
    </StyledFooter>
  )
}

export default Footer
