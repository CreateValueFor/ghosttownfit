import React from 'react';
import styled from 'styled-components';
import Text from '../components/atom/Text';
import Button from '../components/atom/Button';
import Email from "../assets/images/email.png"
import Kakao from "../assets/images/kakao-talk.png"
import Phone from "../assets/images/phone-call.png"
import { Col, Row, Table } from 'react-bootstrap';
import { boardItem } from '../dummy/board';
import Lock from "../assets/images/padlock.png";
import Reply from "../assets/images/speech-bubble.png";
import CustomLink from '../components/atom/Link';


const StyledQnA = styled.div`
    max-width: 800px;
    text-align:start;
    margin: 0 auto;
    .contact-container{
        width: 100%;
        .contact-list{
            margin: 15px 0px 15px;
            border : 20px solid #eee;
            
            div{
                /* background: red; */
                /* width: 30%; */
                text-align:center;
                padding: 30px;
                
                img{
                    margin: 0 auto;
                   width: 20%;
                   min-width: 30px;
                   max-width: 100px;
                   margin-bottom: 15px;
                   /* height: 24px; */
               }
               p:nth-child(2){
                   margin-bottom: 15px !important;
               }
            }
        }
        .notice{
            margin: 30px 0px;
        }
    }


`;

const StyledBoard = styled(Row)`
    .col{
        display:flex;
        flex-direction:column;
    }
    table{
        user-select: auto;
    border: 1px solid transparent;
    border-bottom: 1px solid #eee;
    tbody{
        td{
            display:flex;
            align-items:center;
            img{
                width: 16px;
                height:16px;
            }
            .item-detail{
                display:flex;
                align-items:center;
                img{
                    width: 12px;
                    height: 12px;
                    margin-right:3px;
                    
                }
            }
        }
    }
    }
`;

function QnA() {
    return (
        <div className="gt-container">
            <Text className="gt-title" text="고스트타운 고객센터" fontSize="24px" fontWeight={700} />
            <StyledQnA>
                <div className="contact-container">
                    <Text text="CONTACT US" fontWeight={700} fontSize="20px" />
                    <Row className="contact-list justify-between">
                        <Col xs={12} sm={4}>
                            <img src={Phone} alt="phone" />
                            <Text text="전화문의" fontSize="16px" fontWeight={700} />
                            <CustomLink href="tel:070-5100-0799" text="070-5100-0799" />
                            <Text text="평일 오전 10:30 " fontSize="16px" />
                            <Text text="~ 오후 5:30까지" fontSize="16px" />
                        </Col>
                        <Col xs={12} sm={4}>
                            <img src={Kakao} alt="kakao" />
                            <Text text="1:1 채팅 문의" fontSize="16px" fontWeight={700} />
                            <CustomLink href="http://pf.kakao.com/_xeBtxns" text="카카오 채널 문의하기" target="_blank" />

                        </Col>
                        <Col xs={12} sm={4}>
                            <img src={Email} alt="email" />
                            <Text text="1:1 Email 문의" fontSize="16px" fontWeight={700} />
                            <CustomLink href="mailto:ghosttownfit@naver.com" text="Email 문의하기" target="_blank" />

                        </Col>
                    </Row>
                    <Row className="notice">
                        <Col>
                            <Text style={{ marginBottom: 15 }} text="교환 및 환불" fontSize="20px" fontWeight={700} />
                            <Text text="고스트타운 피트니스에서 구매하신 제품은 수령일 기준 7일 이내 교환/반품 신청이 가능합니다." />
                            <Text text="(소비자 사용으로 상품의 가치가 떨어진 경우 교환불가)" />
                            <Text text="고객변심으로 교환/반품 시 왕복 배송비 6,000원이 청구됩니다." />
                            <Text text="* 오배송/불량으로 인한 교환/반품 시 택배비 무료, 고객이 직접 선불로 교환/반품 발송할 경우 편도 배송비 3,000원 청구" />
                            <Text text="* 휴대폰 소액결제는 당월취소만 가능하며 결제자 본인명의 계좌로 환불됩니다. 교환 / 반품 절차는 아래와 같이 진행됩니다." />
                            <Text text="교환 / 반품 절차는 아래와 같이 진행됩니다." style={{ marginBottom: 15 }} />
                            <Text text="1. 마이페이지 - 주문조회 – 반품/교환" fontWeight={700} />
                            <Text text="2. 배송비 입금 or 택배에 같이 동봉 (6,000원 / 구매자 직접 선불 발송시 3,000원) " fontWeight={700} />
                            <Text text="- 입금계좌: 국민은행 479401-04-387243 이남열(고스트타운)" fontSize="14px" />
                            <Text text="3. 배송비 입금 확인 요청 ( QNA게시판, 카카오채널톡, 인스타그램 DM ) " fontWeight={700} />
                            <Text text="4. 배송비 입금 확인 후 제품 수거 (1~3일 소요 / 구매자 직접 발송가능)" fontWeight={700} />
                            <Text text="- (교환/반품하는 제품을 다시 포장하여 받으신 곳에 놓아주시면, 택배사에서 연락 드린 후 수 거합니다.)" fontSize="14px" />
                            <Text text="5. 수거 제품 확인 후 재배송 (1~3일 소요) / 환불처리" fontWeight={700} />
                        </Col>
                    </Row>
                    <StyledBoard>
                        <Col>
                            <Text style={{ marginBottom: 15 }} text="Q&A" fontSize="20px" fontWeight={700} />
                            <Table bordered >
                                <thead>
                                    <tr>
                                        <th style={{ textAlign: 'center' }}>제목</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {boardItem.map(item => (
                                        <tr style={{ cursor: 'pointer' }}>
                                            <td style={{ display: "flex" }}>
                                                <img style={{ marginRight: 12 }} src={Lock} alt="lock" />
                                                {item.text}
                                                {item.reply > 0 && <div className="item-detail">
                                                    <img style={{ marginLeft: 12 }} src={Reply} alt="reply" />
                                                    <Text text={item.reply} fontSize="12px" />
                                                </div>}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <Button style={{ alignSelf: "flex-end" }} text="문의하기" />
                        </Col>
                    </StyledBoard>
                </div>
            </StyledQnA>
        </div>
    );
}

export default QnA;