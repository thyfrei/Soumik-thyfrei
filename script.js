/*
 * Soumik || thyfrei — Portfolio Interactions
 */

(() => {
  "use strict";

  // Detect which page is currently open (works with or without ".html" in the URL).
  const path = window.location.pathname.toLowerCase();

  const isNestedPage = path.includes("/hdtabs/");
  const root = isNestedPage ? "../../" : "";

  const currentPage = path.includes("/hdtabs/writeups")
    ? "writeups"
    : path.includes("/hdtabs/project")
      ? "project"
      : path.includes("/hdtabs/cv")
        ? "cv"
        : "home";

  // Add interaction styles without modifying your CSS files.
  const style = document.createElement("style");

  // Page title in mobile view
  const header = document.querySelector("header");
  const menuToggle = document.querySelector("#menuToggle");

  const pageTitles = {
    home: "Home",
    writeups: "WriteUps",
    project: "Projects",
    cv: "Curriculum Vitae",
  };

  if (header) {
    let pageTitle = document.querySelector("#mobilePageTitle");

    if (!pageTitle) {
      pageTitle = document.createElement("div");
      pageTitle.id = "mobilePageTitle";

      if (menuToggle) {
        header.insertBefore(pageTitle, menuToggle);
      } else {
        header.prepend(pageTitle);
      }
    }

    pageTitle.textContent = pageTitles[currentPage] || "Home";
  }

  // Mobile navigation toggle
  const headerTabs = document.querySelector("#headerTabs");
  const menuIcon = document.querySelector("#menuIcon");

  if (menuToggle && headerTabs && menuIcon) {
    const hamburgerPath =
      "M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z";

    const closePath =
      "M256-200 200-256l224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z";

    menuToggle.addEventListener("click", () => {
      headerTabs.classList.toggle("open");

      const isOpen = headerTabs.classList.contains("open");

      menuToggle.setAttribute("aria-expanded", isOpen);
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation",
      );

      menuIcon
        .querySelector("path")
        .setAttribute("d", isOpen ? closePath : hamburgerPath);
    });
  }

  style.textContent = `
        html {
            scroll-behavior: smooth;
        }

        main {
            animation: pageFadeIn 0.45s ease;
        }

        @keyframes pageFadeIn {
            from {
                opacity: 0;
                transform: translateY(8px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        #headerTabs a[aria-current="page"] {
            text-decoration: underline;
            text-underline-offset: 5px;
            text-decoration-thickness: 2px;
        }

        img.portfolio-zoomable {
            cursor: zoom-in;
        }

        .portfolio-lightbox {
            position: fixed;
            inset: 0;
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 24px;
            background: rgba(0, 0, 0, 0.88);
            cursor: zoom-out;
        }

        .portfolio-lightbox img {
            display: block;
            max-width: 92vw;
            max-height: 88vh;
            width: auto;
            height: auto;
            object-fit: contain;
            border-radius: 8px;
        }

        @media (prefers-reduced-motion: reduce) {
            html {
                scroll-behavior: auto;
            }

            main {
                animation: none;
            }
        }
        #mobilePageTitle {
            display: none;
            }

        @media (max-width: 600px) {
            header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                position: relative;
                height: auto;
                min-height: 56px;
                padding: 0 1rem;
                box-sizing: border-box;
            }

            #mobilePageTitle {
                display: block !important;
                position: static;
                transform: none;
                color: hsl(240, 100%, 94%);
                font-family: "Crete Round", serif;
                font-size: 1.25rem;
                margin-right: auto;
            }

            header #menuToggle {
                flex-shrink: 0;
                margin-left: 1rem;
            }
        }
    `;

  document.head.appendChild(style);

  // Fix navigation links across the folder structure.
  document.querySelectorAll("#headerTabs a").forEach((link) => {
    const label = link.textContent.trim().toLowerCase();

    if (label === "home") {
      link.href = root + "index.html";
    } else if (label === "writeups") {
      link.href = root + "hdTabs/writeups/writeups.html";
    } else if (label === "projects") {
      link.href = root + "hdTabs/project/project.html";
    } else if (label === "curriculum vitae") {
      link.href = root + "hdTabs/cv/cv.html";
    }

    // Compare by page key instead of file name, so it works without ".html".
    const linkPage =
      label === "writeups"
        ? "writeups"
        : label === "projects"
          ? "project"
          : label === "curriculum vitae"
            ? "cv"
            : "home";

    if (linkPage === currentPage) {
      link.setAttribute("aria-current", "page");
    }
  });

  // Open external social links in a separate, secure tab.
  document
    .querySelectorAll('.links a[href^="http"], a.inlinelink[href^="http"]')
    .forEach((link) => {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    });

  // Make content images clickable for a larger preview.
  // Social media icons are excluded.
  document.querySelectorAll("main img").forEach((img) => {
    if (img.closest(".links")) return;

    img.classList.add("portfolio-zoomable");
    img.tabIndex = 0;
    img.setAttribute("role", "button");
    img.setAttribute("aria-label", "Open enlarged image preview");

    function openPreview() {
      if (document.querySelector(".portfolio-lightbox")) return;

      const overlay = document.createElement("div");
      overlay.className = "portfolio-lightbox";
      overlay.tabIndex = 0;
      overlay.setAttribute("role", "dialog");
      overlay.setAttribute("aria-modal", "true");
      overlay.setAttribute("aria-label", "Image preview");

      const preview = document.createElement("img");
      preview.src = img.currentSrc || img.src;
      preview.alt = img.alt || "Enlarged image";

      overlay.appendChild(preview);

      function closePreview() {
        overlay.remove();
        document.removeEventListener("keydown", handleEscape);
      }

      function handleEscape(event) {
        if (event.key === "Escape") {
          closePreview();
        }
      }

      overlay.addEventListener("click", closePreview);
      overlay.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          closePreview();
        }
      });

      document.addEventListener("keydown", handleEscape);
      document.body.appendChild(overlay);
      overlay.focus();
    }

    img.addEventListener("click", openPreview);

    img.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openPreview();
      }
    });
  });

  // Add a subtle hover effect to the placeholder cards.
  document.querySelectorAll("#gifContainer").forEach((card) => {
    card.style.transition = "transform 0.2s ease, border-color 0.2s ease";

    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-3px)";
      card.style.borderColor = "rgb(226, 212, 248)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
      card.style.borderColor = "";
    });
  });
})();