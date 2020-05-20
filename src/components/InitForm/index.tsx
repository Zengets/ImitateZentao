import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Row, Col, Tree, Upload, message } from 'antd';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import useStyles from '@/utils/makestyle';
import { LocalizationProvider, DesktopDatePicker } from '@material-ui/pickers';
import moment from 'moment';
import 'moment/locale/zh-cn';
import MomentAdapter from '@material-ui/pickers/adapter/moment';
import VerticalAlignTopIcon from '@material-ui/icons/VerticalAlignTop';
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

  let loops = (tree: any) => {
    let arr: any[] = [];
    const expanded = (datas: any[]) => {
      if (datas && datas.length > 0) {
        datas.forEach((e: { children: any }) => {
          arr.push(e);
          expanded(e.children);
        });
      }
    };
    expanded(tree);
    return arr;
  };

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
                    <TextField
                      variant="outlined"
                      {...textfieldprops}
                    ></TextField>
                  </Col>
                );
              } else if (item.type == 'select') {
                let inputprops = {
                    name: item.keys,
                    ref: register({ required: item.required }),
                  },
                  selectprops = {
                    labelId: 'demo-simple-select-outlined-label',
                    label: item.required ? (
                      <span>
                        <i style={{ color: 'red', marginRight: 8 }}>*</i>
                        {item.title}
                      </span>
                    ) : (
                      item.title
                    ),
                    multiple: item.multiple,
                    value: item.value,
                    onChange: (e: any) => {
                      handleChange(item.keys, e.target.value);
                    },
                  },
                  colprops = item.col ? item.col : defaultCol;
                return (
                  <Col
                    key={key}
                    {...colprops}
                    style={{ padding: '0 12px', margin: '12px 0' }}
                  >
                    <FormControl variant="outlined" style={{ width: '100%' }}>
                      <InputLabel id="demo-simple-select-outlined-label">
                        <div>
                          {item.required ? (
                            <span>
                              <i style={{ color: 'red', marginRight: 8 }}>*</i>
                              {item.title}
                            </span>
                          ) : (
                            item.title
                          )}
                        </div>
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
                    </FormControl>

                    {(!item.value && item.second) ||
                    (item.value.length == 0 && item.second) ? (
                      <span
                        style={{ color: '#f50', fontSize: 12, paddingLeft: 14 }}
                      >{`请完善${item.title}`}</span>
                    ) : (
                      <span style={{ opacity: 0 }}>11</span>
                    )}
                  </Col>
                );
              } else if (item.type == 'treeselect') {
                let inputprops = {
                    name: item.keys,
                    ref: register({ required: item.required }),
                  },
                  selectprops = {
                    labelId: 'demo-simple-select-outlined-label',
                    label: item.required ? (
                      <span>
                        <i style={{ color: 'red', marginRight: 8 }}>*</i>
                        {item.title}
                      </span>
                    ) : (
                      item.title
                    ),
                    multiple: item.multiple,
                    value: item.value,
                    onChange: (e: any) => {
                      handleChange(item.keys, e.target.value);
                    },
                  },
                  colprops = item.col ? item.col : defaultCol;
                console.log(loops(item.options));
                return (
                  <Col
                    key={key}
                    {...colprops}
                    style={{ padding: '0 12px', margin: '12px 0' }}
                  >
                    <FormControl variant="outlined" style={{ width: '100%' }}>
                      <InputLabel id="demo-simple-select-outlined-label">
                        <div>
                          {item.required ? (
                            <span>
                              <i style={{ color: 'red', marginRight: 8 }}>*</i>
                              {item.title}
                            </span>
                          ) : (
                            item.title
                          )}
                        </div>
                      </InputLabel>
                      <Select {...selectprops}>
                        {loops(item.options) &&
                          loops(item.options).map((item: any, i: number) => {
                            return (
                              <MenuItem
                                style={{ display: 'none' }}
                                key={i}
                                value={item.key}
                              >
                                {item.title}
                              </MenuItem>
                            );
                          })}
                        <Tree
                          selectedKeys={item.value}
                          defaultExpandAll={true}
                          onSelect={(selectedKeys, info) => {
                            handleChange(item.keys, selectedKeys);
                          }}
                          size="large"
                          treeData={item.options}
                        />
                      </Select>
                    </FormControl>

                    {(!item.value && item.second) ||
                    (item.value.length == 0 && item.second) ? (
                      <span
                        style={{ color: '#f50', fontSize: 12, paddingLeft: 14 }}
                      >{`请完善${item.title}`}</span>
                    ) : (
                      <span style={{ opacity: 0 }}>11</span>
                    )}
                  </Col>
                );
              } else if (item.type == 'datepicker') {
                let datepickerprops = {
                    mask: '____/__/__',
                    onChange: (date: any) => {
                      handleChange(item.keys, date);
                    },
                    className: useStyles().root,
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
                    renderInput: (props: any) => (
                      <TextField
                        variant="outlined"
                        style={{ width: '100%' }}
                        {...props}
                        name={item.keys}
                        inputRef={register({ required: item.required })}
                        helperText={
                          errors[item.keys] ? (
                            <span
                              style={{ color: '#f50' }}
                            >{`请完善${item.title}`}</span>
                          ) : (
                            <span style={{ opacity: 0 }}>11</span>
                          )
                        }
                      />
                    ),
                  },
                  colprops = item.col ? item.col : defaultCol;
                return (
                  <Col
                    key={key}
                    {...colprops}
                    style={{ padding: '0 12px', margin: '12px 0 0 0' }}
                  >
                    <LocalizationProvider
                      style={{ width: '100%' }}
                      dateLibInstance={moment}
                      dateAdapter={MomentAdapter}
                      locale={'zh-cn'}
                    >
                      <DesktopDatePicker
                        {...datepickerprops}
                      ></DesktopDatePicker>
                    </LocalizationProvider>
                  </Col>
                );
              } else if (item.type == 'upload') {
                const props = {
                    action: '//jsonplaceholder.typicode.com/posts/',
                    listType: 'picture',
                    onChange(info: {
                      file: { name?: any; status?: any };
                      fileList: any;
                    }) {
                      const { status } = info.file;
                      if (status !== 'uploading') {
                        console.log(info.file, info.fileList);
                      }
                      if (status === 'done') {
                        message.success(
                          `${info.file.name} file uploaded successfully.`,
                        );
                      } else if (status === 'error') {
                        message.error(`${info.file.name} file upload failed.`);
                      }
                    },
                  },
                  colprops = item.col ? item.col : defaultCol;
                return (
                  <Col
                    key={key}
                    {...colprops}
                    style={{ padding: '0 12px', margin: '12px 0 0 0' }}
                  >
                    <Upload {...props} style={{ width: '100%' }}>
                      <Button
                        fullWidth={true}
                        variant="contained"
                        color="default"
                        disableElevation
                      >
                        <VerticalAlignTopIcon
                          style={{ fontSize: 16 }}
                        ></VerticalAlignTopIcon>
                        上传{item.title}
                      </Button>
                    </Upload>
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
