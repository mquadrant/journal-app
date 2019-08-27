import React,{createRef,useState,useEffect} from 'react';
import styled,{css} from 'styled-components';
import {Link } from 'react-router-dom';
import {toast} from 'react-toastify';

import {Space} from './DashboardPage';
import { connect } from 'react-redux';
import {getAllJournals,deleteJournal} from './redux/actions';
import moment from 'moment';
import {Icon} from 'semantic-ui-react';
import { Loader} from 'semantic-ui-react';


const Title = styled.div`
margin-bottom:10px;
font-size: 18px;
font-weight:500;

`;
const Body = styled.div`
white-space: pre-wrap;
`;
const Date = styled.div`
font-size:12px;
text-align:right;
`;

export const Message = styled.div`
position: relative;
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
  ul.nav{
        position:absolute;
        margin-left:auto;
        display: flex;
        flex-flow: row wrap;
        justify-content: flex-end;
        list-style:none;
        li a {
        color: #707070;
        text-decoration: none;
      }
      top: -8px;
      right: 5px;
    }
    div.drop-down {
      position: absolute;
      display: block;
      width: 100px;
      border-radius: 10px;
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

function AllJournals(props:any){
const {getAllJournalHandler,allJournals,allJournalPending,deleteJournalHandler} = props;
    
const [dropDown, setdropDown] = useState(false);
useEffect(() => {
        getAllJournalHandler();
      }, [getAllJournalHandler]);

  const container:any = createRef();

  const editHandler = (event:any) => {
  };

  const toggle = (e: any) => {
    const target = e.target.nextElementSibling;
    if(target.classList.contains('hidden')) {
      target.classList.remove('hidden')
      return;
    }
    target.classList.add('hidden');
  }

  const deleteHandler = async(id:any)=>{
    try {
      await deleteJournalHandler(id);
      toast.success('Journal has been deleted');
    } catch (error) {
          toast.error('Journal not totally deleted');
      }

  }

    return (
        <div>
            {!allJournalPending?allJournals.map((journal:any)=>(
                  <div key={journal._id}>
                  <Message style={{height:'auto'}}>
                    <ul className="nav" ref={container}>
                        <div ref={container}>
                        <Icon name='angle down' onClick={toggle}/>
                          <div className={`drop-down ${!dropDown ? 'hidden' : null}`}>
                              <ul onClick={() => setdropDown(false)}>
                                  <Link to={`/app/journal/${journal._id}/edit`} onClick={editHandler}>
                                  <li>Edit Journal</li>
                                  </Link>
                                  <li onClick ={()=>deleteHandler(journal._id)}>Delete Journal</li>
                              </ul>
                          </div>
                        </div>
                    </ul>
                  <div  className='saved-journals'>
                      <Date>{moment(journal.createdAt).format('Do MMMM, YYYY')}</Date>
                    <Title>{journal.title}</Title>
                    <Body>{journal.body}</Body>
                  </div>
                  </Message>
                <Space style={{height:'20px'}}/>
                </div>
                )):
                <div>
                  <Loader active inline='centered' />
              </div>}
        </div>
    )
}

const mapStateToProps = (state:any) => {
    return {
        allJournals: state.journals.allJournals,
        allJournalPending:state.journals.allJournalPending,
        allJournalError:state.journals.allJournalError,
    };
  };

  const mapDispatchToProps = (dispatch:any) => {
    return {
      getAllJournalHandler: () => dispatch(getAllJournals()),
      deleteJournalHandler: (id:any) => dispatch(deleteJournal(id)),
    };
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(AllJournals);
