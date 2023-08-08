import React from 'react';
import {
  Route, 
  Routes,
} from 'react-router-dom';
import router from '../../router';

import styles from './styles.module.scss';

import RegistriesHeader from "./RegistriesHeader";
import RegistriesOverview from "./RegistriesOverview";
import RegistriesCompanies from "./RegistriesCompanies";
import RegistriesLand from "./RegistriesLand";
import RegistriesAssets from "./RegistriesAssets";
import RegistriesOther from "./RegistriesOther";
import CompanyCRUD from "./RegistriesCompanies/CompanyCRUD";

function Registries() {
  return (
    <div className={styles.registriesWrapper}>
      <div className={styles.navWrapper}>
        <RegistriesHeader />
      </div>
      <div>
        <Routes>
          <Route
            exact
            path={router.registries.overview}
            component={RegistriesOverview}
          />
          <Route
            exact
            path={router.registries.companies}
            component={RegistriesCompanies}
          />
          <Route
            exact
            path={router.registries.companiesCRUD}
            component={CompanyCRUD}
          />
          <Route
            exact
            path={router.registries.land}
            component={RegistriesLand}
          />
          <Route
            exact
            path={router.registries.assets}
            component={RegistriesAssets}
          />
          <Route
            exact
            path={router.registries.other}
            component={RegistriesOther}
          />
        </Routes>
      </div>
    </div>
  )
}

export default Registries;
