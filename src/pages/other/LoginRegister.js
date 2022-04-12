import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import MetaTags from "react-meta-tags";
import { Link } from "react-router-dom";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { postLogin } from "../../api/api";
import { Accordion, Card } from "react-bootstrap";

const LoginRegister = ({ location }) => {
  const { pathname } = location;
  const [loginData, setLoginData] = useState({});

  const [registerData, setRegisterData] = useState({});
  const [registerPhase, setRegisterPhase] = useState(0);

  const onNext = () => {
    setRegisterPhase(prev => prev + 1)
  }
  const onCancel = () => {
    setRegisterPhase(prev => prev - 1)

  }
  const onChangeReigsterInput = (e) => {
    const { value, name } = e.target;
    setRegisterData(prev => {
      const newRegisterData = { ...prev }
      newRegisterData[name] = value;
      return newRegisterData
    })
  }

  const onChangeLoginInput = (e) => {
    const { value, name } = e.target;
    setLoginData(prev => {
      const newLoginData = { ...prev }
      newLoginData[name] = value;
      return newLoginData
    })
  }

  return (
    <Fragment>
      <MetaTags>
        <title>고스트타운 | 로그인</title>
        <meta
          name="description"
          content="Compare page of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Login Register
      </BreadcrumbsItem>
      <LayoutOne >
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="login-register-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12 ml-auto mr-auto">
                <div className="login-register-wrapper">
                  <Tab.Container defaultActiveKey="login">
                    <Nav variant="pills" className="login-register-tab-list">
                      <Nav.Item>
                        <Nav.Link eventKey="login">
                          <h4>로그인</h4>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="register">
                          <h4>회원가입</h4>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="login">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form onSubmit={(e) => { e.preventDefault() }}>
                              <input
                                type="text"
                                name="userid"
                                placeholder="Username"
                                onChange={onChangeLoginInput}
                                value={loginData.userid}
                              />
                              <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                onChange={onChangeLoginInput}
                                value={loginData.password}
                              />
                              <div className="button-box">
                                <div className="login-toggle-btn">
                                  <input type="checkbox" />
                                  <label className="ml-10">Remember me</label>
                                  <Link to={process.env.PUBLIC_URL + "/"}>
                                    Forgot Password?
                                  </Link>
                                </div>
                                <button onClick={async () => {
                                  await postLogin(loginData)
                                }}>
                                  <span>Login</span>
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="register">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form onSubmit={(e) => { e.preventDefault(); }}>
                              {
                                registerPhase === 0 && <Agreement />
                              }
                              {(registerPhase === 1) && (<div>
                                <input
                                  type="text"
                                  name="userid"
                                  placeholder="아이디를 입력해주세요."
                                  onClick={onChangeReigsterInput}
                                  value={registerData.userid}
                                />
                                <input
                                  type="password"
                                  name="password"
                                  placeholder="비밀번호를 입력해주세요."
                                  onClick={onChangeReigsterInput}
                                  value={registerData.password}
                                />
                                <input
                                  name="passwordCheck"
                                  placeholder="비밀번호 확인"
                                  type="password"
                                  onClick={onChangeReigsterInput}
                                  value={registerData.passwordCheck}
                                />
                              </div>)}
                              {(registerPhase === 2) && (<div>
                                <input
                                  type="text"
                                  name="name"
                                  placeholder="이름을 입력해주세요."
                                  onClick={onChangeReigsterInput}
                                  value={registerData.name}
                                />
                                <input
                                  type="number"
                                  name="phone"
                                  placeholder="- 을 제외한 전화번호를 입력해주세요."
                                  onClick={onChangeReigsterInput}
                                  value={registerData.phone}

                                />
                                <input
                                  name="email"
                                  placeholder="이메일을 입력해주세요."
                                  type="email"
                                  onClick={onChangeReigsterInput}
                                  value={registerData.email}
                                />
                              </div>)}

                              <div className="button-box d-flex">
                                {registerPhase > 0 && <button onClick={onCancel} style={{ marginRight: "auto" }}>
                                  <span>뒤로 가기</span>
                                </button>}
                                {registerPhase < 2 && <button onClick={onNext} style={{ marginLeft: 'auto' }}>
                                  <span>다음</span>
                                </button>}
                              </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

LoginRegister.propTypes = {
  location: PropTypes.object
};

export default LoginRegister;

function Agreement() {

  return (
    <Accordion defaultActiveKey="0">
      <Card className="single-my-account mb-20">
        <Card.Header className="panel-heading">
          <Accordion.Toggle variant="link" eventKey="0">
            <h3 className="panel-title">
              <span>1 .</span> Edit your account information{" "}
            </h3>
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            <div className="myaccount-info-wrapper">
              <div className="account-info-wrapper">
                <h4>My Account Information</h4>
                <h5>Your Personal Details</h5>
              </div>
              <div className="row">
                <div className="col-lg-6 col-md-6">
                  <div className="billing-info">
                    <label>First Name</label>
                    <input type="text" />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="billing-info">
                    <label>Last Name</label>
                    <input type="text" />
                  </div>
                </div>
                <div className="col-lg-12 col-md-12">
                  <div className="billing-info">
                    <label>Email Address</label>
                    <input type="email" />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="billing-info">
                    <label>Telephone</label>
                    <input type="text" />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="billing-info">
                    <label>Fax</label>
                    <input type="text" />
                  </div>
                </div>
              </div>
              <div className="billing-back-btn">
                <div className="billing-btn">
                  <button type="submit">Continue</button>
                </div>
              </div>
            </div>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card className="single-my-account mb-20">
        <Card.Header className="panel-heading">
          <Accordion.Toggle variant="link" eventKey="1">
            <h3 className="panel-title">
              <span>2 .</span> Change your password
            </h3>
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="1">
          <Card.Body>
            <div className="myaccount-info-wrapper">
              <div className="account-info-wrapper">
                <h4>Change Password</h4>
                <h5>Your Password</h5>
              </div>
              <div className="row">
                <div className="col-lg-12 col-md-12">
                  <div className="billing-info">
                    <label>Password</label>
                    <input type="password" />
                  </div>
                </div>
                <div className="col-lg-12 col-md-12">
                  <div className="billing-info">
                    <label>Password Confirm</label>
                    <input type="password" />
                  </div>
                </div>
              </div>
              <div className="billing-back-btn">
                <div className="billing-btn">
                  <button type="submit">Continue</button>
                </div>
              </div>
            </div>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card className="single-my-account mb-20">
        <Card.Header className="panel-heading">
          <Accordion.Toggle variant="link" eventKey="2">
            <h3 className="panel-title">
              <span>3 .</span> Modify your address book entries{" "}
            </h3>
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="2">
          <Card.Body>
            <div className="myaccount-info-wrapper">
              <div className="account-info-wrapper">
                <h4>Address Book Entries</h4>
              </div>
              <div className="entries-wrapper">
                <div className="row">
                  <div className="col-lg-6 col-md-6 d-flex align-items-center justify-content-center">
                    <div className="entries-info text-center">
                      <p>John Doe</p>
                      <p>Paul Park </p>
                      <p>Lorem ipsum dolor set amet</p>
                      <p>NYC</p>
                      <p>New York</p>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 d-flex align-items-center justify-content-center">
                    <div className="entries-edit-delete text-center">
                      <button className="edit">Edit</button>
                      <button>Delete</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="billing-back-btn">
                <div className="billing-btn">
                  <button type="submit">Continue</button>
                </div>
              </div>
            </div>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  )
}
