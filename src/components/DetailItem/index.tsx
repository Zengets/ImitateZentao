import React, { useEffect, useState } from 'react';
import { Tree, Card, Empty, Dropdown } from 'antd';
import styles from './style.less';
let DetailItem = (props: any) => {
  let { title, value, width, titlestyle, contentstyle, hdClick, item } = props;
  let items = item ? item : {};

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems:
          (items.type && items.type == 'innerhtml') ||
          (items.type && items.type == 'start')
            ? 'flex-start'
            : 'center',
      }}
    >
      <div
        style={{
          ...titlestyle,
          width: width ? width : 100,
          minWidth: width,
          fontSize: 13,
        }}
      >
        {title} :
      </div>
      {item && item.tooltip ? (
        <Dropdown
          overlay={
            <div style={{ maxWidth: 616 }}>{item.tooltip && item.tooltip}</div>
          }
        >
          <a>{value}</a>
        </Dropdown>
      ) : items.type && items.type == 'innerhtml' ? (
        <div
          className={styles.inits}
          dangerouslySetInnerHTML={{ __html: item.value }}
        />
      ) : (
        <div style={{ ...contentstyle, flex: 1 }} onClick={hdClick}>
          {value}
        </div>
      )}
    </div>
  );
};

export default DetailItem;
