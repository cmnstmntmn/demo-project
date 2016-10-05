import m from 'mithril'
import modal from 'mithril-modal'

window.m = m;

const app = {
    view: function(ctrl) {
        return [
            m("button[type=button]", {
                onclick: function() {
                    modal.show();
                }
            }, "Click to show modal"),
            m.component(modal, {
                animation: '3dSlit',
                style: {
                    dialog: {
                        backgroundColor: '#aaf3ee',
                        width: '700px'
                    }
                },
                close: '✘',
            }, m.component(inner))
        ]
    }
}

const inner = {
    view: function() {
      return m('div', m("h1", "Hello world"))
    }
}

window.onload = () => {
  m.mount(document.body, app)
}