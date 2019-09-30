import React from 'react';
import { string, node, bool, object } from 'prop-types';

import Loading from './components/loading';

export function withSpinner({ WrappedComponent, classNameContainer, classNameLoading }) {
  function Spinner({ loading, ...props }) {
    return loading ? (
      <div className={classNameContainer}>
        <Loading className={classNameLoading} />
      </div>
    ) : (
      <WrappedComponent {...props} />
    );
  }

  Spinner.propTypes = {
    loading: bool,
    props: object // eslint-disable-line react/forbid-prop-types
  };

  return Spinner;
}

withSpinner.propTypes = {
  classNameContainer: string,
  classNameLoading: string,
  WrappedComponent: node
};

withSpinner.defaultProps = {
  classNameContainer: ''
};
