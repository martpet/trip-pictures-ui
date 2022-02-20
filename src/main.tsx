import '~/assets/css/index.css';

import { StrictMode } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import { App, IntlProvider, ThemeProvider } from '~/components';
import { persistor, store } from '~/store';

const tree = (
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <BrowserRouter>
          <ThemeProvider>
            <IntlProvider>
              <App />
            </IntlProvider>
          </ThemeProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>
);

render(tree, document.getElementById('root'));
