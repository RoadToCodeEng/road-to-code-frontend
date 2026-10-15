import { escape } from "./utils.js";

const COLUMNS = [
  {
    title: "Services",
    links: [
      ["Technical strategy", "/services.html#technical-strategy"],
      ["Product engineering", "/services.html#product-engineering"],
      ["DevOps & SRE", "/services.html#devops-sre"],
      ["Team augmentation", "/services.html#team-augmentation"],
    ],
  },
  { title: "Company", links: [["About", "/about.html"]] },
];

const link = ([label, href]) => `<a href="${href}">${escape(label)}</a>`;

/** Site footer with brand blurb, link columns and copyright bar. */
class SiteFooter extends HTMLElement {
  connectedCallback() {
    if (this.rendered) return;
    this.rendered = true;
    const year = new Date().getFullYear();

    this.innerHTML = `
      <footer class="container">
        <div class="site-footer__columns">
          <div class="site-footer__about">
            <a class="brand brand--footer" href="/">
              <img src="/assets/logo.svg" width="82" height="37" alt="">
              Road to Code
            </a>
            <p>Road to Code is a software consultancy that helps product teams build robust backend systems and infrastructure.</p>
          </div>
          ${COLUMNS.map(
            (col) => `
              <nav class="site-footer__col" aria-label="${col.title}">
                <h2>${col.title}</h2>
                ${col.links.map(link).join("")}
              </nav>`
          ).join("")}
        </div>
        <div class="site-footer__bottom">
          <p>© ${year} Road to Code. All rights reserved.</p>
        </div>
      </footer>`;
  }
}

customElements.define("site-footer", SiteFooter);
