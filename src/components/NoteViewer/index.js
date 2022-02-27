import { useSelector } from '../../redux';
import { selectNote } from '../../app/reducers/slice';
import css from './style.module.css';
import ErrorPage from '../ErrorPage';
import LoadingSpinner from '../LoadingSpinner';
import 'highlight.js/styles/github.css';
import './highlight.css';

const NoteViewer = () => {
  const { item: note, loading, error } = useSelector(selectNote);

  if (error) {
    return <ErrorPage error={error} />;
  }

  if (loading) {
    return <LoadingSpinner message="Loading Note ..." />;
  }

  if (!note) {
    return (
      <section className={css.noItem}>
        <p>Nothing To Display</p>
      </section>
    );
  }

  return (
    <section className={css.container}>
      <header className={css.header}>
        <h2>{note.title}</h2>
      </header>
      <div className={css.viewer}>{note.content}</div>
    </section>
  );
};

export default NoteViewer;
