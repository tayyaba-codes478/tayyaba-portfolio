
// ===========================
// TAYYABA PORTFOLIO JAVASCRIPT
// ===========================

// 1. MOBILE NAVIGATION

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navItems = document.querySelectorAll(".nav-link");

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Open navigation menu" : "Close navigation menu"
  );

  navLinks.classList.toggle("open", !isOpen);
});

// Mobile par link click ho to menu close ho jaye.

navItems.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
  });
});

// 2. CURRENT YEAR IN FOOTER

const yearElement = document.getElementById("year");

yearElement.textContent = new Date().getFullYear();

// 3. SCROLL REVEAL ANIMATION

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach((element) => {
    element.classList.add("visible");
  });
}

// 4. ACTIVE NAVIGATION LINK

const pageSections = document.querySelectorAll("main section[id]");

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navItems.forEach((link) => {
            const isActive =
              link.getAttribute("href") === `#${entry.target.id}`;

            link.classList.toggle("active", isActive);
          });
        }
      });
    },
    {
      rootMargin: "-25% 0px -60% 0px"
    }
  );

  pageSections.forEach((section) => {
    sectionObserver.observe(section);
  });
}

// 5. PROJECT LINKS
// Project links take the visitor to the contact section.

const projectLinks = document.querySelectorAll("[data-project]");

projectLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const projectName = link.dataset.project;

    console.log(`Client is interested in: ${projectName}`);
  });
});

// 6. CONTACT EMAIL
// Replace hello@example.com in index.html with your real email.
// Clicking the email button opens the visitor's email application.

console.log("Tayyaba's portfolio is ready!");