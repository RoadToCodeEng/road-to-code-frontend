import { escape } from "./utils.js";

/**
 * Eyebrow label + section title.
 * @attr eyebrow      - small mono label above the title
 * @attr heading      - title text
 * @attr align        - "center" to centre the block
 * @attr eyebrow-size - "sm" for the 12px eyebrow
 */
class SectionHeading extends HTMLElement {
  connectedCallback() {
    if (this.rendered) return;
    this.rendered = true;
    const eyebrow = this.getAttribute("eyebrow");
    const small = this.getAttribute("eyebrow-size") === "sm" ? " eyebrow--sm" : "";

    this.innerHTML = `
      ${eyebrow ? `<p class="eyebrow${small}">${escape(eyebrow)}</p>` : ""}
      <h2 class="section-heading__title">${escape(this.getAttribute("heading"))}</h2>`;
  }
}

customElements.define("section-heading", SectionHeading);
