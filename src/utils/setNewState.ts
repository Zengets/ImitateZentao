import React, { useEffect, useState } from 'react';

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
    if (res) {
      fn ? fn() : null;
    }
  });
}
