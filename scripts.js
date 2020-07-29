const imageContainer = document.getElementById('image-container');

const apiKey = config.API_KEY;

let photosArray = [];
let count = 5;
let imagesLoaded = 0;
let totalImages = 0;
let ready = false;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;


function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    count = 30;
  }
}

function setAttributes(element, obj) {
  for (const key in obj) {
    element.setAttribute(key, obj[key]);
  }
}

function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  photosArray.forEach((photo) => {
    const item = document.createElement('a');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    });
    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    img.addEventListener('load', imageLoaded)
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

async function getApiPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    console.log(error);
  }
}

window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
    getApiPhotos();
  }
}); 


getApiPhotos();
