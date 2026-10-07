/* ==========================================
   BE NICE BEAUTY
========================================== */

(() => {
  function initSite() {
    const header = document.getElementById("siteHeader");
    const menuToggle = document.getElementById("menuToggle");
    const mobileNav = document.getElementById("mobileNav");

       /* ==========================================
       CONTACT FORM — HOSTINGER
    ========================================== */

    const contactForm = document.getElementById("contactForm");

    if (contactForm) {
      const contactSubmit = document.getElementById("contact-submit");
      const contactSubmitLabel = document.getElementById(
        "contact-submit-label"
      );
      const contactNotice = document.getElementById(
        "contact-form-notice"
      );

      // Never fall back to posting the form to the HTML page.
      contactForm.addEventListener("submit", event => {
        event.preventDefault();
      });

      if (contactSubmit && contactSubmitLabel && contactNotice) {
        const contactEndpoint = contactForm.action;
        let contactSending = false;
        let contactAvailable = false;

        contactSubmit.disabled = true;

        function setContactNotice(message, state = "") {
          contactNotice.textContent = message;
          contactNotice.dataset.state = state;
        }

        async function readContactResponse(response) {
          const result = await response.json();

          if (
            !result ||
            typeof result !== "object" ||
            typeof result.ok !== "boolean"
          ) {
            throw new Error("Invalid server response.");
          }

          return result;
        }

        async function prepareContactForm() {
          const response = await fetch(contactEndpoint, {
            method: "GET",
            credentials: "same-origin",
            cache: "no-store",
            headers: { Accept: "application/json" }
          });

          const result = await readContactResponse(response);

          if (result.enabled === false) {
            contactAvailable = false;
            return null;
          }

          if (
            !response.ok ||
            !result.ok ||
            result.enabled !== true ||
            typeof result.token !== "string"
          ) {
            contactAvailable = false;
            throw new Error("The form is unavailable.");
          }

          contactAvailable = true;
          return result.token;
        }

        function showContactInactive() {
          setContactNotice(
            "Please email info@benicebeauty.co.uk or call " +
            "+44 7532 800146 while our enquiry form is being prepared."
          );
        }

        prepareContactForm()
          .then(token => {
            if (token === null) {
              showContactInactive();
              return;
            }

            contactSubmit.disabled = false;
            setContactNotice("We usually reply within 1–2 days.");
          })
          .catch(() => {
            setContactNotice(
              "The form is currently unavailable. Please email " +
              "info@benicebeauty.co.uk or call +44 7532 800146.",
              "error"
            );
          });

        contactForm.addEventListener("submit", async event => {
          event.preventDefault();

          if (
            contactSending ||
            !contactAvailable ||
            !contactForm.reportValidity()
          ) {
            return;
          }

          contactSending = true;
          contactSubmit.disabled = true;
          contactSubmitLabel.textContent = "Sending…";
          contactForm.setAttribute("aria-busy", "true");
          setContactNotice("Sending your message…");

          try {
            const token = await prepareContactForm();

            if (token === null) {
              showContactInactive();
              return;
            }

            const formData = new FormData(contactForm);
            formData.set("csrf_token", token);

            const response = await fetch(contactEndpoint, {
              method: "POST",
              credentials: "same-origin",
              cache: "no-store",
              headers: { Accept: "application/json" },
              body: formData
            });

            const result = await readContactResponse(response);

            if (result.enabled === false) {
              contactAvailable = false;
              showContactInactive();
              return;
            }

            if (!response.ok || !result.ok) {
              setContactNotice(
                typeof result.message === "string"
                  ? result.message
                  : "Your message could not be sent. Please try again.",
                "error"
              );
              return;
            }

            contactForm.reset();
            setContactNotice(
              "Thank you. Your message has been sent. " +
              "We usually reply within 1–2 days.",
              "success"
            );
          } catch {
            setContactNotice(
              "We couldn’t confirm that your message was sent. " +
              "Your details have been kept in the form. " +
              "Please try again later or email info@benicebeauty.co.uk.",
              "error"
            );
          } finally {
            contactSending = false;
            contactSubmit.disabled = !contactAvailable;
            contactSubmitLabel.textContent = "Send Message";
            contactForm.removeAttribute("aria-busy");
          }
        });
      }
    }

    /* ==========================================
       HEADER
    ========================================== */

    if (header) {
      function updateHeader() {
        header.classList.toggle(
          "is-sticky",
          window.scrollY > 40
        );
      }

      updateHeader();

      window.addEventListener("scroll", updateHeader, {
        passive: true
      });
    }

    /* ==========================================
       MOBILE MENU
    ========================================== */

    if (menuToggle && mobileNav) {
      menuToggle.setAttribute("aria-controls", "mobileNav");

      function setMenuOpen(isOpen, restoreFocus = false) {
        mobileNav.classList.toggle("open", isOpen);
        menuToggle.classList.toggle("open", isOpen);

        menuToggle.setAttribute(
          "aria-expanded",
          String(isOpen)
        );

        menuToggle.setAttribute(
          "aria-label",
          isOpen ? "Close menu" : "Open menu"
        );

        document.body.style.overflow = isOpen ? "hidden" : "";

        if (restoreFocus) {
          menuToggle.focus();
        }
      }

      setMenuOpen(false);

      menuToggle.addEventListener("click", () => {
        setMenuOpen(
          menuToggle.getAttribute("aria-expanded") !== "true"
        );
      });

      mobileNav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
          setMenuOpen(false);
        });
      });

      document.addEventListener("keydown", event => {
        if (
          event.key === "Escape" &&
          mobileNav.classList.contains("open")
        ) {
          setMenuOpen(false, true);
        }
      });

      window.matchMedia("(min-width: 1101px)")
        .addEventListener("change", event => {
          if (event.matches) setMenuOpen(false);
        });
    }


    /* ==========================================
       CENTRAL PRICE LIST
    ========================================== */

    if (
      document.body.classList.contains("prices-page") &&
      window.BN_PRICES &&
      window.BN_PRICES.treatments
    ) {
      const priceData = window.BN_PRICES;
      const currency = priceData.currency || "GBP";

      const londonDateFormatter = new Intl.DateTimeFormat(
        "en-GB",
        {
          timeZone: priceData.timeZone || "Europe/London",
          year: "numeric",
          month: "2-digit",
          day: "2-digit"
        }
      );

      const wholePriceFormatter = new Intl.NumberFormat(
        "en-GB",
        {
          style: "currency",
          currency,
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        }
      );

      const decimalPriceFormatter = new Intl.NumberFormat(
        "en-GB",
        {
          style: "currency",
          currency,
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }
      );

      function todayInLondon() {
        const parts = londonDateFormatter.formatToParts(
          new Date()
        );

        const values = {};

        parts.forEach(part => {
          values[part.type] = part.value;
        });

        return `${values.year}-${values.month}-${values.day}`;
      }

      function validDate(value) {
        if (
          typeof value !== "string" ||
          !/^\d{4}-\d{2}-\d{2}$/.test(value)
        ) {
          return false;
        }

        const date = new Date(`${value}T12:00:00Z`);

        return (
          !Number.isNaN(date.getTime()) &&
          date.toISOString().slice(0, 10) === value
        );
      }

      function validPrice(value) {
        return (
          typeof value === "number" &&
          Number.isFinite(value) &&
          value >= 0
        );
      }

      function formatPrice(pence) {
        const formatter = pence % 100 === 0
          ? wholePriceFormatter
          : decimalPriceFormatter;

        return formatter.format(pence / 100);
      }

      function calculatePrice(price, offer, today) {
        const base = Math.round(price * 100);

        const result = {
          base,
          current: base,
          discount: 0
        };

        if (!offer) return result;

        const percent = offer.discountPercent;

        if (
          typeof percent !== "number" ||
          !Number.isFinite(percent) ||
          percent <= 0 ||
          percent > 100
        ) {
          return result;
        }

        const start = offer.startDate;
        const end = offer.endDate;

        if (
          (start != null && !validDate(start)) ||
          (end != null && !validDate(end)) ||
          (start != null && end != null && start > end)
        ) {
          return result;
        }

        if (
          (start != null && today < start) ||
          (end != null && today > end)
        ) {
          return result;
        }

        const current = Math.round(
          base * (100 - percent) / 100
        );

        if (current >= base) return result;

        return {
          base,
          current,
          discount: percent
        };
      }

      function renderPrice(
        element,
        price,
        offer,
        today,
        options = {}
      ) {
        if (!element || !validPrice(price)) return;

        const result = calculatePrice(price, offer, today);

        element.classList.remove("bn-price-on-request");
        element.classList.add("bn-price-amount");

        const content = [];

        if (result.discount > 0) {
          const original = document.createElement("del");

          original.className = "bn-price-original";
          original.textContent =
            `${options.from ? "From " : ""}` +
            formatPrice(result.base);

          content.push(original);
        }

        const current = document.createElement("span");
        current.className = "bn-price-current";

        if (options.from) {
          const prefix = document.createElement("span");

          prefix.className = "bn-price-prefix";
          prefix.textContent = "From ";

          current.append(prefix);
        }

        current.append(formatPrice(result.current));
        content.push(current);

        if (result.discount > 0) {
          const saving = document.createElement("span");

          saving.className = "bn-seasonal-saving";

          saving.textContent = options.package
            ? `Extra ${result.discount}% off`
            : `Save ${result.discount}%`;

          content.push(saving);
        }

        element.replaceChildren(...content);

        const prefix = options.from ? "From " : "";

        element.setAttribute(
          "aria-label",
          result.discount > 0
            ? (
              `Original price ${prefix}${formatPrice(result.base)}. ` +
              `Offer price ${prefix}${formatPrice(result.current)}. ` +
              `${result.discount}% discount.`
            )
            : `${prefix}${formatPrice(result.current)}`
        );
      }

      const priceRows = Array.from(
        document.querySelectorAll(
          ".bn-prices-catalog [data-price-id]"
        )
      ).map(heading => {
        const row = heading.closest(".bn-price-row");
        const treatment = priceData.treatments[
          heading.dataset.priceId
        ];

        return { row, treatment };
      }).filter(item => item.row && item.treatment);

      function updatePrices() {
        const today = todayInLondon();

        priceRows.forEach(({ row, treatment }) => {
          if (row.classList.contains("bn-price-row-laser")) {
            const singlePrice = row.querySelector(
              ".bn-laser-option:not(.bn-laser-package) " +
              ".bn-price-amount"
            );

            renderPrice(
              singlePrice,
              treatment.price,
              treatment.offer,
              today
            );

            const packageData = treatment.package;

            if (packageData) {
              const packageElement = row.querySelector(
                ".bn-laser-package"
              );

              if (packageElement) {
                renderPrice(
                  packageElement.querySelector(".bn-price-amount"),
                  packageData.price,
                  packageData.offer,
                  today,
                  { package: true }
                );

                const label = packageElement.querySelector(
                  ".bn-price-label"
                );

                if (label) {
                  label.textContent =
                    `${packageData.sessions} Sessions`;
                }

                const saving = packageElement.querySelector(
                  ".bn-price-saving"
                );

                if (saving) {
                  const percent = packageData.savingPercent;

                  const showSaving =
                    typeof percent === "number" &&
                    Number.isFinite(percent) &&
                    percent > 0 &&
                    percent <= 100;

                  saving.hidden = !showSaving;

                  saving.textContent = showSaving
                    ? `Save ${percent}%`
                    : "";
                }
              }
            }

            return;
          }

          const amount = row.querySelector(
            ".bn-price-action > .bn-price-amount, " +
            ".bn-price-action > .bn-price-on-request"
          );

          if (!amount) return;

          if (treatment.price === null) {
            amount.classList.remove("bn-price-amount");
            amount.classList.add("bn-price-on-request");
            amount.removeAttribute("aria-label");
            amount.textContent = "Price on enquiry";
            return;
          }

          renderPrice(
            amount,
            treatment.price,
            treatment.offer,
            today,
            { from: treatment.from === true }
          );
        });
      }

      updatePrices();

      /* Refresh dates while the page remains open. */
      window.setInterval(() => {
        if (!document.hidden) updatePrices();
      }, 60000);

      document.addEventListener("visibilitychange", () => {
        if (!document.hidden) updatePrices();
      });

      window.addEventListener("focus", updatePrices);
    }

    /* ==========================================
       CENTRAL REVIEWS
    ========================================== */

    if (document.body.classList.contains("reviews-page")) {
      const reviewsData = window.BN_REVIEWS;

      const reviewsGrid = document.getElementById(
        "reviews-grid"
      );

      const ratingsGrid = document.getElementById(
        "reviews-ratings"
      );

      const reviewsFallback = document.getElementById(
        "reviews-fallback"
      );

      function reviewElement(tag, className = "", text = "") {
        const element = document.createElement(tag);
        element.className = className;
        element.textContent = text;
        return element;
      }

      function reviewUrl(value) {
        if (typeof value !== "string") return null;

        try {
          const url = new URL(value);

          return url.protocol === "https:"
            ? url.href
            : null;
        } catch {
          return null;
        }
      }

      function reviewLink(label, url, className, ariaLabel) {
        const link = reviewElement(
          "a",
          className,
          label + " "
        );

        link.href = url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.setAttribute("aria-label", ariaLabel);

        const arrow = reviewElement("span", "", "↗");
        arrow.setAttribute("aria-hidden", "true");

        link.append(arrow);
        return link;
      }

      function reviewStars(rating) {
        const stars = reviewElement(
          "span",
          "bn-reviews-stars"
        );

        stars.setAttribute("role", "img");

        stars.setAttribute(
          "aria-label",
          rating + " out of 5 stars"
        );

        const symbols = reviewElement(
          "span",
          "",
          "★".repeat(rating) + "☆".repeat(5 - rating)
        );

        symbols.setAttribute("aria-hidden", "true");
        stars.append(symbols);

        return stars;
      }

      if (
        reviewsGrid &&
        ratingsGrid &&
        reviewsData &&
        reviewsData.platforms &&
        Array.isArray(reviewsData.reviews)
      ) {
        const sources = new Map();

        const ratingsFragment =
          document.createDocumentFragment();

        Object.entries(reviewsData.platforms).forEach(
          ([key, platform], index) => {
            if (
              !platform ||
              typeof platform.name !== "string"
            ) {
              return;
            }

            const name = platform.name.trim();
            const url = reviewUrl(platform.url);

            if (!name || !url) return;

            sources.set(key, {
              ...platform,
              name,
              url
            });

            document.querySelectorAll(
              "[data-reviews-platform]"
            ).forEach(link => {
              if (link.dataset.reviewsPlatform === key) {
                link.href = url;
              }
            });

            if (
              typeof platform.rating !== "number" ||
              !Number.isFinite(platform.rating) ||
              platform.rating < 0 ||
              platform.rating > 5 ||
              !Number.isInteger(platform.count) ||
              platform.count < 0
            ) {
              return;
            }

            const card = reviewElement(
              "article",
              "bn-reviews-rating-card bn-review-reveal"
            );

            const headingId = "reviews-platform-" + index;

            card.setAttribute(
              "aria-labelledby",
              headingId
            );

            const top = reviewElement(
              "div",
              "bn-reviews-rating-top"
            );

            const heading = reviewElement("h3", "", name);
            heading.id = headingId;

            top.append(
              heading,
              reviewElement(
                "span",
                "bn-reviews-platform-note",
                "Platform rating"
              )
            );

            const main = reviewElement(
              "div",
              "bn-reviews-rating-main"
            );

            const score = reviewElement(
              "p",
              "bn-reviews-score"
            );

            score.append(
              reviewElement(
                "span",
                "bn-reviews-sr-only",
                "Rated "
              ),

              document.createTextNode(
                platform.rating.toFixed(1) + " "
              ),

              reviewElement(
                "span",
                "bn-reviews-score-total",
                "/ 5"
              )
            );

            const detail = reviewElement(
              "div",
              "bn-reviews-rating-detail"
            );

            const decoration = reviewElement(
              "span",
              "bn-reviews-stars",
              "★★★★★"
            );

            decoration.setAttribute(
              "aria-hidden",
              "true"
            );

            detail.append(
              decoration,

              reviewElement(
                "p",
                "",
                "Based on " +
                platform.count.toLocaleString("en-GB") +
                (platform.count === 1 ? " review" : " reviews")
              )
            );

            main.append(score, detail);

            card.append(
              top,
              main,

              reviewLink(
                "Read all " + name + " reviews",
                url,
                "bn-reviews-text-link",
                "Read all reviews on " + name +
                ", opens in a new tab"
              )
            );

            ratingsFragment.append(card);
          }
        );

        ratingsGrid.replaceChildren(ratingsFragment);

        const reviewsFragment =
          document.createDocumentFragment();

        reviewsData.reviews.forEach((review, index) => {
          if (
            !review ||
            typeof review.name !== "string"
          ) {
            return;
          }

          const source = sources.get(review.source);
          const name = review.name.trim();

          const paragraphs = Array.isArray(review.text)
            ? review.text.filter(text =>
                typeof text === "string" && text.trim()
              )
            : [];

          if (
            !source ||
            !name ||
            !paragraphs.length ||
            !Number.isInteger(review.rating) ||
            review.rating < 1 ||
            review.rating > 5
          ) {
            console.warn(
              "Reviews: skipped an incomplete entry at index",
              index
            );

            return;
          }

          const card = reviewElement(
            "article",
            "bn-review-card bn-review-reveal"
          );

          const authorId = "review-author-" + index;

          card.setAttribute(
            "aria-labelledby",
            authorId
          );

          const top = reviewElement(
            "div",
            "bn-review-card-top"
          );

          top.append(
            reviewElement(
              "span",
              "bn-review-source",
              source.name
            ),

            reviewStars(review.rating)
          );

          const quoteMark = reviewElement(
            "span",
            "bn-review-quote-mark",
            "“"
          );

          quoteMark.setAttribute(
            "aria-hidden",
            "true"
          );

          const quote = reviewElement(
            "blockquote",
            "bn-review-quote"
          );

          paragraphs.forEach(text => {
            quote.append(
              reviewElement("p", "", text)
            );
          });

          const bottom = reviewElement(
            "div",
            "bn-review-card-bottom"
          );

          const author = reviewElement(
            "div",
            "bn-review-author"
          );

          const words = name.split(/\s+/);

          const initials = words.length === 1
            ? words[0].slice(0, 1)
            : (
                words[0].slice(0, 1) +
                words[words.length - 1].slice(0, 1)
              );

          const avatar = reviewElement(
            "span",
            "bn-review-avatar",
            initials.toUpperCase()
          );

          avatar.setAttribute(
            "aria-hidden",
            "true"
          );

          const authorDetails = reviewElement("div");

          const authorHeading = reviewElement(
            "h3",
            "",
            name
          );

          authorHeading.id = authorId;

          const attribution = reviewElement(
            "p",
            "",
            source.name + " review"
          );

          if (
            typeof review.date === "string" &&
            /^\d{4}-\d{2}-\d{2}$/.test(review.date)
          ) {
            const date = new Date(
              review.date + "T12:00:00Z"
            );

            if (
              !Number.isNaN(date.getTime()) &&
              date.toISOString().slice(0, 10) === review.date
            ) {
              const time = reviewElement(
                "time",
                "",
                new Intl.DateTimeFormat(
                  "en-GB",
                  {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    timeZone: "UTC"
                  }
                ).format(date)
              );

              time.dateTime = review.date;
              attribution.append(" · ", time);
            }
          }

          authorDetails.append(
            authorHeading,
            attribution
          );

          author.append(
            avatar,
            authorDetails
          );

          bottom.append(
            author,

            reviewLink(
              "Visit " + source.name,
              reviewUrl(review.url) || source.url,
              "bn-review-source-link",
              "Visit " + source.name + " to find " +
              name + "'s review, opens in a new tab"
            )
          );

          card.append(
            top,
            quoteMark,
            quote,
            bottom
          );

          reviewsFragment.append(card);
        });

        reviewsGrid.replaceChildren(reviewsFragment);

        if (reviewsFallback) {
          reviewsFallback.hidden =
            reviewsGrid.childElementCount > 0;
        }
      }
    }


    /* ==========================================
       REVIEWS PAGE — SCROLL ANIMATION
    ========================================== */

    if (document.body.classList.contains("reviews-page")) {
      const reviewsMotionPreference = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      );

      const reviewsRevealElements = document.querySelectorAll(
        ".bn-review-reveal"
      );

      let reviewsRevealObserver = null;

      function showAllReviewElements() {
        if (reviewsRevealObserver) {
          reviewsRevealObserver.disconnect();
        }

        document.body.classList.remove("bn-reviews-motion");

        reviewsRevealElements.forEach(element => {
          element.classList.add("is-visible");
        });
      }

      if (
        reviewsRevealElements.length &&
        "IntersectionObserver" in window &&
        !reviewsMotionPreference.matches
      ) {
        reviewsRevealObserver = new IntersectionObserver(
          (entries, observer) => {
            entries.forEach(entry => {
              if (!entry.isIntersecting) return;

              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            });
          },
                    {
            threshold: 0.12,
            rootMargin: "0px 0px -110px 0px"
          }
        );

        reviewsRevealElements.forEach(element => {
          reviewsRevealObserver.observe(element);
        });

        document.body.classList.add("bn-reviews-motion");
      } else {
        showAllReviewElements();
      }

      reviewsMotionPreference.addEventListener("change", event => {
        if (event.matches) {
          showAllReviewElements();
        }
      });
    }

    /* ==========================================
       SCROLL REVEAL
    ========================================== */


    const revealElements = document.querySelectorAll(
      ".reveal, .reveal-left, .reveal-right, .reveal-image"
    );

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    if (
      document.body.classList.contains("prices-page") &&
      "IntersectionObserver" in window &&
      !reducedMotion.matches
    ) {
      document.body.classList.add("bn-prices-motion");
    }

    if (
      "IntersectionObserver" in window &&
      !reducedMotion.matches
    ) {
      const revealObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          });
        },
        {
          threshold: 0.15,
          rootMargin: document.body.matches(
            ".contact-page, .about-page, .blog-page, .prices-page"
          )
            ? "0px 0px -120px 0px"
            : "0px 0px -40px 0px"
        }
      );

      revealElements.forEach(element => {
        revealObserver.observe(element);
      });
    } else {
      revealElements.forEach(element => {
        element.classList.add("is-visible");
      });
    }

        /* ==========================================
       TREATMENTS PAGE — SCROLL ANIMATION
    ========================================== */

    if (
      document.body.classList.contains("treatments-page") &&
      "IntersectionObserver" in window &&
      !reducedMotion.matches
    ) {
      const treatmentRevealElements = Array.from(
        document.querySelectorAll(
          ".bn-catalog .bn-category-heading, " +
          ".bn-catalog .bn-treatment, " +
          ".bn-guidance-inner"
        )
      );

      const treatmentRevealObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const panel = entry.target.closest(".bn-panel");

            if (panel && panel.hidden) return;

            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          });
        },
        {
          threshold: 0,
          rootMargin: "0px 0px -110px 0px"
        }
      );

      treatmentRevealElements.forEach(element => {
        element.classList.add("bn-treatment-reveal");
        treatmentRevealObserver.observe(element);
      });

      document.body.classList.add("bn-treatments-motion");

      /* Reveal immediately when keyboard focus enters an element. */
      document.addEventListener("focusin", event => {
        if (!(event.target instanceof Element)) return;

        const element = event.target.closest(
          ".bn-treatment-reveal"
        );

        if (!element) return;

        element.classList.add("is-visible");
        treatmentRevealObserver.unobserve(element);
      });

      /* Keep all content visible if reduced motion is enabled. */
      reducedMotion.addEventListener("change", event => {
        if (!event.matches) return;

        treatmentRevealObserver.disconnect();
        document.body.classList.remove("bn-treatments-motion");

        treatmentRevealElements.forEach(element => {
          element.classList.add("is-visible");
        });
      });
    }

    /* ==========================================
       TREATMENTS TABS
    ========================================== */

    const tabList = document.querySelector(".bn-tabs");

    if (tabList) {
      const catalog = document.querySelector(".bn-catalog");

      const tabs = Array.from(
        tabList.querySelectorAll('[role="tab"]')
      );

      const panels = tabs.map(tab =>
        document.getElementById(
          tab.getAttribute("aria-controls")
        )
      );

      if (
        tabs.length !== 4 ||
        panels.some(panel => !panel) ||
        new Set(panels).size !== tabs.length
      ) {
        console.error(
          "Treatments tabs: each of the four tabs must have " +
          "an aria-controls value matching a different panel ID."
        );
      } else {
        const categories = tabs.map(tab =>
          tab.id.replace("tab-", "")
        );

        /* Preserve the page identity when sharing the tab component. */
        if (!document.body.classList.contains("prices-page")) {
          document.body.classList.add("treatments-page");
        }

        function updateHeaderHeight() {
          const height = header
            ? header.getBoundingClientRect().height
            : 0;

          document.body.style.setProperty(
            "--bn-header-height",
            `${height}px`
          );
        }

        updateHeaderHeight();

        if (header && "ResizeObserver" in window) {
          const observer = new ResizeObserver(
            updateHeaderHeight
          );

          observer.observe(header);
        } else {
          window.addEventListener(
            "resize",
            updateHeaderHeight
          );

          window.addEventListener(
            "scroll",
            updateHeaderHeight,
            { passive: true }
          );

          if (header) {
            header.addEventListener(
              "transitionend",
              updateHeaderHeight
            );
          }
        }

        function headerHeight() {
          return header
            ? header.getBoundingClientRect().height
            : 0;
        }

        function catalogReached() {
          return catalog &&
            catalog.getBoundingClientRect().top <=
            headerHeight() + 1;
        }

        function scrollToCatalog() {
          if (!catalog) return;

          const top =
            catalog.getBoundingClientRect().top +
            window.scrollY -
            headerHeight();

          window.scrollTo({
            top: Math.max(0, top),
            behavior: "instant"
          });
        }

        function updateUrl(index) {
          try {
            window.history.replaceState(
              null,
              "",
              `#${categories[index]}`
            );
          } catch {
            // Tab switching also works without a URL update.
          }
        }

        function activateTab(index, options = {}) {
          const {
            focus = false,
            scroll = false,
            remember = false
          } = options;

          tabs.forEach((tab, position) => {
            const selected = position === index;

            tab.setAttribute(
              "aria-selected",
              String(selected)
            );

            tab.tabIndex = selected ? 0 : -1;
            panels[position].hidden = !selected;
          });

          if (focus) {
            tabs[index].focus({ preventScroll: true });
          }

          if (remember) updateUrl(index);
          if (scroll) scrollToCatalog();
        }

        tabs.forEach((tab, index) => {
          tab.addEventListener("click", event => {
            event.preventDefault();

            activateTab(index, {
              scroll: Boolean(catalogReached()),
              remember: true
            });
          });
        });

        tabList.addEventListener("keydown", event => {
          const index = tabs.indexOf(document.activeElement);
          if (index === -1) return;

          let nextIndex;

          switch (event.key) {
            case "ArrowRight":
              nextIndex = (index + 1) % tabs.length;
              break;

            case "ArrowLeft":
              nextIndex =
                (index - 1 + tabs.length) % tabs.length;
              break;

            case "Home":
              nextIndex = 0;
              break;

            case "End":
              nextIndex = tabs.length - 1;
              break;

            default:
              return;
          }

          event.preventDefault();

          activateTab(nextIndex, {
            focus: true,
            scroll: Boolean(catalogReached()),
            remember: true
          });
        });

        function indexFromHash() {
          return categories.indexOf(
            window.location.hash.slice(1).toLowerCase()
          );
        }

        document.querySelectorAll(
          'a[href="#facial"], a[href="#aesthetic"], ' +
          'a[href="#laser"], a[href="#waxing"]'
        ).forEach(link => {
          link.addEventListener("click", event => {
            const index = categories.indexOf(
              link.getAttribute("href").slice(1)
            );

            if (index === -1) return;

            event.preventDefault();

            activateTab(index, {
              focus: true,
              scroll: true,
              remember: true
            });
          });
        });

        window.addEventListener("hashchange", () => {
          const index = indexFromHash();
          if (index === -1) return;

          activateTab(index, {
            focus: Boolean(
              catalog &&
              catalog.contains(document.activeElement)
            ),
            scroll: true
          });
        });

        const initialIndex = indexFromHash();

        activateTab(initialIndex === -1 ? 0 : initialIndex);

        /* if (initialIndex !== -1) {
          const positionCategory = () => {
            requestAnimationFrame(scrollToCatalog);
          };

          if (document.readyState === "complete") {
            positionCategory();
          } else {
            window.addEventListener(
              "load",
              positionCategory,
              { once: true }
            );
          }
        } */
      }
    }

    /* ==========================================
       REVIEWS SLIDER
    ========================================== */

    const reviewsSlider = document.querySelector(
      ".reviews-slider"
    );

    if (reviewsSlider) {
      const slides = Array.from(
        reviewsSlider.querySelectorAll(".review-slide")
      );

      const previous = reviewsSlider.querySelector(
        ".review-prev"
      );

      const next = reviewsSlider.querySelector(
        ".review-next"
      );

      const counter = reviewsSlider.querySelector(
        ".review-current"
      );

      if (slides.length && previous && next && counter) {
        let currentReview = 0;
        let autoplay;
        let pointerInside = false;

        function showReview(index) {
          currentReview =
            (index + slides.length) % slides.length;

          slides.forEach((slide, position) => {
            slide.classList.toggle(
              "active",
              position === currentReview
            );
          });

          counter.textContent = String(
            currentReview + 1
          ).padStart(2, "0");
        }

        function stopAutoplay() {
          window.clearInterval(autoplay);
        }

        function startAutoplay() {
          stopAutoplay();

          if (
            reducedMotion.matches ||
            pointerInside ||
            reviewsSlider.contains(document.activeElement) ||
            document.hidden ||
            slides.length < 2
          ) {
            return;
          }

          autoplay = window.setInterval(() => {
            showReview(currentReview + 1);
          }, 6000);
        }

        next.addEventListener("click", () => {
          showReview(currentReview + 1);
          startAutoplay();
        });

        previous.addEventListener("click", () => {
          showReview(currentReview - 1);
          startAutoplay();
        });

        reviewsSlider.addEventListener("mouseenter", () => {
          pointerInside = true;
          stopAutoplay();
        });

        reviewsSlider.addEventListener("mouseleave", () => {
          pointerInside = false;
          startAutoplay();
        });

        reviewsSlider.addEventListener(
          "focusin",
          stopAutoplay
        );

        reviewsSlider.addEventListener("focusout", () => {
          window.setTimeout(startAutoplay, 0);
        });

        reducedMotion.addEventListener(
          "change",
          startAutoplay
        );

        document.addEventListener(
          "visibilitychange",
          startAutoplay
        );

        showReview(0);
        startAutoplay();
      }
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      initSite,
      { once: true }
    );
  } else {
    initSite();
  }
})();