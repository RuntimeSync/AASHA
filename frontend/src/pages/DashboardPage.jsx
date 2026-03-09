import React, { useState, useEffect } from 'react';

const API_BASE = import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:8080';

const DashboardPage = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [riskFilter, setRiskFilter] = useState('All');

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/records`);
        const data = await response.json();
        setRecords(data.records || []);
      } catch (error) {
        console.error('Error fetching records:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, []);

  const totalRecords = records.length;
  const highRiskRecords = records.filter((record) => ['High', 'Critical'].includes(record.riskLevel));
  const filteredRecords =
    riskFilter === 'All'
      ? records
      : records.filter((record) => record.riskLevel === riskFilter);

  return (
    <div style={{ padding: '20px', backgroundColor: '#f9f9f9', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
      <header style={{ marginBottom: '20px' }}>
        <h1 style={{ fontSize: '24px', color: '#333' }}>PHC Dashboard</h1>
      </header>

      {loading ? (
        <p style={{ textAlign: 'center', color: '#666' }}>Loading...</p>
      ) : (
        <>
          <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', flexWrap: 'wrap' }}>
            <div
              style={{
                flex: 1,
                minWidth: '200px',
                backgroundColor: '#fff',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                padding: '20px',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '36px', marginBottom: '10px' }}>Records</div>
              <h2 style={{ fontSize: '18px', color: '#333', marginBottom: '10px' }}>Total Records</h2>
              <p style={{ fontSize: '24px', color: '#555' }}>{totalRecords}</p>
            </div>

            <div
              style={{
                flex: 1,
                minWidth: '200px',
                backgroundColor: '#fff',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                padding: '20px',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '36px', marginBottom: '10px' }}>Risk</div>
              <h2 style={{ fontSize: '18px', color: '#333', marginBottom: '10px' }}>High Risk Cases</h2>
              <p style={{ fontSize: '24px', color: '#555' }}>{highRiskRecords.length}</p>
            </div>
          </div>

          <section>
            <h2 style={{ fontSize: '20px', color: '#333', marginBottom: '20px' }}>Recent High Risk Cases</h2>
            {highRiskRecords.length === 0 ? (
              <p style={{ color: '#666' }}>No high risk cases currently.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {highRiskRecords.slice(0, 5).map((record) => (
                  <div
                    key={record.id}
                    style={{
                      backgroundColor: '#fff',
                      borderRadius: '8px',
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                      padding: '15px',
                    }}
                  >
                    <p style={{ margin: '5px 0', fontSize: '16px', color: '#333' }}>
                      <strong>Patient:</strong> {record.patientName || record.id}
                    </p>
                    <p style={{ margin: '5px 0', fontSize: '16px', color: '#333' }}>
                      <strong>Symptoms:</strong> {record.structured?.symptoms?.join(', ') || '-'}
                    </p>
                    <p
                      style={{
                        display: 'inline-block',
                        backgroundColor: '#ff6b6b',
                        color: '#fff',
                        padding: '5px 10px',
                        borderRadius: '12px',
                        fontSize: '14px',
                        margin: '5px 0',
                      }}
                    >
                      {record.riskLevel}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section style={{ marginTop: '30px' }}>
            <h2 style={{ fontSize: '20px', color: '#333', marginBottom: '20px' }}>All Records</h2>
            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="riskFilter" style={{ marginRight: '10px', color: '#333', fontWeight: 'bold' }}>
                Filter by Risk Level
              </label>
              <select
                id="riskFilter"
                value={riskFilter}
                onChange={(e) => setRiskFilter(e.target.value)}
                style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid #ccc' }}
              >
                <option value="All">All</option>
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <div style={{ overflowX: 'auto', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f3f3f3' }}>
                    <th style={{ textAlign: 'left', padding: '12px' }}>Name</th>
                    <th style={{ textAlign: 'left', padding: '12px' }}>Type</th>
                    <th style={{ textAlign: 'left', padding: '12px' }}>Risk</th>
                    <th style={{ textAlign: 'left', padding: '12px' }}>Symptoms</th>
                    <th style={{ textAlign: 'left', padding: '12px' }}>Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRecords.length === 0 ? (
                    <tr>
                      <td colSpan="5" style={{ padding: '12px', color: '#666' }}>No records found.</td>
                    </tr>
                  ) : (
                    filteredRecords.map((record) => (
                      <tr key={record.id} style={{ borderTop: '1px solid #eee' }}>
                        <td style={{ padding: '12px' }}>{record.patientName || '-'}</td>
                        <td style={{ padding: '12px' }}>{record.patientType || '-'}</td>
                        <td style={{ padding: '12px' }}>{record.riskLevel || '-'}</td>
                        <td style={{ padding: '12px' }}>{record.structured?.symptoms?.join(', ') || '-'}</td>
                        <td style={{ padding: '12px' }}>
                          {record.createdAt ? new Date(record.createdAt).toLocaleString() : '-'}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default DashboardPage;
