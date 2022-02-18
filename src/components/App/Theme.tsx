import { defaultTheme, Provider } from '@adobe/react-spectrum';
import { ReactNode } from 'react';
import { useSelector } from 'react-redux';

import { breakpoints } from '~/consts';
import { selectColorScheme, selectLang } from '~/slices';

type Props = {
  children: ReactNode;
};

export function Theme({ children }: Props) {
  const lang = useSelector(selectLang);
  const colorScheme = useSelector(selectColorScheme);

  return (
    <Provider
      colorScheme={colorScheme}
      theme={defaultTheme}
      locale={lang}
      breakpoints={breakpoints}
    >
      {children}
    </Provider>
  );
}
