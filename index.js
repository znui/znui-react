var React = require('react');
if(React && !React.createClass){
    React.createClass = require('create-react-class');
}

require('./dist/znui-react-css.css');
module.exports = require('./dist/znui-react-js.js');