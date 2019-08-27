import React,{useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export default function(ComposedComponent:any) {
  function Authenticate (props:any) {
    
    useEffect(() => {
      if (!props.isAuthenticated) {
        props.history.push('/login');
      }
    })
    
      return <ComposedComponent {...props} />;
  }

  Authenticate.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
  };

  Authenticate.contextTypes = {
    router: PropTypes.object.isRequired,
  };

  function mapStateToProps(state:any) {
    return {
      isAuthenticated: state.login.isAuthenticated,
    };
  }

  return connect(mapStateToProps)(Authenticate);
}
