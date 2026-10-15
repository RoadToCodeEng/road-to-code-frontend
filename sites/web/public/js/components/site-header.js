import { escape } from "./utils.js";

const LINKS = [
  { id: "services", label: "Services", href: "/services.html" },
  { id: "about", label: "About", href: "/about.html" },
  { id: "contact", label: "Contact", href: "/contact.html" },
];

/**
 * Site navigation bar.
 * @attr active - id of the current page ("services" | "about" | "contact")
 */
class SiteHeader extends HTMLElement {
  connectedCallback() {
    if (this.rendered) return;
    this.rendered = true;
    const active = this.getAttribute("active");

    this.innerHTML = `
      <div class="container site-header__inner">
        <a class="brand" href="/">
          <img src="/assets/logo.svg" width="82" height="37" alt="">
          Road to Code
        </a>
        <button class="site-nav__toggle" type="button" aria-expanded="false" aria-controls="site-nav">
          <span class="site-nav__bars" aria-hidden="true"></span>
          <span class="visually-hidden">Menu</span>
        </button>
        <nav class="site-nav" id="site-nav" aria-label="Main">
          ${LINKS.map(
            (link) => `
              <a class="site-nav__link" href="${link.href}"${link.id === active ? ' aria-current="page"' : ""}>
                ${escape(link.label)}
              </a>`
          ).join("")}
          <a class="btn btn--primary btn--sm" href="/contact.html">Get in touch</a>
        </nav>
      </div>`;

    const toggle = this.querySelector(".site-nav__toggle");
    toggle.addEventListener("click", () => {
      const open = !this.hasAttribute("open");
      this.toggleAttribute("open", open);
      toggle.setAttribute("aria-expanded", String(open));
    });
  }
}

customElements.define("site-header", SiteHeader);
