import React ,{createRef,useState,useEffect} from 'react';
import styled from 'styled-components';
import {Icon} from 'semantic-ui-react';
import {Link } from 'react-router-dom';

import Logo2 from '../images/DeepColorLogo.svg';
import Image from '../images/avatar.png';
import { setCurrentUser } from '../containers/Login/redux/actions';
import store from '../store/store';

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
        position:relative;
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
    div.drop-down {
      position: absolute;
      display: block;
      width: 100px;
      top: 48px;
      left: 50px;
      background-color: #fff;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
      ul {
        list-style-type: none;
        padding-inline-start:0px !important;
        li {
          display: block;
          padding: 8px 5px;
          color: #707070;
          border-bottom: 1px solid rgba(34, 36, 38, 0.06);
          :hover {
            background-color: rgba(34, 36, 38, 0.09);
            cursor: pointer;
          }
          a {
            color: #707070;
          }
        }
      }
    }
    div.drop-down.hidden {
      display: none;
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
    const [dropDown, setdropDown] = useState(false);

  const container:any = createRef();

  const logoutHandler = () => {
    store.dispatch(setCurrentUser(''));
    localStorage.clear();
  };

  const handleClickOutside = (event:any) => {
    if (container.current && !container.current.contains(event.target)) {
      setdropDown(false);
    }
  };

  //adding click event to document when mounting header
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });
    return (
        <Header>
            <img src={Logo2} alt='Journal-Logo'/>
            <ul className="nav" ref={container}>
                <Avatar/>
                <div style={{marginTop:'7px',}}>
                <Icon name='angle down' onClick={() => setdropDown(!dropDown)}/>
                <div className={`drop-down ${!dropDown ? 'hidden' : null}`}>
                    <ul onClick={() => setdropDown(false)}>
                        <Link to="/login" onClick={logoutHandler}>
                        <li>Log out</li>
                        </Link>
                    </ul>
                </div>
            </div>
            </ul>
        </Header>
    )
}
