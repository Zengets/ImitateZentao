import moment, { months } from 'moment';

// 获取上一周的开始结束时间
function getLastWeekDays() {
  let date = [];
  let weekOfday = parseInt(moment().format('d')); // 计算今天是这周第几天  周日为一周中的第一天
  let start = moment()
    .subtract(weekOfday + 6, 'days')
    .startOf('day'); // 周一日期
  let end = moment()
    .subtract(weekOfday, 'days')
    .endOf('day'); // 周日日期
  date.push(start);
  date.push(end);
  return date;
}
// 获取上一个月的开始结束时间
function getLastMonthDays() {
  let date = [];
  let start = moment()
    .subtract('month', 1)
    .startOf('month');
  let end = moment()
    .subtract('month', 1)
    .endOf('month');
  date.push(start);
  date.push(end);
  return date;
}
// 获取当前周的开始结束时间
function getCurrWeekDays() {
  let date = [];
  let start = moment().startOf('week'); // 周一日期
  let end = moment().endOf('week'); // 周日日期
  date.push(start);
  date.push(end);
  return date;
}
// 获取当前月的开始结束时间
function getCurrMonthDays() {
  let date = [];
  let start = moment().startOf('month');
  let end = moment().endOf('month');
  date.push(start);
  date.push(end);
  return date;
}
// 获取下一周的开始结束时间
function getNextWeekDays() {
  let date = [];
  let start = moment()
    .add('week', 1)
    .startOf('week');
  let end = moment()
    .add('week', 1)
    .endOf('week');
  date.push(start);
  date.push(end);
  return date;
}
// 获取下一个月的开始结束时间
function getNextMonthDays() {
  let date = [];
  let start = moment()
    .add('month', 1)
    .startOf('month');
  let end = moment()
    .add('month', 1)
    .endOf('month');
  date.push(start);
  date.push(end);
  return date;
}

export {
  getNextMonthDays,
  getNextWeekDays,
  getCurrMonthDays,
  getCurrWeekDays,
  getLastMonthDays,
  getLastWeekDays,
};
