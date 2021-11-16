import { Component } from '../core/component'
import { apiService } from '../services/api.service';
import { Form } from '../core/form';
import { Validators } from '../core/validators';
import { TransportService } from '../services/transform.service';
import { renderPost } from '../../templates/render.template'

export class EditPostComponent extends Component {
  constructor(id, data) {
    super(id)
    this.data = data
  }

  async init() {
    this.$el.addEventListener('click', saveChanges.bind(this))
    
    this.form = new Form(this.$el.closest('#edit-post'), {
      title: [Validators.required],
      fulltext: [Validators.required, Validators.minLength(10)],
    })

    document.querySelector('.form-input').focus()
  }

}

async function saveChanges(event) {
  const $posts = document.getElementById('posts')
  const $loader = document.getElementById('loader')
  const $formNode = event.target.closest('#edit-post')

  event.preventDefault()
 
  if (this.form.isValid()) {

    const formData = {
      ...this.form.value(),
      type: $formNode.type.value,
      date: new Date().toLocaleDateString()
    }
    $loader.classList.remove('hide')
    $posts.innerHTML = ''
    
    await apiService.editPost(formData, this.data)
    
    const fbData = await apiService.fetchPosts()    
    
    const posts = TransportService.fbObjectToArray(fbData)
    const html = posts.map((post) => renderPost(post, { withButton: true })).join(" ")
    $posts.insertAdjacentHTML("afterbegin", html)

    $loader.classList.add('hide')
    
  } else {
    event.target.closest('.custom-modal-body').style.height = '500px'
  }
}
