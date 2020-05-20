import { request } from 'umi';
let headers = {
  'Content-Type': 'application/json',
};
export async function User(params: any) {
  return request(`/api/users`, {
    method: 'GET',
    body: params,
  });
}
//登录
export async function Login(params: any) {
  return request(`/zentao/sysAccount/login`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}
//获取找密码验证码
export async function sendVerificationCode(params: any) {
  return request(`/zentao/sysAccount/sendVerificationCode`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}
//找回密码
export async function reparePassword(params: any) {
  return request(`/zentao/sysAccount/reparePassword`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}
