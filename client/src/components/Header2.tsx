import React from 'react';
import styled from 'styled-components';

import Logo2 from '../images/LogoAppsvg.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
 
const DownArrow = <FontAwesomeIcon icon={faAngleDown} />

const Header = styled.nav`
    display: flex;
    height: 63px;
    position:fixed;
    width:100%;
    background-color: rgba(234,233,249,0.8);
    align-items: center;
    padding:8px 50px;

    img.logo{
        margin-right:auto;
    }
    ul.nav{
        margin-left:auto;
        display: flex;
        flex-flow: row wrap;
        justify-content: flex-end;
        list-style:none;
        li a {
        color: #707070;
        text-decoration: none;
        margin: 0 1em;
      }
    }
`;

const Avatar = styled.div`
    width: 25px;
  height: 25px;
  border: solid 1px #707070;
  border-radius: 50%;
  margin: 0 10px;
`;

interface Props {
    
}

export default function Header2(): any {
    return (
        <Header>
            <img src={Logo2} alt='Journal-Logo'/>
            <ul className="nav">
                <Avatar/>
                <div style={{marginTop:'2px',}}>
                {DownArrow}
                </div>
            </ul>
        </Header>
    )
}
