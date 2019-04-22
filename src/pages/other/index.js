import router from 'umi/router';
import styles from './other.css';
import React from 'react';

export default  () =>  {
  return (
    <div className={styles.normal}>
      <h1>This is Page Other</h1>
      <button onClick={() => { router.goBack(); }}>go back</button>
    </div>
  );
}
