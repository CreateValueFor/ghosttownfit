import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import MetaTags from "react-meta-tags";
import { Link } from "react-router-dom";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { postLogin, postRegister } from "../../api/api";
import { Accordion, Card } from "react-bootstrap";
import UsageAgreement from "../../components/agreeement/UsageAgreement";
import PrivacyAgreement from "../../components/agreeement/PrivacyAgreement";
import ThirdPartyAgreement from "../../components/agreeement/ThirdPartyAgreement";
import useUser from "../../redux/actions/userActions";

const LoginRegister = ({ location, history }) => {
  const { pathname } = location;
  const { login } = useUser();
  const [loginData, setLoginData] = useState({});

  const [registerData, setRegisterData] = useState({});
  const [registerPhase, setRegisterPhase] = useState(0);
  const [agreement, setAgreement] = useState({});


  const onRegister = async () => {
    const res = await postRegister({
      ...registerData,
      ...agreement
    })
    if (res.success) {
      window.alert('회원가입이 완료되었습니다.')
      login(res.data)
      history.push('/')
    }
  }

  const onNext = () => {
    console.log(registerPhase)
    if (registerPhase === 0) {
      if (!agreement.usage || !agreement.private) {
        return window.alert("필수 이용약관에 대한 동의가 필요합니다.")
      }
    }
    if (registerPhase === 1) {
      if (!registerData.password || !registerData.passwordCheck || !(registerData.password === registerData.passwordCheck)) {
        return window.alert('비밀번호를 다시 확인해주세요.')
      }
    }
    if (registerPhase === 2) {
      if (!registerData.name || !registerData.phone || !registerData.email) {

      }
    }

    setRegisterPhase(prev => prev + 1)
  }
  const onCancel = () => {
    setRegisterPhase(prev => prev - 1)

  }
  const onChangeReigsterInput = (e) => {
    console.log(e);
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
                                placeholder="아이디를 입력해주세요."
                                onChange={onChangeLoginInput}
                                value={loginData.userid}
                              />
                              <input
                                type="password"
                                name="password"
                                placeholder="비밀번호를 입력해주세요."
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
                                  const res = await postLogin(loginData)
                                  login(res.data)
                                  history.push('/')
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
                                registerPhase === 0 && <Agreement agreement={agreement} setAgreement={setAgreement} />
                              }
                              {(registerPhase === 1) && (<div>
                                <input
                                  type="text"
                                  name="userid"
                                  placeholder="아이디를 입력해주세요."
                                  onChange={onChangeReigsterInput}
                                  value={registerData.userid}
                                />
                                <input
                                  type="password"
                                  name="password"
                                  placeholder="비밀번호를 입력해주세요."
                                  onChange={onChangeReigsterInput}
                                  value={registerData.password}
                                />
                                <input
                                  name="passwordCheck"
                                  placeholder="비밀번호 확인"
                                  type="password"
                                  onChange={onChangeReigsterInput}
                                  value={registerData.passwordCheck}
                                />
                              </div>)}
                              {(registerPhase === 2) && (<div>
                                <input
                                  type="text"
                                  name="name"
                                  placeholder="이름을 입력해주세요."
                                  onChange={onChangeReigsterInput}
                                  value={registerData.name}
                                />
                                <input
                                  type="number"
                                  name="phone"
                                  placeholder="- 을 제외한 전화번호를 입력해주세요."
                                  onChange={onChangeReigsterInput}
                                  value={registerData.phone}

                                />
                                <input
                                  name="email"
                                  placeholder="이메일을 입력해주세요."
                                  type="email"
                                  onChange={onChangeReigsterInput}
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
                                {registerPhase === 2 && <button style={{ marginLeft: 'auto' }} onClick={onRegister}>
                                  <span>가입하기</span>
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

function Agreement({ agreement, setAgreement }) {

  const onAgreeChange = (e, type) => {
    e.stopPropagation();

    const checked = e.target.checked;
    if (type === 'all') {
      setAgreement({
        all: checked,
        usage: checked,
        private: checked,
        thirdParty: checked,
        smsAgree: checked,
        emailAgree: checked,
      })
    } else {
      setAgreement(prev => {
        const newAgreement = { ...prev };
        newAgreement[type] = checked
        return newAgreement
      })
    }
  }

  return (
    <Accordion defaultActiveKey="0">
      <h4 className="panel-title mr-3"><label for="all">전체 동의</label>
        <input id="all" className="ml-3" type="checkbox" checked={agreement.all} onChange={(e) => { onAgreeChange(e, 'all') }} />
      </h4>
      <Card className="single-my-account mb-20">
        <Card.Header className="panel-heading">
          <Accordion.Toggle variant="link" eventKey="0">
            <h3 className="panel-title">
              <span>1. </span><label for="usage">이용약관 동의(필수)</label>
              <input id='usage' className="ml-3" type="checkbox" checked={agreement.usage} onChange={(e) => { onAgreeChange(e, 'usage') }} />
            </h3>
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body style={{ maxHeight: 300, overflowY: "scroll" }}>
            <UsageAgreement />
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card className="single-my-account mb-20">
        <Card.Header className="panel-heading">
          <Accordion.Toggle variant="link" eventKey="1">
            <h3 className="panel-title">
              <span>2 .</span> <label for="private">개인정보처리방침 동의(필수)</label>
              <input id="private" className="ml-3" type="checkbox" checked={agreement.private} onChange={(e) => { onAgreeChange(e, 'private') }} />
            </h3>
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="1">
          <Card.Body style={{ maxHeight: 300, overflowY: "scroll" }}>
            <PrivacyAgreement />
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card className="single-my-account mb-20">
        <Card.Header className="panel-heading">
          <Accordion.Toggle variant="link" eventKey="2">
            <h3 className="panel-title">
              <span>3 .</span> <label for="thirdParty">개인정보 제3자 제공 동의(선택)</label>
              <input id="thirdParty" className="ml-3" type="checkbox" checked={agreement.thirdParty} onChange={(e) => { onAgreeChange(e, 'thirdParty') }} />
            </h3>
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="2">
          <Card.Body style={{ maxHeight: 300, overflowY: "scroll" }}>
            <ThirdPartyAgreement />
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <div>
        <div>
          <label for="email">이메일 수신 동의 (선택)</label>
          <input id="email" className="ml-3" type="checkbox" checked={agreement.emailAgree} onChange={(e) => { onAgreeChange(e, 'emailAgree') }} />
        </div>
        <div>
          <label for="sms">문자 수신 동의 (선택)</label>
          <input id="sms" className="ml-3" type="checkbox" checked={agreement.smsAgree} onChange={(e) => { onAgreeChange(e, 'smsAgree') }} />
        </div>
      </div>
    </Accordion>
  )
}
