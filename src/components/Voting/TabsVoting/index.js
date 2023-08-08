import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import router from '../../../router';
import CongressionalAssemble from '../CongressionalAssemble';
import RoleHOC from '../../../hocs/RoleHOC';

function TabsVoting() {
  return (
    <div>
      <Route>
        <Route
          path={router.voting.congressionalAssemble}
          component={() => <CongressionalAssemble title="Congressional assembly" />}
        />
        <Route
          path={router.voting.referendum}
          component={() => <div>Referendum</div>}
        />
        <Route
          exact
          path={router.home.voting}
          render={() => (
            <RoleHOC>
              <Navigate to={router.voting.congressionalAssemble} />
            </RoleHOC>
          )}
        />
      </Route>
    </div>
  );
}

export default TabsVoting;
