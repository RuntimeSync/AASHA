import React from 'react';
import PropTypes from 'prop-types';

/**
 * Component to render a badge for the risk level.
 *
 * @param {{ riskLevel: 'High' | 'Normal' }} props
 * @returns {JSX.Element}
 */
export function RiskBadge({ riskLevel }) {
  return (
    <span style={{
      color: riskLevel === 'High' ? 'red' : 'green',
      fontWeight: 'bold',
    }}>
      {riskLevel}
    </span>
  );
}

RiskBadge.propTypes = {
  riskLevel: PropTypes.oneOf(['High', 'Normal']).isRequired,
};