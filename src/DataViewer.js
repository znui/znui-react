var React = znui.React || require('react');

module.exports = React.createClass({
	displayName:'DataViewer',
	getInitialState:function(){
		return {
			data: null,
			loading: false,
			value: this.props.value,
			values: []
		}
	},
	componentDidMount:function(){
		this.state.data = zn.data.create(this.props.data, {
			before: function (){
				this.setState({
					loading: true
				});
			}.bind(this),
			after: function (sender, data){
				this.setState({
					loading: false,
					data: data
				})
			}.bind(this)
		});
	},
	componentWillReceiveProps: function(nextProps){
		if(nextProps.data!==this.props.data){
			this.state.data.overwriteCall(nextProps.data);
		}
	},
	__itemRender: function (item, index){
		return this.props.itemRender && this.props.itemRender(item, index);
	},
	render: function(){
		var _data = this.state.data;
		if(_data && _data.length){
			return (
				<>
					{
						_data.map(this.__itemRender)
					}
				</>
			);
		}else{
			return <></>;
		}
	}
});
