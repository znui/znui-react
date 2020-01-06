"use strict";

var React = znui.React || require('react');

module.exports = React.createClass({
  displayName: 'DataViewer',
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

    this.state.data = zn.data.create(this.props.data, zn.extend(_events, {
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
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      this.state.data.overwriteCall(nextProps.data);
    }
  },
  __itemRender: function __itemRender(item, index) {
    return this.props.itemRender && this.props.itemRender(item, index);
  },
  render: function render() {
    var _data = this.state.data;

    if (this.state.loading) {
      var _return = this.props.loadingRender && this.props.loadingRender(this);

      if (_return) {
        return _return;
      }
    }

    if (_data && _data.length) {
      var _return = this.props.dataRender && this.props.dataRender(_data, this);

      if (_return) {
        return _return;
      }

      return React.createElement(React.Fragment, null, _data.map(this.__itemRender));
    } else if (!this.state.loading) {
      var _return = this.props.emptyRender && this.props.emptyRender();

      if (_return) {
        return _return;
      }
    }

    return React.createElement(React.Fragment, null);
  }
});