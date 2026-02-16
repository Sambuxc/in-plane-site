const CONTACT_FORM_ENDPOINT = "https://lib-tech.work/send-mailer";

const initializeContactForm = () => {
  const form = document.querySelector("#contact-form");

  if (!form || form.dataset.bound === "true") {
    return;
  }

  form.dataset.bound = "true";

  const statusElement = form.querySelector("#contact-form-status");
  const submitButton = form.querySelector('button[type="submit"]');

  const setStatus = (message, type = "neutral") => {
    if (!statusElement) {
      return;
    }

    statusElement.textContent = message;
    statusElement.dataset.type = type;
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      subject: String(formData.get("subject") || "").trim(),
      message: String(formData.get("message") || "").trim(),
    };

    if (!payload.name || !payload.email || !payload.subject || !payload.message) {
      setStatus("Please complete all fields before submitting.", "error");
      return;
    }

    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email);
    if (!emailIsValid) {
      setStatus("Please enter a valid email address.", "error");
      return;
    }

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";
    }
    setStatus("Sending your message...", "neutral");

    try {
      const response = await fetch(CONTACT_FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        form.reset();
        setStatus("Thanks, your message has been sent.", "success");
      } else {
        setStatus("We could not send your message. Please try again.", "error");
      }
    } catch (error) {
      setStatus("We could not send your message. Please try again.", "error");
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "Send Message";
      }
    }
  });
};

document.addEventListener("includes:loaded", initializeContactForm);

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeContactForm);
} else {
  initializeContactForm();
}
