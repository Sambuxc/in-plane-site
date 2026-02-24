const FORM_ENDPOINT = "https://lib-tech.work/send-mailer";

document.addEventListener('includes:loaded', function() {
  const modal = document.getElementById('interest-modal');
  const openBtn = document.querySelector('.primary');
  const form = document.getElementById('interest-form');
  const submitBtn = form.querySelector('.shared-form__submit');
  const statusElement = form.querySelector('#interest-form-status');

  if (openBtn) {
    openBtn.addEventListener('click', function(e) {
      openModal();
    });
  }

  function openModal() {
    modal.showModal();
  }

  window.closeModal = function() {
    modal.close();
  };

  // Close on backdrop click
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      closeModal();
    }
  });

  if (form) {
    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      const formData = new FormData(form);
      const payload = {
        name: String(formData.get("name") || "").trim(),
        email: String(formData.get("email") || "").trim(),
        subject: String(formData.get("interest") || "").trim(),
        message: "User has registered their interest",
        service: "In Plane Site",
      }

      if (!payload.name || !payload.email || !payload.subject) {
        setStatus("Please complete all fields before submitting.", "error");
        return;
      }

      const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email);
      if (!emailIsValid) {
        setStatus("Please enter a valid email address.", "error");
        return;
      }

      // update UI state
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";
      setStatus("Sending your message...", "neutral");

      try {
        const response = await fetch(FORM_ENDPOINT, {
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
      } catch {
        setStatus("We could not send your message. Please try again.", "error");
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "Send Message";
      }
    });
  }

  const setStatus = (message, type = "neutral") => {
    if (!statusElement) {
      return;
    }

    statusElement.textContent = message;
    statusElement.dataset.type = type;
  };
});

