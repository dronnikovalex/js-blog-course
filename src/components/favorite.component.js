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
    Object.defineProperty(post, 'id', { value: postId })
    console.log(post)
  

    this.loader.hide()

    this.$el.insertAdjacentHTML('afterbegin', renderPost(post, {withButton : true, deleteButton: false}))
  } else if (event.target.classList.contains('btn-favourite-remove')) {
    const id = event.target.dataset.id

    let favoriteList = JSON.parse(localStorage.getItem("favorites")) || []
    favoriteList = favoriteList.filter((item) => item.id !== id)
    localStorage.setItem("favorites", JSON.stringify(favoriteList))
   
    this.$el.innerHTML = ''
    const html = renderList(favoriteList)
    this.$el.insertAdjacentHTML('afterbegin', html)
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