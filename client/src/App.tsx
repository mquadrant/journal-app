import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AppRoutes = lazy(() => import('./routes/AppRoutes'));
const LoginPage = lazy(() => import('./containers/Login/LoginPage'));
const SignupPage = lazy(() => import('./containers/Signup/SignupPage'));

toast.configure();

const App: React.FC = () => {
  return (
    <React.Fragment>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route>
              <Route path="/login" component={LoginPage} />
              <Route path="/signup" component={SignupPage} />
              <Route path="/app" component={AppRoutes} />
            </Route>
          </Switch>
        </Suspense>
        <ToastContainer />
      </Router>
    </React.Fragment>
  );
}

export default App;
