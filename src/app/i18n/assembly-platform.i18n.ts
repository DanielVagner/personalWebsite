import { Translated } from '../core/language.service';

export type Platform = 'ios' | 'android';

export interface AssemblyPlatformText {
  groupLabel: string;
  ios: string;
  android: string;
}

export const ASSEMBLY_PLATFORM_TEXT: Translated<AssemblyPlatformText> = {
  cs: {
    groupLabel: 'Zobrazit aplikaci pro',
    ios: 'iOS',
    android: 'Android',
  },
  en: {
    groupLabel: 'Show the app on',
    ios: 'iOS',
    android: 'Android',
  },
};
