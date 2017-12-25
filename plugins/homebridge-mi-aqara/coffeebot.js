const axios = require('axios');
const webhook = 'https://oapi.dingtalk.com/robot/send?access_token=bee848e5b501012ebccc4a0493d6e24b9d53fa846c0957ccf50b48f0007f27cf';

const prepareDelay = 10 * 60 * 1000;
// const prepareDelay = 10 * 1000;
const prepareMsg = {
  msgtype: 'text',
  text: {
    content: '咖啡正在准备中, 十秒钟后即可享用'
  }
}

const readyMsg = {
  msgtype: 'text',
  text: {
    content: '咖啡煮好了，请慢用'
  }
}

let timer;
let latestClick = 0;

exports.sendNotification = function (status) {
  if (status === 'click') {
    const now = +(new Date());
    // 忽略短时间连续单击
    if (now - latestClick < 10 * 1000) return;
    latestClick = now;
    console.log('[click] send prepare msg');
    sendPrepare().then(() => {
      timer = setTimeout(() => {
        console.log('[click] send ready msg');
        sendReady().then(() => {});
      }, prepareDelay);
    });
  } else if (status === 'double_click') {
    // 清除上一次单击的 timeout
    clearTimeout(timer);
    console.log('[double_click] send ready msg');
    sendReady().then(() => {});
  }
}

function sendPrepare() {
  return axios.post(webhook, prepareMsg)
}

function sendReady() {
  return axios.post(webhook, readyMsg)
}