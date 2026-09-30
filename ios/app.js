// Копирование имени экрана и просмотр снимка крупно.
document.addEventListener('click', function (event) {
  var button = event.target.closest('.copy');
  if (button) {
    copy(button.dataset.copy, button);
    return;
  }
  var frame = event.target.closest('.phone-frame, .zoom');
  if (frame) {
    var img = frame.querySelector('img');
    open(img.src, img.dataset.name || '');
    return;
  }
  if (event.target.closest('.lightbox')) close();
});

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') close();
});

function copy(text, button) {
  function done() {
    button.classList.add('done');
    setTimeout(function () { button.classList.remove('done'); }, 1600);
  }
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(done);
    return;
  }
  var field = document.createElement('textarea');
  field.value = text;
  field.style.position = 'fixed';
  field.style.opacity = '0';
  document.body.appendChild(field);
  field.select();
  try { document.execCommand('copy'); done(); } catch (error) { /* nothing to do */ }
  document.body.removeChild(field);
}

var box;
function open(src, name) {
  if (!box) {
    box = document.createElement('div');
    box.className = 'lightbox';
    box.innerHTML = '<img alt=""><span></span>';
    document.body.appendChild(box);
  }
  box.querySelector('img').src = src;
  box.querySelector('span').textContent = name ? name + ' · Esc или клик — закрыть' : 'Esc или клик — закрыть';
  box.classList.add('open');
}

function close() {
  if (box) box.classList.remove('open');
}
