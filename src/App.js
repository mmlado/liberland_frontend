// LIBS
import React, { useEffect } from 'react';
import { 
  useSelector, 
  useDispatch 
} from 'react-redux';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import MoonLoader from 'react-spinners/MoonLoader';
import { css } from '@emotion/react';

// ROUTER
import routes from './router';

// COMPONENTS
import SignIn from './components/AuthComponents/SignIn';
import SignUp from './components/AuthComponents/SingUp';
import Home from './components/Home';
import Loader from './components/Loader';

// REDUX
import { userSelectors } from './redux/selectors';
import {
  authActions,
  blockchainActions,
} from './redux/actions';

const override = css`
  display: block;
  margin: 0 auto;
`;

function App() {
  const dispatch = useDispatch();
  const isSessionVerified = useSelector(userSelectors.selectIsSessionVerified);
  const user = useSelector(userSelectors.selectUser);

  useEffect(() => {
    dispatch(authActions.verifySession.call());
    dispatch(blockchainActions.getAllWallets.call());
  }, [dispatch]);

  const loggedOutRoutes = (
    <Router>
      <Routes>
        <Route path={routes.signIn} element={<SignIn />} />
        <Route path={routes.signUp} element={<SignUp />} />
        <Route path="*" element={<Navigate to={routes.signIn} />} />
      </Routes>
    </Router>
  );

  const loggedInRoutes = (
    <Router>
      <Routes>
        <Route path={routes.home.index} element={<Home />} />
        <Route path="*" element={<Navigate to={routes.home.index} />} />
      </Routes>
    </Router>
  );

  const appRouter = user ? loggedInRoutes : loggedOutRoutes;

  return isSessionVerified ? (
    <Loader>
      {appRouter}
    </Loader>
  ) : (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        alignItems: 'center',
        background: 'rgb(170,170,170,0.1)',
      }}
    >
      <MoonLoader loading css={override} size={150} color="#F1C823" />
    </div>
  );
}

export default App;
