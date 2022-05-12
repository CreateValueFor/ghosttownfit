import React, { Fragment, useEffect, useState } from 'react'
import MetaTags from 'react-meta-tags'
import LayoutOne from '../../layouts/LayoutOne'
import HeroSliderOne from '../../wrappers/hero-slider/HeroSliderOne'
import FeatureIcon from '../../wrappers/feature-icon/FeatureIcon'
import TabProduct from '../../wrappers/product/TabProduct'
import BlogFeatured from '../../wrappers/blog-featured/BlogFeatured'
import styled from 'styled-components'

import { getInquiry, getPartners, postInquiry } from '../../api/api'
import { Modal } from 'react-bootstrap'
import useUserAction from '../../redux/actions/userActions'

const CSCenter = () => {
  return (
    <Fragment>
      <MetaTags>
        <title>고스트타운 | 문의센터</title>
        <meta
          name="description"
          content="Fashion home of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <LayoutOne
        headerContainerClass="container-fluid"
        headerPaddingClass="header-padding-1"
      >
        <QnA />
      </LayoutOne>
    </Fragment>
  )
}

export default CSCenter

const StyledQnA = styled.div`
  max-width: 800px;
  text-align: start;
  margin: 0 auto 50px;
  .contact-container {
    width: 100%;
    p {
      margin-bottom: 0px;
    }
    .contact-list {
      margin: 15px 0px 15px;
      border: 20px solid #eee;
      @media (max-width: 576px) {
        .col-sm-4 {
          display: flex;
          align-items: center;
          justify-content: space-between;
          img {
            width: 28px;
            height: 28px;
          }
          div {
            white-space: nowrap;
            padding: 5px 10px;
          }
        }
      }

      & > div {
        /* background: red; */
        /* width: 30%; */
        text-align: center;
        padding: 30px;

        img {
          margin: 0 auto;
          width: 20%;
          min-width: 30px;
          max-width: 100px;
          margin-bottom: 15px;
          /* height: 24px; */
        }
        p:nth-child(2) {
          margin-bottom: 15px !important;
        }
      }
    }
    .notice {
      margin: 30px 0px;
    }
  }
`

const StyledBoard = styled.div`
  .col {
    display: flex;
    flex-direction: column;
  }
  table {
    user-select: auto;
    border: 1px solid transparent;
    border-bottom: 1px solid #eee;
    tbody {
      td {
        display: flex;
        align-items: center;
        img {
          width: 16px;
          height: 16px;
        }
        .item-detail {
          display: flex;
          align-items: center;
          img {
            width: 12px;
            height: 12px;
            margin-right: 3px;
          }
        }
      }
    }
  }
`

function QnA() {
  const [inquiry, setInquiry] = useState([])
  const [inquiryModal, setInquiryModal] = useState(false)

  const onHide = () => {
    setInquiryModal(false)
  }

  useEffect(async () => {
    const res = await getInquiry(0)
    setInquiry(res)
  }, [])

  return (
    <div className="gt-container">
      <StyledQnA>
        <div className="contact-container container">
          <p className="gt-title" text="" fontSize="24px" fontWeight={700}>
            고스트타운 고객센터
          </p>
          <p text="" fontWeight={700} fontSize="20px">
            CONTACT US
          </p>
          <div className="row contact-list justify-between">
            <div className="col-sm-4" xs={12} sm={4}>
              <div>
                <img
                  src={
                    process.env.PUBLIC_URL + '/assets/img/logo/phone-call.png'
                  }
                  alt="phone"
                />
                <p fontSize="16px" fontWeight={700}>
                  전화문의
                </p>
              </div>
              <div>
                <CustomLink href="tel:070-5100-0799" text="070-5100-0799" />
                <p text=" " fontSize="16px">
                  평일 오전 10:30
                  <br />~ 오후 5:30까지
                </p>
              </div>
            </div>
            <div className="col-sm-4" xs={12} sm={4}>
              <div>
                <img
                  src={
                    process.env.PUBLIC_URL + '/assets/img/logo/kakao-talk.png'
                  }
                  alt="kakao"
                />
                <p text="" fontSize="16px" fontWeight={700}>
                  1:1 채팅 문의
                </p>
              </div>
              <CustomLink
                href="http://pf.kakao.com/_xeBtxns"
                text="카카오 채널 문의하기"
                target="_blank"
              />
            </div>
            <div className="col-sm-4" xs={12} sm={4}>
              <div>
                <img
                  src={process.env.PUBLIC_URL + '/assets/img/logo/email.png'}
                  alt="email"
                />
                <p fontSize="16px" fontWeight={700}>
                  1:1 Email 문의
                </p>
              </div>
              <CustomLink
                href="mailto:ghosttownfit@naver.com"
                text="Email 문의하기"
                target="_blank"
              />
            </div>
          </div>
          <div className="notice row">
            <div className="col-12">
              <p style={{ marginBottom: 15 }}>교환 및 환불 </p>
              <p>
                고스트타운 피트니스에서 구매하신 제품은 수령일 기준 7일 이내
                교환/반품 신청이 가능합니다.
              </p>
              <p>(소비자 사용으로 상품의 가치가 떨어진 경우 교환불가) </p>
              <p>
                고객변심으로 교환/반품 시 왕복 배송비 6,000원이 청구됩니다.{' '}
              </p>
              <p>
                * 오배송/불량으로 인한 교환/반품 시 택배비 무료, 고객이 직접
                선불로 교환/반품 발송할 경우 편도 배송비 3,000원 청구{' '}
              </p>
              <p>
                * 휴대폰 소액결제는 당월취소만 가능하며 결제자 본인명의 계좌로
                환불됩니다. 교환 / 반품 절차는 아래와 같이 진행됩니다.{' '}
              </p>
              <p>교환 / 반품 절차는 아래와 같이 진행됩니다.</p>
              <p>1. 마이페이지 - 주문조회 – 반품/교환"</p>
              <p>
                2. 배송비 입금 or 택배에 같이 동봉 (6,000원 / 구매자 직접 선불
                발송시 3,000원) "
              </p>
              <p>- 입금계좌: 국민은행 479401-04-387243 이남열(고스트타운) </p>
              <p>
                3. 배송비 입금 확인 요청 ( QNA게시판, 카카오채널톡, 인스타그램
                DM ){' '}
              </p>
              <p>
                4. 배송비 입금 확인 후 제품 수거 (1~3일 소요 / 구매자 직접
                발송가능)
              </p>
              <p>
                - (교환/반품하는 제품을 다시 포장하여 받으신 곳에 놓아주시면,
                택배사에서 연락 드린 후 수거합니다.){' '}
              </p>
              <p>5. 수거 제품 확인 후 재배송 (1~3일 소요) / 환불처리"</p>
            </div>
          </div>
          <StyledBoard className="row">
            <div className="col-12">
              <p
                style={{ marginBottom: 15 }}
                text="Q&A"
                fontSize="20px"
                fontWeight={700}
              />
              <div className="table-content table-responsive">
                <table className="table table-bordered w-100">
                  <thead>
                    <tr>
                      <th style={{ textAlign: 'center' }}>제목</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inquiry.map((item) => (
                      <tr style={{ cursor: 'pointer' }}>
                        <td style={{ display: 'flex' }}>
                          <img
                            style={{ marginRight: 12 }}
                            src={
                              process.env.PUBLIC_URL +
                              '/assets/img/icon-img/padlock.png'
                            }
                            alt="lock"
                          />
                          {item.title}
                          {item.reply > 0 && (
                            <div className="item-detail">
                              <img
                                style={{ marginLeft: 12 }}
                                src={
                                  process.env.PUBLIC_URL +
                                  '/assets/img/icon-img/speech-bubble.png'
                                }
                                alt="reply"
                              />
                              <p text={item.reply} fontSize="12px" />
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button
                  className="cscenter-btn"
                  onClick={() => {
                    setInquiryModal(true)
                  }}
                >
                  문의하기
                </button>
              </div>
              {/* <Link to="/add-qna"><Button style={{ alignSelf: "flex-end" }} text="문의하기" /></Link> */}
            </div>
          </StyledBoard>
        </div>
      </StyledQnA>
      <InquiryModal onHide={onHide} show={inquiryModal} />
    </div>
  )
}

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

function InquiryModal({ show, onHide }) {
  const [inquiryData, setInquiryData] = useState({})
  const [inquiryThumb, setInquiryThumb] = useState(null)

  const { isLoggedIn } = useUserAction()

  const onChange = (e) => {
    const { value, name } = e.target
    setInquiryData((prev) => {
      const newInquiryData = { ...prev }
      newInquiryData[name] = value
      return newInquiryData
    })
  }

  const onSubmit = async () => {
    if (!isLoggedIn) {
      return window.alert('로그인 후 시도해주세요.')
    }
    if (!inquiryData.title) {
      return window.alert('문의 제목을 입력해주세요')
    }
    if (!inquiryData.contents) {
      return window.alert('문의 내용을 입력해주세요')
    }

    const formData = new FormData()
    formData.append('title', inquiryData.title)
    formData.append('thumb', inquiryThumb)
    formData.append('contents', inquiryData.contents)
    try {
      const res = await postInquiry(formData)
      window.alert(
        '문의가 정상적으로 등록되었습니다. 빠른 시일 내에 답변드리겠습니다.'
      )
      onHide()
      window.location.reload()
      console.log(res)
    } catch (err) {
      console.log(err)
      window.alert('시스템 에러가 발생하였습니다. 잠시 후 시도해주세요.')
      onHide()
    }
  }

  return (
    <Fragment>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>문의하기</Modal.Header>

        <div className="modal-body">
          <div className="row">
            <div class="col">
              <label htmlFor="title">문의 제목</label>
              <input
                id="title"
                name="title"
                placeholder="문의 제목을 입력해주세요."
                className="mb-3"
                value={inquiryData.title}
                onChange={onChange}
              />
              <label htmlFor="thumb">사진 첨부(선택)</label>
              <input
                id="thumb"
                name="thumb"
                type="file"
                placeholder="문의 제목을 입력해주세요."
                className="mb-3"
                onChange={(e) => {
                  const file = e.target.files[0]
                  setInquiryThumb(file)
                }}
              />
              <label htmlFor="contents">문의 내용</label>
              <textarea
                id="contents"
                name="contents"
                placeholder="문의 내용을 입력해주세요."
                value={inquiryData.contents}
                onChange={onChange}
              />
              <div className="d-flex" style={{ alignItems: 'center' }}>
                <label
                  htmlFor="isPrivate"
                  className="mb-0"
                  style={{ whiteSpace: 'nowrap' }}
                >
                  비밀글 여부
                </label>
                <input
                  type="checkbox"
                  name="isPrivate"
                  id="isPrivate"
                  onChange={onChange}
                />
              </div>
            </div>
          </div>
        </div>
        <Modal.Footer>
          <button className="cancel" onClick={onHide}>
            취소
          </button>
          <button className="ok" onClick={onSubmit}>
            문의 등록
          </button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  )
}
