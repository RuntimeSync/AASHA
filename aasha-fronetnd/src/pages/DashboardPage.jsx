import { useRecords } from '../hooks/useRecords';
import { RecordsTable } from '../components/records/RecordsTable';
import Header from '../components/common/Header';
import LoadingSpinner from '../components/common/LoadingSpinner';
import React, { useState } from 'react';

function DashboardPage() {
  const { records, loading, error } = useRecords();
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredRecords = records
    .filter((record) => {
      if (filter === 'All') return true;
      if (filter === 'Pending') return record.syncStatus === 'pending';
      return record.riskLevel === filter;
    })
    .filter((record) => record.symptoms.toLowerCase().includes(searchTerm.toLowerCase()));

  // Compute summary metrics
  const totalRecords = records.length;
  const highRiskCount = records.filter(record => record.riskLevel === 'High').length;
  const pendingCount = records.filter(record => record.syncStatus === 'pending').length;

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const getCardStyle = (isActive) => ({
    backgroundColor: isActive ? '#2a2a2a' : '#1f1f1f',
    padding: '15px',
    borderRadius: '8px',
    flex: 1,
    textAlign: 'center',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    border: isActive ? '2px solid #4caf50' : '1px solid #333',
    cursor: 'pointer',
    transition: 'background-color 0.3s, border 0.3s',
  });

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px', minHeight: '100vh', backgroundColor: '#1f1f1f' }}>
      <Header />
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
        {/* Summary Metrics */}
        <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
          <div
            style={getCardStyle(filter === 'All')}
            onClick={() => handleCardClick('All')}
          >
            <h3 style={{ margin: '0 0 10px', fontSize: '14px', color: '#bbb' }}>Total Records</h3>
            <p style={{ fontSize: '28px', fontWeight: 'bold', margin: 0 }}>{totalRecords}</p>
          </div>
          <div
            style={getCardStyle(filter === 'High')}
            onClick={() => handleCardClick('High')}
          >
            <h3 style={{ margin: '0 0 10px', fontSize: '14px', color: '#bbb' }}>High Risk Cases</h3>
            <p style={{ fontSize: '28px', fontWeight: 'bold', margin: 0 }}>{highRiskCount}</p>
          </div>
          <div
            style={getCardStyle(filter === 'Pending')}
            onClick={() => handleCardClick('Pending')}
          >
            <h3 style={{ margin: '0 0 10px', fontSize: '14px', color: '#bbb' }}>Pending Sync</h3>
            <p style={{ fontSize: '28px', fontWeight: 'bold', margin: 0 }}>{pendingCount}</p>
          </div>
        </div>

        {/* Search and Filter */}
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="risk-filter" style={{ marginRight: '10px' }}>Filter by Risk:</label>
          <select
            id="risk-filter"
            value={filter}
            onChange={handleFilterChange}
            style={{ padding: '5px', marginRight: '20px' }}
          >
            <option value="All">All</option>
            <option value="High">High</option>
            <option value="Normal">Normal</option>
            <option value="Pending">Pending</option>
          </select>
          <input
            type="text"
            placeholder="Search by symptoms..."
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ padding: '5px', width: '200px' }}
          />
        </div>

        {/* Records Table */}
        {filteredRecords.length > 0 ? (
          <RecordsTable records={filteredRecords} />
        ) : (
          <div>
            {searchTerm ? (
              <div>No records match your search.</div>
            ) : (
              <div>No records available.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardPage;