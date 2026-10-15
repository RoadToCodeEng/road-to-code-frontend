const ESCAPES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };

/** Escape a string for safe interpolation into HTML. */
export const escape = (value = "") => String(value).replace(/[&<>"']/g, (c) => ESCAPES[c]);

/**
 * Base class for light-DOM components. Authored children are captured once,
 * before the first render, so they can be redistributed into the template.
 */
export class LightElement extends HTMLElement {
  connectedCallback() {
    if (this.rendered) return;
    this.rendered = true;
    const authored = document.createDocumentFragment();
    authored.append(...this.childNodes);
    this.render(authored);
  }

  /** @param {DocumentFragment} _authored the element's original children */
  render(_authored) {}
}
