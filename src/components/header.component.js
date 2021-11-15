import { Component } from '../core/component'

export class HeaderComponent extends Component {
  constructor(id) {
    super(id)
  }

  init() {
    if (localStorage.getItem('started')) this.hide()
    const btn = this.$el.querySelector('.js-header-start')
    btn.addEventListener('click', buttonHandler.bind(this))
  }
}

function buttonHandler() {
  localStorage.setItem('started', JSON.stringify(true))
  this.hide()
}