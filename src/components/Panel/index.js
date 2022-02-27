import NoteViewer from '../NoteViewer';
import css from './style.module.css';

const Panel = () => (
  <div className={css.container}>
    <NoteViewer />
  </div>
);

export default Panel;
