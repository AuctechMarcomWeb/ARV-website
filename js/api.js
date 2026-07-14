// js/api.js
const API_BASE = "http://localhost:5000/api";

const ARV_API = {
  // --- GET calls (public) ---
  getBlogs:         () => fetch(`${API_BASE}/blogs`),
  getBlogById:      (id) => fetch(`${API_BASE}/blogs/${id}`),
  getPortfolios:    () => fetch(`${API_BASE}/portfolio`),
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
    fetch(`${API_BASE}/bookConslution`, {  // backend mein typo hai isliye same rakho
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }),
};
