import { ReactNode, useEffect } from 'react';
import toast from 'react-hot-toast';
import { IntlProvider } from 'react-intl';
import { useSelector } from 'react-redux';

import { LoadingOverlay } from '~/components';
import { useGetTranslationsQuery } from '~/services';
import { selectLang } from '~/slices';

type Props = {
  children: ReactNode;
};

export function Intl({ children }: Props) {
  const lang = useSelector(selectLang);
  const { data } = useGetTranslationsQuery(lang);
  const hasData = data && Object.keys(data).length;

  const handleError = ({ message }: Error) => {
    if (import.meta.env.DEV) {
      toast.error(message, { id: message });
    }
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <IntlProvider locale={lang} messages={data} onError={handleError}>
      {hasData ? children : <LoadingOverlay />}
    </IntlProvider>
  );
}
