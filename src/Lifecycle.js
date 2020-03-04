var React = znui.React || require('react');

module.exports = React.createClass({
	displayName:'ZRLifecycle',
	getDefaultProps: function (){
		var _props = {};
		if(this.props) {
			_props = this.props.getDefaultProps && this.props.getDefaultProps.apply(this, arguments);
		}

		return _props || {};
	},
	getInitialState: function(){
		var _state = {};
		if(this.props) {
			_state = this.props.getInitialState && this.props.getInitialState.apply(this, arguments);
		}

		return _state || {};
	},
	componentDidMount: function(){
		return this.props.didMount && this.props.didMount.apply(this, arguments);
	},
	componentDidUpdate: function(){
		return this.props.didUpdate && this.props.didUpdate.apply(this, arguments);
	},
	componentWillUnmount: function(){
		return this.props.willUnmount && this.props.willUnmount.apply(this, arguments);
	},
	render: function(){
		return this.props.render && this.props.render.apply(this, arguments);
	}
});