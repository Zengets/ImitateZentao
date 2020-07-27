import React, { useEffect, useState } from 'react';
import { history } from 'umi';

//dispach数据
export default function setNewState(
  dispatch: any,
  path: any,
  values: any,
  fn: any,
) {
  dispatch({
    type: path,
    payload: values,
  }).then((res: any) => {
    if (res.code == '0006') {
      history.push('/login');
    } else if (res.code == '0000') {
      fn ? fn(res) : null;
    }
  });
}
