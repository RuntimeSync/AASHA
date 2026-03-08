import { useState, useEffect, useCallback } from "react";
import extractStructuredData from '../utils/structuredProcessor';
import calculateRisk from '../utils/riskEngine';
import { saveRecord } from "../indexeddb/db";
import { syncPendingRecords } from "../sync/syncEngine";
import { verifyConnectivity } from "../utils/connectivity";

function detectInputLanguage(text) {
  const input = (text || '').toLowerCase();
  const hasDevanagari = /[\u0900-\u097F]/.test(input);
  if (!hasDevanagari) return 'en';

  const hindiMarkers = [' है ', ' में ', ' को ', ' दिन', ' बुखार', ' गर्भवती', ' रक्तस्राव'];
  const marathiMarkers = [' आहे ', ' मध्ये ', ' दिवस', ' ताप', ' गरोदर', ' जास्त', ' सूज'];

  let hiScore = 0;
  let mrScore = 0;
  hindiMarkers.forEach((m) => {
    if (input.includes(m.trim())) hiScore += 1;
  });
  marathiMarkers.forEach((m) => {
    if (input.includes(m.trim())) mrScore += 1;
  });

  return mrScore > hiScore ? 'mr' : 'hi';
}

function AshaPage() {
  const [language, setLanguage] = useState('auto');
  const [patientName, setPatientName] = useState('');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('');
  const [patientType, setPatientType] = useState('adult');
  const [visitType, setVisitType] = useState('routine');
  const [rawText, setRawText] = useState('');
  const [extracted, setExtracted] = useState(null);
  const [risk, setRisk] = useState(null);
  const [isOnline, setIsOnline] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState(null);
  const [lastDetectedLanguage, setLastDetectedLanguage] = useState('en');

  const checkConnectivityAndSync = useCallback(async () => {
    const reachable = await verifyConnectivity();
    setIsOnline(reachable);

    if (reachable) {
      syncPendingRecords();
    }
  }, []);

  // AUTO SYNC ON CONNECTIVITY RESTORE
  useEffect(() => {
    checkConnectivityAndSync();

    const handleNetworkEvent = () => {
      checkConnectivityAndSync();
    };

    const interval = window.setInterval(checkConnectivityAndSync, 30000);

    window.addEventListener("online", handleNetworkEvent);
    window.addEventListener("offline", handleNetworkEvent);

    return () => {
      window.clearInterval(interval);
      window.removeEventListener("online", handleNetworkEvent);
      window.removeEventListener("offline", handleNetworkEvent);
    };
  }, [checkConnectivityAndSync]);

  const handleProcessInput = async () => {
    if (!rawText.trim()) {
      alert("Please enter or record an observation.");
      return;
    }
    if (!patientName.trim()) {
      alert("Please enter patient name.");
      return;
    }
    if (!age || Number(age) <= 0) {
      alert("Please enter a valid age.");
      return;
    }

    const effectiveLanguage = language === 'auto' ? detectInputLanguage(rawText) : language;
    setLastDetectedLanguage(effectiveLanguage);

    const result = extractStructuredData(rawText, effectiveLanguage);
    setExtracted(result);
    const riskResult = calculateRisk(result, patientType);
    setRisk(riskResult);

    const now = Date.now();
    const record = {
      id: now.toString(),
      patientName: patientName.trim(),
      age: Number(age),
      phone: phone.trim() || null,
      patientType,
      rawText,
      language: effectiveLanguage,
      structured: { ...result, visitType },
      createdAt: now,
      syncStatus: "pending",
      riskLevel: riskResult,
    };

    await saveRecord(record);
    setLastSavedAt(now);
    console.log("Record saved offline");
  };

  const cardStyle = {
    background: 'linear-gradient(135deg, rgba(255,255,255,0.88), rgba(244,252,247,0.78))',
    border: '1px solid rgba(151, 188, 167, 0.45)',
    borderRadius: 16,
    padding: 16,
    boxShadow: '0 8px 28px rgba(16, 24, 40, 0.08)',
    backdropFilter: 'blur(10px)',
  };
  const inputStyle = { width: '100%', border: '1px solid #c9d8cf', borderRadius: 8, padding: '10px 12px', color: '#111827', background: '#fff' };
  const primaryButton = { borderRadius: 10, border: '1px solid #0f8f5a', padding: '10px 16px', background: '#0f8f5a', color: '#fff', fontWeight: 600, cursor: 'pointer' };
  const secondaryButton = { borderRadius: 10, border: '1px solid #9ecbb3', padding: '10px 16px', background: '#ecfdf3', color: '#0f5132', fontWeight: 600, cursor: 'pointer' };
  const riskLabel = risk || 'No risk';
  const riskTone = riskLabel.toLowerCase().includes('critical')
    ? { bg: '#fef2f2', border: '#ef4444', text: '#991b1b', dot: '#dc2626' }
    : riskLabel.toLowerCase().includes('high')
      ? { bg: '#fff7ed', border: '#f97316', text: '#9a3412', dot: '#ea580c' }
      : riskLabel.toLowerCase().includes('medium')
        ? { bg: '#fffbeb', border: '#f59e0b', text: '#92400e', dot: '#d97706' }
        : { bg: '#ecfdf3', border: '#16a34a', text: '#065f46', dot: '#16a34a' };

  return (
    <div style={{ maxWidth: 1100, margin: '24px auto', padding: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.72)', border: '1px solid rgba(151, 188, 167, 0.45)', borderRadius: 24, padding: '6px 12px', marginBottom: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#0f8f5a' }} />
            <span style={{ fontSize: 12, fontWeight: 700, color: '#0f5132', letterSpacing: 0.4 }}>AASHA PLATFORM</span>
          </div>
          <h1 style={{ margin: 0, fontSize: 38, lineHeight: 1.08, color: '#111827' }}>ASHA Health Console</h1>
          <small style={{ color: '#475467', fontSize: 14 }}>AI-Powered Assistant for Community Health Visits</small>
        </div>
        <span style={{ background: isOnline ? '#ecfdf3' : '#fef3f2', color: isOnline ? '#027a48' : '#b42318', borderRadius: 16, padding: '6px 12px', fontWeight: 600 }}>
          {isOnline ? 'Online' : 'Offline'}
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
        <div style={cardStyle}>
          <h2 style={{ marginTop: 0 }}>Add New Patient - Health Record</h2>

          <h3 style={{ marginBottom: 10 }}>Basic Details</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 0.6fr 1fr', gap: 10, marginBottom: 10 }}>
            <input style={inputStyle} value={patientName} onChange={(e) => setPatientName(e.target.value)} placeholder="Full Name *" />
            <input style={inputStyle} type="number" min="0" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Age *" />
            <select style={inputStyle} value={patientType} onChange={(e) => setPatientType(e.target.value)}>
              <option value="adult">Adult</option>
              <option value="child">Child</option>
              <option value="pregnant">Pregnant</option>
              <option value="elder">Elder</option>
              <option value="general">General</option>
            </select>
          </div>
          <input
            style={{ ...inputStyle, marginBottom: 14 }}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Mobile Number"
          />

          <h3 style={{ marginBottom: 10 }}>Visit Type</h3>
          <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
            {['routine', 'follow-up', 'emergency'].map((type) => (
              <button
                key={type}
                onClick={() => setVisitType(type)}
                style={{
                  borderRadius: 20,
                  border: visitType === type ? '1px solid #0f8f5a' : '1px solid #c9d8cf',
                  padding: '6px 12px',
                  background: visitType === type ? '#dcfce7' : '#fff',
                  color: '#111827',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                {type}
              </button>
            ))}
          </div>

          <h3 style={{ marginBottom: 10 }}>Observations (Voice / Text)</h3>
          <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
            <button
              type="button"
              style={{ ...secondaryButton, padding: '8px 12px' }}
              title="Voice-to-text will be added in next step"
            >
              Start Mic
            </button>
            <select style={inputStyle} value={language} onChange={(e) => setLanguage(e.target.value)}>
              <option value="auto">Auto Detect</option>
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="mr">Marathi</option>
            </select>
          </div>
          {language === 'auto' && (
            <div style={{ color: '#667085', fontSize: 12, marginBottom: 8 }}>
              Auto-detected language on last process: {lastDetectedLanguage.toUpperCase()}
            </div>
          )}
          <textarea
            rows={7}
            style={{ ...inputStyle, minHeight: 150, resize: 'vertical' }}
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
            placeholder="Enter observation text..."
            maxLength={500}
          />
          <div style={{ textAlign: 'right', color: '#667085', fontSize: 12 }}>{rawText.length} / 500</div>

          <div style={{ marginTop: 14 }}>
            <button style={secondaryButton} onClick={handleProcessInput}>Save Offline</button>{' '}
            <button style={primaryButton} onClick={syncPendingRecords}>Save & Sync</button>
          </div>
        </div>

        <div style={cardStyle}>
          <h3 style={{ marginTop: 0 }}>Risk Summary</h3>
          <div
            style={{
              background: riskTone.bg,
              border: `1px solid ${riskTone.border}`,
              borderLeft: `6px solid ${riskTone.dot}`,
              borderRadius: 12,
              padding: 12,
              fontWeight: 700,
              color: riskTone.text,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span>{risk ? `${risk} Risk` : 'No risk calculated yet'}</span>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: riskTone.dot }} />
          </div>
          <p style={{ color: '#667085', marginTop: 12 }}>
            Last saved offline: {lastSavedAt ? new Date(lastSavedAt).toLocaleTimeString() : 'Not yet'}
          </p>

          <h4>Structured Preview</h4>
          {extracted ? (
            <div style={{ fontSize: 14, lineHeight: 1.6 }}>
              <div><strong>Pregnancy Month:</strong> {extracted.pregnancyMonth ?? 'N/A'}</div>
              <div><strong>Fever Days:</strong> {extracted.feverDays ?? 'N/A'}</div>
              <div><strong>High BP:</strong> {extracted.highBP ? 'Yes' : 'No'}</div>
              <div><strong>Swelling:</strong> {extracted.swelling ? 'Yes' : 'No'}</div>
              <div><strong>Bleeding:</strong> {extracted.bleeding ? 'Yes' : 'No'}</div>
              <div><strong>Breathing Issue:</strong> {extracted.breathingIssue ? 'Yes' : 'No'}</div>
              <div><strong>Symptoms:</strong> {(extracted.symptoms || []).join(', ') || 'None'}</div>
            </div>
          ) : (
            <p style={{ color: '#667085' }}>No structured data yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AshaPage;
