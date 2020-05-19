import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Row, Col } from 'antd';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import useStyles from '@/utils/makestyle';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import moment from 'moment';
import 'moment/locale/zh-cn';
import MomentUtils from '@date-io/moment';
moment.locale('zh-cn');
//初始化表格
let InitForm = ({ fields, submitData, defaultCol, handleChange }: any) => {
  let Dom = [];
  for (let i in fields) {
    Dom.push(fields[i]);
  }
  const {
    handleSubmit,
    register,
    reset,
    control,
    errors,
    setValue,
    getValues,
  } = useForm();
  defaultCol = defaultCol
    ? defaultCol
    : { xs: 24, sm: 24, md: 12, lg: 12, xl: 12, xxl: 12 };

  useEffect(() => {}, []);
  console.log(errors);

  return (
    <div style={{ width: '100%' }}>
      <form
        style={{ width: '100%' }}
        onSubmit={handleSubmit(submitData)}
        className="form"
      >
        <Row>
          {Dom &&
            Dom.map((item, key) => {
              if (
                item.type == 'input' ||
                item.type == 'number' ||
                item.type == 'multiline'
              ) {
                let textfieldprops = {
                    style: { width: '100%' },
                    className: useStyles().root,
                    onChange: (e: any) => {
                      handleChange(item.keys, e.target.value);
                    },
                    label: item.required ? (
                      <span>
                        <i style={{ color: 'red', marginRight: 8 }}>*</i>
                        {item.title}
                      </span>
                    ) : (
                      item.title
                    ),
                    name: item.keys, //form input key
                    value: item.value,
                    type: item.type,
                    multiline: item.type == 'multiline',
                    rowsMax: item.rowsMax,
                    inputRef: register({ required: item.required }),
                    helperText: errors[item.keys] ? (
                      <span
                        style={{ color: '#f50' }}
                      >{`请完善${item.title}`}</span>
                    ) : (
                      <span style={{ opacity: 0 }}>11</span>
                    ),
                  },
                  colprops = item.col ? item.col : defaultCol;
                return (
                  <Col
                    key={key}
                    {...colprops}
                    style={{ padding: '0 12px', margin: '12px 0 0 0' }}
                  >
                    <TextField {...textfieldprops}></TextField>
                  </Col>
                );
              } else if (item.type == 'select') {
                let selectprops = {
                    name: item.keys,
                    value: item.value,
                    style: { width: '100%' },
                    labelId: item.keys,
                    multiple: item.multiple,
                    inputProps: {
                      name: item.keys,
                      inputRef: register({ required: item.required }),
                      onChange: (e: any) => {
                        handleChange(item.keys, e.target.value);
                      },
                    },
                  },
                  colprops = item.col ? item.col : defaultCol;
                return (
                  <Col
                    key={key}
                    {...colprops}
                    style={{ padding: '0 12px', margin: '12px 0' }}
                  >
                    <FormControl style={{ width: '100%' }}>
                      <InputLabel id={item.keys}>
                        {item.required ? (
                          <span>
                            <i style={{ color: 'red', marginRight: 8 }}>*</i>
                            {item.title}
                          </span>
                        ) : (
                          item.title
                        )}
                      </InputLabel>
                      <Select {...selectprops}>
                        {item.options &&
                          item.options.map((item: any, i: number) => {
                            return (
                              <MenuItem key={i} value={item.dicKey}>
                                {item.dicName}
                              </MenuItem>
                            );
                          })}
                      </Select>
                      {(!item.value && item.second) ||
                      (item.value.length == 0 && item.second) ? (
                        <span
                          style={{ color: '#f50', fontSize: 12 }}
                        >{`请完善${item.title}`}</span>
                      ) : (
                        <span style={{ opacity: 0 }}>11</span>
                      )}
                    </FormControl>
                  </Col>
                );
              } else if (item.type == 'datepicker') {
                let datepickerprops = {
                    fullwidth: true,
                    name: item.keys, //form input key
                    onChange: (e: any) => {
                      handleChange(item.keys, e.target.value);
                    },
                    label: item.required ? (
                      <span>
                        <i style={{ color: 'red', marginRight: 8 }}>*</i>
                        {item.title}
                      </span>
                    ) : (
                      item.title
                    ),
                    format: 'YYYY-MM-DD',
                    disableToolbar: true,
                    value: item.value,
                    inputRef: register({ required: item.required }),
                    helperText: errors[item.keys] ? (
                      <span
                        style={{ color: '#f50' }}
                      >{`请完善${item.title}`}</span>
                    ) : (
                      <span style={{ opacity: 0 }}>11</span>
                    ),
                  },
                  colprops = item.col ? item.col : defaultCol;
                return (
                  <Col
                    key={key}
                    {...colprops}
                    style={{ padding: '0 12px', margin: '12px 0 0 0' }}
                  >
                    <MuiPickersUtilsProvider
                      libInstance={moment}
                      utils={MomentUtils}
                    >
                      <KeyboardDatePicker
                        {...datepickerprops}
                      ></KeyboardDatePicker>
                    </MuiPickersUtilsProvider>
                  </Col>
                );
              }
            })}

          <Col span={24} style={{ padding: 12 }}>
            <Button
              style={{ width: '100%', marginTop: 12 }}
              type="submit"
              variant="contained"
              color="primary"
              disableElevation
            >
              提交
            </Button>
          </Col>
        </Row>
      </form>
    </div>
  );
};
export default InitForm;
