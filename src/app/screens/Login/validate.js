import { t } from 'i18next';

import { email } from '~utils/inputValidations';

export const validate = values => {
  const errors = {};
  if (!values.username) {
    errors.username = t('Validation:required');
  }
  if (!values.email) {
    errors.email = t('Validation:required');
  }
  if (values.email && !email(values.email)) {
    errors.email = t('Validation:email');
  }
  if (!values.password) {
    errors.password = t('Validation:required');
  }
  return errors;
};
