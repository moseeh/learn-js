import { gossips as initialGossips } from './gossip-grid.data.js'

export function grid() {
  let gossips = [...initialGossips]
  const body = document.body

  // Create ranges
  const ranges = createRanges()
  body.appendChild(ranges)

  // Create form for new gossips
  const form = createGossipForm()
  body.appendChild(form)

  // Display initial gossips
  gossips.forEach(displayGossip)

  function createRanges() {
    const rangesDiv = document.createElement('div')
    rangesDiv.className = 'ranges'

    const rangeInputs = [
      { id: 'width', min: 200, max: 800, value: 250, label: 'Width' },
      { id: 'fontSize', min: 20, max: 40, value: 20, label: 'Font Size' },
      { id: 'background', min: 20, max: 75, value: 50, label: 'Background' }
    ]

    rangeInputs.forEach(input => {
      const range = createRange(input)
      rangesDiv.appendChild(range)
    })

    return rangesDiv
  }

  function createRange({ id, min, max, value, label }) {
    const rangeDiv = document.createElement('div')
    rangeDiv.className = 'range'

    const labelElem = document.createElement('label')
    labelElem.htmlFor = id
    labelElem.textContent = label

    const input = document.createElement('input')
    input.type = 'range'
    input.id = id
    input.min = min
    input.max = max
    input.value = value
    input.className = 'range'

    const span = document.createElement('span')
    span.textContent = value

    rangeDiv.append(labelElem, input, span)

    input.addEventListener('input', () => {
      span.textContent = input.value
      updateStyles()
    })

    return rangeDiv
  }

  function createGossipForm() {
    const gossipForm = document.createElement('form')
    gossipForm.className = 'gossip'

    const textarea = document.createElement('textarea')
    textarea.placeholder = 'Got a gossip to share?'

    const button = document.createElement('button')
    button.textContent = 'Share gossip!'

    gossipForm.append(textarea, button)

    gossipForm.addEventListener('submit', (e) => {
      e.preventDefault()
      if (textarea.value.trim()) {
        displayGossip(textarea.value)
        gossips.unshift(textarea.value)
        textarea.value = ''
      }
    })

    return gossipForm
  }

  function displayGossip(text) {
    const gossip = document.createElement('div')
    gossip.className = 'gossip fade-in'
    gossip.textContent = text
    body.insertBefore(gossip, form.nextSibling)  // Insert after the form
  }
  
  function updateStyles() {
    const width = document.getElementById('width').value
    const fontSize = document.getElementById('fontSize').value
    const background = document.getElementById('background').value

    document.querySelectorAll('.gossip').forEach(gossip => {
      gossip.style.width = `${width}px`
      gossip.style.fontSize = `${fontSize}px`
      gossip.style.background = `hsl(280, 50%, ${background}%)`
    })
  }
}