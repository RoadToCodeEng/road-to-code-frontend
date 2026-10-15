import { escape } from "./utils.js";

/**
 * Full-width blue call-to-action band.
 * @attr heading  - headline
 * @attr subtitle - optional supporting line (accent green)
 * @attr label    - button label (default "Get in touch")
 * @attr href     - button target (default /contact.html)
 */
class CtaBanner extends HTMLElement {
  connectedCallback() {
    if (this.rendered) return;
    this.rendered = true;
    const subtitle = this.getAttribute("subtitle");

    this.innerHTML = `
      <div class="container cta-banner__content">
        <div class="cta-banner__text">
          <h2 class="cta-banner__title">${escape(this.getAttribute("heading"))}</h2>
          ${subtitle ? `<p class="cta-banner__subtitle">${escape(subtitle)}</p>` : ""}
        </div>
        <a class="btn btn--accent" href="${escape(this.getAttribute("href") || "/contact.html")}">
          ${escape(this.getAttribute("label") || "Get in touch")}
        </a>
      </div>`;
  }
}

customElements.define("cta-banner", CtaBanner);
