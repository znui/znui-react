var React = require('react');
if(React && !React.createClass){
    React.createClass = require('create-react-class');
}

var znui = require('znui');
module.exports = znui.react = {
    Application: require('./Application')
};