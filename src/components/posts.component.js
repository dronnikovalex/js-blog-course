import { Component } from '../core/component'
import { apiService } from '../services/api.service'
import { TransportService } from '../services/transform.service'
import { renderPost } from '../../templates/render.template'

export class PostsComponent extends Component {
  constructor(id, {loader}) {
    super(id)
    this.loader = loader
  }

  init() {
     this.$el.addEventListener('click', btnHandler.bind(this))
  }

  async onShow() {
    this.loader.show()
    const fbData = await apiService.fetchPosts()
    const posts = TransportService.fbObjectToArray(fbData)
    const html = posts.map(post => renderPost(post, {withButton : true})).join(' ')
    this.loader.hide()
    this.$el.insertAdjacentHTML('afterbegin', html)
  }

  onHide() {
    this.$el.innerHTML = ''
  }

}

function btnHandler(event) {
  const $el = event.target
  const id = $el.dataset.id
  const title = $el.dataset.name
  const post = {id, title}

  if (post.id) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || []

    if (favorites.some(favorite => favorite.id === post.id)) {
      favorites = favorites.filter(item => item.id !== post.id)
      $el.textContent = "Сохранить"
      $el.classList.add('button-primary')
      $el.classList.remove('button-danger')
    } else {
      favorites.push(post)
      $el.textContent = "Удалить"
      $el.classList.remove('button-primary')
      $el.classList.add('button-danger')
    }

    localStorage.setItem('favorites', JSON.stringify(favorites))
  }
} 