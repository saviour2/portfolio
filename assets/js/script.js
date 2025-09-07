const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  body.classList.add("dark");
  document.querySelector(".toggle-icon").textContent = "☀️";
} else {
  body.classList.remove("dark");
  document.querySelector(".toggle-icon").textContent = "🌙";
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  const isDark = body.classList.contains("dark");
  document.querySelector(".toggle-icon").textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("main .section");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 80;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute("id");
    }
  });
  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
});

const tabBtns = document.querySelectorAll(".tab-btn");
tabBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(".tab-btn.active").classList.remove("active");
    btn.classList.add("active");
    document
      .querySelectorAll(".tab-content")
      .forEach((tc) => (tc.style.display = "none"));
    document.getElementById(btn.dataset.tab).style.display = "flex";
  });
});

window.addEventListener("DOMContentLoaded", () => {
  // Global background animation (clouds for light, matrix for dark)
  const globalBg = document.getElementById("global-bg");
  function animateCloudsGlobal() {
    globalBg.innerHTML = "";
    for (let i = 0; i < 12; i++) {
      const cloud = document.createElement("div");
      cloud.className = "cloud";
      cloud.style.top = Math.random() * 90 + "%";
      cloud.style.left = Math.random() * 95 + "%";
      cloud.style.opacity = 0.4 + Math.random() * 0.5;
      cloud.style.width = 80 + Math.random() * 80 + "px";
      cloud.style.height = 40 + Math.random() * 40 + "px";
      globalBg.appendChild(cloud);
      gsap.to(cloud, {
        x: "+=60",
        repeat: -1,
        yoyo: true,
        duration: 10 + Math.random() * 6,
        ease: "power1.inOut",
      });
    }
  }
  function animateMatrixGlobal() {
    globalBg.innerHTML = "";
    for (let i = 0; i < 60; i++) {
      const rain = document.createElement("div");
      rain.className = "matrix-rain";
      rain.style.left = i * 1.7 + "%";
      rain.style.top = "-10%";
      rain.textContent = String.fromCharCode(
        0x30a0 + Math.floor(Math.random() * 96)
      );
      globalBg.appendChild(rain);
      gsap.to(rain, {
        y: "110vh",
        repeat: -1,
        delay: Math.random() * 2,
        duration: 2 + Math.random() * 2,
        ease: "none",
        onRepeat: () => {
          rain.textContent = String.fromCharCode(
            0x30a0 + Math.floor(Math.random() * 96)
          );
        },
      });
    }
  }
  function updateGlobalBg() {
    if (body.classList.contains("dark")) {
      animateMatrixGlobal();
    } else {
      animateCloudsGlobal();
    }
  }
  updateGlobalBg();
  themeToggle.addEventListener("click", updateGlobalBg);
});

const resumeBtn = document.getElementById("resume-btn");
if (resumeBtn) {
  resumeBtn.addEventListener("mouseenter", () => {
    gsap.to(resumeBtn, {
      scale: 1.08,
      boxShadow: "0 0 32px var(--accent)",
      duration: 0.3,
    });
  });
  resumeBtn.addEventListener("mouseleave", () => {
    gsap.to(resumeBtn, {
      scale: 1,
      boxShadow: "0 0 12px var(--accent)",
      duration: 0.3,
    });
  });
  resumeBtn.addEventListener("click", function (e) {
    e.preventDefault();
    window.open(
      "assets/files/Saikat Das_CV.pdf",
      "ResumePopup",
      "width=900,height=1200,scrollbars=yes"
    );
  });
}

const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    gsap.to(contactForm, {
      y: -20,
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        contactForm.reset();
        gsap.to(contactForm, { y: 0, opacity: 1, duration: 0.5 });
      },
    });
  });
}
