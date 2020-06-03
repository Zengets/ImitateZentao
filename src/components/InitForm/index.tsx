/**
 * Created by 11485 on 2019/3/8.
 */
import {
  Form,
  Input,
  DatePicker,
  Select,
  Row,
  Col,
  InputNumber,
  Upload,
  message,
  Radio,
  TreeSelect,
} from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import VerticalAlignTopIcon from '@material-ui/icons/VerticalAlignTop';
import Editor from '@/components/Editor';
import Button from '@material-ui/core/Button';
import { LoadingOutlined } from '@ant-design/icons';

const { TreeNode } = TreeSelect;
let { Option } = Select;

let InitForm = ({ fields, onChange, submitting, submitData }: any) => {
  let [Dom, cDom] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    let Doms: any = [];
    for (let i in fields) {
      Doms.push(fields[i]);
    }
    cDom(Doms);
  }, [fields]);

  const getCol = (itemcol: any) => {
    if (itemcol) {
      return itemcol;
    } else {
      return { xs: 24, sm: 24, md: 12, lg: 12, xl: 12, xxl: 12 };
    }
  };

  let loop = (data: any[]) =>
    data.map(item => {
      const title = <span>{item.title}</span>;
      if (item.children) {
        return (
          <TreeNode value={item.key} key={item.key} title={title}>
            {loop(item.children)}
          </TreeNode>
        );
      } else {
        return <TreeNode value={item.key} key={item.key} title={title} />;
      }
    });

  return (
    <Form
      form={form}
      name="global_state"
      layout="vertical"
      fields={Dom}
      onFinish={values => {}}
      onFieldsChange={(changedFields, allFields) => {
        onChange(changedFields[0]);
      }}
    >
      <Row gutter={24}>
        {Dom.map((item: any, i: any) => {
          if (item.type == 'input') {
            return !item.hides ? (
              <Col key={i} {...getCol(item.col)}>
                <Form.Item
                  style={{}}
                  label={item.title}
                  name={item.name[0]}
                  rules={[
                    {
                      required: item.required,
                      message: `请输入${item.title}`,
                    },
                    item.name[0].indexOf('phone') != -1
                      ? {
                          pattern: /^\d{11}$/,
                          message: '手机号格式不正确',
                        }
                      : item.name[0].indexOf('mail') != -1
                      ? {
                          pattern: /^[a-z0-9A-Z]+[- | a-z0-9A-Z . _]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\.)+[a-z]{2,}$/,
                          message: '邮箱格式不正确',
                        }
                      : {},
                  ]}
                >
                  <Input maxLength={100} disabled={item.disabled} />
                </Form.Item>
              </Col>
            ) : null;
          } else if (item.type == 'textarea') {
            return !item.hides ? (
              <Col key={i} {...getCol(item.col)}>
                <Form.Item
                  style={{}}
                  label={item.title}
                  name={item.name[0]}
                  rules={[
                    { required: item.required, message: `请输入${item.title}` },
                  ]}
                >
                  <Input.TextArea
                    maxLength={600}
                    rows={4}
                    disabled={item.disabled}
                  />
                </Form.Item>
              </Col>
            ) : null;
          } else if (item.type == 'select') {
            return !item.hides ? (
              <Col key={i} {...getCol(item.col)}>
                <Form.Item
                  style={{}}
                  label={item.title}
                  name={item.name[0]}
                  rules={[
                    { required: item.required, message: `请输入${item.title}` },
                  ]}
                >
                  <Select
                    allowClear
                    placeholder="请选择"
                    style={{ width: '100%' }}
                    showSearch
                    mode={item.multiple ? 'multiple' : ''}
                    filterOption={(input, option: any) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    disabled={item.disabled}
                  >
                    {item.options
                      ? item.options.map((it: any, n: any) => {
                          return (
                            <Option key={n} value={it.dicKey}>
                              {it.dicName}
                            </Option>
                          );
                        })
                      : null}
                  </Select>
                </Form.Item>
              </Col>
            ) : null;
          } else if (item.type == 'radio') {
            return !item.hides ? (
              <Col key={i} {...getCol(item.col)}>
                <Form.Item
                  style={{}}
                  label={item.title}
                  name={item.name[0]}
                  rules={[
                    { required: item.required, message: `请输入${item.title}` },
                  ]}
                >
                  <Radio.Group
                    options={
                      item.options &&
                      item.options.map((item: any) => {
                        return {
                          label: item.dicName,
                          value: item.dicKey,
                        };
                      })
                    }
                  />
                </Form.Item>
              </Col>
            ) : null;
          } else if (item.type == 'datepicker') {
            return !item.hides ? (
              <Col key={i} {...getCol(item.col)}>
                <Form.Item
                  style={{}}
                  label={item.title}
                  name={item.name[0]}
                  rules={[
                    { required: item.required, message: `请输入${item.title}` },
                  ]}
                >
                  <DatePicker
                    disabledDate={item.disabledDate ? item.disabledDate : null}
                    disabledTime={
                      item.disabledDateTime ? item.disabledDateTime : null
                    }
                    style={{ width: '100%' }}
                    showTime={item.showTime}
                    format={item.format}
                    disabled={item.disabled}
                  />
                </Form.Item>
              </Col>
            ) : null;
          } else if (item.type == 'inputnumber') {
            return !item.hides ? (
              <Col key={i} {...getCol(item.col)}>
                <Form.Item
                  style={{}}
                  label={item.title}
                  name={item.name[0]}
                  rules={[
                    { required: item.required, message: `请输入${item.title}` },
                  ]}
                >
                  <InputNumber
                    style={{ width: '100%' }}
                    disabled={item.disabled}
                    min={item.min}
                    max={item.max}
                  />
                </Form.Item>
              </Col>
            ) : null;
          } else if (item.type == 'upload') {
            const props = {
              action: '/zentao/common/uploadFile',
              listType: 'picture',
              multiple: true,
              fileList: item.value
                ? item.value.fileList
                  ? item.value.fileList
                  : []
                : [],
              onChange(info: {
                file: { name?: any; status?: any; response?: any };
                fileList: any;
              }) {
                const { status } = info.file;
                if (status === 'done') {
                } else if (status === 'error') {
                  message.error(`${info.file.name} 上传失败`);
                }
              },
            };
            return !item.hides ? (
              <Col key={i} {...getCol(item.col)}>
                <Form.Item
                  style={{}}
                  label={item.title}
                  name={item.name[0]}
                  rules={[
                    { required: item.required, message: `请输入${item.title}` },
                  ]}
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
                </Form.Item>
              </Col>
            ) : null;
          } else if (item.type == 'treeselect') {
            return !item.hides ? (
              <Col key={i} {...getCol(item.col)}>
                <Form.Item
                  style={{}}
                  label={item.title}
                  name={item.name[0]}
                  rules={[
                    { required: item.required, message: `请输入${item.title}` },
                  ]}
                >
                  <TreeSelect
                    style={{ width: '100%' }}
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    disabled={item.disabled}
                    allowClear
                    treeDefaultExpandAll
                    placeholder={`请选择...`}
                  >
                    {item.options && loop(item.options)}
                  </TreeSelect>
                </Form.Item>
              </Col>
            ) : null;
          } else if (item.type == 'editor') {
            return !item.hides ? (
              <Col key={i} {...getCol(item.col)}>
                <Form.Item
                  style={{}}
                  label={item.title}
                  name={item.name[0]}
                  rules={[
                    { required: item.required, message: `请输入${item.title}` },
                  ]}
                >
                  <Editor value={item.value}></Editor>
                </Form.Item>
              </Col>
            ) : null;
          }
        })}
        <Col span={24} style={{ padding: 12 }}>
          <Button
            style={{ width: '100%', marginTop: 12 }}
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            disableElevation
            disabled={submitting}
            onClick={() => {
              form
                .validateFields()
                .then(values => {
                  submitData();
                })
                .catch(error => {});
            }}
          >
            {submitting ? <LoadingOutlined /> : null}

            <span style={{ marginLeft: 12, fontSize: 16 }}>提交</span>
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default InitForm;
