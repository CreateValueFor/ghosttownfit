import React from 'react';
import styled from 'styled-components';
import Text from '../components/atom/Text';
import { LOOKBOOK } from '../dummy/lookbook';


const StyledLookBook = styled.div`
  
  max-width: 800px;
  margin-right: auto;
  margin-left: auto;
  img{
    margin-bottom: 50px;
  }
`;

function LookBook() {

  return (
    <StyledLookBook className="gt-container">
      <Text className="gt-title" text="Season 1" fontSize="24px" fontWeight={700} />
      <ul style={{ padding: "0px 15px 15px" }}>
        {LOOKBOOK.map((item, idx) => (
          <img key={idx} src={require(`../assets/images/lookbook/${item}`)} />
        ))}
      </ul>
    </StyledLookBook>
  );
}

export default LookBook;