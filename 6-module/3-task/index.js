'use strict';

class Menu {
  template = `
  <ul class="list-group sidebar">
    <li class="list-group-item dropdown">
      <a class="nav-link dropdown-toggle" id="cameraphotos">Camera &amp; Photo</a>
      <ul class="dropdown-menu">

       <li data-id="cameraphotos_accessories" class="dropdown-item"><a>Accessories</a></li>

      </ul>
    </li>

    <li class="list-group-item dropdown">
      <a class="nav-link dropdown-toggle" id="cinema">Home Cinema, TV &amp; Video</a>
      <ul class="dropdown-menu">

       <li data-id="cinema_audio" class="dropdown-item"><a>Audio</a></li>

       <li data-id="cinema_video" class="dropdown-item"><a>Video</a></li>

      </ul>
    </li>
  </ul>
  `;

  constructor(element) {
    element.innerHTML = this.template;
    let groups = element.querySelectorAll('.list-group-item');
    for (let group of groups) {
      group.addEventListener('pointerenter', (event) => this.onPointerEnter(event));
      group.addEventListener('pointerleave', (event) => this.onPointerLeave(event));
    }
  }

  onPointerEnter(event) {
    let dropMenu = event.target.getElementsByClassName('dropdown-menu')[0];
    dropMenu.classList.add('show');
    let main = document.querySelector('.backdrop');
    main.classList.add('show');
  }

  onPointerLeave(event) {
    let dropMenu = event.target.getElementsByClassName('dropdown-menu')[0];
    dropMenu.classList.remove('show');
    let main = document.querySelector('.backdrop');
    main.classList.remove('show');
  }
}

// Делает класс доступным глобально, сделано для упрощения, чтобы можно было его вызывать из другого скрипта
window.Menu = Menu;
