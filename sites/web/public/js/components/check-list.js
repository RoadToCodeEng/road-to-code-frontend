import { LightElement } from "./utils.js";

/** List of items with a check badge. Children: <li> elements. */
class CheckList extends LightElement {
  render(authored) {
    this.setAttribute("role", "list");
    for (const li of authored.querySelectorAll("li")) {
      const item = document.createElement("div");
      item.className = "check-list__item";
      item.setAttribute("role", "listitem");
      item.innerHTML = `
        <span class="check-list__icon">
          <img src="/assets/icons/check-sm.svg" width="12" height="12" alt="">
        </span>
        <span></span>`;
      item.lastElementChild.append(...li.childNodes);
      this.append(item);
    }
  }
}

customElements.define("check-list", CheckList);
