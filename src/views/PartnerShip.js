import React from 'react';
import { Col, Row } from 'react-bootstrap';
import styled from 'styled-components';
import Text from '../components/atom/Text';

const StyledPartner = styled.div`
  /* max-width: 800px; */
  height: 800px;
  /* background: red; */

`;

function PartnerShip() {
  return (
    <StyledPartner className="gt-container">
      <Text className="gt-title" text="고스트타운 파트너쉽" fontSize="24px" fontWeight={700} />
      <Row>
        <Col>
          {/* <img src={require()} /> */}
        </Col>
      </Row>
    </StyledPartner>
  );
}

export default PartnerShip;