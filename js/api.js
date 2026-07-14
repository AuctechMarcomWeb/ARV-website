// js/api.js
// API base URL — local dev pe localhost, production pe live backend URL
const API_BASE = (
  window.location.hostname === "127.0.0.1" ||
  window.location.hostname === "localhost" ||
  window.location.protocol === "file:"
)
  ? "http://localhost:5000/api"
  : "https://avr-backend-bhll.onrender.com/api"; 

const ARV_API = {
  // --- GET calls (public) ---
  getBlogs:         () => fetch(`${API_BASE}/blogs`),
  getBlogById:      (id) => fetch(`${API_BASE}/blogs/${id}`),
  getBlogByUrl:     (url) => fetch(`${API_BASE}/blogs/url/${encodeURIComponent(url)}`),
  getPortfolios:    () => fetch(`${API_BASE}/portfolio`),
  getPortfolioBySlug: (slug) => fetch(`${API_BASE}/portfolio/slug/${slug}`),
  getPortfolioById:   (id)   => fetch(`${API_BASE}/portfolio/${id}`),
  getGallery:       () => fetch(`${API_BASE}/gallery`),
  getTestimonials:  () => fetch(`${API_BASE}/testimonials`),
  getHomeSliders:   () => fetch(`${API_BASE}/homeSlider`),

  // --- POST calls (public forms) ---
  submitContact: (data) =>
    fetch(`${API_BASE}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }),

  submitBookConsultation: (data) =>
    fetch(`${API_BASE}/bookConslution`, { 
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }),
};
