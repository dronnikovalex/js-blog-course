import { Component } from "../core/component"
import { apiService } from "../services/api.service"
import { TransportService } from "../services/transform.service"
import { renderPost } from "../../templates/render.template"

export class PostsComponent extends Component {
  constructor(id, { loader }) {
    super(id)
    this.loader = loader
  }

  init() {
    this.$el.addEventListener("click", btnHandler.bind(this))
    console.log(this.$el)
  }

  async onShow() {
    this.loader.show()
    const fbData = await apiService.fetchPosts()
    if (!fbData) {
      this.loader.hide()
      return this.$el.insertAdjacentHTML(
        "afterbegin",
        `<p class="center">Постов пока еще нет</p>`
      )
    }
    const posts = TransportService.fbObjectToArray(fbData)
    const html = posts
      .map((post) => renderPost(post, { withButton: true }))
      .join(" ")
    this.loader.hide()
    this.$el.insertAdjacentHTML("afterbegin", html)
  }

  onHide() {
    this.$el.innerHTML = ""
  }
}

async function btnHandler(event) {
  const $el = event.target
  const id = $el.dataset.id
  const title = $el.dataset.name
  const post = { id, title }

  if (post.id && title) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || []

    if (favorites.some((favorite) => favorite.id === post.id)) {
      favorites = favorites.filter((item) => item.id !== post.id)
      $el.classList.remove("btn-favourite-remove")
    } else {
      favorites.push(post)
      $el.classList.add("btn-favourite-remove")
    }

    localStorage.setItem("favorites", JSON.stringify(favorites))
  } else if (post.id && !title) {
    let result = confirm("Удалить запись?")

    let favorites = JSON.parse(localStorage.getItem("favorites")) || []

    if (result) {
      this.$el.innerHTML = ""

      if (favorites.some((favorite) => favorite.id === post.id)) {
        favorites = favorites.filter((item) => item.id !== post.id)
        localStorage.setItem("favorites", JSON.stringify(favorites))
      }
    
      this.loader.show()
      await apiService.deletePostById(post.id)

      const data = await apiService.fetchPosts()
      this.loader.hide()
      alert('Запись удалена')

      if (data) {
        const posts = TransportService.fbObjectToArray(data)
        const html = posts.map((post) => renderPost(post, { withButton: true })).join(" ")
        this.$el.insertAdjacentHTML("afterbegin", html)
      } else {
        return this.$el.insertAdjacentHTML("afterbegin", `<p class="center">Постов пока еще нет</p>`)
      }
    }

  }
}
