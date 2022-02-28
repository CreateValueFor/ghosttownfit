import React from 'react';
import styled from 'styled-components';

const StyledText = styled.p`
  font-style : "Heebo","Noto Sans KR","맑은 고딕","Malgun Gothic",sans-serif !important;
  margin-bottom: 0;
`;

function Text({ text, fontSize, fontWeight, style, color = "#232323", ...props }) {
  return (
    <StyledText style={{ color, fontSize, fontWeight, ...style }} {...props}>
      {text}
    </StyledText>
  );
}

export default Text;