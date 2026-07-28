(function () {
  "use strict";

  const MODAL_ID = "arvPortfolioDownloadModal";
  const FORM_ID = "arvPortfolioDownloadForm";
  const FALLBACK_API_BASE = "https://avr-backend-bhll.onrender.com/api";

  const getApiBase = function () {
    try {
      if (typeof API_BASE !== "undefined" && API_BASE) {
        return String(API_BASE).replace(/\/$/, "");
      }
    } catch (error) {
      // Use the existing production API as a safe fallback.
    }

    return FALLBACK_API_BASE;
  };

  const apiBase = getApiBase();
  let lastFocusedElement = null;

  const modalMarkup = `
    <div class="arv-portfolio-modal-overlay" id="${MODAL_ID}" aria-hidden="true">
      <div class="arv-portfolio-modal" role="dialog" aria-modal="true" aria-labelledby="arvPortfolioModalTitle" aria-describedby="arvPortfolioModalDescription">
        <button class="arv-portfolio-modal-close" type="button" aria-label="Close portfolio form" data-arv-portfolio-close>&times;</button>

        <div class="arv-portfolio-modal-eyebrow">Our Portfolio</div>
        <h2 class="arv-portfolio-modal-title" id="arvPortfolioModalTitle">Download Our Portfolio</h2>
        <p class="arv-portfolio-modal-description" id="arvPortfolioModalDescription">
          Share your details and our latest portfolio will begin downloading automatically.
        </p>

        <form id="${FORM_ID}" novalidate>
          <div class="arv-portfolio-field">
            <label for="arvPortfolioName">Name</label>
            <div class="arv-portfolio-input-wrap">
              <i class="fa-solid fa-user" aria-hidden="true"></i>
              <input id="arvPortfolioName" name="name" type="text" autocomplete="name" maxlength="100" placeholder="Enter your full name" required />
            </div>
          </div>

          <div class="arv-portfolio-field">
            <label for="arvPortfolioPhone">Phone Number</label>
            <div class="arv-portfolio-input-wrap">
              <i class="fa-solid fa-phone" aria-hidden="true"></i>
              <input id="arvPortfolioPhone" name="phone" type="tel" autocomplete="tel" inputmode="tel" maxlength="20" placeholder="Enter your phone number" required />
            </div>
          </div>

          <button class="arv-portfolio-submit" type="submit">
            <span class="arv-portfolio-spinner" aria-hidden="true"></span>
            <span class="arv-portfolio-submit-text">Submit &amp; Download</span>
            <i class="fa-solid fa-download arv-portfolio-submit-icon" aria-hidden="true"></i>
          </button>

          <div class="arv-portfolio-form-message" role="status" aria-live="polite"></div>
        </form>

        <p class="arv-portfolio-privacy">
          <i class="fa-solid fa-lock" aria-hidden="true"></i>
          <span>Your information is used only to respond to your enquiry.</span>
        </p>
      </div>
    </div>
  `;

  const ensureModalExists = function () {
    let modal = document.getElementById(MODAL_ID);

    if (!modal) {
      document.body.insertAdjacentHTML("beforeend", modalMarkup);
      modal = document.getElementById(MODAL_ID);
      bindModalEvents(modal);
    }

    return modal;
  };

  const setMessage = function (message, type) {
    const modal = document.getElementById(MODAL_ID);
    if (!modal) return;

    const messageBox = modal.querySelector(".arv-portfolio-form-message");
    messageBox.textContent = message || "";
    messageBox.classList.remove("is-visible", "is-error", "is-success");

    if (message) {
      messageBox.classList.add("is-visible", type === "success" ? "is-success" : "is-error");
    }
  };

  const setLoading = function (isLoading) {
    const modal = document.getElementById(MODAL_ID);
    if (!modal) return;

    const submitButton = modal.querySelector(".arv-portfolio-submit");
    const submitText = modal.querySelector(".arv-portfolio-submit-text");
    const submitIcon = modal.querySelector(".arv-portfolio-submit-icon");

    submitButton.disabled = isLoading;
    submitButton.classList.toggle("is-loading", isLoading);
    submitText.textContent = isLoading ? "Preparing Download..." : "Submit & Download";
    submitIcon.style.display = isLoading ? "none" : "inline-block";
  };

  const openModal = function () {
    const modal = ensureModalExists();
    const form = modal.querySelector("form");

    lastFocusedElement = document.activeElement;
    form.reset();
    setMessage("", "error");
    setLoading(false);

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("arv-portfolio-modal-open");

    window.setTimeout(function () {
      const nameInput = modal.querySelector('input[name="name"]');
      if (nameInput) nameInput.focus();
    }, 80);
  };

  const closeModal = function () {
    const modal = document.getElementById(MODAL_ID);
    if (!modal) return;

    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("arv-portfolio-modal-open");

    if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
      lastFocusedElement.focus();
    }
  };

  const downloadPortfolio = async function (fileName) {
    const downloadUrl = `${apiBase}/query/download?t=${Date.now()}`;

    try {
      const response = await fetch(downloadUrl, {
        method: "GET",
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Portfolio PDF could not be downloaded.");
      }

      const pdfBlob = await response.blob();
      const objectUrl = window.URL.createObjectURL(pdfBlob);
      const link = document.createElement("a");

      link.href = objectUrl;
      link.download = fileName || "Company-Portfolio.pdf";
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.setTimeout(function () {
        window.URL.revokeObjectURL(objectUrl);
      }, 1500);
    } catch (error) {
      // Browser fallback: the backend sends Content-Disposition: attachment.
      const hiddenFrame = document.createElement("iframe");
      hiddenFrame.src = downloadUrl;
      hiddenFrame.title = "Portfolio download";
      hiddenFrame.style.display = "none";
      document.body.appendChild(hiddenFrame);

      window.setTimeout(function () {
        hiddenFrame.remove();
      }, 60000);
    }
  };

  const submitPortfolioForm = async function (event) {
    event.preventDefault();

    const form = event.currentTarget;
    const name = form.elements.name.value.trim();
    const phone = form.elements.phone.value.trim();
    const phonePattern = /^[0-9+()\-\s]{7,20}$/;

    setMessage("", "error");

    if (!name) {
      setMessage("Please enter your name.", "error");
      form.elements.name.focus();
      return;
    }

    if (!phone || !phonePattern.test(phone)) {
      setMessage("Please enter a valid phone number.", "error");
      form.elements.phone.focus();
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${apiBase}/query`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, phone }),
      });

      let result = {};
      try {
        result = await response.json();
      } catch (parseError) {
        result = {};
      }

      if (!response.ok || result.success === false) {
        throw new Error(result.message || "Unable to submit your details. Please try again.");
      }

      setMessage("Thank you. Your portfolio download is starting...", "success");
      await downloadPortfolio(result.fileName || "Company-Portfolio.pdf");
      form.reset();

      window.setTimeout(closeModal, 1400);
    } catch (error) {
      setMessage(error.message || "Something went wrong. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  const bindModalEvents = function (modal) {
    const form = modal.querySelector(`#${FORM_ID}`);
    const closeButton = modal.querySelector("[data-arv-portfolio-close]");

    form.addEventListener("submit", submitPortfolioForm);
    closeButton.addEventListener("click", closeModal);

    modal.addEventListener("click", function (event) {
      if (event.target === modal) {
        closeModal();
      }
    });
  };

  document.addEventListener("click", function (event) {
    const portfolioLink = event.target.closest(
      '.main-header a[href$="portfolio.html"], .responsive-menu a[href$="portfolio.html"]'
    );

    if (!portfolioLink) return;

    event.preventDefault();
    openModal();
  });

  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") return;

    const modal = document.getElementById(MODAL_ID);
    if (modal && modal.classList.contains("is-open")) {
      closeModal();
    }
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ensureModalExists, { once: true });
  } else {
    ensureModalExists();
  }
})();
