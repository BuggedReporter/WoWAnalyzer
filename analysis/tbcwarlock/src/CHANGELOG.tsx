import { change, date } from 'common/changelog';
import { Khadaj, Talador12, emallson } from 'CONTRIBUTORS';

export default [
  change(date(2021, 10, 11), 'Fixed crashing errors in Curse modules', emallson),
  change(date(2021, 10, 6), 'Warlock modules and spell types', Talador12),
  change(date(2021, 10, 1), 'Stubbing out Warlock Analyzer', Khadaj),
];
