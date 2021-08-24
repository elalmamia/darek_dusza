const text = document.querySelectorAll('.text');
text.forEach(function (item) {
  item.classList.add('show-on-scroll');
});

const observer = new IntersectionObserver(function (entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
    } else {
      entry.target.classList.remove('is-visible');
    }
  });
});

const targets = document.querySelectorAll('.show-on-scroll');
targets.forEach(function (target) {
  observer.observe(target);
});
