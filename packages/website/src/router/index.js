import React, {useMemo} from 'react';
import {ConnectedRouter} from 'connected-react-router';
import {Switch, Route} from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import {useMediaQuery} from '@material-ui/core';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';

import {Provider} from 'react-redux';
import StatusView from '../views/StatusView';
import DashboardLayout from '../layouts/DashboardLayout';

import store, {history} from '../store';

const Container = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
        },
        typography: {
          fontFamily: "'IBM Plex Mono', monospace",
        },
      }),
    [prefersDarkMode],
  );

  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <DashboardLayout>
            <Switch>
              <Route exact path="/">
                <StatusView />
              </Route>
              <Route path="/age">
                <div>hola</div>
              </Route>
            </Switch>
          </DashboardLayout>
        </ThemeProvider>
      </ConnectedRouter>
    </Provider>
  );
};

export default Container;
