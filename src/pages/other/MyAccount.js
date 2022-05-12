import PropTypes from 'prop-types'
import React, { Fragment, useEffect, useState } from 'react'
import MetaTags from 'react-meta-tags'
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic'
import Card from 'react-bootstrap/Card'
import Accordion from 'react-bootstrap/Accordion'
import LayoutOne from '../../layouts/LayoutOne'
import Breadcrumb from '../../wrappers/breadcrumb/Breadcrumb'
import { destoryUser, getOrder } from '../../api/api'
import { orderStatus } from '../../api/custom'
import useUserAction from '../../redux/actions/userActions'

const MyAccount = ({ location, history }) => {
  const { pathname } = location
  const [orders, setOrders] = useState([])
  const { user, isLoggedIn, logout } = useUserAction()
  useEffect(async () => {
    const res = await getOrder()
    setOrders(res.data)
  }, [])

  return (
    <Fragment>
      <MetaTags>
        <title>고스트타운 | 계정관리</title>
        <meta
          name="description"
          content="Compare page of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + '/'}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        My Account
      </BreadcrumbsItem>
      <LayoutOne>
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="myaccount-area pb-80 pt-100">
          <div className="container">
            <div className="row">
              <div className="ml-auto mr-auto col-lg-9">
                <div className="myaccount-wrapper" style={{ minHeight: 500 }}>
                  <h2>주문 목록</h2>
                  <table style={{ minHeight: 500 }} className="table table-bordered w-100 mb-5">
                    <thead>
                      <tr>
                        <th style={{ textAlign: 'center' }}>상품정보</th>
                        <th style={{ textAlign: 'center' }}>주문일자</th>
                        <th style={{ textAlign: 'center' }}>주문번호</th>
                        <th style={{ textAlign: 'center' }}>주문금액(수량)</th>
                        <th style={{ textAlign: 'center' }}>주문 상태</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.length ? orders.map((item) => (
                        <tr>
                          <td>{item.name}</td>
                          <td>{`${item.serialNumber.substr(0, 4)}년 
                        ${item.serialNumber.substr(4, 2)}월
                        ${item.serialNumber.substr(6, 2)}일
                        `}</td>
                          <td>{item.serialNumber}</td>
                          <td>{item.eachAmount * item.count}</td>
                          <td>{orderStatus(item.status)}</td>
                        </tr>
                      )) : (
                        <tr >
                          <td colSpan={5} >
                            <div style={{ minHeight: 450, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                              주문 내역이 없습니다.
                            </div>
                          </td>
                        </tr>

                      )}
                    </tbody>
                  </table>

                  <h2>회원 탈퇴</h2>

                  <div className='destory-user--guide'>
                    <p >회원탈퇴 신청 전 안내 사항을 확인 해 주세요.</p>
                    <p >회원탈퇴를 신청하시면 현재 로그인 된 아이디는 사용하실 수 없습니다.</p>
                    <p >회원탈퇴를 하더라도, 서비스 약관 및 개인정보 취급방침 동의하에 따라 일정 기간동안 회원 개인정보를 보관합니다.</p>
                    <p ><br /></p>
                    <p >- 주문 정보</p>
                    <p >- 상품 구입 및 대금 결제에 관한 기록</p>
                    <p >- 상품 배송에 관한 기록</p>
                    <p >- 소비자 불만 또는 처리 과정에 관한 기록</p>
                    <p >- 게시판 작성 및 사용후기에 관한 기록</p>
                    <p ><br /></p>
                    <p >※ 상세한 내용은 사이트 내 개인정보 취급방침을 참고 해 주세요.</p>
                    <p ><br /></p>
                    <button onClick={async () => {
                      const confirm = window.confirm('회원탈퇴를 진행하시겠습니까?')
                      if (confirm) {

                        await destoryUser();
                        window.alert("회원탈퇴가 완료되었습니다.")
                        logout()
                        history.push('/')
                      }

                    }} className='button'>회원 탈퇴</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  )
}

MyAccount.propTypes = {
  location: PropTypes.object,
}

export default MyAccount
