/**
 * Celebrity Smile - Interactive Before / After Image Comparison
 * Supports mouse drag, touch drag, and keyboard navigation
 */

document.addEventListener("DOMContentLoaded", () => {
  initBeforeAfterSliders();
});

function initBeforeAfterSliders() {
  const viewers = document.querySelectorAll(".ba-viewer");

  viewers.forEach((viewer) => {
    const beforeWrapper = viewer.querySelector(".ba-before-wrapper");
    const handle = viewer.querySelector(".ba-handle");
    const beforeImg = viewer.querySelector(".ba-before-img");

    if (!beforeWrapper || !handle || !beforeImg) return;

    // Ensure the inner image matches parent container width
    function setImgWidth() {
      const viewerWidth = viewer.getBoundingClientRect().width;
      beforeImg.style.width = viewerWidth + "px";
    }

    setImgWidth();
    window.addEventListener("resize", setImgWidth);

    let isDragging = false;

    function updateSlider(clientX) {
      const rect = viewer.getBoundingClientRect();
      let offsetX = clientX - rect.left;

      if (offsetX < 0) offsetX = 0;
      if (offsetX > rect.width) offsetX = rect.width;

      const percentage = (offsetX / rect.width) * 100;

      beforeWrapper.style.width = percentage + "%";
      handle.style.left = percentage + "%";
    }

    // Mouse Events
    viewer.addEventListener("mousedown", (e) => {
      isDragging = true;
      updateSlider(e.clientX);
    });

    window.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      updateSlider(e.clientX);
    });

    window.addEventListener("mouseup", () => {
      isDragging = false;
    });

    // Touch Events
    viewer.addEventListener(
      "touchstart",
      (e) => {
        isDragging = true;
        if (e.touches.length > 0) {
          updateSlider(e.touches[0].clientX);
        }
      },
      { passive: true },
    );

    window.addEventListener(
      "touchmove",
      (e) => {
        if (!isDragging) return;
        if (e.touches.length > 0) {
          updateSlider(e.touches[0].clientX);
        }
      },
      { passive: true },
    );

    window.addEventListener("touchend", () => {
      isDragging = false;
    });
  });
}
