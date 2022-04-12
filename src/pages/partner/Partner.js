import React, { Fragment, useEffect, useState } from 'react'
import MetaTags from 'react-meta-tags'
import LayoutOne from '../../layouts/LayoutOne'
import styled from 'styled-components'
import { getPartners } from '../../api/api'

const Partnership = () => {
  const [partners, setPartners] = useState([])

  useEffect(async () => {
    setPartners(await getPartners())
  }, [])

  const onClick = () => {
    console.log('hh')
  }

  return (
    <Fragment>
      <MetaTags>
        <title>Flone | Fashion Home</title>
        <meta
          name="description"
          content="Fashion home of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <LayoutOne
        headerContainerClass="container-fluid"
        headerPaddingClass="header-padding-1"
      >
        <StyledPartner className="partnership container">
          <img
            src="https://ghosttown.s3.ap-northeast-2.amazonaws.com/브랜드스토리 (2)/5.공식후원선수.PNG"
            alt="brandstory-4"
          />
          <button
            className="button"
            onClick={onClick}
            style={{ float: 'right' }}
          >
            파트너쉽 문의
          </button>

          {partners.map((item, idx) => (
            <div className="row">
              <div className="col-lg-6">
                <img src={item.image} alt={`partner-${idx}`} />
              </div>
              <div className="col-lg-6 d-flex flex-column">
                <p className="partner-title">{item.name} 선수님</p>
                <pre className="flex-grow-1">{item.contents}</pre>
                <div className="d-flex">
                  {item.instagram !== 'undefined' && (
                    <a href={item.instagram} className="mr-3">
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          '/assets/img/logo/instagram.png'
                        }
                        style={{ height: 32 }}
                        alt="인스타그램"
                      />
                    </a>
                  )}
                  {item.youtube !== 'undefined' && (
                    <a href={item.youtube}>
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          '/assets/img/logo/youtube.png'
                        }
                        alt="유튜브"
                        style={{ height: 32 }}
                      />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div className="partner-inquiry">
            <div className="row">
              <div className="col-lg-6  ">
                <div className="detail-image">
                  <img
                    src={
                      'https://ghosttown.s3.ap-northeast-2.amazonaws.com/partner/partner-1.jpeg'
                    }
                    alt="partner-1"
                  />
                </div>
              </div>
              <div className="col-lg-6 ">
                <div class="detail-title">스포츠팀에서 활동하고 계신가요?</div>
                <div class="detail-contents">
                  고스트타운의 스포츠팀 파트너쉽을 통해 소속팀의 무한한 잠재력을
                  극대화해보세요.
                  <br />
                  대학 내 스포츠팀, 복싱 클럽 등 어떤 스포츠팀이든 당신의 운동
                  여정을 함께하겠습니다.
                </div>
              </div>
            </div>
            <div className="row" style={{ flexWrap: 'wrap-reverse' }}>
              <div className="col-lg-6 ">
                <div class="detail-title">인플루언서 및 팀메이트 파트너쉽</div>
                <div class="detail-contents">
                  인플루언서 및 팀메이트 파트너쉽은 귀하의 온라인 컨텐츠를
                  활용하여 보다 쉽게 수익을 창출할 수 있는 프로그램입니다.
                  <br />
                  당신과 함께 성장해 갈 수 있는 파트너쉽 기회를 잡아보세요!
                </div>
              </div>
              <div className="col-lg-6 ">
                <div className="detail-image ">
                  <img
                    src={
                      'https://ghosttown.s3.ap-northeast-2.amazonaws.com/partner/partner-2.jpeg'
                    }
                    alt="partner-1"
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 ">
                <div className="detail-image ">
                  <img
                    src={

                      'https://ghosttown.s3.ap-northeast-2.amazonaws.com/partner/partner-3.jpeg'
                    }
                    alt="partner-1"
                  />
                </div>
              </div>
              <div className="col-lg-6 ">
                <div class="detail-title">파트너쉽 제휴 문의</div>
                <div class="detail-contents">
                  고스트타운 파트너쉽 관련 문의는 고객센터로 연락주시기
                  바랍니다.
                  <br />
                  이메일 문의 : ghosttownfit@naver.com <br />
                  인스타그램 문의 : @ghosttown_fit (DM) <br />
                  카카오톡 문의 : 고스트타운 피트니스 (플러스친구 등록 후 문의)
                </div>
              </div>
            </div>
          </div>
        </StyledPartner>
      </LayoutOne>
    </Fragment>
  )
}

export default Partnership

const StyledPartner = styled.div`
  /* max-width: 800px; */

  margin: 0 auto;
  margin-bottom: 50px;
  img {
    width: 100%;
    /* max-width: 1000px; */
    object-fit: cover;
  }
  .row {
    /* margin-top: 50px;
    margin-bottom: 50px; */
    color: #232323;
    &:nth-child(3) {
      margin-top: 100px;
    }
    .partner-title {
      font-size: 24px;
      font-weight: 700;
    }
  }
  .partner-inquiry {
    .detail-image {
      img {
        height: 100%;
      }
    }
    .detail-title {
      font-size: 24px;
      font-weight: 700;
    }
    .detail-contents {
      font-size: 17px;
      font-weight: 400;
      margin-top: 30px;
      line-height: 2rem;
      max-width: 450px;
    }
  }

  /* background: red; */
`
