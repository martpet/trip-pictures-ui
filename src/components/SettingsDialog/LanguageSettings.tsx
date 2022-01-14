import { Flex, Item, Picker, ProgressCircle } from '@adobe/react-spectrum';
import { Key } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import { SettingsSection } from '~/components';
import { langs } from '~/consts';
import { translationsEndpoints } from '~/services';
import { languageSelected, selectLang } from '~/slices';
import { Lang } from '~/types';

export function LanguageSettings() {
  const currentLang = useSelector(selectLang);
  const { isFetching } = translationsEndpoints.getTranslations.useQueryState(currentLang);
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();
  const headingId = 'settings.language.chooseLanguage';

  const handleChange = (lang: Key) => {
    dispatch(languageSelected(lang as Lang));
  };

  const pickerItems = langs.map((lang) => ({
    key: lang,
    label: formatMessage({ id: `lang.${lang}` }),
  }));

  pickerItems.sort((a, b) => a.label.localeCompare(b.label, currentLang));

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

        {isFetching && (
          <ProgressCircle
            size="S"
            isIndeterminate
            aria-label="Loading"
            marginStart="size-125"
          />
        )}
      </Flex>
    </SettingsSection>
  );
}
