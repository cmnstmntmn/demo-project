import m from 'mithril'
import modal from 'mithril-modal'

window.m = m;

const inner = {
    view: function() {
      return m('div', m("h1", "Hello worlds"))
    }
}

const app = {
    view: function(ctrl) {
        return [
            m("button[type=button]", {
                onclick: function() {
                    modal.show();
                }
            }, "Click to show modal"),
            m.component(modal, {
                animation: 'blur',
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

window.onload = () => {
  document.getElementById('app') ? m.mount(document.getElementById('app'), app) : null
}