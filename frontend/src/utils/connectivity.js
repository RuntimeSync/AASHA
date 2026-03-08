const DEFAULT_HEALTHCHECK_URL =
  import.meta.env.VITE_CONNECTIVITY_CHECK_URL || "http://localhost:8080/healthz";

const CONNECTIVITY_TIMEOUT_MS = 3500;

/**
 * Lightweight online verification that checks real reachability, not only network adapter state.
 */
export async function verifyConnectivity(url = DEFAULT_HEALTHCHECK_URL) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), CONNECTIVITY_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      method: "GET",
      cache: "no-store",
      signal: controller.signal,
    });

    return response.ok;
  } catch {
    return false;
  } finally {
    clearTimeout(timeout);
  }
}

export default verifyConnectivity;
