import * as React from 'react';
import classNames from 'classnames';
import Tooltip from '../tooltip';
import Editor from './Editor';

export { CommentEditorProps } from './Editor';

export interface CommentProps {
  /** List of action items rendered below the comment content */
  actions?: Array<React.ReactNode>;
  /** The element to display as the comment author. */
  author: string;
  /** The element to display as the comment avatar - generally an antd Avatar */
  avatar: React.ReactNode;
  /** className of comment */
  className?: string;
  /** The main content of the comment */
  content: React.ReactNode;
  /** Nested comments should be provided as children of the Comment */
  children?: React.ReactNode;
  /** Additional style for the comment content */
  contentStyle?: React.CSSProperties;
  /** Additional style for the comment head */
  headStyle?: React.CSSProperties;
  /** Optional ID for the comment */
  id?: string;
  /** Additional style for the comment inner wrapper */
  innerStyle?: React.CSSProperties;
  /** Comment prefix defaults to '.ant-comment' */
  prefixCls?: string;
  /** Additional style for the comment */
  style?: React.CSSProperties;
  /** A time element containing the time to be displayed */
  time?: React.ReactNode;
  /** A time element to be displayed as the time tooltip  */
  tooltipTime?: React.ReactNode;
}

export default class Comment extends React.Component<CommentProps, {}> {
  static Editor: typeof Editor = Editor;

  getAction(actions: React.ReactNode[]) {
    if (!actions || !actions.length) {
      return null;
    }
    const actionList = actions.map((action, index) => (
        <li key={`action-${index}`}>
          <span>{action}</span>
        </li>
      ),
    );
    return actionList;
  }

  renderNested = (child: React.ReactElement<any>) => {
    const { prefixCls = 'ant-comment' } = this.props;
    const classString = classNames(`${prefixCls}-nested`);

    return (
      <div className={classString}>
        {child}
      </div>
    )
  }

  render() {
    const {
      actions,
      author,
      avatar,
      children,
      className,
      content,
      contentStyle = {},
      headStyle = {},
      innerStyle = {},
      prefixCls = 'ant-comment',
      style = {},
      time,
      tooltipTime,
      ...otherProps
    } = this.props;

    const classString = classNames(prefixCls, className);
    const avatarDom = typeof avatar === 'string'
      ? <img src={avatar} />
      : avatar;

    let timeDom;

    if (time) {
      timeDom = <span className={`${prefixCls}-header-author-time`}>{time}</span>
    }

    if (time && tooltipTime) {
      timeDom = (
        <Tooltip title={tooltipTime}>
          <span className={`${prefixCls}-header-author-time ${prefixCls}-header-author-time-tooltip`}>
            {time}
          </span>
        </Tooltip>
      )
    }

    const headDom = (
      <div className={`${prefixCls}-header`} style={headStyle}>
        <span className={`${prefixCls}-header-avatar`}>
          {avatarDom}
        </span>
        <div className={`${prefixCls}-header-author`}>
          <span className={`${prefixCls}-header-author-name`}>
            {author}
          </span>
          {timeDom}
        </div>
      </div>
    );

    const actionDom = actions && actions.length
      ? <ul className={`${prefixCls}-actions`}>{this.getAction(actions)}</ul>
      : null;

    const contentDom = (
      <div className={`${prefixCls}-content`} style={contentStyle}>
        <div className={`${prefixCls}-content-detail`}>
          {content}
        </div>
        {actionDom}
      </div>
    );

    const comment = (
      <div {...otherProps} className={classString} style={style}>
        <div className={`${prefixCls}-inner`} style={innerStyle}>
          {headDom}
          {contentDom}
        </div>
      </div>
    )

    const nestedComments =
      React.Children.toArray(children).map((child: React.ReactElement<any>) =>
        React.cloneElement(this.renderNested(child), {}));

    return (
      <div>
        {comment}
        {nestedComments}
      </div>
    )
  }
}
