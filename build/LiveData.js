"use strict";

var React = znui.React || require('react');

module.exports = React.createClass({
  displayName: 'ZRLiveData',
  getDefaultProps: function getDefaultProps() {
    return this.props.getDefaultProps && this.props.getDefaultProps.apply(this, arguments);
  },
  getInitialState: function getInitialState() {
    return this.props.getInitialState && this.props.getInitialState.apply(this, arguments);
  },
  componentDidMount: function componentDidMount() {
    return this.props.didMount && this.props.didMount.apply(this, arguments);
  },
  componentDidUpdate: function componentDidUpdate() {
    return this.props.didUpdate && this.props.didUpdate.apply(this, arguments);
  },
  componentWillUnmount: function componentWillUnmount() {
    return this.props.willUnmount && this.props.willUnmount.apply(this, arguments);
  },
  render: function render() {
    return this.props.render && this.props.render.apply(this, arguments);
  }
});