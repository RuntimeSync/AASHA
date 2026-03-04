/**
 * @typedef {Object} HealthRecord
 * @property {string} id - The unique identifier for the health record.
 * @property {number} pregnancyMonth - The month of pregnancy.
 * @property {string} symptoms - The symptoms reported.
 * @property {"High" | "Normal"} riskLevel - The risk level associated with the health record.
 * @property {string} createdAt - The creation date of the record as an ISO string.
 * @property {"pending" | "synced"} syncStatus - The synchronization status of the record.
 */