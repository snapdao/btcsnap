import { QUESTIONS } from './docs/faq';
import { KNOWLEDGE } from './docs/knowledge';

export enum Doctype {
  FAQ,
  KNOWLEDGE
}

export const Docs: Record<Doctype, string> = {
  [Doctype.FAQ]: QUESTIONS,
  [Doctype.KNOWLEDGE]: KNOWLEDGE
};
