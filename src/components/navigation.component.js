import { Component } from "../core/component";

export class NavigationComponent extends Component {
  constructor(id) {
    super(id)

    this.tabs = []
  }

  init() {
    this.$el.addEventListener('click', tabClickHander.bind(this))
  }

  registerTabs(tabs) {
    this.tabs = tabs
  }
}

function tabClickHander(event) {
  event.preventDefault()

  if (event.target.classList.contains('tab')) {
    //При клике убираем со всех элементов active и добавляем active только тому табу, на который кликнули
    Array.from(this.$el.querySelectorAll('.tab')).forEach(tab => {
      tab.classList.remove('active')
    })
    event.target.classList.add('active') 

    //записываем в константу объект активного таба из массива tabs
    const activetab = this.tabs.find(tab => tab.name === event.target.dataset.name)
    
    //При клике скрываем компонент таба и показываем только компонент на активном табе
    this.tabs.forEach(tab => tab.component.hide())
    activetab.component.show() 
  }
}