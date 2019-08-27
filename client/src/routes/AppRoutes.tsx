import React, { Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import '../App.css';
import Header2 from '../components/Header2';
import Auth from '../utils/Auth';


const DashboardPage = lazy(() => import("../containers/Dashboard/DashboardPage"));
const JournalEditPage = lazy(() => import("../containers/Dashboard/EditPage"));

interface Props {
    
}

export default function AppRoutes(): any {
    return (
        <React.Fragment>
      <Header2 />
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path="/app/dashboard" component={Auth(DashboardPage)} />
          <Route path="/app/journal/:journalId/edit" component={Auth(JournalEditPage)} />
        </Switch>
      </Suspense>
    </React.Fragment>
    )
}
