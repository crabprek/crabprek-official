
/* =========================================
   CRABPREK — WEBSITE INTERACTIONS
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    // =====================================
    // MOBILE NAVIGATION
    // =====================================

    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    const navItems = document.querySelectorAll(".nav-links a");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", function () {

            navLinks.classList.toggle("active");

            const isOpen = navLinks.classList.contains("active");

            menuToggle.textContent = isOpen ? "✕" : "☰";

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

        });

        // Tutup menu setelah pengunjung memilih halaman
        navItems.forEach(function (item) {

            item.addEventListener("click", function () {

                navLinks.classList.remove("active");
                menuToggle.textContent = "☰";
                menuToggle.setAttribute("aria-expanded", "false");

            });

        });

        // Tutup menu jika pengunjung klik di luar navigasi
        document.addEventListener("click", function (event) {

            const clickedInsideMenu =
                navLinks.contains(event.target) ||
                menuToggle.contains(event.target);

            if (!clickedInsideMenu) {

                navLinks.classList.remove("active");
                menuToggle.textContent = "☰";
                menuToggle.setAttribute("aria-expanded", "false");

            }

        });

    }


    // =====================================
    // REVEAL ANIMATION ON SCROLL
    // =====================================

    const revealElements = document.querySelectorAll(
        ".section-heading, .product-card, .about-content, .location-card"
    );

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("is-visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach(function (element) {

            element.classList.add("reveal");
            revealObserver.observe(element);

        });

    }


    // =====================================
    // VIDEO ANIMATION
    // =====================================

    const crabVideo = document.querySelector(".crab-animation");

    if (crabVideo) {

        crabVideo.addEventListener("error", function () {

            console.warn(
                "Video kepiting belum tersedia. Pastikan crab-walk.webm atau crab-walk.mp4 berada di folder assets."
            );

        });

        // Memastikan video diputar tanpa suara
        crabVideo.muted = true;

        const playVideo = crabVideo.play();

        if (playVideo !== undefined) {

            playVideo.catch(function (error) {

                console.info(
                    "Browser membatasi autoplay video:",
                    error
                );

            });

        }

    }


    // =====================================
    // SMOOTH NAVIGATION
    // =====================================

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    // =====================================
    // FOOTER YEAR
    // =====================================

    const copyright = document.querySelector(".copyright");

    if (copyright) {

        copyright.textContent =
            "© " + new Date().getFullYear() +
            " CRABPREK. All rights reserved.";

    }


    console.log("CRABPREK website is ready!");

});
