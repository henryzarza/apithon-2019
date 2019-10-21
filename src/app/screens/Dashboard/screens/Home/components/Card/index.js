import React from 'react';
import { t } from 'i18next';

import mockRoute from '../../assets/mock-route.png';

import { ROUTES } from './constants';
import styles from './styles.module.scss';

function Card() {
  return (
    <>
      <span className={`subtitle-bold m-bottom-4 ${styles.subtile}`}>{t('Home:routes')}</span>
      <div className={`row ${styles.container}`}>
        {ROUTES.map(data => (
          <div key={data.id} className={`column m-right-4 ${styles.card}`}>
            <img className={`full-width ${styles.map}`} src={mockRoute} alt="" />
            <div className={`column ${styles.cardContent}`}>
              <span className="base-text bold m-bottom-1">{data.date}</span>
              <span className="base-text tiny-bold">{data.hour}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Card;
