import React from 'react'
import styled from 'styled-components'
import Text from './Text'

const StyledCheck = styled.div`
  label {
    display: flex;
    align-items: center;

    input {
      margin-right: ${(props) => (props.isLabel ? '10px' : '0px')};
    }
  }
`

function Check({
  label,
  isLabel,
  checked,
  name,
  onChange,
  fontSize = '12px',
  ...props
}) {
  return (
    <StyledCheck isLabel {...props}>
      <label>
        <input
          name={name}
          id={name}
          type="checkbox"
          onChange={onChange}
          checked={checked}
        />
        {isLabel && <Text text={label} fontSize={fontSize} />}
      </label>
    </StyledCheck>
  )
}

export default Check
