import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Row, Col, Tree, Upload, message, Card } from 'antd';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import MenuItem from '@material-ui/core/MenuItem';
import { LocalizationProvider, DatePicker } from '@material-ui/pickers';
import { LoadingOutlined } from '@ant-design/icons';
import moment from 'moment';
import 'moment/locale/zh-cn';
import MomentAdapter from '@material-ui/pickers/adapter/moment';
import VerticalAlignTopIcon from '@material-ui/icons/VerticalAlignTop';
import mockfile from '@/utils/mockfile';

moment.locale('zh-cn');
//初始化表格
let InitForm = ({
  fields,
  submitData,
  defaultCol,
  handleChange,
  submitting,
}: any) => {
  let [Dom, cDom] = useState([]);

  useEffect(() => {
    let Doms: any = [];
    for (let i in fields) {
      Doms.push(fields[i]);
    }
    cDom(Doms);
  }, [fields]);

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

  return (
    <div style={{ width: '100%' }}>
      <form
        style={{ width: '100%' }}
        onSubmit={handleSubmit(submitData)}
        className="form"
      >
        <Row>
          {Dom && Dom.length > 0
            ? Dom.map((item: any, key: any) => {
                if (
                  item.type == 'input' ||
                  item.type == 'number' ||
                  item.type == 'multiline' ||
                  item.type == 'password'
                ) {
                  let textfieldprops = {
                      style: { width: '100%' },
                      disabled: item.disabled,
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
                      rows: item.rows,
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
                      disabled: item.disabled,
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
                                <i style={{ color: 'red', marginRight: 8 }}>
                                  *
                                </i>
                                {item.title}
                              </span>
                            ) : (
                              item.title
                            )}
                          </div>
                        </InputLabel>
                        <Select {...selectprops}>
                          {item.options && item.options.length > 0
                            ? item.options.map((item: any, i: number) => {
                                return (
                                  <MenuItem key={i} value={item.dicKey}>
                                    {item.dicName}
                                  </MenuItem>
                                );
                              })
                            : null}
                        </Select>
                      </FormControl>

                      {!item.value && item.second ? (
                        <span
                          style={{
                            color: '#f50',
                            fontSize: 12,
                            paddingLeft: 14,
                          }}
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
                      disabled: item.disabled,
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
                                <i style={{ color: 'red', marginRight: 8 }}>
                                  *
                                </i>
                                {item.title}
                              </span>
                            ) : (
                              item.title
                            )}
                          </div>
                        </InputLabel>
                        <Select {...selectprops}>
                          {loops(item.options) && item.options.length > 0
                            ? loops(item.options).map(
                                (item: any, i: number) => {
                                  return (
                                    <MenuItem
                                      style={{ display: 'none' }}
                                      key={i}
                                      value={item.key}
                                    >
                                      {item.title}
                                    </MenuItem>
                                  );
                                },
                              )
                            : null}
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

                      {!item.value && item.second ? (
                        <span
                          style={{
                            color: '#f50',
                            fontSize: 12,
                            paddingLeft: 14,
                          }}
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
                        handleChange(item.keys, moment(date).valueOf());
                      },
                      disabled: item.disabled,
                      label: item.required ? (
                        <span>
                          <i style={{ color: 'red', marginRight: 8 }}>*</i>
                          {item.title}
                        </span>
                      ) : (
                        item.title
                      ),
                      format: 'yyyy/MM/dd',
                      disableToolbar: true,
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
                        <DatePicker
                          {...datepickerprops}
                          value={item.value} //bugs
                        ></DatePicker>
                      </LocalizationProvider>
                    </Col>
                  );
                } else if (item.type == 'upload') {
                  const props = {
                      action: '/zentao/common/uploadFile',
                      listType: 'picture',
                      multiple: true,
                      showUploadList: false,
                      onChange(info: {
                        file: { name?: any; status?: any; response?: any };
                        fileList: any;
                      }) {
                        const { status, response } = info.file;
                        if (status == 'done') {
                          let newlist = response.data.dataList.map(
                            (item: any, i: number) => {
                              return {
                                attachmentName: item.name,
                                attachUrl: item.url,
                                id:
                                  info.fileList.length > 1
                                    ? info.fileList[i].uid
                                    : info.fileList[info.fileList.length - 1]
                                        .uid,
                              };
                            },
                          );
                          let res = [...item.value, ...mockfile(newlist)];
                          res = res.map((item: any, i: number) => {
                            return {
                              ...item,
                              uid:
                                info.fileList.length > 1
                                  ? info.fileList[i].uid
                                  : info.fileList[info.fileList.length - 1].uid,
                            };
                          });

                          handleChange(item.keys, res);
                        } else if (status == 'error') {
                          message.error(`${info.file.name} 上传失败`);
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
                          disableElevation
                        >
                          <VerticalAlignTopIcon
                            style={{ fontSize: 16 }}
                          ></VerticalAlignTopIcon>
                          上传{item.title}
                        </Button>
                      </Upload>
                      {item.value
                        ? item.value.map((items: any, i: any) => (
                            <div
                              style={{
                                width: '100%',
                                padding: 12,
                                borderRadius: 4,
                                border: '#f0f0f0 solid 1px',
                                marginTop: 12,
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                              }}
                            >
                              <a
                                key={i}
                                style={{ display: 'inline-block' }}
                                href={items.url}
                                target="_blank"
                              >
                                {items.name}
                              </a>
                              <IconButton
                                aria-label="delete"
                                onClick={() => {
                                  let leftfiles = item.value.filter(
                                    (it: any) => {
                                      return it.uid != items.uid;
                                    },
                                  );
                                  handleChange(item.keys, leftfiles);
                                }}
                              >
                                <DeleteIcon color="error" />
                              </IconButton>
                            </div>
                          ))
                        : null}
                    </Col>
                  );
                }
              })
            : null}

          <Col span={24} style={{ padding: 12 }}>
            <Button
              style={{ width: '100%', marginTop: 12 }}
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              disableElevation
              disabled={submitting}
            >
              {submitting ? <LoadingOutlined /> : null}

              <span style={{ marginLeft: 12, fontSize: 16 }}>提交</span>
            </Button>
          </Col>
        </Row>
      </form>
    </div>
  );
};
export default InitForm;
