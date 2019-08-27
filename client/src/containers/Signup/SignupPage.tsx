import React,{useEffect,useState} from 'react';
import { RouteComponentProps } from 'react-router-dom';
import  {Link} from 'react-router-dom';
import styled from 'styled-components';
import { Form} from 'semantic-ui-react';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import {LandingPage} from '../Login/LoginPage';
import {Capsule} from '../Login/LoginPage';
import {signup} from '../Signup/redux/actions';
import { toast } from 'react-toastify';

const SignupContainer = styled.div`
width: 549px;
  height: 415px;
  border-radius: 5px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  background-color: #fcfcfc;
  padding:20px 30px;

  .title{
  height: 22px;
  font-size: 16px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.69;
  letter-spacing: normal;
  text-align: center;
  color: #2d293d;
  }
  
  p.info-note {
  font-size: 12px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 2.5;
  letter-spacing: normal;
  text-align: center;
  color: #2d293d;
}

p.info-note span {
  color: #2699fb;
}
`;

const SignupForm =  styled(Form)`
margin-top: 20px;
    .form input{
        outline:none !important;
        height: 46px !important;
        border-radius: 25px !important;
        box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.16) !important;
        background-color: #ffffff !important;
        border: none !important;
        margin-top:5px !important;
    }
    .form input::placeholder{
        width: 61px;
        height: 17px;
        font-size: 12px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.42;
        letter-spacing: normal;
        text-align: left;
        color: #2d293d;
    }
    .form input#firstname:-webkit-autofill,
    .form input#lastname:-webkit-autofill,
    .form input#email:-webkit-autofill,
    .form input#password:-webkit-autofill {
        border-color: #fff !important;
        box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.16)!important;
    }
`;

interface Props extends RouteComponentProps<any>{
    signupHandler: Function,
    credential: any,
    error: any,
    pending:boolean
}

function SignupPage(props:Props) {
    const {error,pending} = props;
    const defaultValue = {
        firstName:'',
        lastName:'',
        email: '',
        password: ''
    };
    const [values, setValues] = useState(defaultValue)

    useEffect(() => {
        if (pending) {
          toast(<div style={{ textAlign: 'center' }}>Your account is being created...</div>, {
            autoClose: false,
            toastId: 13,
          });
        }
        if (!pending) {
          if (error) {
            toast.update(13, {
              render: (
                <div style={{ textAlign: 'center' }}>
                  {error}
                </div>
              ),
              type: toast.TYPE.ERROR,
              autoClose: 3000,
            });
          } else {
            toast.update(13, {
              render: (
                <div style={{ textAlign: 'center' }}>Your Journal is ready! Login..</div>
              ),
              type: toast.TYPE.SUCCESS,
              autoClose: 3000,
            });
            setValues({
                firstName:'',
                lastName:'',
                email: '',
                password: ''
            });
          }
        }
      }, [error, pending]);
    
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const {value, name} :{value:string;name:string} = e.target;
        setValues({...values,[name]:value});
    }
    
    
    const handleSubmit = ()=>{
        props.signupHandler(values,props.history);
    }
    return (
        <LandingPage>
            <Header/>
            <div style={{height:'calc(100vh - 60px)',display:'flex',alignItems:'center',justifyContent:'center'}}>
                <SignupContainer>
                    <div className='title'>Create an account</div>
                    <SignupForm autoComplete="off" onSubmit={(e:any)=>handleSubmit()}>
                        <Form.Field className='form-text form'>
                            <input id='firstname' placeholder="First Name" type='text' 
                            name="firstName"
                            onChange={handleChange}
                            value={values.firstName}
                            />
                        </Form.Field>
                        <Form.Field className='form-text form'>
                            <input id='lastname' placeholder="Last Name" type='text' 
                            name="lastName"
                            onChange={handleChange}
                            value={values.lastName}
                            />
                        </Form.Field>
                        <Form.Field className='form-email form'>
                            <input id='email' placeholder="Email" type='email' 
                            name="email"
                            onChange={handleChange}
                            value={values.email}
                            />
                        </Form.Field>
                        <Form.Field className='form-password form'>
                            <input id='password' placeholder="Password" type='password'
                            name="password"
                            onChange={handleChange}
                            value={values.password}
                        />
                        </Form.Field>
                        <Capsule style={{width:'100%',margin:'0px',boxShadow: '0 3px 12px 0 rgba(0, 0, 0, 0.16)'}}
                        >
                            SIGN UP FOR FREE
                            </Capsule>
                    </SignupForm>
                    <p className="info-note">Already have an account? <span><Link to="/login">Sign in</Link></span></p>
                </SignupContainer>
            </div>
        </LandingPage>
    )
}

const mapStateToProps = (state:any) => {
    return {
        credential: state.signup.credential,
        error: state.signup.error,
        pending: state.signup.pending,
    };
  };
  
  const mapDispatchToProps = (dispatch:any) => {
    return {
      signupHandler: (payload:any,history:any) => dispatch(signup(payload,history)),
    };
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(SignupPage);
