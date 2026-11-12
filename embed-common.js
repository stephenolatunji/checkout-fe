// Shared by customer.html and merchant.html.
const API_BASE_URL = "https://checkout-be-jxj8.onrender.com";
const SESSION_KEY = "payoak-test-session";

function saveSession(session) {
  try { localStorage.setItem(SESSION_KEY, JSON.stringify(session)); } catch (_) {}
}
function loadSession() {
  try { return JSON.parse(localStorage.getItem(SESSION_KEY)) || null; } catch (_) { return null; }
}

async function postJson(path, body) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    const msg = result.message || result.error;
    throw new Error(typeof msg === "string" ? msg : "Request failed");
  }
  return result;
}

// Only ever frame an https URL; the link comes from the API but is still treated as untrusted.
function openInFrame(panel, frame, url) {
  const parsed = new URL(url);
  if (parsed.protocol !== "https:" && parsed.hostname !== "localhost") throw new Error("Unexpected embed URL");
  panel.style.display = "none";
  frame.src = parsed.href;
  frame.style.display = "block";
}
