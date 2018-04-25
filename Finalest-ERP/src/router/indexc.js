
import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
const index = () =>import(/* webpackChunkName: "group-index" */'../components/index')
// 登录
const login = () =>import('../components/login')
// 注册
const register = () =>import('../components/register')
// 404
const page404 = () =>import('../components/page404')
// home
const home = () =>import(/* webpackChunkName:  "group-index" */'../components/home/home')

const shortData = () =>import('../components/dataTemplate/shortData')
const midData = () =>import('../components/dataTemplate/midData')
const longData = () =>import('../components/dataTemplate/longData')
const commercial = () =>import('../components/commodityManagement/commercial')
const commercialSpecification = () =>import('../components/commodityManagement/commercialSpecification')
const commercialSpecificationDetails = () =>import('../components/commodityManagement/commercialSpecificationDetails')
const commercialSpecificationModify = () =>import('../components/commodityManagement/commercialSpecificationModify')
const commodityProperty = () =>import('../components/commodityManagement/commodityProperty')
const commodityPropertyList = () =>import('../components/commodityManagement/commodityPropertyList')
const commodityPropertyDetails = () =>import('../components/commodityManagement/commodityPropertyDetails')
const commodityPropertyModify = () =>import('../components/commodityManagement/commodityPropertyModify')
const tenant = () =>import('../components/tenantManagement/tenant')
const tenantManagement = () =>import('../components/tenantManagement/tenantManagement')
const tenantManagementAdd = () =>import('../components/tenantManagement/tenantManagementAdd')
let redirectRouter=function(routerName) {//重定向
    let activeRouter=store.state.activeRouter;
    for(let i=0;i<activeRouter.length;i++){
        if(activeRouter[i].name==routerName){
          return activeRouter[i].url;
          break;
        }
    }
  }
Vue.use(Router)
const routes = [
  { path: '*', component: page404},
  { path: '/', redirect: '/login' },
  { path: '/login', component: login,name:'login' },
  { path: '/register', component: register,name:'register' },
  { path: '/index', component: index,name:'index',redirect: '/home',
  beforeEnter: (to, from, next) => {//如果未登录,index路由包括其子路由会自动跳转/login
    store.commit('username');    
    if(store.state.username!=null){
      if(store.state.username.length>1){//多账号登录
        window.localStorage.clear();
        let flag=false;
        let x='';
        let names=[];
        for(let i=0;i<store.state.username.length;i++){
            let name=store.state.username[i].name;
            names.push(name);
          }
        if(store.state.alerts){
           x=prompt("当前登录"+names.length+"个账号,分别是："+names.join(',')+"请输入您将要登录的账号或者关闭浏览器重新登录或者注销账号重新登录");
        }
        if(x!=null && x!=""){
          let token='';
          let username='';
          for(let e=0;e<store.state.username.length;e++){
              let name=store.state.username[e].name;
              if(x==name){//vuex里面存在用户名和sessionStorage里面key值相等
                token=store.state.username[e].accessToken;
                username=name;
                flag=true;
                break;
              }else{
                flag=false;
              }
          }
          if(flag){
            store.state.alerts=false;
            store.state.name=x;
            store.state.accessToken=token;
            next();
          }else{
            store.state.alerts=true;
            alert('用户名错误');
            next('/login')
          }
        }else{
          alert('用户名不能为空');
        }
      }else if(store.state.username.length==1){
        store.state.name=store.state.username[0].name;
        store.state.accessToken=store.state.username[0].accessToken;
        next();
      }else{
        next('/login')
      }
    }else{
      next('/login')
    }
  },
children:[
  { path: '/home', component: home,name:'home' },
  { path: '/shortData', component: shortData,name:'shortData' },
  { path: '/longData', component: longData,name:'longData' },
  { path: '/midData', component: midData,name:'midData' },
  { path: '/tenant', component: tenant,name:'tenant',redirect: function(){//租户管理
    let name='tenant';
    let activeRouter=store.state.activeRouter;

    for(let i=0;i<activeRouter.length;i++){
        if(activeRouter[i].name==name){
          
          return activeRouter[i].url;

          break;
        }
    }
  },children:[
      { path: '/tenant/tenantManagement/:id', component: tenantManagement,name:'tenantManagement' },
      { path: '/tenant/tenantManagementAdd/:id', component: tenantManagementAdd,name:'tenantManagementAdd' },
  ]},
  { path: '/commercial', component: commercial,name:'commercial',redirect: function(){//租户管理
    let name='commercial';
    let activeRouter=store.state.activeRouter;

    for(let i=0;i<activeRouter.length;i++){
        if(activeRouter[i].name==name){
          
          return activeRouter[i].url;

          break;
        }
    }
  },children:[
      { path: '/commercial/commercialSpecification/:id', component: commercialSpecification,name:'commercialSpecification' },
      { path: '/commercial/commercialSpecificationDetails/:id', component: commercialSpecificationDetails,name:'commercialSpecificationDetails' },
      { path: '/commercial/commercialSpecificationModify/:id', component: commercialSpecificationModify,name:'commercialSpecificationModify' },
  ]},
  { path: '/commodityProperty', component: commodityProperty,name:'commodityProperty',redirect: function(){//租户管理
    let name='commodityProperty';
    let activeRouter=store.state.activeRouter;

    for(let i=0;i<activeRouter.length;i++){
        if(activeRouter[i].name==name){
          
          return activeRouter[i].url;

          break;
        }
    }
  },children:[
      { path: '/commodityProperty/commodityPropertyList/:id', component: commodityPropertyList,name:'commodityPropertyList' },
      { path: '/commodityProperty/commodityPropertyDetails/:id', component: commodityPropertyDetails,name:'commodityPropertyDetails' },
      { path: '/commodityProperty/commodityPropertyModify/:id', component: commodityPropertyModify,name:'commodityPropertyModify' },
  ]},
]}
]
const  router=new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes
})
router.beforeEach((to, from, next) => {
  store.commit('slidbarData');
  if(from.name=='login'){//如果用户登录，清楚缓存
    store.state.Alive=false;
  }else{
    store.state.Alive=true;
  } 
  if(store.accessToken!=''){
    document.title = to.name
    let activeRouter=store.state.activeRouter;
    let parent='';
    let url='';
    for(let i=0;i<activeRouter.length;i++){
      if(activeRouter[i].name==to.name){
        parent=activeRouter[i].parent;
        url=activeRouter[i].url;
        break
      }
    }
    for(let i=0;i<activeRouter.length;i++){
      if(activeRouter[i].name==parent){
        activeRouter[i].url=url
        break
      }
    }
  } 
   next()
})
export default router
