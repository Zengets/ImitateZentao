export default function rendercolor(model: any, key: any) {
  let color = '#333';
  if (model == 'Buglevel') {
    switch (key) {
      case 1:
        color = '#b71c1c';
        break;
      case '1':
        color = '#b71c1c';
        break;
      case 2:
        color = '#ffa726';
        break;
      case '2':
        color = '#ffa726';
        break;
      case 3:
        color = '#4caf50';
        break;
      case '3':
        color = '#4caf50';
        break;
      default:
        color = '#333';
        break;
    }
  } else if (model == 'Bugstatus') {
    switch (key) {
      case 1:
        color = 'green';
        break;
      case '激活':
        color = 'green';
        break;
      case 2:
        color = '#f50';
        break;
      case '待验证':
        color = '#f50';
        break;
      case 3:
        color = '#333';
        break;
      case '已完成':
        color = '#333';
        break;
      default:
        color = '#333';
        break;
    }
  } else if (model == 'Productstatus') {
    switch (key) {
      case '1': //未激活
        color = '#999';
        break;
      case '未激活':
        color = '#999';
        break;
      case '2': //进行中
        color = 'green';
        break;
      case '进行中': //进行中
        color = 'green';
        break;
      case '3': //已关闭
        color = '#f50';
        break;
      case '已关闭':
        color = '#f50';
        break;
      default:
        color = '#333';
        break;
    }
  } else if (model == 'Projuctstatus') {
    switch (key) {
      case 1:
        color = '#999';
        break;
      case '未开始':
        color = '#999';
        break;
      case 2:
        color = 'green';
        break;
      case '进行中':
        color = 'green';
        break;
      case 3:
        color = 'red';
        break;
      case '已延期':
        color = 'red';
        break;
      case 4:
        color = '#13c2c2';
        break;
      case '已完成':
        color = '#13c2c2';
        break;
      case 5:
        color = '#400';
        break;
      case '延期完成':
        color = '#400';
        break;
      default:
        color = '#333';
        break;
    }
  } else if (model == 'Missionstatus') {
    // 9.任务总览—未激活：#838a9d；待指派、待开发、开发中、待测试、待验收、：#ff9800；已完成：#43a047；已关闭：#ff5d5d；底纹：#e84e0f-字体：#ffffff
    switch (key) {
      case 1:
        color = '#838a9d';
        break;
      case '待激活':
        color = '#838a9d';
        break;
      case 2:
        color = 'rgb(102, 102, 102)';
        break;
      case '待分配':
        color = 'rgb(102, 102, 102)';
        break;
      case 3:
        color = 'rgb(102, 102, 102)';
        break;
      case '待开发':
        color = 'rgb(102, 102, 102)';
        break;
      case 4:
        color = 'rgb(102, 102, 102)';
        break;
      case '开发中':
        color = 'rgb(102, 102, 102)';
        break;
      case 5:
        color = 'rgb(102, 102, 102)';
        break;
      case '待测试':
        color = 'rgb(102, 102, 102)';
        break;

      case 6:
        color = 'rgb(102, 102, 102)';
        break;
      case '待验收':
        color = 'rgb(102, 102, 102)';
        break;

      case 7:
        color = '#43a047';
        break;
      case '已完成':
        color = '#43a047';
        break;
      case 8:
        color = '#000';
        break;
      case '已关闭':
        color = '#000';
        break;

      default:
        color = '#333';
        break;
    }
  }

  return color;
}
