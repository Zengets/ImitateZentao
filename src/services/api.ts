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
//登出
export async function Logout(params: any) {
  return request(`/zentao/sysAccount/logout`, {
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

//修改密码
export async function changePassword(params: any) {
  return request(`/zentao/sysAccount/changePassword`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

//部门树
export async function DepqueryTreeList(params: any) {
  return request(`/zentao/sysDepartment/queryTreeList`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

//查询部门树子节点
export async function DepqueryByParentId(params: any) {
  return request(`/zentao/sysDepartment/queryByParentId`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

//部门编辑
export async function Depsave(params: any) {
  return request(`/zentao/sysDepartment/save`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}
//部门编辑
export async function DepdeleteById(params: any) {
  return request(`/zentao/sysDepartment/deleteById`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

//用户列表
export async function UserqueryList(params: any) {
  return request(`/zentao/sysUser/queryList`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}
