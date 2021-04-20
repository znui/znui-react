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
        _data = this.props.data || [],
        _before = _events.before,
        _after = _events.after,
        _error = _events.error;

    this._data = zn.data.create(_data, zn.extend(_events, {
      before: function (sender, data) {
        if (!this.__isMounted) {
          return;
        }

        if ((this.props.onLoading && this.props.onLoading(data, this)) === false) {
          return;
        }

        this.setState({
          loading: true
        });
        _before && _before(sender, data);
      }.bind(this),
      after: function (sender, data, response, xhr) {
        if (!this.__isMounted) {
          return;
        }

        var _data = data;

        if (response) {
          var _result = this.props.responseHandler && this.props.responseHandler(response, xhr, this);

          if (_result === false) {
            return;
          }

          if (_result !== undefined) {
            _data = _result;
          }
        }

        var _onLoaded = this.props.onLoaded || this.props.onFinished;

        if ((_onLoaded && _onLoaded(_data, xhr, this)) === false) {
          return;
        }

        this.setState({
          loading: false,
          data: _data
        });
        _after && _after(sender, _data, xhr);
      }.bind(this),
      error: function (sender, xhr) {
        if ((this.props.onError && this.props.onError(xhr, this)) === false) {
          return;
        }

        this.setState({
          loading: false
        });
        _error && _error(sender, xhr, this);
      }.bind(this)
    }), this.props.context);
    this.props.onDataCreated && this.props.onDataCreated(this._data, this);
  },
  componentWillUnmount: function componentWillUnmount() {
    if (this._data) {
      this._data.destroy();

      this._data = null;
    }
  },
  render: function render() {
    var _data = this.state.data,
        _default = React.createElement(React.Fragment, null);

    if (this.state.loading && this.props.loadingEnabled !== false) {
      var _return = this.props.loadingRender && this.props.loadingRender(this);

      if (!_return && this.props.loadingLabel && znui.react.Render.Loading) {
        _return = React.createElement(znui.react.Render.Loading, {
          label: this.props.loadingLabel
        });
      }

      return _return || _default;
    }

    if (_data) {
      var _return = this.props.dataRender && this.props.dataRender(_data, this);

      if (_return) {
        return _return;
      }
    } else if (!this.state.loading) {
      var _return = this.props.emptyRender && this.props.emptyRender(this);

      if (!_return && this.props.emptyLabel && znui.react.Render.EmptyData) {
        _return = React.createElement(znui.react.Render.EmptyData, {
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