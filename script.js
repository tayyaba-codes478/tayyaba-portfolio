// ========================================
// 1. MOBILE NAVIGATION
// ========================================

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll("#navMenu a");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", function () {
    const isOpen = navMenu.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "✕" : "☰";
  });

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      navMenu.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "☰";
    });
  });

  document.addEventListener("click", function (event) {
    if (
      !navMenu.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      navMenu.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "☰";
    }
  });
}


// ========================================
// 2. AUTOMATIC FOOTER YEAR
// ========================================

const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


// ========================================
// 3. SCROLL REVEAL ANIMATIONS
// ========================================

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    function (entries, observer) {
      entries.forEach(function (entry) {
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

  revealElements.forEach(function (element) {
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach(function (element) {
    element.classList.add("visible");
  });
}


// ========================================
// 4. ACTIVE NAVIGATION LINK
// ========================================

const pageSections = document.querySelectorAll("main section[id]");

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const currentId = entry.target.id;

          navLinks.forEach(function (link) {
            const isActive =
              link.getAttribute("href") === "#" + currentId;

            link.classList.toggle("active", isActive);
          });
        }
      });
    },
    {
      rootMargin: "-30% 0px -60% 0px"
    }
  );

  pageSections.forEach(function (section) {
    sectionObserver.observe(section);
  });
}


// ========================================
// 5. BACK TO TOP BUTTON
// ========================================

const backToTop = document.getElementById("backToTop");

if (backToTop) {
  window.addEventListener(
    "scroll",
    function () {
      backToTop.classList.toggle("visible", window.scrollY > 350);
    },
    { passive: true }
  );

  backToTop.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}


// ========================================
// 6. CONSOLE WELCOME MESSAGE
// ========================================

console.log("Welcome to Tayyaba's Portfolio!");
console.log("Thanks for visiting my website.");
