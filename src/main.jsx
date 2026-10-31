import React, { useEffect, useRef, useState } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { createPortal } from "react-dom";

function MenuToggle() {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const nav = document.querySelector("#primary-nav");
    const toggle = document.querySelector(".menu-toggle");
    const mobileViewport = window.matchMedia("(max-width: 800px)");
    if (!nav || !toggle) return undefined;

    nav.classList.toggle("open", expanded);

    function closeAfterNavigation(event) {
      if (event.target instanceof Element && event.target.closest("a")) {
        setExpanded(false);
      }
    }

    function closeOnEscape(event) {
      if (event.key === "Escape" && expanded) {
        setExpanded(false);
        toggle.focus();
      }
    }

    function closeOnOutsideClick(event) {
      if (
        expanded &&
        event.target instanceof Node &&
        !nav.contains(event.target) &&
        !toggle.contains(event.target)
      ) {
        setExpanded(false);
      }
    }

    function closeOnDesktop() {
      if (!mobileViewport.matches) setExpanded(false);
    }

    nav.addEventListener("click", closeAfterNavigation);
    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOnOutsideClick);
    mobileViewport.addEventListener("change", closeOnDesktop);
    return () => {
      nav.removeEventListener("click", closeAfterNavigation);
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      mobileViewport.removeEventListener("change", closeOnDesktop);
    };
  }, [expanded]);

  return (
    <button
      className="menu-toggle"
      type="button"
      aria-expanded={expanded}
      aria-controls="primary-nav"
      onClick={() => setExpanded((isExpanded) => !isExpanded)}
    >
      <span className="menu-bars" aria-hidden="true" />
      <span className="sr-only">
        {expanded ? "Close navigation" : "Open navigation"}
      </span>
    </button>
  );
}

function readCookieChoice() {
  try {
    return { choice: window.localStorage.getItem("clearpath-cookie-choice"), error: "" };
  } catch {
    return {
      choice: null,
      error: "Your privacy choice could not be read from this browser.",
    };
  }
}

function CookieConsent() {
  const [stored, setStored] = useState(readCookieChoice);

  function choose(choice) {
    try {
      window.localStorage.setItem("clearpath-cookie-choice", choice);
      setStored({ choice, error: "" });
    } catch {
      setStored({
        choice: null,
        error: "Your choice could not be saved. Please check your browser storage settings and try again.",
      });
    }
  }

  if (stored.choice) return null;

  return (
    <aside className="cookie-banner" role="region" aria-label="Privacy choices">
      <div>
        <strong>Your privacy matters.</strong>
        <p>
          Optional analytics are off in this version. Your choice will be saved
          for future updates.
        </p>
        {stored.error && <p role="status" aria-live="polite">{stored.error}</p>}
      </div>
      <div className="cookie-actions">
        <button
          className="button button-quiet"
          type="button"
          onClick={() => choose("essential")}
        >
          Essential only
        </button>
        <button
          className="button button-primary"
          type="button"
          onClick={() => choose("all")}
        >
          Allow analytics
        </button>
      </div>
    </aside>
  );
}

function PageEffects() {
  useEffect(() => {
    const cards = document.querySelectorAll(
      ".service-card,.problem-card,.case-card,.article-card",
    );
    if (
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    cards.forEach((card) => {
      card.classList.add("fade-in");
      observer.observe(card);
    });
    return () => observer.disconnect();
  }, []);

  return null;
}

function LocalFormNotice() {
  useEffect(() => {
    if (!["localhost", "127.0.0.1"].includes(window.location.hostname)) {
      return undefined;
    }

    const form = document.querySelector(".service-enquiry-form, .audit-form");
    const message = form?.querySelector("[data-form-error]");
    if (!form || !message) return undefined;

    function explainLocalForm(event) {
      if (!form.checkValidity()) return;
      event.preventDefault();
      message.textContent = form.matches(".service-enquiry-form")
        ? "This local preview cannot send service enquiries. Deploy with Netlify Forms enabled or configure another form provider."
        : "This local preview cannot deliver enquiries. Deploy with Netlify Forms enabled or configure another form provider.";
    }

    form.addEventListener("submit", explainLocalForm);
    return () => form.removeEventListener("submit", explainLocalForm);
  }, []);

  return null;
}

function ServicePrompt() {
  const [visible, setVisible] = useState(false);
  const dialogRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    if (
      ["/contact/", "/thank-you/"].includes(window.location.pathname) ||
      document.querySelector(".audit-form, .service-enquiry-form")
    ) {
      return undefined;
    }

    try {
      if (window.sessionStorage.getItem("clearpath-service-prompt-shown")) {
        return undefined;
      }

      const dismissedUntil = Number(
        window.localStorage.getItem("clearpath-service-prompt-dismissed-until"),
      );
      if (dismissedUntil > Date.now()) return undefined;
    } catch (error) {
      console.warn("Service prompt preferences could not be read.", error);
    }

    let remainingSeconds = 45;
    const timer = window.setInterval(() => {
      if (document.visibilityState !== "visible") return;
      remainingSeconds -= 1;
      if (remainingSeconds > 0) return;

      window.clearInterval(timer);
      try {
        window.sessionStorage.setItem("clearpath-service-prompt-shown", "true");
      } catch (error) {
        console.warn("Service prompt session state could not be saved.", error);
      }
      setVisible(true);
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!visible || !dialogRef.current) return;
    dialogRef.current.showModal();
    closeRef.current?.focus();
  }, [visible]);

  function rememberDismissal() {
    try {
      window.localStorage.setItem(
        "clearpath-service-prompt-dismissed-until",
        String(Date.now() + 7 * 24 * 60 * 60 * 1000),
      );
    } catch (error) {
      console.warn("Service prompt dismissal could not be saved.", error);
    }
  }

  function dismiss() {
    rememberDismissal();
    if (dialogRef.current?.open) dialogRef.current.close();
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <dialog
      className="service-prompt"
      ref={dialogRef}
      aria-labelledby="service-prompt-title"
      aria-describedby="service-prompt-description"
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.preventDefault();
          dismiss();
        }
      }}
      onCancel={(event) => {
        event.preventDefault();
        dismiss();
      }}
      onClose={() => {
        rememberDismissal();
        setVisible(false);
      }}
    >
      <button
        className="service-prompt-close"
        ref={closeRef}
        type="button"
        aria-label="Close service suggestions"
        onClick={dismiss}
      >
        <span aria-hidden="true">×</span>
      </button>
      <p className="eyebrow">A CLEARER NEXT STEP</p>
      <h2 id="service-prompt-title">What would you like to improve?</h2>
      <p id="service-prompt-description">
        Pick a starting point. We’ll show you the service details and indicative
        scope—no commitment needed.
      </p>
      <nav className="service-prompt-options" aria-label="Choose a service goal">
        <a href="/services/performance-marketing/" onClick={rememberDismissal}>
          Bring in more customers <span aria-hidden="true">→</span>
        </a>
        <a href="/services/local-seo/" onClick={rememberDismissal}>
          Be easier to find locally <span aria-hidden="true">→</span>
        </a>
        <a href="/services/websites/" onClick={rememberDismissal}>
          Improve my website <span aria-hidden="true">→</span>
        </a>
        <a href="/services/automation/" onClick={rememberDismissal}>
          Follow up with enquiries <span aria-hidden="true">→</span>
        </a>
      </nav>
      <div className="service-prompt-footer">
        <a href="/services/" onClick={rememberDismissal}>View all services</a>
        <button type="button" onClick={dismiss}>Not now</button>
      </div>
    </dialog>
  );
}

const menuRoot = document.querySelector("#menu-toggle-root");
const cookieRoot = document.querySelector("#cookie-consent-root");
const promptRoot = document.querySelector("#service-prompt-root");
const appRoot = document.querySelector("#react-app-root");

if (!menuRoot || !cookieRoot || !promptRoot || !appRoot) {
  throw new Error("The ClearPath React mount points are missing from this page.");
}

const yearMounts = document.querySelectorAll("[data-year]");
hydrateRoot(menuRoot, <MenuToggle />);
createRoot(appRoot).render(
  <>
    {createPortal(<CookieConsent />, cookieRoot)}
    {createPortal(<ServicePrompt />, promptRoot)}
    {Array.from(yearMounts, (mount, index) =>
      createPortal(new Date().getFullYear(), mount, `year-${index}`),
    )}
    <PageEffects />
    <LocalFormNotice />
  </>,
);
