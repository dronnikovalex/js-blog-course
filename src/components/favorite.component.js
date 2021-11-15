import { Component } from '../core/component'
import { apiService } from '../services/api.service'
import { renderPost } from '../../templates/render.template'

export class FavoriteComponent extends Component {
  constructor(id, {loader}) {
    super(id)
    this.loader = loader
  }

  init() {
    this.$el.addEventListener('click', linkClickhandler.bind(this))
  }

  onShow() {
    const favorites = JSON.parse(localStorage.getItem('favorites'))
    const html = renderList(favorites)
    this.$el.insertAdjacentHTML('afterbegin', html)
  }

  onHide() {
    this.$el.innerHTML = ''
  }
}

async function linkClickhandler(event) {
  event.preventDefault()
  
  if (event.target.classList.contains('js-link')) {

    this.loader.show()
    this.$el.innerHTML = ''

    const postId = event.target.dataset.id
    const post = await apiService.fetchPostsById(postId)
  

    this.loader.hide()

    this.$el.insertAdjacentHTML('afterbegin', renderPost(post, {withButton : false}))
  }
}

function renderList(list = []) {
  if (list && list.length) {
    return `
    <ul>
      ${list.map(item => `<li><a href="#" class="js-link" data-id="${item.id}">${item.title}</a></li>`).join(' ')}
    </ul>
    `
  } 
    return `<p class="center">Записей в избранном нет</p>`
}