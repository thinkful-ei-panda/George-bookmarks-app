import store from './store.js';
import api from './api.js';
import render from './render.js'

function main() {
  return api.getBookmark()
  .then(bookmark => {
    console.log(store)
    store.bookmarks = bookmark;
    console.log(store.bookmarks)
    render.renderBookmarkHome()
  })
}

$(main);