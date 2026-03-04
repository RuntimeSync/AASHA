import React from 'react';
import PropTypes from 'prop-types';
import { RecordRow } from './RecordRow';
import { EmptyState } from '../common/EmptyState';

/**
 * Component to render a table of health records.
 *
 * @param {{ records: HealthRecord[] }} props
 * @returns {JSX.Element}
 */
export function RecordsTable({ records }) {
  if (records.length === 0) {
    return <EmptyState message="No records available." />;
  }

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>Pregnancy Month</th>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>Symptoms</th>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>Risk Level</th>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>Created At</th>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>Sync Status</th>
        </tr>
      </thead>
      <tbody>
        {records.map((record) => (
          <RecordRow key={record.id} record={record} />
        ))}
      </tbody>
    </table>
  );
}

RecordsTable.propTypes = {
  records: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      pregnancyMonth: PropTypes.number.isRequired,
      symptoms: PropTypes.string.isRequired,
      riskLevel: PropTypes.oneOf(['High', 'Normal']).isRequired,
      createdAt: PropTypes.string.isRequired,
      syncStatus: PropTypes.oneOf(['pending', 'synced']).isRequired,
    })
  ).isRequired,
};