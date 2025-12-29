const PUBLIC_URL = import.meta.env.VITE_API_BASE_URL_PUBLIC;
const LOCAL_URL = import.meta.env.VITE_API_BASE_URL_LOCAL;

let API_BASE_URL;
const hostname = window.location.hostname;

// 1️⃣ Localhost
if (hostname === "localhost" || hostname === "127.0.0.1") {
  API_BASE_URL = LOCAL_URL;
}
// 2️⃣ LAN (IP address)
else if (hostname.startsWith("192.168.")) {
  API_BASE_URL = LOCAL_URL;
}
// 3️⃣ Fallback
else {
  API_BASE_URL = PUBLIC_URL;
}

export default API_BASE_URL;