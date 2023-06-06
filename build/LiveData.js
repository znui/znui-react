"use strict";

var React = znui.React || require('react');
module.exports = React.createClass({
  displayName: 'ZRLiveData',
  render: function render() {
    return this.props.render && this.props.render.apply(this, arguments);
  }
});