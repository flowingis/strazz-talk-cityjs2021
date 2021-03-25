import applyToDOM from './applyToDOM.js'

let parentNode

const createNode = html => {
  const div = document.createElement('div')
  div.innerHTML = html
  return div.firstElementChild
}

describe('applyToDOM', () => {
  beforeEach(() => {
    parentNode = document.createElement('div')
  })

  test('should add the node to the parent if not real node is not provided', () => {
    const virtualNode = createNode('<h1>Node</h1>')

    applyToDOM(parentNode, undefined, virtualNode)

    expect(parentNode.innerHTML).toBe('<h1>Node</h1>')
  })

  test('should remove the node from the parent if not virtual node is not provided', () => {
    const realNode = createNode('<h1>Node</h1>')
    parentNode.appendChild(realNode)

    applyToDOM(parentNode, realNode, undefined)

    expect(parentNode.childNodes.length).toBe(0)
  })

  test('should replace the content if the virtual node has a different tag name', () => {
    const realNode = createNode('<h1>Node</h1>')
    parentNode.appendChild(realNode)

    const virtualNode = createNode('<h2>Node</h2>')

    applyToDOM(parentNode, realNode, virtualNode)

    expect(parentNode.innerHTML).toBe('<h2>Node</h2>')
  })

  test('should replace the content if the virtual node has a different attribute', () => {
    const realNode = createNode('<h1 class="real">Node</h1>')
    parentNode.appendChild(realNode)

    const virtualNode = createNode('<h1 class="virtual">Node</h1>')

    applyToDOM(parentNode, realNode, virtualNode)

    expect(parentNode.innerHTML).toBe('<h1 class="virtual">Node</h1>')
  })

  test('should replace the content if the virtual node has a different text content', () => {
    const realNode = createNode('<h1 class="real">Node</h1>')
    parentNode.appendChild(realNode)

    const virtualNode = createNode('<h1 class="real">Another Node</h1>')

    applyToDOM(parentNode, realNode, virtualNode)

    expect(parentNode.innerHTML).toBe('<h1 class="real">Another Node</h1>')
  })

  test('should work recursively', () => {
    const realNode = createNode('<ul><li class="real">1</li></ul>')
    parentNode.appendChild(realNode)

    const virtualNode = createNode('<ul><li class="virtual">1</li><li>2</li></ul>')

    applyToDOM(parentNode, realNode, virtualNode)

    expect(parentNode.innerHTML).toBe('<ul><li class="virtual">1</li><li>2</li></ul>')
  })
})
