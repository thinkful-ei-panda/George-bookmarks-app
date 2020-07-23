const bookmarks = [];
const adding = false;
const error = null;
const filter = 0;
const expandedIds = []; 

export default {
  bookmarks,
  expandedIds,
  adding,
  error,
  filter,
  checkIfbookmarkExists: (bookmarks, id) => bookmarks.includes(id)
}
