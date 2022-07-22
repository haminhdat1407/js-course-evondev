window.addEventListener('load', function name() {
  const tabItems = document.querySelectorAll('.tab-item');
  const tabList = document.querySelector('.tab-list');
  const tab = document.querySelector('.tab');
  const tabOffetLeft = tab.offsetLeft;
  const tabNext = document.querySelector('.tab-next');
  const tabPre = document.querySelector('.tab-pre');
  const tabScrollWidth = tabList.scrollWidth - tabList.clientWidth;
  let deltaScroll = 40;
  [...tabItems].forEach((item) => item.addEventListener('click', handleTabClick));
  function handleTabClick(e) {
    [...tabItems].forEach((item) => item.classList.remove('active'));
    e.target.classList.add('active');
    let leftSpacing = e.target.offsetLeft;
    if (e.target.offsetLeft >= tabOffetLeft) {
      leftSpacing = e.target.offsetLeft - tabOffetLeft;
    }
    tabList.scroll(leftSpacing / 2, 0);
  }
  tabList.addEventListener('wheel', function (e) {
    const delta = e.deltaY;
    this.scrollLeft += delta;
  });
  tabNext.addEventListener('click', function (e) {
    tabList.scrollLeft += deltaScroll;
    if (tabList.scrollLeft >= tabScrollWidth) {
      this.classList.add(disabled);
    }
  });
});
