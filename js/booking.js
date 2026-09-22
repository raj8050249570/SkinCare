/**
 * Celebrity Smile - Appointment Booking & WhatsApp Integration
 */

document.addEventListener("DOMContentLoaded", () => {
  initBookingForm();
  initWhatsAppDirectButtons();
  initCalendarMinDate();
});

const CLINIC_WHATSAPP_NUMBER = "919739160337"; // Placeholder clinic number (easy to replace)

function initCalendarMinDate() {
  const dateInput = document.getElementById("booking-date");
  if (dateInput) {
    const today = new Date().toISOString().split("T")[0];
    dateInput.min = today;
  }
}

function initBookingForm() {
  const form = document.getElementById("appointment-form");
  const toast = document.getElementById("toast");
  const confirmModal = document.getElementById("booking-confirmation-modal");
  const confirmClose = document.getElementById("confirm-modal-close");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("booking-name").value.trim();
    const phone = document.getElementById("booking-phone").value.trim();
    const email = document.getElementById("booking-email").value.trim();
    const date = document.getElementById("booking-date").value;
    const treatment = document.getElementById("booking-treatment").value;
    const message = document.getElementById("booking-message").value.trim();

    if (!name || !phone || !date || !treatment) {
      showToast("Please fill in all required fields.");
      return;
    }

    // Populate confirmation modal
    if (confirmModal) {
      document.getElementById("confirm-name").textContent = name;
      document.getElementById("confirm-treatment").textContent = treatment;
      document.getElementById("confirm-date").textContent = date;
      document.getElementById("confirm-phone").textContent = phone;

      // WhatsApp link in confirmation modal
      const waMsg = `Hello Celebrity Smile, I would like to confirm my consultation for ${treatment} on ${date}. My name is ${name} (${phone}).`;
      const waUrl = `https://wa.me/${CLINIC_WHATSAPP_NUMBER}?text=${encodeURIComponent(waMsg)}`;
      const waConfirmBtn = document.getElementById("confirm-whatsapp-btn");
      if (waConfirmBtn) {
        waConfirmBtn.href = waUrl;
      }

      confirmModal.classList.add("active");
      document.body.style.overflow = "hidden";
    }

    showToast(
      `Thank you, ${name}! Your consultation request has been submitted.`,
    );
    form.reset();
  });

  if (confirmClose && confirmModal) {
    confirmClose.addEventListener("click", () => {
      confirmModal.classList.remove("active");
      document.body.style.overflow = "";
    });
    confirmModal.addEventListener("click", (e) => {
      if (e.target === confirmModal) {
        confirmModal.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  }
}

function initWhatsAppDirectButtons() {
  const defaultMsg =
    "Hello Celebrity Smile, I would like to book a skin consultation.";
  const defaultUrl = `https://wa.me/${CLINIC_WHATSAPP_NUMBER}?text=${encodeURIComponent(defaultMsg)}`;

  const waButtons = document.querySelectorAll(
    ".whatsapp-trigger, .floating-whatsapp-btn",
  );
  waButtons.forEach((btn) => {
    btn.setAttribute("href", defaultUrl);
    btn.setAttribute("target", "_blank");
    btn.setAttribute("rel", "noopener noreferrer");
  });
}

function showToast(message) {
  const toast = document.getElementById("toast");
  const toastText = document.getElementById("toast-text");
  if (!toast || !toastText) return;

  toastText.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 4000);
}
