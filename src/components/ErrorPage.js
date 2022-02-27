import propTypes from 'prop-types';

const styles = {
  outer: {
    width: '100%',
    height: '100%',
    padding: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inner: {
    padding: '50px',
    minWidth: '350px',
    maxWidth: '100%',
    border: '1px solid #eee',
    borderRadius: '5px',
    boxShadow: '2px 0 8px 14px #eee',
    color: 'red',
    fontWeight: 'bold',
    fontSize: '0.9rem',
  },
};

const ErrorPage = ({ error }) => (
  <div style={styles.outer}>
    <div style={styles.inner}>{error}</div>
  </div>
);

ErrorPage.propTypes = {
  error: propTypes.string.isRequired,
};

export default ErrorPage;
