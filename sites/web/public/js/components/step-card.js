import { LightElement, escape } from "./utils.js";

/**
 * Numbered process step (description = children).
 * @attr number  - step number, e.g. "01"
 * @attr heading - step title
 */
class StepCard extends LightElement {
  render(authored) {
    this.innerHTML = `
      <p class="step-card__number">${escape(this.getAttribute("number"))}</p>
      <h3 class="step-card__title">${escape(this.getAttribute("heading"))}</h3>
      <p class="step-card__text"></p>`;
    this.querySelector(".step-card__text").append(authored);
  }
}

customElements.define("step-card", StepCard);
