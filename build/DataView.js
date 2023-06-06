"use strict";

var React = znui.React || require('react');
module.exports = React.createClass({
  displayName: 'ZRDataView',
  getInitialState: function getInitialState() {
    return {
      data: null,
      loading: false
    };
  },
  componentDidMount: function componentDidMount() {
    var _this = this;
    var _events = this.props.events || {},
      _data = this.props.data || [],
      _before = _events.before,
      _after = _events.after,
      _error = _events.error;
    this._data = zn.data.create(_data, zn.extend(_events, {
      before: function before(sender, data) {
        if (!_this.__isMounted) {
          return;
        }
        if ((_this.props.onLoading && _this.props.onLoading(data, _this)) === false) {
          return;
        }
        _this.setState({
          loading: true
        });
        _before && _before(sender, data);
      },
      after: function after(sender, data, response, xhr) {
        if (!_this.__isMounted) {
          return;
        }
        var _data = data;
        if (response) {
          var _result = _this.props.responseHandler && _this.props.responseHandler(response, xhr, _this);
          if (_result === false) {
            return;
          }
          if (_result !== undefined) {
            _data = _result;
          }
        }
        var _onLoaded = _this.props.onLoaded || _this.props.onFinished;
        if ((_onLoaded && _onLoaded(_data, xhr, _this)) === false) {
          return;
        }
        if (zn.is(_data, 'object') && _data.code == 200 && zn.is(_data.result, 'array')) {
          _data = _data.result;
        }
        _this.setState({
          loading: false,
          data: _data
        });
        _after && _after(sender, _data, xhr);
      },
      error: function error(sender, xhr) {
        if ((_this.props.onError && _this.props.onError(xhr, _this)) === false) {
          return;
        }
        _this.setState({
          loading: false
        });
        _error && _error(sender, xhr, _this);
      }
    }), this.props.context);
    this.props.onDataCreated && this.props.onDataCreated(this._data, this);
  },
  componentWillUnmount: function componentWillUnmount() {
    if (this._data) {
      this._data.destroy();
      this._data = null;
    }
  },
  __itemRender: function __itemRender(item, index) {
    return this.props.itemRender && this.props.itemRender(item, index, this);
  },
  render: function render() {
    var _data = this.state.data,
      _default = /*#__PURE__*/React.createElement(React.Fragment, null);
    if (this.state.loading) {
      var _return = this.props.loadingRender && this.props.loadingRender(this);
      if (!_return && this.props.loadingLabel && znui.react.Render.Loading) {
        _return = /*#__PURE__*/React.createElement(znui.react.Render.Loading, {
          label: this.props.loadingLabel
        });
      }
      return _return || _default;
    }
    if (_data && _data.length) {
      var _return = this.props.dataRender && this.props.dataRender(_data, this);
      if (_return) {
        return _return;
      }
      return /*#__PURE__*/React.createElement(React.Fragment, null, _data.map(this.__itemRender));
    } else if (!this.state.loading) {
      var _return = this.props.emptyRender && this.props.emptyRender(this);
      if (!_return && this.props.emptyLabel && znui.react.Render.EmptyData) {
        _return = /*#__PURE__*/React.createElement(znui.react.Render.EmptyData, {
          label: this.props.emptyLabel
        });
      }
      if (_return) {
        return _return;
      }
    }
    return this.props.render && this.props.render(_data, this) || _default;
  }
});