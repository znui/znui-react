var React = znui.React || require('react');

module.exports = React.createClass({
	displayName:'ZRDataView',
	getInitialState:function(){
		return {
			all_data: null,
			data: null,
			loading: false
		}
	},
	componentDidMount:function(){
		var _events = this.props.events || {},
			_data = this.props.data || [],
			_before = _events.before,
			_after = _events.after,
			_error = _events.error;
		this._data = zn.data.create(_data, zn.extend(_events, {
			before: (sender, data)=>{
				if(!this.__isMounted){
					return;
				}
				var _result = this.props.onLoading && this.props.onLoading(data, this);
				if(_result === false) {
					return;
				}
				if(zn.is(_result, 'object') || zn.is(_result, 'array')) {
					data = _result;
				}
				this.setState({
					loading: true
				});
				_before && _before(sender, data);
			},
			after: (sender, data, response, xhr)=>{
				if(!this.__isMounted){
					return;
				}
				var _data = data;
				if(response){
					var _result = this.props.responseHandler && this.props.responseHandler(response, xhr, this);
					if(_result === false){
						return;
					}
					if(_result !== undefined) {
						_data = _result;
					}
				}

				var _onLoaded = this.props.onLoaded;
				if((_onLoaded && _onLoaded(_data, xhr, this)) === false) {
					return false;
				}

				if(zn.is(_data, 'object') && _data.code == 200 && zn.is(_data.result, 'array')){
					_data = _data.result;
				}
				
				var _dataHandler = this.props.dataHandler || this.props.onFinished;
				var _result = _dataHandler && _dataHandler(_data, xhr, this);
				if(_result === false){
					return false;
				}
				if(zn.is(_result, 'object') || zn.is(_result, 'array')) {
					_data = _result;
				}
				
				this.setState({
					loading: false,
					data: _data,
					all_data: _data
				});
				_after && _after(sender, _data, xhr);
			},
			error: (sender, xhr)=>{
				if((this.props.onError && this.props.onError(xhr, this)) === false) {
					return;
				}
				this.setState({
					loading: false
				});
				_error && _error(sender, xhr, this);
			}
		}), this.props.context);
		this.props.onDataCreated && this.props.onDataCreated(this._data, this);
	},
	componentWillUnmount: function (){
		if(this._data){
			this._data.destroy();
			this._data = null;
		}
	},
	filter: function (filter, sort){
		this.state.data = JSON.parse(JSON.stringify(this.state.all_data));
		this.state.data = this.state.data.filter(filter, sort);
		this.forceUpdate();
	},
	reset: function (){
		this.state.data = this.state.all_data.slice();
		this.forceUpdate();
	},
	__itemRender: function (item, index){
		return this.props.itemRender && this.props.itemRender(item, index, this);
	},
	render: function(){
		var _data = this.state.data,
			_default = <></>;
		if(this.state.loading){
			var _return = this.props.loadingRender && this.props.loadingRender(this);
			if(!_return && this.props.loadingLabel && znui.react.Render.Loading){
				_return = <znui.react.Render.Loading label={this.props.loadingLabel} />;
			}

			return _return || _default;
		}
		if(_data && _data.length){
			var _return = this.props.dataRender && this.props.dataRender(_data, this);
			if(_return) {
				return _return;
			}
			
			return (
				<>
					{
						_data.map(this.__itemRender)
					}
				</>
			);
		} else if(!this.state.loading){
			var _return = this.props.emptyRender && this.props.emptyRender(this);
			if(!_return && this.props.emptyLabel && znui.react.Render.EmptyData){
				_return = <znui.react.Render.EmptyData label={this.props.emptyLabel} />;
			}
			if(_return) {
				return _return;
			}
		}

		return (this.props.render && this.props.render(_data, this)) || _default;
	}
});