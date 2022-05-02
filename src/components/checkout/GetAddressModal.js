import React from 'react'
import { Modal } from 'react-bootstrap'
import DaumPostcode from 'react-daum-postcode'
import styled from 'styled-components'

const StyledModal = styled(Modal)`
  .modal {
    height: 100% !important;
  }
`

function GetAddressModal({ onCompletePost, show, onHide }) {
  const postCodeStyle = {
    display: 'block',
    position: 'relative',
    top: '0%',
    width: '100%',
    height: '400px',
    padding: '7px',
  }
  return (
    <StyledModal show={show} size="md" centered onHide={onHide}>
      <Modal.Header closeButton>배송지 검색</Modal.Header>
      <DaumPostcode
        style={postCodeStyle}
        autoClose
        onComplete={onCompletePost}
      />
    </StyledModal>
  )
}

export default GetAddressModal
