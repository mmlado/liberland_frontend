import React from 'react';
import {
  Route, Navigate,
} from 'react-router-dom';

import LegislationHeader from './LegislationHeader';
import LegislationView from './LegislationView';
import router from '../../router';

import styles from './styles.module.scss';

function Legislation() {
  return (
    <div className={styles.legislationWrapper}>
      <div className={styles.navWrapper}>
        <LegislationHeader />
      </div>

      <div>
        <Route>
          <Route
            exact
            path={router.legislation.view}
            component={LegislationView}
          />
          <Route
            exact
            path={router.home.legislation}
            render={() => (
              <Navigate to={`${router.home.legislation}/0`} />
            )}
          />
        </Route>
      </div>
    </div>
  );
}

export default Legislation;
