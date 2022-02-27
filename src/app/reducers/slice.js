import {
  getNote, getNotes, getCategories,
} from '../../api';
import createSlice from '../../redux/create-slice';
import mark from '../../utilities/mark';

/* eslint-disable no-param-reassign */
const slice = createSlice({
  name: 'notes',
  initialState: {
    notes: {
      items: null,
      error: null,
      loading: false,
    },
    categories: {
      items: null,
      error: null,
      loading: false,
    },
    note: {
      item: null,
      error: null,
      loading: false,
    },
  },
  reducers: {
    setNotes: (state, { payload }) => {
      state.notes = { ...state.notes, ...payload };
    },
    setCategories: (state, { payload }) => {
      state.categories = { ...state.categories, ...payload };
    },
    setNote: (state, { payload }) => {
      state.note = { ...state.note, ...payload };
    },
  },
});
/* eslint-enable no-param-reassign */

export const {
  setNotes,
  setNote,
  setCategories,
} = slice.actions;

export const selectNotes = (state) => state.notes.all;
export const selectNote = (state) => state.notes.note;
export const selectCategories = (state) => state.notes.categories;

export const loadNotesAsync = () => (dispatch, getState) => {
  if (getState().notes.notes.loading) return;
  dispatch(setNotes({ loading: true }));
  getNotes()
    .then((notes) => {
      dispatch(setNotes({ items: notes, error: null, loading: false }));
    })
    .catch((err) => {
      dispatch(setNotes({ error: err.message, loading: false }));
    });
};

export const loadCategoriesAsync = () => (dispatch, getState) => {
  if (getState().notes.categories.loading) return;
  dispatch(setNotes({ loading: true }));
  getCategories()
    .then((categories) => {
      dispatch(setCategories({ items: categories, error: null, loading: false }));
    })
    .catch((err) => {
      dispatch(setCategories({ error: err.message, loading: false }));
    });
};

export const fetchContentAsync = (note) => (dispatch) => {
  if (note.content) {
    dispatch(setNote({ item: note }));
    return;
  }
  dispatch(setNote({ loading: true }));
  getNote(note.id)
    .then((newNote) => {
      // eslint-disable-next-line no-param-reassign
      note.content = mark(newNote.content);
      dispatch(setNote({ item: note, loading: false, error: null }));
    })
    .catch((err) => dispatch(setNote({ loading: false, error: err.message })));
};

export default slice.reducer;
