import '~/assets/css/index.css';

import { StrictMode } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import { App, Intl, Theme } from '~/components';
import { persistor, store } from '~/store';

const tree = (
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <BrowserRouter>
          <Theme>
            <Intl>
              <App />
            </Intl>
          </Theme>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>
);

render(tree, document.getElementById('root'));
