import React,{useEffect} from 'react';
import styled,{css} from 'styled-components';
import {Message} from './DashboardPage';
import {Space} from './DashboardPage';
import { connect } from 'react-redux';
import {getAllJournals} from './redux/actions';
import moment from 'moment';

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

function AllJournals(props:any){
const {getAllJournalHandler,allJournals,allJournalPending} = props;
    useEffect(() => {
        getAllJournalHandler();
      }, [getAllJournalHandler]);

    return (
        <div>
            {!allJournalPending?allJournals.map((journal:any)=>(
                  <div key={journal._id}><Message style={{height:'auto'}}>
                <div className='saved-journals'>
                    <Date>{moment(journal.createdAt).format('Do MMMM, YYYY')}</Date>
                  <Title>{journal.title}</Title>
                  <Body>{journal.body}</Body>
                </div>
                </Message>
                <Space style={{height:'20px'}}/>
                </div>
                )):null}
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
    };
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(AllJournals);
