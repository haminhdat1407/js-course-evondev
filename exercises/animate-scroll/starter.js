document.addEventListener('DOMContentLoaded', function () {
  const images = document.querySelectorAll('.container img');
  window.addEventListener('scroll', function () {
    const windowScrollTop = window.pageYOffset;
    [...images].forEach((item) => {
      //ảnh so với Top của trang
      if (windowScrollTop > item.OffsetTop - item.offsetHeight / 2) {
        item.classList.add('active');
      }
    });
  });
});
