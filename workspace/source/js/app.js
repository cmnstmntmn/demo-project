import m from 'mithril'

window.m = m

const app = {
  view: () => {
    return m('h1', {
      style: {
        backgroundColor: 'black',
        color: 'white',
        padding: '20px'
      }
    }, 'Hello there')
  }
}

window.onload = () => {
  m.mount(document.body, app)
}
