import { LightElement, escape } from "./utils.js";

let uid = 0;

/**
 * Adds a label and styling to a form control.
 * The control (<input>, <select> or <textarea>) is authored as the child, so it
 * exists in the static HTML: the form works without JavaScript and Netlify Forms
 * can detect its fields at deploy time.
 * @attr label - visible label
 */
class FormField extends LightElement {
  render(authored) {
    const control = authored.querySelector("input, select, textarea");
    if (!control) return;

    control.id ||= `field-${++uid}`;
    control.classList.add("form-field__control");

    this.innerHTML = `<label class="form-field__label" for="${control.id}">${escape(this.getAttribute("label"))}</label>`;
    this.append(control);
  }
}

customElements.define("form-field", FormField);
