"use strict";

var React = znui.React || require('react');

module.exports = React.createClass({
  displayName: 'ZRDataLifecycle',
  getInitialState: function getInitialState() {
    return {
      data: null,
      loading: false
    };
  },
  componentDidMount: function componentDidMount() {
    var _events = this.props.events || {},
        _before = _events.before,
        _after = _events.after;

    this.data = zn.data.create(this.props.data, zn.extend(_events, {
      before: function (sender, data) {
        this.setState({
          loading: true
        });
        this.props.onLoading && this.props.onLoading(data, this);
        _before && _before(sender, data);
      }.bind(this),
      after: function (sender, data) {
        this.setState({
          loading: false,
          data: data
        });
        this.props.onFinished && this.props.onFinished(data, this);
        _after && _after(sender, data);
      }.bind(this)
    }), this.props.context);
  },
  render: function render() {
    var _data = this.state.data,
        _default = React.createElement(React.Fragment, null);

    if (this.state.loading) {
      var _return = this.props.loadingRender && this.props.loadingRender(this);

      if (_return === null) {
        _return = ZRDataView.loadingRender || _default;
      }

      return _return || _default;
    }

    if (_data) {
      var _return = this.props.dataRender && this.props.dataRender(_data, this);

      if (_return) {
        return _return;
      }
    } else if (!this.state.loading) {
      var _return = this.props.emptyRender && this.props.emptyRender();

      if (_return) {
        return _return;
      }
    }

    var _return = this.props.render && this.props.render(_data, this);

    if (_return) {
      return _return;
    }

    return _default;
  }
});