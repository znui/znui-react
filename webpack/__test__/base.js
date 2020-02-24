var index = require('../index');

console.log('Base: ', index.base);
console.log('Development: ', index.deepExtend(index.base, index.development));
console.log('Example: ', index.deepExtend(index.base, index.example));
console.log('Production: ', index.deepExtend(index.base, index.production));
console.log('Component: ', index.component);