const imageList = document.querySelector('.images');
const loadmore = document.querySelector('.load-more');
const loading = document.querySelector('.image-loader');
loadmore.style.display = 'none';
let page = 1;
let images = [];
const limit = 4;
const endpoint = `https://picsum.photos/v2/list?limit=${limit}`;
/* <div class="image-item">
        <img src="https://unsplash.com/photos/yC-Yzbqy7PY" alt="" />
      </div> */

function imageTemplates(url) {
  const template = `<div class="image-item">
  <img src="${url}" alt="" />
</div>`;
  imageList.insertAdjacentHTML('beforeend', template);
}

async function fetchImages(page = 1) {
  loading.style.display = 'block';
  loadmore.style.display = 'none';

  const response = await fetch(`${endpoint}&page=${page}`);
  images = await response.json();
  if (images.length > 0 && Array.isArray(images)) {
    loading.style.display = 'none';
    loadmore.style.display = 'block';
    images.forEach((item) => {
      imageTemplates(item.download_url);
    });
  }
}
async function handleLoadMore() {
  page++;
  await fetchImages(page);
}
loadmore.addEventListener('click', handleLoadMore);
fetchImages();
