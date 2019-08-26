//import $ from "jquery"
//expose-loader 暴露全局的loader
//console.log($);


// let str = require('./a.js');
// console.log(str);
//
 require('./index.css');
// require('./index.less');
//
// let fn = () => {
//     console.log(1);
// }
//
// fn();
//
// class A{
//     a = 16;
// }
//
// let ta = new A();
// console.log(ta.a);

//file-loader 默认会在内部生成一张图片 到 build 目录下
import logo from './1.jpg'
let image = new Image();
image.src = logo;
document.body.appendChild(image);