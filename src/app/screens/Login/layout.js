import React from 'react';
import { func, bool } from 'prop-types';
import { t } from 'i18next';
import { Field, reduxForm } from 'redux-form';

import logo from './assets/logo.png';
import { FIELDS, FORM_NAME } from './constants';
import { validate } from './validate';
import styles from './styles.module.scss';

import RenderField from '~components/RenderField';

function Login({ handleSubmit, submitting, loading }) {
  return (
    <form className={`column center middle ${styles.formContainer}`} onSubmit={handleSubmit}>
      <img src={logo} alt="" className={`m-bottom-4 ${styles.imgLogo}`} />
      <div className={`column m-bottom-2 ${styles.sectionContainer}`}>
        <Field
          name={FIELDS.username}
          component={RenderField}
          label={t('Login:username')}
          placeholder={t('Login:usernamePlaceholder')}
          inputId={FIELDS.username}
          className="m-bottom-3"
        />
        <Field
          name={FIELDS.email}
          component={RenderField}
          label={t('Login:email')}
          placeholder={t('Login:emailPlaceholder')}
          inputId={FIELDS.email}
          className="m-bottom-3"
        />
        <Field
          name={FIELDS.password}
          component={RenderField}
          label={t('Login:password')}
          placeholder={t('Login:passwordPlaceholder')}
          inputId={FIELDS.password}
          type="password"
          className="m-bottom-3"
        />
        <button type="submit" className="primary-button m-bottom-1" disabled={submitting}>
          {(submitting || loading) && <i className="fas fa-spinner fa-spin m-right-1" />}
          {t('Login:enter')}
        </button>
      </div>
    </form>
  );
}

Login.propTypes = {
  handleSubmit: func.isRequired,
  loading: bool,
  submitting: bool
};

export default reduxForm({
  form: FORM_NAME,
  validate,
  initialValues: { [FIELDS.email]: 'apithon@test.com', [FIELDS.password]: '123apithon' }
})(Login);
