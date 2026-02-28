import React from 'react';
import PropTypes from 'prop-types';
import { RiskBadge } from './RiskBadge';

/**
 * Component to render a single row in the records table.
 *
 * @param {{ record: HealthRecord }} props
 * @returns {JSX.Element}
 */
export function RecordRow({ record }) {
  const getSyncStatusStyle = (status) => {
    if (status === 'pending') {
      return {
        color: 'orange',
        fontWeight: 'bold',
        backgroundColor: 'rgba(255, 165, 0, 0.2)',
        padding: '2px 4px',
        borderRadius: '4px',
      };
    } else if (status === 'synced') {
      return {
        color: 'green',
        fontWeight: 'normal',
      };
    }
    return {};
  };

  return (
    <tr>
      <td>{record.pregnancyMonth}</td>
      <td>{record.symptoms}</td>
      <td><RiskBadge riskLevel={record.riskLevel} /></td>
      <td>{new Date(record.createdAt).toLocaleString()}</td>
      <td style={getSyncStatusStyle(record.syncStatus)}>{record.syncStatus}</td>
    </tr>
  );
}

RecordRow.propTypes = {
  record: PropTypes.shape({
    id: PropTypes.string.isRequired,
    pregnancyMonth: PropTypes.number.isRequired,
    symptoms: PropTypes.string.isRequired,
    riskLevel: PropTypes.oneOf(['High', 'Normal']).isRequired,
    createdAt: PropTypes.string.isRequired,
    syncStatus: PropTypes.oneOf(['pending', 'synced']).isRequired,
  }).isRequired,
};