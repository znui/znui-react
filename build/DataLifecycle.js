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

    var _data = zn.data.create(this.props.data, zn.extend(_events, {
      before: function (sender, data) {
        var _return = this.props.onLoading && this.props.onLoading(data, this);

        if (_return !== false) {
          this.setState({
            loading: true
          });
          _before && _before(sender, data);
        }
      }.bind(this),
      after: function (sender, data) {
        var _return = this.props.onFinished && this.props.onFinished(data, this);

        if (_return !== false) {
          this.setState({
            loading: false,
            data: data
          });
          _after && _after(sender, data);
        }
      }.bind(this)
    }), this.props.context);

    this.props.onDataCreated && this.props.onDataCreated(_data, this);
  },
  render: function render() {
    var _data = this.state.data,
        _default = React.createElement(React.Fragment, null);

    if (this.state.loading) {
      var _return = this.props.loadingRender && this.props.loadingRender(this);

      if (_return === null) {
        _return = ZRDataView.loadingRender || _default;
      }

      console.log('Loading... ', _return);
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