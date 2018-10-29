---
order: 3
title:
  zh-CN: 编辑模式
  en-US: Editor mode
---

## zh-CN

评论编辑器组件提供了相同样式的封装以支持自定义评论编辑器。

## en-US

Comment can be used as editor, user can customize the editor component.

````jsx
import { Comment, Icon, Tooltip, Avatar, Form, Button, List, Input, Radio } from 'antd';
import moment from 'moment';

const FormItem = Form.Item;
const TextArea = Input.TextArea;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

function CommentList({ comments }) {
  return (
    <List
      header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
      itemLayout="horizontal"
      dataSource={comments}
      renderItem={props => <Comment {...props} />}
    />
  )
}

class Editor extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSubmit(
          values,
          () => this.props.form.resetFields()
        );
      }
    });
  }

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem>
          {getFieldDecorator('message', {
            rules: [{ required: true, message: 'Please input your message!' }],
          })(
            <TextArea rows={4} />
          )}
        </FormItem>
        <FormItem>
          <Button
            disabled={hasErrors(getFieldsError())}
            htmlType="submit"
            loading={this.props.submitting}
            type="primary"
          >
            Add Comment
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const EditorForm = Form.create()(Editor);

class App extends React.Component {
  state = {
    comments: [],
    submitting: false,
    direction: 'left',
  }

  handleSubmit = (values, cb) => {
    this.setState({
      submitting: true,
    });

    setTimeout(() => {
      this.setState({
        submitting: false,
        comments: [
          {
            author: 'Han Solo',
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content: values.message,
            time: moment().fromNow(),
          },
          ...this.state.comments,
        ]
      })
      if (cb) cb();
    }, 1000);
  }

  handleChange = (e) => {
    this.setState({ direction: e.target.value });
  }

  render() {
    return (
      <React.Fragment>
        {this.state.comments.length > 0 && (
          <CommentList
            comments={this.state.comments}
          />
        )}
        <Form layout="inline">
          <FormItem label="Editor direction">
            <Radio.Group size="default" value={this.state.direction} onChange={this.handleChange}>
              <Radio.Button value="left">Left</Radio.Button>
              <Radio.Button value="right">Right</Radio.Button>
            </Radio.Group>
          </FormItem>
        </Form>
        <Comment
          direction={this.state.direction}
          avatar={
            <Avatar
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              alt="Han Solo"
            />
          }
          content={
            <EditorForm
              submitting={this.state.submitting}
              onSubmit={this.handleSubmit}
            />
          }
        />
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App />, mountNode);
````