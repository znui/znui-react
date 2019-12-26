"use strict";

var React = znui.React || require('react');

module.exports = React.createClass({
  displayName: 'DataViewer',
  getInitialState: function getInitialState() {
    return {
      data: null,
      loading: false,
      value: this.props.value,
      values: []
    };
  },
  componentDidMount: function componentDidMount() {
    this.state.data = zn.data.create(this.props.data, {
      before: function () {
        this.setState({
          loading: true
        });
      }.bind(this),
      after: function (sender, data) {
        this.setState({
          loading: false,
          data: data
        });
      }.bind(this)
    });
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      this.state.data.set('argv', nextProps.data);
      this.state.data.refresh();
    }
  },
  __itemRender: function __itemRender(item, index) {
    return this.props.itemRender && this.props.itemRender(item, index);
  },
  render: function render() {
    var _data = this.state.data;

    if (_data && _data.length) {
      return React.createElement(React.Fragment, null, _data.map(this.__itemRender));
    }
  }
});