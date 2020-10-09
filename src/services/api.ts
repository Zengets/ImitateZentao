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

//上传背景
export async function uploadBackgroungImg(params: any) {
  return request(`/zentao/sysDic/uploadBackgroungImg`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}
//获取背景
export async function queryBackgroungImg(params: any) {
  return request(`/zentao/sysDic/queryBackgroungImg`, {
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
//部门删除
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

//用户列表
export async function UserqueryAll(params: any) {
  return request(`/zentao/sysUser/queryAll`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

//企业微信列表
export async function UserqueryWechatList(params: any) {
  return request(`/zentao/sysUser/queryWechatList`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

//查询树结构部门列表
export async function UserqueryTreeList(params: any) {
  return request(`/zentao/sysDepartment/queryTreeList`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

//查询全部角色下拉框
export async function UserqueryAllSelect(params: any) {
  return request(`/zentao/sysRole/queryAllSelect`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

//添加或修改用户
export async function Usersave(params: any) {
  return request(`/zentao/sysUser/save`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

//删除用户
export async function Userdelete(params: any) {
  return request(`/zentao/sysUser/delete`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}
//重置用户密码
export async function Userreset(params: any) {
  return request(`/zentao/sysUser/reset`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

//角色分页
export async function ChaqueryList(params: any) {
  return request(`/zentao/sysRole/queryList`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

//新增/修改角色
export async function Chasave(params: any) {
  return request(`/zentao/sysRole/save`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

//删除角色
export async function Chadelete(params: any) {
  return request(`/zentao/sysRole/delete`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

//角色授权查询
export async function ChaqueryAllByRoleId(params: any) {
  return request(`/zentao/sysPermission/queryAllByRoleId`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

//角色授权保存
export async function Chamissave(params: any) {
  return request(`/zentao/sysRolePermission/save`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

//角色授权保存
export async function DataqueryTreeList(params: any) {
  return request(`/zentao/sysDic/queryTreeList`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

//数据字典列表
export async function DataqueryDicTypeSelectList(params: any) {
  return request(`/zentao/sysDic/queryDicTypeSelectList`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

//数据字典删除
export async function DatadeleteById(params: any) {
  return request(`/zentao/sysDic/deleteById`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

//数据字典新增/修改 Datasave,DatadeleteById
export async function Datasave(params: any) {
  return request(`/zentao/sysDic/save`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

//产品列表
export async function ProdqueryList(params: any) {
  return request(`/zentao/umProduct/queryList`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

//产品状态下拉框
export async function ProdqueryStatus(params: any) {
  return request(`/zentao/sysDic/queryProductStatusSelectList`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

//产品新增/修改
export async function Prodsave(params: any) {
  return request(`/zentao/umProduct/save`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

//产品激活
export async function Prodactivation(params: any) {
  return request(`/zentao/umProduct/activation`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

//产品关闭
export async function Prodclose(params: any) {
  return request(`/zentao/umProduct/close`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

//产品删除
export async function ProddeleteById(params: any) {
  return request(`/zentao/umProduct/deleteById`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

//产品详情
export async function ProdqueryInfo(params: any) {
  return request(`/zentao/umProduct/queryInfo`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}
//产品下拉框激活的
export async function ProdqueryAllSelect(params: any) {
  return request(`/zentao/umProduct/queryProcessingSelect`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}
//产品下拉框全部
export async function ProdqueryAllSelectAll(params: any) {
  return request(`/zentao/umProduct/queryAllSelect`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

//根据产品下拉框找项目列表 下拉框
export async function umRequiretoproj(params: any) {
  return request(`/zentao/umProject/querySelectByProductId`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

//需求列表
export async function umRequirequeryList(params: any) {
  return request(`/zentao/umRequire/queryList`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

//需求状态列表
export async function queryRequireStatusSelectList(params: any) {
  return request(`/zentao/sysDic/queryRequireStatusSelectList`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}
//需求阶段列表
export async function queryRequireStageSelectList(params: any) {
  return request(`/zentao/sysDic/queryRequireStageSelectList`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

//激活需求 Requireactivate,Requiresave,Requireclose,RequiredeleteById
export async function Requireactivate(params: any) {
  return request(`/zentao/umRequire/activate`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}
//保存需求
export async function Requiresave(params: any) {
  return request(`/zentao/umRequire/save`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}
//关闭需求
export async function Requireclose(params: any) {
  return request(`/zentao/umRequire/close`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}
//删除需求
export async function RequiredeleteById(params: any) {
  return request(`/zentao/umRequire/deleteById`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}
//需求详情
export async function queryDetailInfo(params: any) {
  return request(`/zentao/umRequire/queryDetailInfo`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

//已关联需求 queryChoosedList,queryNoChooseList
export async function queryChoosedList(params: any) {
  return request(`/zentao/umRequire/queryChoosedList`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

//未关联需求
export async function queryNoChooseList(params: any) {
  return request(`/zentao/umRequire/queryNoChooseList`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}
//未关联需求 associate
export async function associate(params: any) {
  return request(`/zentao/umRequire/associate`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

//项目列表
export async function ProjqueryList(params: any) {
  return request(`/zentao/umProject/queryList`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

//项目新增/修改
export async function Projsave(params: any) {
  return request(`/zentao/umProject/save`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

//项目删除
export async function ProjdeleteById(params: any) {
  return request(`/zentao/umProject/deleteById`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

//项目开始
export async function Projstart(params: any) {
  return request(`/zentao/umProject/start`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

//项目完成
export async function Projfinish(params: any) {
  return request(`/zentao/umProject/finish`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}
//项目-状态
export async function ProjqueryProjectStatusSelectList(params: any) {
  return request(`/zentao/sysDic/queryProjectStatusSelectList`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

//项目详情
export async function ProjqueryById(params: any) {
  return request(`/zentao/umProject/queryById`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

//项目下拉框
export async function ProjquerySelectList(params: any) {
  return request(`/zentao/umProject/querySelectList`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

//项目详情
export async function ProjqueryByProjectId(params: any) {
  return request(`/zentao/umProjectMember/queryByProjectId`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

//项目删除
export async function TeamdeleteById(params: any) {
  return request(`/zentao/umProjectMember/deleteById`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

//项目下的成员 下拉框
export async function TeamqueryAllUser(params: any) {
  return request(`/zentao/sysUser/queryAllUser`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

//项目下的成员编辑
export async function Teamsave(params: any) {
  return request(`/zentao/umProjectMember/save`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

//任务下达列表
export async function MisquerytaskRelease(params: any) {
  return request(`/zentao/umTask/querytaskRelease`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

//任务下达编辑
export async function Missave(params: any) {
  return request(`/zentao/umTask/save`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

//任务下达删除
export async function MisdeleteById(params: any) {
  return request(`/zentao/umTask/deleteById`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

//任务下达删除 MisquerytaskRelease,Missave,MisdeleteById,Misactivation
export async function Misactivation(params: any) {
  return request(`/zentao/umTask/activation`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

//项目下的人员下拉框分配任务用
export async function querySelectListByProjectId(params: any) {
  return request(`/zentao/umProjectMember/querySelectListByProjectId`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

//需求分解任务
export async function breakDown(params: any) {
  return request(`/zentao/umTask/breakDown`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}
//需求分解任务
export async function add(params: any) {
  return request(`/zentao/umTask/add`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

//任务分配列表页
export async function MisquerytaskAssign(params: any) {
  return request(`/zentao/umTask/querytaskAssign`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

//修改任务负责人
export async function Misassign(params: any) {
  return request(`/zentao/umTask/updateCurrentUser`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}
//任务分配 原
export async function Misactive(params: any) {
  return request(`/zentao/umTask/active`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}
//任务分配 原
export async function Misassigns(params: any) {
  return request(`/zentao/umTask/assign`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

//任务开发 MisquerytaskDevelop
export async function MisquerytaskDevelop(params: any) {
  return request(`/zentao/umTask/querytaskDevelop`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

//任务开发开始 MisquerytaskDevelop
export async function MisdevelopStart(params: any) {
  return request(`/zentao/umTask/developStart`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

//任务开发结束 MisquerytaskDevelop,MisdevelopStart,MisdevelopEnd
export async function MisdevelopEnd(params: any) {
  return request(`/zentao/umTask/developEnd`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

//任务测试 MisquerytaskTest
export async function MisquerytaskTest(params: any) {
  return request(`/zentao/umTask/querytaskTest`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

//任务测试验证  MisquerytaskTest,Mistest
export async function Mistest(params: any) {
  return request(`/zentao/umTask/test`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

//任务测试 MisquerytaskCheck
export async function MisquerytaskCheck(params: any) {
  return request(`/zentao/umTask/querytaskCheck`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

//任务测试验证  MisquerytaskCheck,Mischeck
export async function Mischeck(params: any) {
  return request(`/zentao/umTask/check`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}
//任务测试验证  MisquerytaskCheck,Mischeck
export async function taskToRequire(params: any) {
  return request(`/zentao/umTask/taskToRequire`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}
//任务总览  MisquerytaskOverview
export async function MisquerytaskOverview(params: any) {
  return request(`/zentao/umTask/querytaskOverview`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

//任务总览  MisquerytaskOverview,Misclose
export async function Misclose(params: any) {
  return request(`/zentao/umTask/close`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

//任务总览  queryTaskStatusSelectList
export async function queryTaskStatusSelectList(params: any) {
  return request(`/zentao/sysDic/queryTaskStatusSelectList`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

//任务总览  queryTaskStatusSelectList
export async function MisquerytaskDetails(params: any) {
  return request(`/zentao/umTask/querytaskDetails`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

//bug列表  BugqueryList
export async function BugqueryList(params: any) {
  return request(`/zentao/umBug/queryList`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}
//任务下拉框
export async function umTaskList(params: any) {
  return request(`/zentao/umTask/querySelectList`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

//bug新增  BugqueryList,Bugsave
export async function Bugsave(params: any) {
  return request(`/zentao/umBug/save`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}
//bug详情  BugqueryList,Bugsave,BugqueryById
export async function BugqueryById(params: any) {
  return request(`/zentao/umBug/queryById`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

//bug删除  BugqueryList,Bugsave,BugqueryById,Bugdelete
export async function Bugdelete(params: any) {
  return request(`/zentao/umBug/deleteById`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

//bug处理  BugqueryList,Bugsave,BugqueryById,Bugdelete,Bugsolve
export async function Bugsolve(params: any) {
  return request(`/zentao/umBug/solve`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

//bug验收  BugqueryList,Bugsave,BugqueryById,Bugdelete,Bugsolve,Bugconfirm
export async function Bugconfirm(params: any) {
  return request(`/zentao/umBug/confirm`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

//bug激活  BugqueryList,Bugsave,BugqueryById,Bugdelete,Bugsolve,Bugconfirm,Bugactivate
export async function Bugactivate(params: any) {
  return request(`/zentao/umBug/activate`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}
// /sysDic/queryBugStatusSelectList     bug状态
// /sysDic/queryBugTypeSelectList      bug类型
// /sysDic/queryBugStageSelectList      bug阶段
// /sysDic/queryBugSeveritySelectList   bug严重程度
// /sysDic/queryBugPrioritySelectList   bug优先级
// /sysDic/queryBugSolutionSelectList   bug解决方案
export async function Bugstatus(params: any) {
  return request(`/zentao/sysDic/queryBugStatusSelectList`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

export async function Bugtype(params: any) {
  //Bugstatus,Bugtype,Bugstage,Bugseverity,Bugpriority,Bugsolution
  return request(`/zentao/sysDic/queryBugTypeSelectList`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

export async function Bugstage(params: any) {
  return request(`/zentao/sysDic/queryBugStageSelectList`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

export async function Bugseverity(params: any) {
  return request(`/zentao/sysDic/queryBugSeveritySelectList`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

export async function Bugpriority(params: any) {
  return request(`/zentao/sysDic/queryBugPrioritySelectList`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

export async function Bugsolution(params: any) {
  return request(`/zentao/sysDic/queryBugSolutionSelectList`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

//测试用例 列表
export async function DemoqueryList(params: any) {
  return request(`/zentao/umTestCase/queryList`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

//用例类型
export async function Demotype(params: any) {
  return request(`/zentao/sysDic/queryCaseTypeSelectList`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

//用例类型
export async function queryByRequireId(params: any) {
  return request(`/zentao/umTask/queryByRequireId`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

//用例类型
export async function Demosave(params: any) {
  return request(`/zentao/umTestCase/save`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

//用例执行记录 DemoqueryListByCaseId
export async function DemoqueryListByCaseId(params: any) {
  return request(`/zentao/umTestCaseExecute/queryListByCaseId`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

//用例执行失败记录 DemoqueryListByCaseId
export async function DemoqueryFailListByCaseId(params: any) {
  return request(`/zentao/umTestCaseExecute/queryFailListByCaseId`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

//用例执行树
export async function Demotree(params: any) {
  return request(`/zentao/umTestCaseExecuteStep/queryTreeListByExecuteId`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

//用例执行
export async function Demoexecute(params: any) {
  return request(`/zentao/umTestCase/execute`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

//用例详情
export async function DemoqueryById(params: any) {
  return request(`/zentao/umTestCase/queryById`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

//用例删除
export async function DemodeleteById(params: any) {
  return request(`/zentao/umTestCase/deleteById`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

//首页 统计
export async function IndexFirst(params: any) {
  return request(`/zentao/umProject/queryProjectStatistics`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

//首页 统计
export async function IndexSecond(params: any) {
  return request(`/zentao/umProject/queryMyHome`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

//首页 统计
export async function IndexThird(params: any) {
  return request(`/zentao/umTask/queryMyList`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

//首页 统计
export async function IndexFourth(params: any) {
  return request(`/zentao/umBug/queryMyList`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

//首页 统计
export async function IndexFifth(params: any) {
  return request(`/zentao/umTask/queryDelayList`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

export async function IndexSixth(params: any) {
  return request(`/zentao/umProject/queryDelayList`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

export async function queryMenu(params: any) {
  return request(`/zentao/sysPermission/queryMenu`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

//项目-项目任务状态统计
export async function queryProjectTaskStatus(params: any) {
  return request(`/zentao/umProject/queryProjectTaskStatus`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

//项目-项目进展表
export async function queryProjectRate(params: any) {
  return request(`/zentao/umProject/queryProjectRate`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

//组织-任务完成汇总表 queryTaskFinish,queryBug
export async function queryTaskFinish(params: any) {
  return request(`/zentao/umTask/queryTaskFinish`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

//组织-bug统计表
export async function queryBug(params: any) {
  return request(`/zentao/umBug/queryBug`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

//根据部门查询用户列表
export async function depuserlist(params: any) {
  return request(`/zentao/sysUser/query`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

//根据搜索条件查询研发人员下拉框
export async function queryDevList(params: any) {
  return request(`/zentao/sysUser/queryDevList`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

//根据搜索条件查询研发人员下拉框
export async function queryTestList(params: any) {
  return request(`/zentao/sysUser/queryTestList`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

//任务重做
export async function querytaskAll(params: any) {
  return request(`/zentao/umTask/querytaskAll`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

//我的任务重做
export async function querytaskMy(params: any) {
  return request(`/zentao/umTask/querytaskMy`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}

//新增、修改任务增加相关需求
export async function querySelectByProjectId(params: any) {
  return request(`/zentao/umRequire/querySelectByProjectId`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
}
