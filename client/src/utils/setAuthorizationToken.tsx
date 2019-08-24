import axios from 'axios';

// setting token to header
export default function setAuthorizationToken(token:string) {
  if (token) {
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    delete axios.defaults.headers.common['Authorizaiton'];
  }
}
