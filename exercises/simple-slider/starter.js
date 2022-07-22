window.addEventListener('load', function () {
  function silder() {
    this.slider = document.querySelector('.slider');
    this.sliderMain = document.querySelector('.slider-main');
    this.sliderItems = document.querySelectorAll('.slider-item');
    this.nextBtn = document.querySelector('.slider-next');
    this.this.prevBtn = document.querySelector('.slider-prev');
    this.dotItems = document.querySelectorAll('.slider-dot-item');
    this.sliderItemWidth = this.sliderItems[0].offsetWidth;
    this.slidesLength = this.sliderItems.length;
    this.postionX = 0;
    this.index = 0;

    this.nextBtn.addEventListener('click', function () {
      handleChangSlide(1);
    });
    this.prevBtn.addEventListener('click', function () {
      handleChangSlide(-1);
    });
    [...this.dotItems].forEach((item) =>
      item.addEventListener('click', function (e) {
        [...dotItems].forEach((el) => el.classList.remove('active'));
        e.target.classList.add('active');
        const slideIndex = parseInt(e.target.dataset.index);
        index = slideIndex;
        postionX = -1 * index * sliderItemWidth;
        this.sliderMain.style = `transform:translateX(${postionX}px)`;
      })
    );
    function handleChangSlide(direction) {
      if (direction === 1) {
        if (index >= slidesLength - 1) {
          index = slidesLength - 1;
          return;
        }
        postionX = postionX - sliderItemWidth;
        this.sliderMain.style = `transform:translateX(${postionX}px)`;
        index++;
      } else if (direction === -1) {
        if (index <= 0) {
          index = 0;
          return;
        }
        postionX = postionX + sliderItemWidth;
        this.sliderMain.style = `transform:translateX(${postionX}px)`;
        index--;
      }
      [...dotItems].forEach((el) => el.classList.remove('active'));
      dotItems[index].classList.add('active');
    }
  }
});
