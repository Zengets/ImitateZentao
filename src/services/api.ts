import { request } from 'umi';

export async function User(params: any) {
  return request(`/api/users`, {
    method: 'GET',
    body: params,
  });
}
