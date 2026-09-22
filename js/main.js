/**
 * Celebrity Smile - Main JavaScript
 * Handles navigation, animations, stats counter, testimonials slider, and modal dialogs.
 */

document.addEventListener("DOMContentLoaded", () => {
  initHeaderScroll();
  initMobileMenu();
  initActiveNav();
  initStatsCounter();
  initTestimonialsSlider();
  initTreatmentModal();
  initSmoothScroll();
});

/* --- Header Scroll Effect --- */
function initHeaderScroll() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  window.addEventListener(
    "scroll",
    () => {
      if (window.scrollY > 40) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    },
    { passive: true },
  );
}

/* --- Mobile Menu Drawer --- */
function initMobileMenu() {
  const toggleBtn = document.querySelector(".mobile-nav-toggle");
  const drawer = document.querySelector(".mobile-nav-drawer");
  const mobileLinks = document.querySelectorAll(".mobile-nav-link");

  if (!toggleBtn || !drawer) return;

  function toggleMenu() {
    const isOpen = drawer.classList.toggle("open");
    toggleBtn.classList.toggle("open", isOpen);
    toggleBtn.setAttribute("aria-expanded", isOpen);
    document.body.style.overflow = isOpen ? "hidden" : "";
  }

  toggleBtn.addEventListener("click", toggleMenu);

  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      drawer.classList.remove("open");
      toggleBtn.classList.remove("open");
      document.body.style.overflow = "";
    });
  });
}

/* --- Active Navigation on Scroll --- */
function initActiveNav() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            if (link.getAttribute("href") === `#${id}`) {
              link.classList.add("active");
            } else {
              link.classList.remove("active");
            }
          });
        }
      });
    },
    {
      rootMargin: "-30% 0px -60% 0px",
    },
  );

  sections.forEach((sec) => observer.observe(sec));
}

/* --- Animated Statistics Counter --- */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll(".stat-number");
  if (!statNumbers.length) return;

  let animated = false;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          statNumbers.forEach((stat) => {
            const target = parseInt(stat.getAttribute("data-target"), 10);
            const suffix = stat.getAttribute("data-suffix") || "";
            if (isNaN(target)) return;

            let current = 0;
            const duration = 1800; // ms
            const stepTime = 25;
            const totalSteps = duration / stepTime;
            const increment = target / totalSteps;

            const timer = setInterval(() => {
              current += increment;
              if (current >= target) {
                stat.textContent = target + suffix;
                clearInterval(timer);
              } else {
                stat.textContent = Math.floor(current) + suffix;
              }
            }, stepTime);
          });
        }
      });
    },
    { threshold: 0.3 },
  );

  const statsSection = document.querySelector(".stats-section");
  if (statsSection) {
    observer.observe(statsSection);
  }
}

/* --- Testimonials Slider --- */
function initTestimonialsSlider() {
  const prevBtn = document.querySelector(".slider-prev");
  const nextBtn = document.querySelector(".slider-next");
  const cards = document.querySelectorAll(".testimonial-card");

  if (!cards.length) return;

  let currentIndex = 0;

  function updateSlider() {
    if (window.innerWidth <= 992) {
      cards.forEach((card, idx) => {
        card.style.display = idx === currentIndex ? "flex" : "none";
      });
    } else {
      cards.forEach((card) => {
        card.style.display = "flex";
      });
    }
  }

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", () => {
      currentIndex = currentIndex === 0 ? cards.length - 1 : currentIndex - 1;
      updateSlider();
    });

    nextBtn.addEventListener("click", () => {
      currentIndex = currentIndex === cards.length - 1 ? 0 : currentIndex + 1;
      updateSlider();
    });
  }

  window.addEventListener("resize", updateSlider);
  updateSlider();
}

/* --- Treatment Details Modal --- */
const treatmentDetailsData = {
  acne: {
    title: "Acne Treatment",
    subtitle: "Clear acne & prevent breakouts for healthier-looking skin",
    img: "assets/images/treatment-acne.jpg",
    tags: ["Medical Grade", "45-60 Mins", "Zero Downtime"],
    desc: "Our specialized acne management program combines clinical extractions, salicylic & mandelic peel infusions, and anti-inflammatory LED light therapy to target acne at the root, unclog pores, reduce active blemishes, and prevent future breakouts without skin dryness.",
    benefits: [
      "✓ Targets acne-causing bacteria",
      "✓ Calms redness & cystic swelling",
      "✓ Unclogs deep stubborn pores",
      "✓ Regulates sebum production",
      "✓ Fades post-inflammatory marks",
      "✓ Custom post-care regimen",
    ],
  },
  tanRemoval: {
  title: "Tan Removal",
  subtitle: "Reduce tanning and restore a brighter, more even-looking skin tone",
  img: "assets/images/treatment-brightening.jpg",
  tags: ["Customized Care", "30-45 Mins", "Personalized"],
  desc: "A personalized tan-removal approach designed to help reduce the appearance of sun tan, dullness and uneven skin tone. Treatment is selected according to your skin type, level of tanning and individual skin concerns.",
  benefits: [
    "✓ Helps reduce the appearance of sun tan",
    "✓ Improves uneven-looking skin tone",
    "✓ Helps restore a fresh, radiant appearance",
    "✓ Supports smoother-looking skin",
    "✓ Customized according to your skin type",
    "✓ Personalized post-treatment care guidance",
  ],
},
  antiaging: {
    title: "Anti-Aging Therapy",
    subtitle: "Reduce fine lines, wrinkles & visible signs of aging",
    img: "assets/images/treatment-antiaging.jpg",
    tags: ["Collagen Boost", "60-75 Mins", "Long-Lasting"],
    desc: "Non-invasive collagen remodeling therapy leveraging advanced radiofrequency tightening, peptide micro-infusion, and high-frequency ultrasound to firm sagging skin, smoothen fine lines around the eyes and forehead, and restore facial bounce.",
    benefits: [
      "✓ Stimulates deep collagen & elastin",
      "✓ Smoothens fine lines & wrinkles",
      "✓ Improves facial skin firmness",
      "✓ Restores youthful skin elasticity",
      "✓ Non-surgical & painless",
      "✓ Natural, refreshed appearance",
    ],
  },
  laser: {
    title: "Laser Pigmentation Treatment",
    subtitle: "Advanced laser care for pigmentation and uneven skin tone",
    img: "assets/images/treatment-laser.jpg",
    tags: ["Targeted Pigment Care", "30-45 Mins", "Customized"],
    desc: "A targeted laser-based treatment designed to address pigmentation, dark spots and uneven skin tone. Treatment settings are customized according to your skin type, pigmentation pattern and individual concerns.",
    benefits: [
      "✓ Targets unwanted pigmentation",
      "✓ Helps reduce the appearance of dark spots",
      "✓ Improves uneven skin tone",
      "✓ Customized treatment approach",
      "✓ Suitable treatment planning for Indian skin",
      "✓ Dermatologist-guided care",
    ],
  },
  hairMicroneedling: {
    title: "Hair Microneedling",
    subtitle: "Microneedling-based care for healthier-looking hair",
    img: "assets/images/treatment-HairMicroneedling.jpg",
    tags: ["Scalp Care", "30-45 Mins", "Minimal Downtime"],
    desc: "Hair microneedling uses controlled micro-injuries on the scalp to support the skin's natural regenerative response. It may be recommended as part of a personalized hair-care plan based on your scalp condition and hair concerns.",
    benefits: [
      "✓ Supports scalp rejuvenation",
      "✓ May improve scalp circulation",
      "✓ Supports healthier-looking hair",
      "✓ Helps enhance topical treatment absorption",
      "✓ Personalized treatment planning",
      "✓ Minimal downtime",
    ],
  },
  facialHairReduction: {
    title: "Facial Hair Reduction",
    subtitle: "Customized laser care for unwanted facial hair",
    img: "assets/images/treatment-facial-hair-reduction.jpeg",
    tags: ["Laser Hair Reduction", "15-30 Mins", "Customized"],
    desc: "A customized laser hair-reduction treatment designed to gradually reduce unwanted facial hair. Treatment parameters are selected according to your skin type, hair characteristics and individual needs.",
    benefits: [
      "✓ Helps reduce unwanted facial hair",
      "✓ Targets hair follicles",
      "✓ Gradual reduction with multiple sessions",
      "✓ Customized for skin and hair type",
      "✓ Quick treatment sessions",
      "✓ Dermatologist-guided treatment",
    ],
  },
  moleRemoval: {
    title: "Mole Removal",
    subtitle: "Professional assessment and treatment for unwanted moles",
    img: "assets/images/treatment-moleremoval.jpeg",
    tags: ["Skin Evaluation", "Customized", "Professional Care"],
    desc: "Unwanted moles are first assessed to determine the appropriate treatment approach. Depending on the type, size and location of the mole, the doctor may recommend a suitable removal procedure.",
    benefits: [
      "✓ Professional mole assessment",
      "✓ Treatment approach based on individual case",
      "✓ Suitable options for selected benign moles",
      "✓ Focused treatment",
      "✓ Personalized aftercare guidance",
      "✓ Doctor-supervised care",
    ],
  },
  tattooRemoval: {
    title: "Tattoo Removal",
    subtitle: "Customized laser treatment to gradually fade unwanted tattoos",
    img: "assets/images/treatment-tattoo-removal.jpeg",
    tags: ["Laser Treatment", "Customized Sessions", "Progressive Results"],
    desc: "Laser tattoo removal uses targeted laser energy to break down tattoo pigments so the body can gradually clear them. The number of sessions varies depending on tattoo size, colour, depth, location and other individual factors.",
    benefits: [
      "✓ Targets tattoo pigments",
      "✓ Suitable for selected tattoo colours",
      "✓ Customized treatment settings",
      "✓ Progressive fading over multiple sessions",
      "✓ Treatment plan based on tattoo characteristics",
      "✓ Professional aftercare guidance",
    ],
  },
  pigmentation: {
    title: "Pigmentation Treatment",
    subtitle: "Reduce dark spots, melasma and uneven skin tone",
    img: "assets/images/treatment-pigmentation.jpg",
    tags: ["Targeted Care", "45 Mins", "Custom Peels"],
    desc: "Comprehensive melasma and hyperpigmentation care combining specialized depigmenting peels, targeted serum electroporation, and barrier-repairing post-treatment complexes to lighten dark patches safely and evenly.",
    benefits: [
      "✓ Safe for Indian melanin-rich skin",
      "✓ Treats melasma & sun spots",
      "✓ Reduces dark patches & discoloration",
      "✓ Prevents rebound pigmentation",
      "✓ Restores uniform skin clarity",
      "✓ Personalized maintenance guide",
    ],
  },
  hydrafacial: {
    title: "Medical Hydrafacial",
    subtitle: "Deep cleansing & vortex hydration for instant glow",
    img: "assets/images/treatment-hydrafacial.jpg",
    tags: ["3-in-1 Vortex", "45 Mins", "Instant Results"],
    desc: "A 3-step medical-grade facial that cleanses, exfoliates, extracts impurities via painless vortex suction, and saturates the skin with intensive antioxidant, hyaluronic acid, and peptide serums for immediate plumping and glass-skin glow.",
    benefits: [
      "✓ Painless vortex blackhead extraction",
      "✓ Intensive hyaluronic hydration",
      "✓ Instant party-ready glow",
      "✓ Smoothens bumpy skin texture",
      "✓ Refines open congested pores",
      "✓ 100% gentle with no downtime",
    ],
  },
};

function initTreatmentModal() {
  const modalOverlay = document.getElementById("treatment-modal");
  const closeBtn = document.getElementById("treatment-modal-close");
  const cards = document.querySelectorAll(".treatment-card");
  const directBookBtn = document.getElementById("modal-book-btn");

  if (!modalOverlay || !closeBtn) return;

  function openModal(key) {
    const data = treatmentDetailsData[key];
    if (!data) return;

    document.getElementById("modal-img").src = data.img;
    document.getElementById("modal-img").alt = data.title;
    document.getElementById("modal-title").textContent = data.title;
    document.getElementById("modal-subtitle").textContent = data.subtitle;
    document.getElementById("modal-desc").textContent = data.desc;

    // Tags
    const tagsContainer = document.getElementById("modal-tags");
    tagsContainer.innerHTML = "";
    data.tags.forEach((t) => {
      const chip = document.createElement("span");
      chip.className = "meta-chip";
      chip.textContent = t;
      tagsContainer.appendChild(chip);
    });

    // Benefits
    const benefitsList = document.getElementById("modal-benefits");
    benefitsList.innerHTML = "";
    data.benefits.forEach((b) => {
      const li = document.createElement("li");
      li.className = "treatment-benefit-item";
      li.textContent = b;
      benefitsList.appendChild(li);
    });

    modalOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modalOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const key = card.getAttribute("data-treatment");
      openModal(key);
    });
  });

  closeBtn.addEventListener("click", closeModal);
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  if (directBookBtn) {
    directBookBtn.addEventListener("click", () => {
      closeModal();
      const bookingSection = document.getElementById("appointment");
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  }
}

/* --- Smooth Scrolling --- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}
