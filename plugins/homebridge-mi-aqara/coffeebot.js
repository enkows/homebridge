const axios = require('axios');
const webhook = 'https://oapi.dingtalk.com/robot/send?access_token=bee848e5b501012ebccc4a0493d6e24b9d53fa846c0957ccf50b48f0007f27cf';

// const prepareDelay = 10 * 60 * 1000;
const prepareDelay = 10 * 1000;
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

exports.sendNotification = function () {
  axios.post(webhook, prepareMsg).then(() => {
    console.log(arguments);
    timer = setTimeout(() => {
      axios.post(webhook, readyMsg).then(() => {});
    }, prepareDelay);
  });
}