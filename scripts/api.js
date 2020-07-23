import store from './store.js';

const BASE_URL='https://thinkful-list-api.herokuapp.com/georgeb/bookmarks';

const apiFetch = (...args) => { 
  let error = null;
  return fetch(...args)
    .then(response => {
      if (!response.ok) {
        error = { code: response.status };
      }
      return response.json(); 
    })
    .then(data => {
      if (error) {
        error.message = data.message;
        return Promise.reject(error);
      }
      return data;
    });
};

const deleteBookmark = id => {
  return apiFetch(`${BASE_URL}/${id}`, {
    'method': 'DELETE',
    'headers': {
      'Content-Type': 'application/json'
    }
  });
};

const createNewBookmark = bookmark => { 
  const newBookmark = JSON.stringify(bookmark);
  return apiFetch(BASE_URL, {
    'method': 'POST',
    'headers': {
      'Content-Type': 'application/json'
    },
    'body': newBookmark
  });
};

const getBookmark = () => {
  return apiFetch(BASE_URL, {
    'method': 'GET',
    'headers': {
      'Content-Type': 'application/json'
    }
  });
};

export default {
  BASE_URL,
  deleteBookmark,
  createNewBookmark,
  getBookmark
};