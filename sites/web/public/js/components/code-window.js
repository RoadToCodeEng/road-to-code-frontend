import { LightElement, escape } from "./utils.js";

const LIGHTS = {
  // Editor mock: one 52×12 traffic-light graphic.
  editor: `<img src="/assets/icons/traffic-lights.svg" width="52" height="12" alt="">`,
  // Report: compact 46×10 traffic-light graphic.
  report: `<img src="/assets/icons/traffic-lights-alt.svg" width="46" height="10" alt="">`,
  // Panels and terminals: three separate 10×10 dots.
  dots: ["red", "yellow", "green"]
    .map((c) => `<img src="/assets/icons/dot-${c}.svg" width="10" height="10" alt="">`)
    .join(""),
};

/**
 * Dark window chrome (traffic lights + filename) around code or terminal output.
 * Children are the window body.
 * @attr filename - label shown in the title bar
 * @attr variant  - "editor" | "panel" | "terminal" | "report"
 */
class CodeWindow extends LightElement {
  render(authored) {
    const variant = this.getAttribute("variant") || "panel";
    const lights = LIGHTS[variant] ?? LIGHTS.dots;

    this.innerHTML = `
      <div class="code-window__header">
        ${lights}
        <span>${escape(this.getAttribute("filename"))}</span>
      </div>`;
    this.append(authored);
  }
}

customElements.define("code-window", CodeWindow);
