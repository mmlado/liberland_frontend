import React from 'react';
import {
  Route, Navigate,
} from 'react-router-dom';

import OfficesHeader from './OfficesHeader';
import Identity from './Identity';
import CompanyRegistry from './CompanyRegistry';
import router from '../../router';

import styles from './styles.module.scss';
import LandRegistry from "./LandRegistry";

function Offices() {
  return (
    <div className={styles.officesWrapper}>
      <div className={styles.navWrapper}>
        <OfficesHeader />
      </div>

      <div>
        <Route>
          <Route
            exact
            path={router.offices.identity}
            component={Identity}
          />
          <Route
            exact
            path={router.offices.companyRegistry}
            component={CompanyRegistry}
          />
          <Route
            exact
            path={router.home.offices}
            render={() => (
              <Navigate to={router.offices.identity} />
            )}
          />
          <Route
            exact
            path={router.offices.landRegistry}
            component={LandRegistry}
          />
        </Route>
      </div>
    </div>
  );
}

export default Offices;
