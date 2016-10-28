import React from 'react';

import styles from './styles.css';

function GeocodeResult(props) {
  const name = props.feature.properties.name
  const label = props.feature.properties.label.substring(name.length)

  return (
    <li className={`${styles['geocode-result']} ${props.selected ? styles['selected'] : ''}`}
      onClick={() => props.onClick(props.index)}>
      <span className={styles.name}>
        {name}
      </span>
      <span className={styles.label}>
        {label}
      </span>
    </li>
  );
}

export default GeocodeResult;
