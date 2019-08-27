import React,{useState} from 'react'
import styled,{css} from 'styled-components';
import {Form} from 'semantic-ui-react';
import { Capsule } from '../Login/LoginPage';
import {toast} from 'react-toastify';
import { connect } from 'react-redux';
import { postJournal } from './redux/actions';
import AllJournals from './AllJournals';
import {getAllJournals} from './redux/actions';

const DashboardBody = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    /* height: calc(100vh - 60px); */
`;

const Outer = styled.div`
display:flex;
flex-direction:column;
align-items: center;
    width: 876px;
  height: 2000px;
  margin-top:70px;
  margin-bottom:20px;
  border-radius: 5px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  background-color: #ffffff;

`;

const Inner = styled.div`
margin-top:35px;
`;

export const Message = styled.div`
display:flex;
flex-direction:column;
align-items: center;
width: 680px;
padding-bottom:35px;
  border-radius: 15px;
  background-color: rgb(247, 247, 250);
  ${(props:any)=>props.style &&css`
  ${(props:any) => props.style}
  `}

  .saved-journals{
    padding:15px 20px;
    width:100%;
  }
`;

const PrimaryTitle = styled.div`
display:inline-block;
width: 184px;
  height: 29px;
  font-family: Montserrat;
  font-size: 24px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.25;
  letter-spacing: normal;
  text-align: center;
  color: #2d293d;
`;

const SecondaryTitle = styled.div`
display: inline-block;
width: 170px;
  height: 29px;
  opacity: 0.52;
  font-family: Montserrat;
  font-size: 24px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.25;
  letter-spacing: normal;
  text-align: center;
  color: #2d293d;
`;

const Title = styled.div`
margin-bottom: 30px;
width: 619px;
span{
    width: 14px;
  height: 50px;
  font-family: Montserrat;
  font-size: 24px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.25;
  letter-spacing: normal;
  text-align: center;
  color: #2d293d;
}
`;
const JournalForm =  styled(Form)`
.titleField input{
    width: 600px !important;
  height: 52px !important;
  font-size: 16px !important;
  border-radius: 5px !important;
  border: solid 0.5px #dddddd !important;
  background-color: #ffffff !important;
  margin-top:50px !important;
}
.bodyField textarea{
    resize: none !important;
    width: 600px !important;
  min-height: 329px !important;
  font-size: 16px !important;
  border-radius: 5px !important;
  border: solid 0.5px #dddddd !important;
  background-color: #ffffff !important;
  margin-top:20px !important;
  margin-bottom:20px !important;
}
.titleField input::placeholder,
.bodyField textarea::placeholder{
        font-size: 16px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.42;
        letter-spacing: normal;
        text-align: left;
    }
`;

export const Space = styled.div`
    height: 50px;
`;
interface Props {
    
}

function DashboardPage(props:any): any {
  
  const [values, setValues] = useState({
    title: '',
    body: '',
    errorMessage: ''
})

const handleChange = (e:any)=>{
    const {value, name} :{value:string;name:string} = e.target;
    setValues({...values,[name]:value})
}

const handleSubmit = async(e:any)=>{
  e.preventDefault();
  try {
    await props.postJournalHandler(values);
    setValues({ ...values, title: '', body: '', errorMessage: '' });
    toast.success('Your Journal has been saved');
    props.getAllJournalHandler();
  } catch (error) {
        toast.error('Something went wrong!');
    }
}
  
    return (
        <DashboardBody>
            <Outer>
                <Inner>
                    <Title>
                        <PrimaryTitle>Digital Journal</PrimaryTitle>
                        <span className="separator">|</span>
                        <SecondaryTitle>Create A Note</SecondaryTitle>
                    </Title>
                    <Message>
                        <JournalForm>
                            <Form.Field className='titleField'>
                                <input id='title' placeholder="Title" type='text' 
                                name="title"
                                onChange={handleChange}
                                value={values.title} 
                                />
                            </Form.Field>
                            <Form.Field className='bodyField'>
                            <textarea 
                            placeholder='Body'
                            name='body'
                            value={values.body} 
                            onChange={handleChange} 
                            />
                            </Form.Field>
                            <Capsule style={{fontSize:'16px'}} onClick={handleSubmit}>Post my journal</Capsule>
                        </JournalForm>
                    </Message>
                </Inner>
                <Space />
                <AllJournals />
            </Outer>
        </DashboardBody>
    )
}


const mapStateToProps = (state:any) => {
  return {
      error: state.journals.error,
      pending: state.journals.pending,
  };
};

const mapDispatchToProps = (dispatch:any) => {
  return {
    postJournalHandler: (payload:any) => dispatch(postJournal(payload)),
    getAllJournalHandler: () => dispatch(getAllJournals()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DashboardPage);