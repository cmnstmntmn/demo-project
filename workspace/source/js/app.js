import m from 'mithril'

window.m = m;

const app = {
  view: (ctrl) => {
    console.log(ctrl)

    return m('h1', {
      style: {
        fontFamily: 'Tahoma',
        backgroundColor: 'black',
        color: 'white',
        margin: 0,
        padding: '10px'
      }
    }, 'Hello there!')
  }
}

window.onload = () => {
  m.mount(document.body, app)
}