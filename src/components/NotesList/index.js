import propTypes from 'prop-types';
import { useEffect, useState } from 'react';
import {
  fetchContentAsync,
  loadCategoriesAsync,
  loadNotesAsync,
  selectCategories,
  selectNotes,
} from '../../app/reducers/slice';
import { useDispatch, useSelector } from '../../redux';
import ErrorPage from '../ErrorPage';
import LoadingSpinner from '../LoadingSpinner';
import css from './style.module.css';

const Note = ({ note, selectNote }) => {
  const handleClick = () => selectNote(note);

  return (
    <button type="button" className={css.note} onClick={handleClick}>
      {note.title}
    </button>
  );
};

Note.propTypes = {
  note: propTypes.shape({
    id: propTypes.number,
    title: propTypes.string,
    content: propTypes.string,
    author: propTypes.string,
    category: propTypes.shape({
      id: propTypes.number,
      name: propTypes.string,
    }),
  }).isRequired,
  selectNote: propTypes.func.isRequired,
};

const NotesList = () => {
  const [selected, setSelected] = useState(0);

  const {
    items: categories,
    error: categoriesError,
  } = useSelector(selectCategories);

  const {
    items: notes,
    error: notesError,
  } = useSelector(selectNotes);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCategoriesAsync());
    dispatch(loadNotesAsync());
  }, []);

  let error = categoriesError || '';
  if (notesError) {
    error += `\n\n${notesError}`;
  }

  if (error) {
    return <ErrorPage error={error} />;
  }

  if (notes && categories) {
    const filtered = selected ? notes.filter((n) => n.category.id === selected) : notes;
    const handleSelection = ({ target: { value } }) => setSelected(+value);
    const selectNote = (note) => dispatch(fetchContentAsync(note));

    return (
      <section className={css.container}>
        <header className={css.header}>
          <div className="select">
            <select value={selected} onChange={handleSelection}>
              <option value={0}>All Categories</option>
              {categories.map((cat) => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
            </select>
          </div>
        </header>
        <ul className={css.list}>
          {filtered.map((n) => (
            <li key={n.id}><Note note={n} selectNote={selectNote} /></li>
          ))}
        </ul>
      </section>
    );
  }

  return <div className="container"><LoadingSpinner /></div>;
};

export default NotesList;
