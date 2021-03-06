import { generatePath } from 'react-router-dom';

import { staticApiPaths } from '~/consts';
import { staticApi } from '~/services';
import { Lang, Translations } from '~/types';

const translationsApi = staticApi.injectEndpoints({
  endpoints: ({ query }) => ({
    getTranslations: query<Translations, Lang>({
      query: (lang) => generatePath(staticApiPaths.translations, { lang }),
    }),
  }),
});

export const { useGetTranslationsQuery, endpoints: translationsEndpoints } =
  translationsApi;
