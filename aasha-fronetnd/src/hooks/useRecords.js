import { useState, useEffect } from "react";
import { sortRecords } from "../utils/sortRecords";
export function useRecords() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const mockData = [
      {
        id: "1",
        pregnancyMonth: 7,
        symptoms: "Swelling and dizziness",
        riskLevel: "High",
        createdAt: new Date().toISOString(),
        syncStatus: "synced",
      },
      {
        id: "2",
        pregnancyMonth: 4,
        symptoms: "Mild nausea",
        riskLevel: "Normal",
        createdAt: new Date(Date.now() - 10000000).toISOString(),
        syncStatus: "pending",
      },
    ];

    setRecords(sortRecords(mockData));
    setLoading(false);
  }, []);

  return { records, loading, error };
}