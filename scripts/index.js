import store from './store.js';
import api from './api.js';
import render from './render.js'



function handleAdd() {
  $('main').on('click', '#addNew', e => {
    store.adding = true;
    render();

  });


}

function handleExpand() {
  $('main').on('click', '#expand', e => {
    store.bookmarks[0].expanded = true;
    render();

  });


}

function handleSubmit() {
  $('main').on('submit', 'form', e => {
    e.preventDefault();
    store.adding = false;
    const{title, rating, url, description} = e.target
    const newBookmark = {
      title: title.value,
      rating: rating.value,
      url: url.value,
      description: description.value
    }
    api.createNewBookmark(newBookmark)
    .then(bookmark => {
    store.bookmarks.push(bookmark)
    
      render();
    })
   

  });


}

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