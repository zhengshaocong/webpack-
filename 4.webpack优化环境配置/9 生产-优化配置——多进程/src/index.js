import './style/index2.less';
import './index1.css';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(() => {
      console.log('sw注册成功');
    }).catch(() => {
      console.log('sw注册失败');
    });
  });
}
