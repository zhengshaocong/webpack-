import './style/index2.less';
import './index1.css';
import $ from 'jquery';

console.log(123456);
console.log($);
setTimeout(() => {
  import(/* webpackChunkName:'test', webpackPrefetch:true */'./aaa.js').then((res) => {// eslint-disable-line
    res.default();
  });
}, 5000);
