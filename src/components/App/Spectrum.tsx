import { defaultTheme, Provider } from '@adobe/react-spectrum';
import { ReactNode } from 'react';
import { useSelector } from 'react-redux';

import { breakpoints } from '~/consts';
import { selectLang } from '~/slices';

type Props = {
  children: ReactNode;
};

export function Spectrum({ children }: Props) {
  const lang = useSelector(selectLang);

  return (
    <Provider theme={defaultTheme} locale={lang} breakpoints={breakpoints}>
      {children}
    </Provider>
  );
}
