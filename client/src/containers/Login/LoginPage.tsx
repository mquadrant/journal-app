import React from 'react';
import { Form} from 'semantic-ui-react';
import styled,{css} from 'styled-components';
import LandingImage from '../../images/landingImage.svg';
import Header from '../../components/Header';

interface Props {
    
}


export const LandingPage =  styled.div`
display:flex;
flex-direction:column;
  height: 100vh;
  background-color: #F8F8F8; 
`;


  export const Capsule = styled.button`
  background-color: #b8d344;
  width: 148px;
  height: 48px;
  border-radius: 24px;
  background-image: linear-gradient(150deg, #6c63ff, #9f63ff);
  color: #fff;
  font-family: inherit;
  border: none;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  margin: 4px;
  cursor: pointer;
  outline:none;
  ${(props:any)=>props.style &&css`
  ${(props:any) => props.style}
  `}
`;

const LoginContainer = styled.div`
margin: 20px;
@media (min-width: 768px) {
    position:absolute;
    top:27%;
    left:11%;
    width:30%;
}
`;

const Text = styled.div`
.title {
  width: 412px;
  height: 41px;
  font-size: 30px;
  font-weight: 700;
  font-style: normal;
  font-stretch: normal;
  line-height: 0.7;
  letter-spacing: normal;
  text-align: left;
  color: #2d293d;
}
.subtitle {
  width: 360px;
  height: 52px;
  font-size: 20px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.05;
  letter-spacing: normal;
  text-align: left;
  color: #2d293d;
}
`;

const SimpleForm =  styled(Form)`
    .form input{
        width: 420px !important;
        height: 50px !important;
        border-radius: 25px !important;
        border: solid 2px #2d293d !important;
        background-color: #ffffff !important;
        outline:none !important
    }
    .form input#email:-webkit-autofill {
        border-color: #2d293d !important;
    }
    .form input#password:-webkit-autofill {
        border-color: #2d293d !important;
    }
`;

export default function LoginPage(): any {
    return (
        <LandingPage className='homepage' style={{background: `url(${LandingImage}) no-repeat`,
        backgroundPosition: '78% 65%'}}>
        <Header/>
        <LoginContainer>
            <Text>
                <div className='title'>Keep track of your progress</div>
                <div className='subtitle'>Journals can become our best friend.</div>
            </Text>
            <SimpleForm>
                <Form.Field className='form-email form'>
                <input id='email' placeholder="Email Address" type='email' />
                </Form.Field>
                <Form.Field className='form-password form'>
                <input id='password' placeholder="Password" type='password'
                // onChange={'handleChange'}
                // defaultValue={'age'} 
                />
                </Form.Field>
                <Capsule>Log in</Capsule>
            </SimpleForm>
        </LoginContainer>
        </LandingPage>
    )
}
