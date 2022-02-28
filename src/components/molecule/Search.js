import React from 'react'
import styled from 'styled-components'
import search from '../../assets/images/search.png'

const StyledInput = styled.div`
  display: flex;
  align-items: center;

  input {
    border-bottom: 1px solid black;
    outline: none;
    width: 150px;
    background: transparent;
  }
  img {
    width: 16px;
    height: 16px;
  }
`

function Input() {
  return (
    <StyledInput>
      <input />
      <img src={search} alt="search" />
    </StyledInput>
  )
}

export default Input
