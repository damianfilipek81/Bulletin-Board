import React from 'react';
import styles from './NoPermission.module.scss';
import {settings} from '../../../settings';

const Component = () => (
  <div className={styles.root}>
    <img src={settings.noPermission} alt=''></img>
  </div>
);

export {
  Component as NoPermission,
  Component as NoPermissionComponent,
};
