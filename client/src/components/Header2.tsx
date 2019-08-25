import React from 'react';
import styled from 'styled-components';
import {Icon} from 'semantic-ui-react'

import Logo2 from '../images/DeepColorLogo.svg';
import Image from '../images/avatar.png';

const Header = styled.nav`
    display: flex;
    height: 63px;
    position:fixed;
    width:100%;
    background-color: rgba(233,235,238,0.8);
    align-items: center;
    padding:8px 50px;
    z-index:1000;

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
    width: 35px;
  height: 35px;
  border: solid 1px #707070;
  border-radius: 50%;
  margin: 0 10px;
  background-image: url(${Image});
  background-position: center;
  background-repeat: no-repeat; 
  background-size: cover;
`;

interface Props {
    
}

export default function Header2(): any {
    return (
        <Header>
            <img src={Logo2} alt='Journal-Logo'/>
            <ul className="nav">
                <Avatar/>
                <div style={{marginTop:'7px',}}>
                <Icon name='angle down'/>
                </div>
            </ul>
        </Header>
    )
}
