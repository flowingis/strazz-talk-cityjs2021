import getTodos from './getTodos.js'
import applyToDOM from './applyToDOM.js'
import componentRegistry from './registry.js'

import todosComponent from './components/todos.js'
import counterComponents from './components/counter.js'
import filtersComponents from './components/filters.js'

const APP_SELECTOR = '.todoapp'

const state = {
  todos: getTodos(),
  currentFilter: 'All'
}

componentRegistry.add('todos', todosComponent)
componentRegistry.add('counter', counterComponents)
componentRegistry.add('filters', filtersComponents)

const render = () => {
  window.requestAnimationFrame(() => {
    const main = document.querySelector(APP_SELECTOR)
    const newMain = componentRegistry.render(main, state)
    applyToDOM(document.body, main, newMain)
  })
}

render()

window.setInterval(() => {
  state.todos = getTodos()
  render()
}, 5000)
