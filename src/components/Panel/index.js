import NotesList from '../NotesList';
import NoteViewer from '../NoteViewer';
import css from './style.module.css';

const Panel = () => (
  <div className={css.container}>
    <div className={css.left}><NotesList /></div>
    <div className={css.right}><NoteViewer /></div>
  </div>
);

export default Panel;
