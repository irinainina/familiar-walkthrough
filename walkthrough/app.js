// Copying the name of a screen: the whole button is the target, the label
// under it says what happened. Falls back to a hidden field where the
// clipboard API is not allowed (an http:// page, an old browser).
document.addEventListener('click', function (event) {
  var button = event.target.closest('.copy');
  if (!button) return;

  var text = button.dataset.copy || button.textContent.trim();

  function done() {
    document.querySelectorAll('.copy.done').forEach(function (other) {
      other.classList.remove('done');
    });
    button.classList.add('done');
    setTimeout(function () { button.classList.remove('done'); }, 1600);
  }

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(done);
    return;
  }

  var field = document.createElement('textarea');
  field.value = text;
  field.setAttribute('readonly', '');
  field.style.position = 'fixed';
  field.style.opacity = '0';
  document.body.appendChild(field);
  field.select();
  try { document.execCommand('copy'); done(); } catch (error) { /* nothing to do */ }
  document.body.removeChild(field);
});
