import store from './store.js';
import api from './api.js';

let header = '<h1>George Brown Bookmark App</h1>';

/* Maps through API bookmark List */
const bookmarkItem = () => {
  const rating = parseInt(store.filter);
  let bookmarks = store.bookmarks;
  console.log(rating)
  if (rating > 0) {
    bookmarks = store.bookmarks.filter(function (currentBookmark) {
      if (currentBookmark.rating >= rating) {
        return currentBookmark;
      }
    });
  }

  if (bookmarks.length === 0) {
    return `<div class='noResults'>No results found</div>`
  }
  return bookmarks.map(bookmark => {
    const expandedView = `
    <div class="expandedInfo">
      <p>Description: ${bookmark.desc}</p>
      <p>URL: <a href="${bookmark.url}" target="${bookmark.url}">${bookmark.url}</a></p>
  
    </div>`;

    return (`<li>
      <p>Title: ${bookmark.title}</p>
      <p>Rating: ${bookmark.rating}</p>
      ${store.checkIfbookmarkExists(store.expandedIds, bookmark.id) ? expandedView : ''}

      <div class='detailsAndDelete'>
      <button id='expand-${bookmark.id}'  class='expand-btn'>Details</button>
      <button id='delete-${bookmark.id}' class='delete-btn'>Delete</button>
      </div>
    </li>`);
  });
};

const addNewBookmarkButton = '<button id="addNew">Add Bookmark</button>';

const bookmarkForm = `
<form class="addBookmarkForm"> 
  <fieldset>
    <legend>Add Bookmark</legend>

      <label>Title
      <input type='text' placeholder='Title' class='title' id="title" name="title" required/>
      </label>


      <label>Rating
      <input type='text' placeholder='Rating' class='rating' id="rating" name="rating" required/>
      </label>


      <label>URL
      <input type='url' placeholder='URL' class='url' id="url" name="url" required/>
      </label>


      <label>Description
      <input type='text' placeholder='Description' class='description' id="description" name="description" required/>
      </label>
      
      <div class="formButtons">
      <button type="submit" class="submit-btn">Submit</button>
      <button type="button" class='cancel-btn'>Cancel</button>
      </div>
  </fieldset>
</form>
`;

let bookmarkFilterSelect = `
  <select class="bookmarkFilter">
    <option value="0" disabled>Filter By</option>
    <option value="1">1 +</option>
    <option value="2">2 +</option>
    <option value="3">3 +</option>
    <option value="4">4 +</option>
    <option value="5">5</option>
  </select>
  `;

// const renderBookmarksDetailed = $('main').html(`
//   ${header}

// `)

const renderBookmarkHome = () => {
  $('main').html(`
    <div class="mainContainer">
      ${header}

      <div class="addBookmarkContainer">
        ${!store.adding ? addNewBookmarkButton : bookmarkForm}
        ${bookmarkFilterSelect}
      </div>
      <div class='error-msg'></div>
      <ul class='bookmarks-list'></ul>
    </div>`
  );
  $('.bookmarks-list').html(bookmarkItem());
  $('.bookmarkFilter').val(store.filter);
};

$(document.body).on('click', '#addNew', function () {
  store.adding = true;
  renderBookmarkHome();
});

$(document.body).on('submit', function (e) {
  e.preventDefault();
  const bookmarkTitle = $('.title').val();
  const bookmarkURL = $('.url').val();
  const bookmarkDesc = $('.description').val();
  const bookmarkRating = $('.rating').val();
  let bookmark = {
    title: `${bookmarkTitle}`,
    url: `${bookmarkURL}`,
    desc: `${bookmarkDesc}`,
    rating: `${bookmarkRating}`
  };
  api.createNewBookmark(bookmark)
    .then((newBookark) => {
      store.bookmarks.push(newBookark);
      store.adding = false;
      renderBookmarkHome();
    })
    .catch((err) => {
      console.log(err)
      $(".error-msg").text(err.message)
    });

});

$(document.body).on('click', '.delete-btn', function (e) {
  const id = this.id.split('-')[1];
  console.log(id, store.bookmarks);
  api.deleteBookmark(id)
    .then((res) => {
      console.log(res)

      api.getBookmark()
        .then(bookmark => {
          console.log(store)
          store.bookmarks = bookmark;
          console.log(store.bookmarks)
          renderBookmarkHome()
        })
    })
  // api.getBookmark()
  // renderBookmarkHome();
});

$(document.body).on('click', '.expand-btn', function () {
  const id = this.id.split('-')[1];
  if (!store.checkIfbookmarkExists(store.expandedIds, id)) {
    store.expandedIds.push(id);
    renderBookmarkHome();
  } else if (store.checkIfbookmarkExists(store.expandedIds, id)) {
    const collapseIndex = store.expandedIds.findIndex(expId => expId === id);
    store.expandedIds.splice(collapseIndex, 1);
    renderBookmarkHome();
  }
});

$(document.body).on('change', '.bookmarkFilter', function (e) {
  store.filter = e.target.value;
  renderBookmarkHome();
})

$(document.body).on('click', '.cancel-btn', function (e) {
  store.adding = false;
  renderBookmarkHome();
})

// $(document.body).on('click', '.collapse', function () {
//   const id = this.id.split('-')[1];
//   console.log(id, store)
//   if (store.checkIfbookmarkExists(store.expandedIds, id)) {
//     const collapseIndex = store.expandedIds.findIndex(expId => expId === id);
//     store.expandedIds.splice(collapseIndex, 1);
//     renderBookmarkHome();
//   }
// });


export default {
  renderBookmarkHome
};