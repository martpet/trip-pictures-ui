import { defaultTheme, Provider } from '@adobe/react-spectrum';
import { ReactNode } from 'react';
import { useSelector } from 'react-redux';

import { breakpoints } from '~/consts';
import { selectLang } from '~/slices';

type SpectrumProps = {
  children: ReactNode;
};

export function Spectrum({ children }: SpectrumProps) {
  const lang = useSelector(selectLang);

  return (
    <Provider theme={defaultTheme} locale={lang} breakpoints={breakpoints}>
      {children}
    </Provider>
  );
}
