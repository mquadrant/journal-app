import React, { Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from '../components/Header';

const DashboardPage = lazy(() => import("../containers/Dashboard/DashboardPage"));
const JournalEditPage = lazy(() => import("../containers/Dashboard/DashboardPage"));

interface Props {
    
}

export default function AppRoutes(): any {
    return (
        <React.Fragment>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path="/app/dashboard" component={DashboardPage} />
          <Route path="/app/journal/:cycleId/edit" component={JournalEditPage} />
        </Switch>
      </Suspense>
    </React.Fragment>
    )
}
