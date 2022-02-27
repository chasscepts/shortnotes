import { useEffect } from 'react';
import { useSelector } from '../../redux';
import { selectNote } from '../../app/reducers/slice';
import css from './style.module.css';
import ErrorPage from '../ErrorPage';
import LoadingSpinner from '../LoadingSpinner';
import 'highlight.js/styles/github.css';
import './highlight.css';

const NoteViewer = () => {
  const { item: note, loading, error } = useSelector(selectNote);

  useEffect(() => {
    document.querySelectorAll('.copy-btn').forEach((btn) => {
      const codeIndex = +(btn.getAttribute('data-code'));
      btn.addEventListener('click', () => {
        navigator.clipboard.writeText(note.codes[codeIndex])
          .then(() => {
            // eslint-disable-next-line no-param-reassign
            btn.innerHTML = 'Copied!';
            setTimeout(() => {
              // eslint-disable-next-line no-param-reassign
              btn.innerHTML = 'Copy';
            }, 2000);
          })
          // eslint-disable-next-line no-console
          .catch((err) => console.log(err));
      });
    });
  }, [note]);

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
      {/* eslint-disable-next-line react/no-danger */}
      <div className={css.viewer} dangerouslySetInnerHTML={{ __html: note.content }} />
    </section>
  );
};

export default NoteViewer;
