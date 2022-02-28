import React from 'react'
import styled from 'styled-components'
import Text from './Text'

const StyledInput = styled.div`
  text-align: start;
  width: 100%;
  input {
    display: inline-block;
    width: 100%;
    height: 36px;
    margin: 10px 0 0;
    padding: 0 10px;
    border: 1px solid #dedfe2;
    border-radius: 0;
    font-size: 13px;
    color: #999;
    box-sizing: border-box;
  }
`

function Input({
  label,
  isLabel,
  name,
  placeholder,
  value,
  onChange,
  type,
  ...props
}) {
  return (
    <StyledInput {...props}>
      {isLabel && <Text text={label} fontSize="14px" color="#555" />}
      <input
        name={name}
        id={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </StyledInput>
  )
}

export default Input
