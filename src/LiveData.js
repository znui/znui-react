var React = znui.React || require('react');

module.exports = React.createClass({
	displayName:'ZRLiveData',
	getDefaultProps: function (){
		return this.props.getDefaultProps && this.props.getDefaultProps.apply(this, arguments);
	},
	getInitialState: function(){
		return this.props.getInitialState && this.props.getInitialState.apply(this, arguments);
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