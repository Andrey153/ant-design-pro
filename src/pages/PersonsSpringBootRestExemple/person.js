import React, { PureComponent, Fragment } from 'react';
import router from 'umi/router';
import { connect } from 'dva';
import {
  List,
  Card,
  Row,
  Col,
  Radio,
  Input,
  Progress,
  Button,
  Icon,
  Dropdown,
  Menu,
  Avatar,
  Modal,
  Form,
  DatePicker,
  Select,
  Spin,
} from 'antd';

import moment from 'moment';
// import Link from 'umi/link';

// import StandardTable from '@/components/StandardTable';
// import PageHeaderWrapper from '@/components/PageHeaderWrapper';

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const SelectOption = Select.Option;
const { Search, TextArea } = Input;

// const objColumns = {
//   id: {width:'5em', align:'center'},
//   firstName: {width:'30%'},
//   lastName: {width:'30%'},
//   description: {},
// }

@connect(({ personsSpringBootRestExemple }) => ({
  editingPerson: personsSpringBootRestExemple.editingPerson,
}))
@Form.create({
  mapPropsToFields(props) {
    return {
      id: Form.createFormField({ value: props.editingPerson.id }),
      firstName: Form.createFormField({ value: props.editingPerson.firstName }),
      lastName: Form.createFormField({ value: props.editingPerson.lastName }),
      description: Form.createFormField({ value: props.editingPerson.description }),
    };
  },
  onValuesChange({ dispatch }, changedValues, allValues) {
    dispatch({
      type: 'personsSpringBootRestExemple/changeValuePerson',
      payload: {
        changedValues,
      },
    });
  },
})
class Person extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};

    const urlParams = new URL(window.location.href);

    const { dispatch } = props;

    dispatch({
      type: 'personsSpringBootRestExemple/fetchPerson',
      payload: {
        id: urlParams.searchParams.get('id'),
      },
    });
  }
  // componentDidMount() {
  //   // this.reload();
  // }

  render() {
    const { editingPerson, dispatch } = this.props;

    const {
      form: { getFieldDecorator },
    } = this.props;

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 12 },
    };

    const styleFormItem = {
      marginBottom: '0',
    };

    const upButtonStile = {
      marginRight: '8px',
      marginBottom: '8px',
    };

    const disabledInputStyle = {
      color: 'rgba(0, 0, 0, 0.65)',
      cursor: 'auto',
    };

    return (
      <div style={{ maxWidth: '50em' }}>
        <Button
          type="primary"
          style={upButtonStile}
          icon="arrow-left"
          onClick={() => {
            router.push(`/list/persons`);
          }}
        >
          List persons
        </Button>

        <Button
          type="primary"
          style={upButtonStile}
          icon="save"
          onClick={() => {
            router.push(`/list/persons`);
          }}
        >
          Save
        </Button>
        <Button
          type="primary"
          style={upButtonStile}
          icon="delete"
          onClick={() => {
            const urlParams = new URL(window.location.href);
            dispatch({
              type: 'personsSpringBootRestExemple/deletePerson',
              payload: {
                id: urlParams.searchParams.get('id'),
              },
            });
            router.push(`/list/persons`);
          }}
        >
          Delete
        </Button>

        {/* <Spin tip="Loading..."> */}

        <Form layout="horizontal">
          <FormItem style={styleFormItem} label="Id" {...formItemLayout}>
            {getFieldDecorator('id')(<Input style={disabledInputStyle} disabled />)}
          </FormItem>
          <FormItem style={styleFormItem} label="firstName" {...formItemLayout}>
            {getFieldDecorator('firstName')(<Input />)}
          </FormItem>
          <FormItem style={styleFormItem} label="lastName" {...formItemLayout}>
            {getFieldDecorator('lastName')(<Input />)}
          </FormItem>
          <FormItem style={styleFormItem} label="description" {...formItemLayout}>
            {getFieldDecorator('description')(<TextArea autosize={{ minRows: 1, maxRows: 6 }} />)}
          </FormItem>

          {/* <FormItem label="开始时间" {...this.formLayout}>
            {getFieldDecorator('createdAt', {
              rules: [{ required: true, message: '请选择开始时间' }],
              initialValue: 1,
            })(
              <DatePicker
                showTime
                placeholder="请选择"
                format="YYYY-MM-DD HH:mm:ss"
                style={{ width: '100%' }}
              />
            )}
          </FormItem> */}
          {/* <FormItem label="任务负责人" {...this.formLayout}>
            {getFieldDecorator('owner', {
              rules: [{ required: true, message: '请选择任务负责人' }],
              initialValue: 1,
            })(
              <Select placeholder="请选择">
                <SelectOption value="付晓晓">付晓晓</SelectOption>
                <SelectOption value="周毛毛">周毛毛</SelectOption>
              </Select>
            )}
          </FormItem> */}
          {/* <FormItem {...this.formLayout} label="产品描述">
            {getFieldDecorator('subDescription', {
              rules: [{ message: '请输入至少五个字符的产品描述！', min: 5 }],
              initialValue: 1,
            })(<TextArea rows={4} placeholder="请输入至少五个字符" />)}
          </FormItem> */}
        </Form>

        {/* </Spin> */}
      </div>
    );
  }
}

export default Person;
