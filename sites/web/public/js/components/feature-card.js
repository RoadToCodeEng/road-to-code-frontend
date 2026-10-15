import { LightElement, escape } from "./utils.js";

/**
 * Card with an icon badge, title and description (description = children).
 * @attr icon    - icon name in assets/icons (rendered white, 20×20)
 * @attr heading - card title
 * @attr size    - "lg" for the larger title used on the About page
 */
class FeatureCard extends LightElement {
  render(authored) {
    const icon = this.getAttribute("icon");

    this.innerHTML = `
      <div class="icon-badge">
        <img src="/assets/icons/${escape(icon)}.svg" width="20" height="20" alt="">
      </div>
      <div class="feature-card__body">
        <h3 class="feature-card__title">${escape(this.getAttribute("heading"))}</h3>
        <p class="feature-card__text"></p>
      </div>`;
    this.querySelector(".feature-card__text").append(authored);
  }
}

customElements.define("feature-card", FeatureCard);
