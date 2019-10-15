import h from 'snabbdom/h';

const link = ({ href }, children) => h('a', {
    href,
    on: {
      click: (e) => {
        e.preventDefault();
        window.location.pathname = href;
      },
    },
  }, children);

  export default link;