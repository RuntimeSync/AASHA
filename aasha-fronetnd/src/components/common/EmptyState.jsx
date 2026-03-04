import React from 'react';
import PropTypes from 'prop-types';

/**
 * Component to render an empty state message.
 *
 * @param {{ message: string }} props
 * @returns {JSX.Element}
 */
export function EmptyState({ message }) {
  return <div>{message}</div>;
}

EmptyState.propTypes = {
  message: PropTypes.string.isRequired,
};