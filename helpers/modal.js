const FORM_ENDPOINT = "https://lib-tech.work/send-mailer";

document.addEventListener('includes:loaded', function() {
  const modal = document.getElementById('interest-modal');
  const openBtn = document.querySelector('.open-modal');
  const form = document.getElementById('interest-form');
  const submitBtn = form.querySelector('.shared-form__submit');
  const statusElement = form.querySelector('#interest-form-status');

  // Lyrics modal
	// todo - support dialog closing event listener so that if
	// user exits lyrics by esc button or clicking outside of dialog
	// then the closeLyricsModal() gets called to reset state properly.
  const lyricsModal = document.getElementById('lyrics-modal');
	const butterflyLyrics = document.getElementById('butterfly');
	const giveItWingsLyrics = document.getElementById('give-it-wings');
	const everythingIHaveLyrics = document.getElementById('everything-i-have');

  window.openLyricsModal = function(fileName) {
		if (fileName === 'butterfly') {
			butterflyLyrics.style.display = 'block';
		}
		else if (fileName === 'give-it-wings') {
			giveItWingsLyrics.style.display = 'block';
		}
		else if (fileName === 'everything-i-have') {
			everythingIHaveLyrics.style.display = 'block';
		}
    lyricsModal.showModal();
  };

  window.closeLyricsModal = function() {
		// reset all lyrics
		butterflyLyrics.removeAttribute('style');
		giveItWingsLyrics.removeAttribute('style');
		everythingIHaveLyrics.removeAttribute('style');
    lyricsModal.close();
  };

  lyricsModal.addEventListener('click', function(e) {
    if (e.target === lyricsModal) {
      closeLyricsModal();
    }
  });

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
        subject: "User registered interest",
        message: String(formData.get("interest") || "").trim(),
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

