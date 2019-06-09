import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Table, Button, Pagination } from 'antd';
import router from 'umi/router';

// import moment from 'moment';
// import Link from 'umi/link';

// import StandardTable from '@/components/StandardTable';
// import PageHeaderWrapper from '@/components/PageHeaderWrapper';

// const columns = [
//   {
//     title: 'First name',
//     dataIndex: 'firstName',
//   },
//   {
//     title: 'Last name',
//     dataIndex: 'lastName',
//   },
//   {
//     title: 'Description',
//     dataIndex: 'description',
//   },
// ];

function dataNameToTitle(dataName) {
  const nameWithSpace = dataName.replace(/([a-zA-Z])(?=[A-Z])/g, '$1 ').toLowerCase();
  return nameWithSpace.charAt(0).toUpperCase() + nameWithSpace.slice(1);
}

function objToColoumns(objDescColounns) {
  return Object.keys(objDescColounns).map(key => ({
    dataIndex: key,
    title: objDescColounns[key].title || dataNameToTitle(key),
    ...objDescColounns[key],
  }));
}

const objColumns = {
  id: { width: '5em', align: 'center' },
  firstName: { width: '30%' },
  lastName: { width: '30%' },
  description: {},
};

const columns = objToColoumns(objColumns);

/* eslint react/no-multi-comp:0 */
@connect(({ personsSpringBootRestExemple }) => ({
  personsSpringBootRestExemple,
}))
class Persons extends PureComponent {
  componentDidMount() {
    this.reload();
  }

  reload() {
    // debugger;
    // console.log('people reload');
    const { dispatch } = this.props;
    dispatch({
      type: 'personsSpringBootRestExemple/fetchPersonsList',
      payload: {},
    });
  }

  render() {
    const {
      personsSpringBootRestExemple: { personsList },
    } = this.props;

    const upButtonStile = {
      marginRight: '8px',
      marginBottom: '8px',
    };

    return (
      <div>
        <Button
          type="primary"
          style={upButtonStile}
          icon="reload"
          onClick={() => {
            this.reload();
          }}
        >
          Reload
        </Button>

        <Button
          type="primary"
          style={upButtonStile}
          icon="file-add"
          onClick={() => {
            router.push(`/list/person`);
          }}
        >
          New
        </Button>

        {/* <br /> */}
        <Table
          dataSource={personsList}
          columns={columns}
          rowKey="id"
          pagination={false}
          // pagination={{
          //   position:'bottom',
          //   showQuickJumper: true,
          //   showSizeChanger: true,
          // }}
          size="middle"
          onRow={(record, rowIndex) => {
            return {
              onClick: event => {
                router.push(`/list/person?id=${record.id}`);
              }, // click row
              onDoubleClick: event => {}, // double click row
              onContextMenu: event => {}, // right button click row
              onMouseEnter: event => {}, // mouse enter row
              onMouseLeave: event => {}, // mouse leave row
            };
          }}
        />
        <br />
        <Pagination
          style={{ textAlign: 'right' }}
          total={50000}
          // defaultCurrent={1}
          // current={1}
          pageSizeOptions={['10', '25', '50', '100']}
          showQuickJumper
          showSizeChanger
          // showLessItems
          // size='small'
          // hideOnSinglePage
          // simple
          // showTotal={total => `Total ${total} items`}
          // onShowSizeChange={}
          // onChange
        />
      </div>
    );
  }
}

export default Persons;
