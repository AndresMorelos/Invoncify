// Prevent window to open dropped file
document.addEventListener('dragover', (event) => event.preventDefault());
document.addEventListener('drop', (event) => event.preventDefault());

// Linux and Windows draggable window broken, so monkey patch
if (['linux', 'win32'].includes(window.invoncify.platform)) {
  const elements = document.querySelectorAll('body,#root,.appWrapper');
  elements.forEach((element) => {
    element.classList.add('non-draggable');
  });
}
