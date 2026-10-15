import { LightElement, escape } from "./utils.js";

/**
 * Two-column service block: copy + checklist on one side, visual on the other.
 * Children: <p> description paragraphs, <li> checklist items and one
 * element with slot="visual".
 * @attr eyebrow - mono label
 * @attr heading - section title
 * @attr tone    - "light" for the off-white background (default white)
 * @attr reverse - put the visual on the left on desktop
 */
class ServiceSection extends LightElement {
  render(authored) {
    const children = [...authored.children];
    const visual = children.find((el) => el.getAttribute("slot") === "visual");
    visual?.removeAttribute("slot");
    const paragraphs = children.filter((el) => el.localName === "p");
    const items = children.filter((el) => el.localName === "li");

    this.innerHTML = `
      <div class="container split">
        <div class="service-section__copy">
          <div class="service-section__text">
            <p class="eyebrow">${escape(this.getAttribute("eyebrow"))}</p>
            <h2 class="service-section__title">${escape(this.getAttribute("heading"))}</h2>
          </div>
        </div>
      </div>`;

    const text = this.querySelector(".service-section__text");
    for (const p of paragraphs) {
      p.classList.add("body-text");
      text.append(p);
    }
    // Populate the list before it connects so <check-list> sees its items.
    const list = document.createElement("check-list");
    list.append(...items);
    this.querySelector(".service-section__copy").append(list);
    if (visual) this.querySelector(".split").append(visual);
  }
}

customElements.define("service-section", ServiceSection);
