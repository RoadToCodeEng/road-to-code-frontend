// Submits the contact form to Netlify Forms in the background and reports the
// result inline. Without JavaScript the form still posts normally and Netlify
// shows its own confirmation page.
const FALLBACK_EMAIL = "hi@roadtocode.tech";

const form = document.getElementById("contact-form");
const status = form.querySelector(".contact-form__status");
const button = form.querySelector('button[type="submit"]');

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  button.disabled = true;
  status.dataset.state = "pending";
  status.textContent = "Sending…";

  try {
    const response = await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(new FormData(form)).toString(),
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    form.reset();
    status.dataset.state = "success";
    status.textContent = "Thanks! Your message has been sent. We usually reply within 24 hours.";
  } catch {
    status.dataset.state = "error";
    status.textContent = `Something went wrong sending your message. Please try again or email us at ${FALLBACK_EMAIL}.`;
  } finally {
    button.disabled = false;
  }
});
