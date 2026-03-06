---
layout: contact.njk
title: Contact
description: Got something to say? I'd love to hear it.
---

<div id="success-message" hidden>
  <p>Thanks — message received!</p>
</div>

<form name="contact" method="POST" netlify netlify-honeypot="bot-field">
  <input type="hidden" name="form-name" value="contact" />
  <p hidden>
    <label>Don't fill this out: <input name="bot-field" /></label>
  </p>

  <label for="name">Name (optional)</label>
  <input type="text" id="name" name="name" />

  <label for="email">Email</label>
  <input type="email" id="email" name="email" required />

  <label for="message">Message</label>
  <textarea id="message" name="message" rows="6" required></textarea>

  <button type="submit">Send</button>
</form>

<script>
  const form = document.querySelector('form[name="contact"]');
  const successMsg = document.getElementById('success-message');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(form);

    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data).toString(),
      });
      form.style.display = 'none';
      successMsg.removeAttribute('hidden');
    } catch (err) {
      alert('Something went wrong — please try again.');
    }
  });
</script>