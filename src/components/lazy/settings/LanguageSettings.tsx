import { Flex, Item, Picker } from '@adobe/react-spectrum';
import { Key } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Spinner } from '~/components';
import { SettingsSection } from '~/components/lazy/settings';
import { langs } from '~/consts';
import { translationsEndpoints } from '~/services';
import { languageSelected, selectLang } from '~/slices';
import { Lang } from '~/types';

export function LanguageSettings() {
  const { lang: currentLang } = useSelector(selectLang);
  const { isFetching } = translationsEndpoints.getTranslations.useQueryState(currentLang);
  const dispatch = useDispatch();
  const headingId = 'settings.language.chooseLanguage';

  const handleChange = (lang: Key) => {
    dispatch(languageSelected(lang as Lang));
  };

  const pickerItems = langs.map((lang) => ({
    key: lang,
    label: new Intl.DisplayNames([lang], { type: 'language' }).of(lang),
  }));

  pickerItems.sort();

  return (
    <SettingsSection headingKey={headingId}>
      <Flex alignItems="center">
        <Picker
          aria-labelledby={headingId}
          items={pickerItems}
          selectedKey={currentLang}
          onSelectionChange={handleChange}
        >
          {(item) => <Item>{item.label}</Item>}
        </Picker>

        {isFetching && <Spinner size="S" marginStart="size-125" />}
      </Flex>
    </SettingsSection>
  );
}
