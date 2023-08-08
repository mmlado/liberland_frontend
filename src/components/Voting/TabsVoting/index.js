import React from 'react';
import { 
  Navigate, 
  Route, 
  Routes, 
} from 'react-router-dom';
import router from '../../../router';
import CongressionalAssemble from '../CongressionalAssemble';
import RoleHOC from '../../../hocs/RoleHOC';

function TabsVoting() {
  return (
    <div>
      <Routes>
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
      </Routes>
    </div>
  );
}

export default TabsVoting;
