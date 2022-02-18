import { ColorScheme, Lang, ToolbarPosition } from '~/types';

export type Settings = {
  lang: Lang;
  toolbarPosition: ToolbarPosition;
  colorScheme: ColorScheme | 'auto';
};
