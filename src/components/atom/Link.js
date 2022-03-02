import React from 'react'
import styled from 'styled-components'

const StyledLink = styled.a`
  font-style: 'Heebo', 'Noto Sans KR', '맑은 고딕', 'Malgun Gothic', sans-serif !important;
  margin-bottom: 0;
  /* text-decoration: none; */
`

function CustomLink({
  text,
  href,
  color = '#232323',
  fontSize,
  fontWeight,
  style,
  ...props
}) {
  return (
    <StyledLink
      href={href}
      style={{ color, fontSize, fontWeight, ...style }}
      {...props}
    >
      {text}
    </StyledLink>
  )
}

export default CustomLink
