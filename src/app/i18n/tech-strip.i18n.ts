import { Translated } from '../core/language.service';
import { TechId } from '../sections/tech-strip/tech-logos';

export interface TechStripItem {
  id: TechId;
  name: string;
}

export interface TechStripText {
  label: string;
  items: TechStripItem[];
}

const ITEMS: TechStripItem[] = [
  { id: 'angular', name: 'Angular' },
  { id: 'react', name: 'React' },
  { id: 'typescript', name: 'TypeScript' },
  { id: 'ionic', name: 'Ionic' },
  { id: 'react-native', name: 'React Native' },
  { id: 'dotnet', name: '.NET' },
  { id: 'figma', name: 'Figma' },
];

export const TECH_STRIP_TEXT: Translated<TechStripText> = {
  cs: {
    label: 'S čím pracuji',
    items: ITEMS,
  },
  en: {
    label: 'What I work with',
    items: ITEMS,
  },
};
