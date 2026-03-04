export async function fetchRecords() {
  const response = await fetch('http://localhost:8080/records');

  if (!response.ok) {
    throw new Error(`Failed to fetch records: ${response.status} ${response.statusText}`);
  }

  return response.json();
}