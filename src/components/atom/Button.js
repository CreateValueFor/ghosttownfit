import React from 'react'
import styled from 'styled-components'
import Text from './Text'

const StyledButton = styled.button`
  color: #fff;
  background: #232323;
  padding: 15px 20px;
  border: none;
  outline: none;
`

function Button({
  text,
  onClick,
  disabled,
  color = '#fff',
  bgColor = '#232323',
  fontSize = "14px",
  style,
  ...props
}) {
  return (
    <StyledButton
      onClick={onClick}
      disabled={disabled}
      style={{ background: bgColor, filter: disabled && "brightness(.8)", ...style }}
      {...props}
    >
      <Text text={text} fontSize={fontSize} color={color} />
    </StyledButton>
  )
}

export default Button
