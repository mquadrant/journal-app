import React from 'react'
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import Logo2 from '../images/DeepColorLogo.svg';

const Header = styled.nav`
    display: flex;
    height: 60px;
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

interface Props {
    
}

export default function HeaderNav(): any {
    return (
        <Header>
            <img src={Logo2} alt='Journal-Logo'/>
            <ul className="nav">
                <li>
                    <Link to="/login">Log in</Link>
                </li>
                <li>
                    <Link to="/signup">Sign up</Link>
                </li>
            </ul>
        </Header>
    )
}
