import React from 'react';
import { Chart } from 'react-google-charts';
import { t } from 'i18next';

import cloud1 from './assets/cloud-1.svg';
import cloud2 from './assets/cloud-2.svg';
import cloud3 from './assets/cloud-3.svg';
import cloud4 from './assets/cloud-4.svg';
import cloud5 from './assets/cloud-5.svg';
import styles from './styles.module.scss';

import LocalStorageService from '~services/LocalStorageService';

function Profile() {
  const userData = LocalStorageService.getSessionToken();

  return (
    <div className={`column center ${styles.container}`}>
      <h3 className={`title-small full-width text-center m-bottom-6 ${styles.title}`}>{userData.username}</h3>
      <p className="base-text m-bottom-4">{t('Profile:textExplanation')}</p>
      <Chart
        className={styles.chart}
        chartType="PieChart"
        data={[
          ['Tipo', 'Tiempo'],
          // eslint-disable-next-line no-magic-numbers
          ['Buena', 6],
          // eslint-disable-next-line no-magic-numbers
          ['Moderada', 18],
          // eslint-disable-next-line no-magic-numbers
          ['Dañina a grupos sensibles', 8],
          // eslint-disable-next-line no-magic-numbers
          ['Dañina a la salud', 5],
          // eslint-disable-next-line no-magic-numbers
          ['Muy dañina a la salud', 3]
        ]}
        options={{
          pieHole: 0.4,
          colors: ['#87d1e5', '#76a2e9', '#6771ed', '#a774b7', '#fe7a6b'],
          legend: 'none'
        }}
        rootProps={{ 'data-testid': '3' }}
      />
      <div className="row wrap">
        <div className="column center m-right-2">
          <img src={cloud1} alt="" className={`m-bottom-2 ${styles.cloud}`} />
          <span className="label-text">6 hrs</span>
        </div>
        <div className="column center m-right-2">
          <img src={cloud2} alt="" className={`m-bottom-2 ${styles.cloud}`} />
          <span className="label-text">18 hrs</span>
        </div>
        <div className="column center m-right-2">
          <img src={cloud3} alt="" className={`m-bottom-2 ${styles.cloud}`} />
          <span className="label-text">8 hrs</span>
        </div>
        <div className="column center m-right-2">
          <img src={cloud4} alt="" className={`m-bottom-2 ${styles.cloud}`} />
          <span className="label-text">5 hrs</span>
        </div>
        <div className="column center m-right-2">
          <img src={cloud5} alt="" className={`m-bottom-2 ${styles.cloud}`} />
          <span className="label-text">3 hrs</span>
        </div>
      </div>
    </div>
  );
}

export default Profile;
