'use strict';

class Carousel {
  slides = [
    {
      id: 0,
      title: 'BEST LAPTOP DEALS',
      img: './assets/images/default-slide-img.jpg'
    },
    {
      id: 1,
      title: 'BEST HEADPHONES DEALS',
      img: './assets/images/default-slide-img.jpg'
    },
    {
      id: 2,
      title: 'BEST SPEAKERS DEALS',
      img: './assets/images/default-slide-img.jpg'
    }
  ];
  currentSlide = 0;

  constructor(element) {
    this.el = element;
    let mainDiv = this.createMainDiv();
    this.el.append(mainDiv);
    // Отображение текущего слайда
    let slideDiv = document.createElement('div');
    slideDiv.className = 'carousel-inner';
    slideDiv.id = 'slideDiv';
    slideDiv.append(this.createSlide(this.slides[this.currentSlide]))
    mainDiv.append(slideDiv);
    // Кнопки
    mainDiv.append(this.createPrevButton());
    mainDiv.append(this.createNextButton());
  }

  createMainDiv() {
    let mainDiv = document.createElement('div');
    mainDiv.className = 'main-carousel carousel slide';
    mainDiv.id = 'mainCarousel';
    // Список слайдов
    let ol = document.createElement('ol');
    ol.className = 'carousel-indicators';
    for (let slide of this.slides) {
      let li = document.createElement('li');
      li.className = 'carousel-indicator';
      li.dataset.slideTo = slide.id;
      li.dataset.target = '#mainCarousel';
      ol.append(li);
    }
    ol.addEventListener('click', (event) => this.onOlClick(event));
    mainDiv.append(ol);
    return mainDiv;
  }

  createSlideByIndex(index) {
    let slide = this.slides[index];
    let slideDiv = document.getElementById('slideDiv');
    slideDiv.innerHTML = '';
    slideDiv.append(this.createSlide(slide));
  }

  createSlide(slide) {
    let mainDiv = document.createElement('div');
    mainDiv.className = 'carousel-item active';
    // Картинка
    let img = document.createElement('img');
    img.src = slide.img;
    img.alt = 'Activelide';
    mainDiv.append(img);

    let containerDiv = document.createElement('div');
    containerDiv.className = 'container';
    let captionDiv = document.createElement('div');
    captionDiv.className = 'carousel-caption';

    let h3 = document.createElement('h3');
    h3.className = 'h1';
    h3.innerHTML = slide.title;
    captionDiv.append(h3);

    let a = document.createElement('a');
    a.className = 'btn';
    a.href = '#';
    a.role = 'button';
    a.innerHTML = `
      View all DEALS
      <img src="assets/icons/icon-angle-white.svg" class="ml-3" alt="">
    `;
    captionDiv.append(a);

    containerDiv.append(captionDiv);
    mainDiv.append(containerDiv);
    return mainDiv;
  }

  createPrevButton() {
    let prevButton = document.createElement('button');
    prevButton.className = 'carousel-control-prev';
    prevButton.href = '#mainCarousel';
    prevButton.role = 'button';
    prevButton.dataset.slide = 'prev';
    prevButton.innerHTML = `
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
    `;
    prevButton.addEventListener('click', (event) => this.onClick(event));
    return prevButton;
  }

  createNextButton() {
    let nextButton = document.createElement('button');
    nextButton.className = 'carousel-control-next';
    nextButton.href = '#mainCarousel';
    nextButton.role = 'button';
    nextButton.dataset.slide = 'next';
    nextButton.innerHTML = `
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
    `;
    nextButton.addEventListener('click', (event) => this.onClick(event));
    return nextButton;
  }

  getSlideIndex(increment) {
    let index = this.currentSlide + increment;
    console.log('Before ' + index);
    if (index >= this.slides.length) {
      index = 0;
    } else if (index < 0) {
      index = this.slides.length - 1;
    }
    console.log('After ' + index);
    this.currentSlide = index;
    return index;
  }

  onClick(event) {
    console.log(event.target);
    if (event.target.dataset.slide === 'next') {
      this.createSlideByIndex(this.getSlideIndex(1));
    } else if (event.target.dataset.slide === 'prev') {
      this.createSlideByIndex(this.getSlideIndex(-1));
    }
  }

  onOlClick(event) {
    let target = event.target;
    console.log(target);
    if (target instanceof HTMLLIElement) {
      // const li = target.closest('li');
      this.createSlideByIndex(target.dataset.slideTo);
    }
  }
}

// Делает класс доступным глобально, сделано для упрощения, чтобы можно было его вызывать из другого скрипта
window.Carousel = Carousel;
