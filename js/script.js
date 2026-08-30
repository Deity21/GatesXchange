
/* =========================================================
   GATEXCHANGE
   Main JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       CONFIGURATION
    ===================================================== */

    const WHATSAPP_NUMBER = "15485073822";


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const modal = document.getElementById("transactionModal");
    const selectedService = document.getElementById("selectedService");
    const amountInput = document.getElementById("amount");
    const termsCheck = document.getElementById("termsCheck");

    const mobileMenu = document.querySelector(".mobile-menu");
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
    const mobileMenuClose = document.querySelector(".mobile-menu-close");


    /* =====================================================
       TRANSACTION STATE
    ===================================================== */

    let currentService = "";


    /* =====================================================
       OPEN TRANSACTION MODAL
    ===================================================== */

    window.openTransaction = function (service) {

        currentService = service;

        selectedService.textContent = service;

        amountInput.value = "";
        termsCheck.checked = false;

        modal.classList.add("active");

        document.body.classList.add("modal-open");

        setTimeout(() => {
            amountInput.focus();
        }, 300);

        // Small GSAP entrance animation
        if (typeof gsap !== "undefined") {

            gsap.fromTo(
                ".transaction-modal",
                {
                    y: 25,
                    scale: 0.97,
                    opacity: 0
                },
                {
                    y: 0,
                    scale: 1,
                    opacity: 1,
                    duration: 0.4,
                    ease: "power3.out"
                }
            );

        }
    };


    /* =====================================================
       CLOSE TRANSACTION MODAL
    ===================================================== */

    window.closeTransaction = function () {

        if (typeof gsap !== "undefined") {

            gsap.to(".transaction-modal", {
                y: 20,
                scale: 0.98,
                opacity: 0,
                duration: 0.2,
                ease: "power2.in",
                onComplete: () => {

                    modal.classList.remove("active");

                    document.body.classList.remove("modal-open");

                    gsap.set(".transaction-modal", {
                        clearProps: "all"
                    });

                }
            });

        } else {

            modal.classList.remove("active");

            document.body.classList.remove("modal-open");

        }
    };


    /* =====================================================
       CLOSE MODAL WHEN CLICKING OUTSIDE
    ===================================================== */

    modal.addEventListener("click", (event) => {

        if (event.target === modal) {
            closeTransaction();
        }

    });


    /* =====================================================
       ESC KEY
    ===================================================== */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            if (modal.classList.contains("active")) {
                closeTransaction();
            }

            if (mobileMenu.classList.contains("active")) {
                closeMobileMenu();
            }

        }

    });


    /* =====================================================
       SUBMIT TRANSACTION
    ===================================================== */

    window.submitTransaction = function () {

        const amount = amountInput.value.trim();

        /* -----------------------------------------------
           Validate amount
        ------------------------------------------------ */

        if (!amount || Number(amount) <= 0) {

            showInputError(
                amountInput,
                "Please enter a valid amount."
            );

            return;
        }


        /* -----------------------------------------------
           Validate terms
        ------------------------------------------------ */

        if (!termsCheck.checked) {

            showNotification(
                "Please accept the transaction terms first.",
                "warning"
            );

            return;
        }


        /* -----------------------------------------------
           Format amount
        ------------------------------------------------ */

        const numericAmount = Number(amount);

        const formattedAmount = numericAmount.toLocaleString(
            "en-US",
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        );


        /* -----------------------------------------------
           WhatsApp Message
        ------------------------------------------------ */

        const message =
`Hello GateXchange 👋

I would like to receive $${formattedAmount} through ${currentService}.

I have read and agreed to the transaction terms.

Please provide me with the next steps.`;


        /* -----------------------------------------------
           WhatsApp URL
        ------------------------------------------------ */

        const whatsappURL =
            `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;


        /* -----------------------------------------------
           Open WhatsApp
        ------------------------------------------------ */

        window.open(
            whatsappURL,
            "_blank",
            "noopener,noreferrer"
        );

    };


    /* =====================================================
       INPUT ERROR
    ===================================================== */

    function showInputError(input, message) {

        const wrapper = input.closest(".amount-input");

        if (!wrapper) return;

        wrapper.classList.add("input-error");

        input.focus();

        showNotification(message, "warning");

        setTimeout(() => {

            wrapper.classList.remove("input-error");

        }, 1800);
    }


    /* =====================================================
       NOTIFICATION
    ===================================================== */

    function showNotification(message, type = "info") {

        let notification =
            document.querySelector(".gx-notification");


        /* -----------------------------------------------
           Create notification
        ------------------------------------------------ */

        if (!notification) {

            notification = document.createElement("div");

            notification.className = "gx-notification";

            document.body.appendChild(notification);

        }


        /* -----------------------------------------------
           Icon
        ------------------------------------------------ */

        let icon = "fa-circle-info";

        if (type === "warning") {
            icon = "fa-triangle-exclamation";
        }

        if (type === "success") {
            icon = "fa-circle-check";
        }


        notification.innerHTML = `
            <i class="fa-solid ${icon}"></i>
            <span>${message}</span>
        `;


        notification.classList.add("show");


        /* -----------------------------------------------
           GSAP animation
        ------------------------------------------------ */

        if (typeof gsap !== "undefined") {

            gsap.fromTo(
                notification,
                {
                    y: 20,
                    opacity: 0
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.3,
                    ease: "power3.out"
                }
            );

        }


        setTimeout(() => {

            if (typeof gsap !== "undefined") {

                gsap.to(notification, {
                    y: 15,
                    opacity: 0,
                    duration: 0.25,
                    ease: "power2.in",
                    onComplete: () => {
                        notification.classList.remove("show");
                    }
                });

            } else {

                notification.classList.remove("show");

            }

        }, 2500);

    }


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    function openMobileMenu() {

        mobileMenu.classList.add("active");

        document.body.classList.add("modal-open");

        if (typeof gsap !== "undefined") {

            gsap.fromTo(
                ".mobile-menu a",
                {
                    y: 20,
                    opacity: 0
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.45,
                    stagger: 0.08,
                    ease: "power3.out"
                }
            );

        }

    }


    function closeMobileMenu() {

        mobileMenu.classList.remove("active");

        document.body.classList.remove("modal-open");

    }


    mobileMenuBtn?.addEventListener(
        "click",
        openMobileMenu
    );


    mobileMenuClose?.addEventListener(
        "click",
        closeMobileMenu
    );


    /* =====================================================
       CLOSE MOBILE MENU WHEN LINK CLICKED
    ===================================================== */

    document
        .querySelectorAll(".mobile-menu a")
        .forEach(link => {

            link.addEventListener(
                "click",
                closeMobileMenu
            );

        });


    /* =====================================================
       FAQ ACCORDION
    ===================================================== */

    const faqItems =
        document.querySelectorAll(".faq-item");


    faqItems.forEach(item => {

        const question =
            item.querySelector(".faq-question");


        question.addEventListener("click", () => {

            const wasActive =
                item.classList.contains("active");


            /* -------------------------------------------
               Close all other questions
            -------------------------------------------- */

            faqItems.forEach(otherItem => {

                if (otherItem !== item) {
                    otherItem.classList.remove("active");
                }

            });


            /* -------------------------------------------
               Toggle current
            -------------------------------------------- */

            if (!wasActive) {
                item.classList.add("active");
            }

        });

    });


    /* =====================================================
       SMOOTH ANCHOR SCROLL
    ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(anchor => {

            anchor.addEventListener("click", function (event) {

                const targetID =
                    this.getAttribute("href");

                if (
                    !targetID ||
                    targetID === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(targetID);

                if (!target) return;

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            });

        });


    /* =====================================================
       GSAP ANIMATIONS
    ===================================================== */

    if (typeof gsap !== "undefined") {

        gsap.registerPlugin(ScrollTrigger);


        /* -----------------------------------------------
           HERO
        ------------------------------------------------ */

        const heroTimeline = gsap.timeline({
            defaults: {
                ease: "power3.out"
            }
        });


        heroTimeline
            .from(".hero-badge", {
                y: 20,
                opacity: 0,
                duration: 0.6
            })
            .from(".hero h1", {
                y: 40,
                opacity: 0,
                duration: 0.8
            }, "-=0.35")
            .from(".hero-description", {
                y: 25,
                opacity: 0,
                duration: 0.6
            }, "-=0.4")
            .from(".hero-actions", {
                y: 20,
                opacity: 0,
                duration: 0.5
            }, "-=0.3")
            .from(".hero-trust", {
                y: 15,
                opacity: 0,
                duration: 0.5
            }, "-=0.25")
            .from(".exchange-card", {
                x: 50,
                opacity: 0,
                scale: 0.95,
                duration: 0.8
            }, "-=0.65")
            .from(".floating-card", {
                scale: 0.7,
                opacity: 0,
                duration: 0.5,
                stagger: 0.15
            }, "-=0.45");


        /* -----------------------------------------------
           FLOATING CARD ANIMATION
        ------------------------------------------------ */

        gsap.to(".floating-card-one", {
            y: -12,
            duration: 2.2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });


        gsap.to(".floating-card-two", {
            y: 12,
            duration: 2.6,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });


        /* -----------------------------------------------
           EXCHANGE CARD FLOAT
        ------------------------------------------------ */

        gsap.to(".exchange-card", {
            y: -7,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });


        /* -----------------------------------------------
           SERVICES
        ------------------------------------------------ */

        gsap.from(".service-card", {

            scrollTrigger: {
                trigger: ".services-grid",
                start: "top 85%",
                toggleActions: "play none none reverse"
            },

            y: 30,
            opacity: 0,

            duration: 0.55,

            stagger: 0.07,

            ease: "power3.out"

        });


        /* -----------------------------------------------
           STEPS
        ------------------------------------------------ */

        gsap.from(".step-card", {

            scrollTrigger: {
                trigger: ".steps-grid",
                start: "top 85%",
                toggleActions: "play none none reverse"
            },

            y: 35,
            opacity: 0,

            duration: 0.6,

            stagger: 0.12,

            ease: "power3.out"

        });


        /* -----------------------------------------------
           REVIEWS
        ------------------------------------------------ */

        gsap.from(".review-card", {

            scrollTrigger: {
                trigger: ".reviews-grid",
                start: "top 85%",
                toggleActions: "play none none reverse"
            },

            y: 30,
            opacity: 0,

            duration: 0.6,

            stagger: 0.12,

            ease: "power3.out"

        });


        /* -----------------------------------------------
           STATS
        ------------------------------------------------ */

        gsap.from(".stat", {

            scrollTrigger: {
                trigger: ".stats-section",
                start: "top 90%",
                toggleActions: "play none none reverse"
            },

            y: 15,
            opacity: 0,

            duration: 0.5,

            stagger: 0.1,

            ease: "power3.out"

        });


        /* -----------------------------------------------
           CTA
        ------------------------------------------------ */

        gsap.from(".cta-card", {

            scrollTrigger: {
                trigger: ".cta-section",
                start: "top 85%",
                toggleActions: "play none none reverse"
            },

            y: 40,
            opacity: 0,

            duration: 0.8,

            ease: "power3.out"

        });


        /* -----------------------------------------------
           CURRENCY ANIMATION
        ------------------------------------------------ */

        gsap.to(".currency-one", {
            y: -15,
            rotation: 5,
            duration: 2.2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });


        gsap.to(".currency-two", {
            y: 12,
            rotation: -5,
            duration: 2.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });


        gsap.to(".currency-three", {
            y: -10,
            rotation: 4,
            duration: 2.8,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });


        gsap.to(".currency-four", {
            y: 13,
            rotation: -4,
            duration: 2.3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });


        /* -----------------------------------------------
           HERO MOUSE PARALLAX
        ------------------------------------------------ */

        const hero = document.querySelector(".hero");

        if (hero && window.innerWidth > 900) {

            const moveCardX =
                gsap.quickTo(
                    ".exchange-card",
                    "x",
                    {
                        duration: 0.8,
                        ease: "power3.out"
                    }
                );

            const moveCardY =
                gsap.quickTo(
                    ".exchange-card",
                    "y",
                    {
                        duration: 0.8,
                        ease: "power3.out"
                    }
                );


            hero.addEventListener(
                "mousemove",
                (event) => {

                    const rect =
                        hero.getBoundingClientRect();

                    const x =
                        event.clientX - rect.left;

                    const y =
                        event.clientY - rect.top;

                    const centerX =
                        rect.width / 2;

                    const centerY =
                        rect.height / 2;

                    const offsetX =
                        (x - centerX) / 40;

                    const offsetY =
                        (y - centerY) / 40;

                    moveCardX(offsetX);

                    moveCardY(offsetY);

                }
            );


            hero.addEventListener(
                "mouseleave",
                () => {

                    moveCardX(0);
                    moveCardY(-7);

                }
            );

        }

    }


    /* =====================================================
       AMOUNT INPUT FORMATTING
    ===================================================== */

    amountInput.addEventListener(
        "input",
        () => {

            if (Number(amountInput.value) < 0) {
                amountInput.value = "";
            }

        }
    );


    /* =====================================================
       ENTER KEY
    ===================================================== */

    amountInput.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Enter") {

                event.preventDefault();

                submitTransaction();

            }

        }
    );


    /* =====================================================
       INITIAL CONSOLE MESSAGE
    ===================================================== */

    console.log(
        "%cGateXchange",
        "font-size:22px;font-weight:bold;color:#c89b3c;"
    );

    console.log(
        "%cGlobal Payment Exchange Platform",
        "font-size:12px;color:#59615c;"
    );

    /* =====================================================
    TERMS NOTICE
    ===================================================== */

    const termsNotice =
        document.getElementById("termsNotice");

    const termsNoticeClose =
        document.getElementById("termsNoticeClose");

    const continueButton =
        document.getElementById("continueButton");

    const readTermsButton =
        document.getElementById("readTermsButton");


    /* -----------------------------------------------------
    Show Terms Notice
    ------------------------------------------------------ */

    const termsAccepted =
        localStorage.getItem("gateXchangeTermsViewed");


    if (!termsAccepted && termsNotice) {

        setTimeout(() => {

            termsNotice.classList.add("active");

            document.body.classList.add("modal-open");

            if (typeof gsap !== "undefined") {

                gsap.fromTo(
                    ".terms-notice-modal",
                    {
                        y: 35,
                        scale: 0.95,
                        opacity: 0
                    },
                    {
                        y: 0,
                        scale: 1,
                        opacity: 1,
                        duration: 0.5,
                        ease: "power3.out"
                    }
                );

            }

        }, 700);

    }


    /* -----------------------------------------------------
    Close Terms Notice
    ------------------------------------------------------ */

    function closeTermsNotice() {

        if (!termsNotice) return;

        if (typeof gsap !== "undefined") {

            gsap.to(".terms-notice-modal", {

                y: 20,
                scale: 0.97,
                opacity: 0,

                duration: 0.25,

                ease: "power2.in",

                onComplete: () => {

                    termsNotice.classList.remove("active");

                    document.body.classList.remove("modal-open");

                    localStorage.setItem(
                        "gateXchangeTermsViewed",
                        "true"
                    );

                }

            });

        } else {

            termsNotice.classList.remove("active");

            document.body.classList.remove("modal-open");

            localStorage.setItem(
                "gateXchangeTermsViewed",
                "true"
            );

        }

    }


    /* -----------------------------------------------------
    Close Button
    ------------------------------------------------------ */

    termsNoticeClose?.addEventListener(
        "click",
        closeTermsNotice
    );


    /* -----------------------------------------------------
    Continue Button
    ------------------------------------------------------ */

    continueButton?.addEventListener(
        "click",
        closeTermsNotice
    );


    /* -----------------------------------------------------
    Read Terms
    ------------------------------------------------------ */

    readTermsButton?.addEventListener(
        "click",
        () => {

            localStorage.setItem(
                "gateXchangeTermsViewed",
                "true"
            );

        }
    );

});

