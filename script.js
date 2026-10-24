
/*
 * Soumik || thyfrei — Portfolio Interactions
 */

(() => {
    "use strict";

    // Detect which page is currently open.
    const path = window.location.pathname;

    const isNestedPage = path.includes("/hdTabs/");
    const root = isNestedPage ? "../../" : "";

    const currentPage = path.endsWith("/writeups.html")
        ? "writeups"
        : path.endsWith("/project.html")
            ? "project"
            : path.endsWith("/cv.html")
                ? "cv"
                : "home";

    // Add interaction styles without modifying your CSS files.
    const style = document.createElement("style");

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
    `;

    document.head.appendChild(style);

    // Fix navigation links across the folder structure.
    document.querySelectorAll("#headerTabs a").forEach(link => {
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

        const href = new URL(link.href).pathname;

        const isCurrent =
            (currentPage === "home" && href.endsWith("/index.html")) ||
            (currentPage === "writeups" && href.endsWith("/writeups.html")) ||
            (currentPage === "project" && href.endsWith("/project.html")) ||
            (currentPage === "cv" && href.endsWith("/cv.html"));

        if (isCurrent) {
            link.setAttribute("aria-current", "page");
        }
    });

    // Open external social links in a separate, secure tab.
    document.querySelectorAll(
        '.links a[href^="http"], a.inlinelink[href^="http"]'
    ).forEach(link => {
        link.target = "_blank";
        link.rel = "noopener noreferrer";
    });

    // Make content images clickable for a larger preview.
    // Social media icons are excluded.
    document.querySelectorAll("main img").forEach(img => {
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
            overlay.addEventListener("keydown", event => {
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

        img.addEventListener("keydown", event => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openPreview();
            }
        });
    });

    // Add a subtle hover effect to the placeholder cards.
    document.querySelectorAll("#gifContainer").forEach(card => {
        card.style.transition =
            "transform 0.2s ease, border-color 0.2s ease";

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
