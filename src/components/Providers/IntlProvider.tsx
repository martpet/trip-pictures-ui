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

function Intl({ children }: Props) {
  const { lang, langTag } = useSelector(selectLang);
  const { data: messages } = useGetTranslationsQuery(lang);
  const hasMessages = messages && Object.keys(messages).length;

  const handleError = ({ message }: Error) => {
    if (import.meta.env.DEV) {
      toast.error(message, { id: message });
    }
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <IntlProvider locale={langTag} messages={messages} onError={handleError}>
      {hasMessages ? children : <LoadingOverlay />}
    </IntlProvider>
  );
}

export { Intl as IntlProvider };
