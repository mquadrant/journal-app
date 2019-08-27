import axios from './API';

// setting token to header
export default function setAuthorizationToken(token:string) {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorizaiton'];
  }
}
