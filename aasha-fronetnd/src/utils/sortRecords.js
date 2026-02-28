/**
 * Sort an array of HealthRecord objects.
 *
 * @param {HealthRecord[]} records - The array of health records to sort.
 * @returns {HealthRecord[]} A new array of sorted health records.
 */
export function sortRecords(records) {
  return [...records].sort((a, b) => {
    // Sort by riskLevel: "High" before "Normal"
    if (a.riskLevel !== b.riskLevel) {
      return a.riskLevel === "High" ? -1 : 1;
    }

    // If riskLevel is the same, sort by createdAt descending
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
}