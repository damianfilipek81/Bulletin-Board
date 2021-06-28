import React from 'react';
import PropTypes from 'prop-types';

import styles from './SearchResults.module.scss';
import Avatar from '@material-ui/core/Avatar';

const Component = ({ results }) => (
  <div className={styles.root}>
    {results.map(result =>
      <a key={result._id} href={`/post/${result._id}`} className={styles.wrapper}>
        <div className={styles.imageWrapper}>
          {result.image !== undefined && <img src={`data:image/jpeg;base64,${result.image.data}`} alt=''></img>}
        </div>
        <div className={styles.infoWrapper}>
          <div className={styles.leftInfo}>
            <h4>{result.title}</h4>
            <h4>{result.price} $</h4>
          </div>
          <div className={styles.rightInfo}>
            <h4>{result.author}</h4>
            <Avatar>{result.author[0]}</Avatar>
          </div>
        </div>
      </a>
    )}
  </div>
);

Component.propTypes = {
  results: PropTypes.array,
};

export {
  Component as SearchResults,
  Component as SearchResultsComponent,
};
