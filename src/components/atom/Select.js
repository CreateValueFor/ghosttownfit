import React from 'react'
import styled from 'styled-components'

const StyledSelect = styled.select`
  font-size: 14px;
  padding: 8px 24px 8px 12px;
  border: 1px solid #ddd;
  width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
  line-height: 1.42857143;
`

function Select({ options, onChange, value, ...props }) {
  return (
    <StyledSelect value={value} {...props}>
      {options.map((item) => (
        <option value={item.value}>{item.text}</option>
      ))}
    </StyledSelect>
  )
}

export default Select
