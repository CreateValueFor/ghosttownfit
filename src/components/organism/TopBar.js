import React, { useState } from 'react'

import { Link } from 'react-router-dom'
import styled from 'styled-components'
import logo from '../../assets/images/ghost-white.png'
import blackLogo from "../../assets/images/gt-black.png"
import Input from "../molecule/Search"

const StyledTopBar = styled.div`
  height: 69px;
  display: flex;
  position: fixed;
  top: 0;
  padding: 30px 50px;
  width: 100%;
  z-index: 10;
  background : ${props => !props.isScrolled ? 'transparent' : "#fff"};
  transition: opacity .2s;

  align-items: center;
  justify-content: space-between;
  img.logo{
    height: 40px;
  }
  .left-menu {
    display: flex;

    ul {
      display: flex;
      margin-bottom: 0px;
      margin-top: 8px;
      li {
        margin-right: 25px;
        font-size: 0.75rem;
        transition: color 0.2s;
        font-weight: 400;
        letter-spacing: 0.03em;
        a {
          text-decoration: none;
          color : ${props => !props.isScrolled ? '#fff' : "#212529"};
          /* color: #fff; */
        }
      }
    }
  }
  .right-menu {
    display: flex;
    ul {
      margin-bottom: 0;
      display: flex;
      li {
        margin-right: 25px;
        a {
          color: #cfcfcf;
          text-decoration:none;
          color: #212529;
        }
      }
    }
  }
`

function TopBar() {
  const [isScrolled, setIsScrolled] = useState(false)

  window.addEventListener('scroll', (e) => {

    if (window.scrollY === 0) {
      setIsScrolled(false)
    } else {
      setIsScrolled(true)
    }
  })
  return (
    <StyledTopBar isScrolled={isScrolled}>
      <div className="left-menu">
        <Link to=".">
          <img className="logo" src={!isScrolled ? logo : blackLogo} alt="logo" />
        </Link>
        <ul>
          <li>
            <Link to="LookBook">LookBook</Link>
          </li>
          <li>
            <Link to="shop">Shop</Link>
          </li>
          <li>
            <Link to="Calendar">Calendar</Link>
          </li>
          <li>
            <Link to="partnership">PartnerShip</Link>
          </li>
          <li>
            <Link to="news">News&Story</Link>
          </li>
          <li>
            <Link to="qna">Q&A</Link>
          </li>
        </ul>
      </div>
      <div className="right-menu">
        <ul>
          <li>
            <Input />
          </li>
          <li>cart</li>
          <li>
            <Link to="login">login</Link>
          </li>
        </ul>
      </div>
    </StyledTopBar>
  )
}

export default TopBar
