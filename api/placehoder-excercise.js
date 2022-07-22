// async function addPost(title, author) {
//   const response = await fetch("http://localhost:3000/posts", {
//     method: "POST",
//     body: JSON.stringify({
//       title,
//       author,
//     }),
//     headers: {
//       "Content-type": "application/json; charset=UTF-8",
//     },
//   });
//   console.log(response);
// }
// const formPost = document.querySelector(".form-post");
// formPost.addEventListener("submit", function (e) {
//   e.preventDefault();
//   const title = this.elements["title"].value;
//   const author = this.elements["author"].value;
//   addPost(title, author);
// });
const endpoint = "http://localhost:3456/courses";
const courseList = document.querySelector(".course-list");
const formPost = document.querySelector(".form-post");
const formSubmit = document.querySelector(".form-submit");
const filterInput = document.querySelector(".filter");
let updateId = null;

function debounceFn(func, wait, immediate) {
  let timeout;
  return function () {
    let context = this,
      args = arguments;
    let later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

filterInput.addEventListener(
  "keydown",
  debounceFn(function (e) {
    let path = endpoint;
    if (e.target.value !== "") {
      path = `${endpoint}?title_like=${e.target.value}`;
    }
    getCourses(path);

    // const response = await fetch(`${endpoint}?title_like=${e.target.value}`);
    // const data = await response.json();
    // console.log(data);
  }),
  500
);

async function addNewCourse({
  image,
  title,
  author,
  rating,
  price,
  bestSeller,
  buyAmount,
}) {
  await fetch(endpoint, {
    method: "POST",
    body: JSON.stringify({
      image,
      title,
      author,
      rating,
      price,
      bestSeller,
      buyAmount,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
}
//update course
async function updateCourse({
  id,
  image,
  title,
  author,
  rating,
  price,
  bestSeller,
  buyAmount,
}) {
  await fetch(`${endpoint}/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      image,
      title,
      author,
      rating,
      price,
      bestSeller,
      buyAmount,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
}

//Delete course
async function deleteCourse(id) {
  await fetch(`${endpoint}/${id}`, {
    method: "DELETE",
  });
}

async function getSingleCourse(id) {
  const response = await fetch(`${endpoint}/${id}`);
  const data = await response.json();
  return data;
}

function renderItem(item) {
  const template = ` 
  <div class="course-item">
    <div class="course-image">
      <img src="${item.image}" alt="" />
      <button class="course-edit" data-id=${
        item.id
      }><i i class='fa fa-pencil' style="pointer-events:none;"></i></button>
      <button class="course-remove" data-id=${
        item.id
      }><i i class='fa fa-times'></i></button>
      
    </div>
    <div class="course-content">
      <div class="course-title">${item.title}</div>
      <div class="course-author">${item.author}</div>
      <div class="course-meta">
        <div class="course-rating">${item.rating}</div>
        <div class="course-enroll">${item.buyAmount}</div>
      </div>
      ${item.bestSeller ? `<div class="course-best-seller"></div>` : ""}
    </div>
  </div>`;
  courseList.insertAdjacentHTML("beforeend", template);
}

async function getCourses(link = endpoint) {
  const response = await fetch(link);
  const data = await response.json();
  //phải là mảng
  courseList.innerHTML = "";
  if (data.length > 0 && Array.isArray(data)) {
    data.forEach((item) => renderItem(item));
  }
}

formPost.addEventListener("submit", async function (e) {
  e.preventDefault();
  const course = {
    image: this.elements["image"].value,
    title: this.elements["title"].value,
    author: this.elements["author"].value,
    rating: +this.elements["rating"].value,
    price: +this.elements["price"].value,
    bestSeller: this.elements["bestSeller"].value,
    buyAmount: +this.elements["buyAmount"].value,
  };

  updateId
    ? await updateCourse({ id: updateId, ...course })
    : await addNewCourse(course);
  this.reset();
  await getCourses();
  updateId = null;
  formSubmit.textContent = "Add Course";
});

courseList.addEventListener("click", async function (e) {
  if (e.target.matches(".course-remove")) {
    const id = +e.target.dataset.id;
    await deleteCourse(id);
    await getCourses();
  } else if (e.target.matches(".course-edit")) {
    const id = +e.target.dataset.id;
    const data = await getSingleCourse(id);
    formPost.elements["image"].value = data.image;
    formPost.elements["title"].value = data.title;
    formPost.elements["author"].value = data.author;
    formPost.elements["rating"].value = data.rating;
    formPost.elements["price"].value = data.price;
    formPost.elements["bestSeller"].checked = data.bestSeller;
    formPost.elements["buyAmount"].value = data.buyAmount;
    formSubmit.textContent = "Update course";
    updateId = id;
  }
});
getCourses();
