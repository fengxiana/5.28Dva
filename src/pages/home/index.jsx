import React, { Component } from 'react'
import { Table, Button, Modal, Form, Input } from 'antd';
import { connect } from 'dva'
import { HomeData, HomeAdd, HomeUpdate, HomeDelete } from '@/actions/home'


@connect(({ home }) => {
  return {
    data: home.homeData,
    currentData: home.currentData
  }
}, {
  HomeData,
  HomeAdd,
  HomeUpdate,
  HomeDelete
})

export default class Home extends Component {

  state = {
    visible: false, // 对话框的状态
    operateState: true, // 当前操作状态 true(添加) | false(编辑),
    currentId: null, //当前操作的id
    columns: [
      {
        title: '姓名',
        dataIndex: 'name'
      },
      {
        title: '年龄',
        dataIndex: 'age'
      },
      {
        title: '地址',
        dataIndex: 'address'
      },
      {
        title: 'action',
        render: obj => (
          <>
            <Button onClick={this.addShowModal} type="primary">添加</Button>
            <Button
              onClick={() => { this.updateShowModal(obj.id) }}
              style={{ marginLeft: "5px" }}
              type="primary"
            >
              编辑
            </Button>
            <Button
              onClick={() => { this.onDelete(obj.id) }}
              style={{ marginLeft: "5px" }}
              type="danger"
            >
              删除
            </Button>
          </>
        )
      }
    ],
    layout: {
      labelCol: { span: 3 },
      wrapperCol: { span: 21 },
    },
    tailLayout: {
      wrapperCol: { offset: 8, span: 16 },
    }
  }

  // 点击添加显示对话框
  addShowModal = () => {
    this.ModalStatus(true, true)
  }

  // 点击编辑显示对话框
  updateShowModal = (id) => {
    this.setState({ currentId: id })
    this.ModalStatus(true, false)
  }

  //对话框取消
  handleCancel = () => {
    this.ModalStatus(false)
  }

  // 控制对话框状态 | 控制当前状态
  ModalStatus = (ModalStatus, operateState) => {
    operateState = operateState ? operateState : false
    this.setState({ visible: ModalStatus, operateState })
  }

  // 提交表单
  onFinish = (values) => {
    const { operateState } = this.state
    if (operateState) { //添加
      this.props.HomeAdd(values)
        .then(() => {
          const { currentData } = this.props
          Number(currentData.status) === 200 ?
            alert(currentData.info) : alert(currentData.info)
        })
    } else { //编辑
      const { currentId } = this.state
      values = { ...values, id: currentId }
      this.props.HomeUpdate(values)
        .then(() => {
          const { currentData } = this.props
          Number(currentData.status) === 200 ?
            alert(currentData.message) : alert(currentData.message)
        })
    }
    this.initData()
    this.ModalStatus(false)
  }

  // 删除
  onDelete = (id) => {
    const deleteObj = { id }
    this.props.HomeDelete(deleteObj)
      .then(() => {
        const { currentData } = this.props
        Number(currentData.status) === 200 ?
          alert(currentData.info) : alert(currentData.info)
        this.initData()
      })
  }

  // 初始化数据
  initData = () => {
    this.props.HomeData()
  }

  componentDidMount() {
    this.initData()
  }

  render() {
    const { data } = this.props
    const { columns, operateState, layout, tailLayout } = this.state
    return (
      <div className="pages-home">
        {/* 表格 */}
        <Table rowKey="id" columns={columns} dataSource={data} />
        {/* 对话框 */}
        <Modal
          title={operateState ? "添加" : "编辑"}
          visible={this.state.visible}
          footer={null}
        >
          {/* 表单 */}
          <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={this.onFinish}
          >
            <Form.Item
              label="姓名"
              name="name"
              rules={[{ required: true, message: '姓名必填 !' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="年龄"
              name="age"
              rules={[{ required: true, message: '年龄必填 !' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="地址"
              name="addresss"
              rules={[{ required: true, message: '地址必填 !' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
              <Button
                onClick={this.handleCancel}
                style={{ marginLeft: "10px" }}
                type="ghost"
              >
                取消
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
}
