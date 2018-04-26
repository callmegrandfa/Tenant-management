<template>
    <div class="customer-infor-wrapper commodity" >
        <div id="left-box"  class="left-box">    
            <el-row class="bg-white" v-show="ifWidth">
                <el-col :span="24">
                    <el-row class="h48 pl15">
                        <el-col :span="18">
                            <img src="../../../static/image/common/search_btn.png"  class="closeLeft">
                            <span>查询</span>
                        </el-col>
                        <el-col :span="2" :offset="4">
                            <span class="fs12 search_info_open" @click="closeLeft">-</span>
                        </el-col>
                    </el-row>
                    <div style="margin-top:20px">
                        <el-row>
                            <el-col :span="9">
                                <div class="bgcolor smallBgcolor">
                                <label >类目名称</label>
                            </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="bgcolor smallBgcolor">
                                <el-input v-model="queryParams.CategoryName"></el-input>
                                </div>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="9">
                                <div class="bgcolor smallBgcolor">
                                <label >类目编码</label>
                            </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="bgcolor smallBgcolor">
                                <el-input v-model="queryParams.CategoryCode"></el-input>
                                </div>
                            </el-col>
                        </el-row>
                        <el-row >
                            <el-col :span="9" >
                                <div class="bgcolor smallBgcolor">
                                    <label><small></small>服务类(虚拟)</label>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="bgcolor smallBgcolor">
                                    <el-select  v-model="queryParams.IsService">
                                        <el-option v-for="item in SystemOptions" :key="item.value" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                            </el-col>
                        </el-row>
                        <el-row >
                            <el-col :span="9" >
                                <div class="bgcolor smallBgcolor">
                                    <label><small></small>状态</label>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="bgcolor smallBgcolor">
                                    <el-select  v-model="queryParams.Status" >
                                        <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                    <el-row>
                        <el-col :span="9">
                            <div class="height1"></div>
                        </el-col>
                        <el-col style="text-align:center;margin-bottom:20px;" :span="14">
                            <span class="search-btn" @click="query"  style="float:left;">查询</span>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </div>
        <div id="bgj">
            <el-row >
                <el-col :span="24" class="border-left" id="bg-white" >
                	<el-col :span="ifWidth?0:2" class="search-block">
                        <div @click="openLeft">
                            <img src="../../../static/image/common/search_btn.png">
                            <span>查询</span>
                            <span class='open-search'>+</span>
                        </div>
                    </el-col>
	                <el-col :span="ifWidth?24:22">
                        <div class="btnGroup-box">
	                	    <buttonGroup :buttonGroup="buttonGroup" @btnClick='btnClick'></buttonGroup>    
                        </div>
	                </el-col>
                    <el-row style="float:left;width:100%;">
                        <el-col :span="5" class="tree-container">
                            <Tree :defaultProps='defaultProps' :expandParams='expandParams' :treeSearch='treeSearch' :treeParams='treeParams' @nodeClick="TreeNodeClick"></Tree>
                        </el-col>
                        <el-col :span="19">
                            <Table  :methodsUrl="httpUrl" :pluginSetting='pluginSetting' :queryParams="queryParams" :cols="column" :tableName="tableModel"  :command="command"></Table>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
            <dialogBox :errorTips='errorTips' :dialogSetting='dialogSetting' :dialogVisible="dialogVisible"  :dialogCommand='dialogCommand'  @dialogClick="dialogClick"></dialogBox>     
        </div>   
    </div>
</template>

<script>
import buttonGroup from '../../base/buttonGroup/buttonGroup'
import Table from '../../base/Table/Table'
import dialogBox from '../../base/dialog/dialog'
import Tree from '../../base/tree/tree'
    export default{
        name:'customerInfor',
        data(){
            return {
            	ifWidth:true,
                try:{
                "groupId": 2,
                "stockId": 1,
                "addressId": 8,
                "completeAddress": "str33ing",
                "transportMethodId": 1,
                "contactPerson": "stri55ng",
                "phone": "18200326666",
                "logisticsCompany": "str55ing",
                "isDefault": true,
                "remark": "st54ring"
                },
                tableLoading:true,
                dialogVisible:false,
                dialogSetting:{
                    message:'',//提示信息
                    dialogName:'',//对话框名称
                    dialogType:'',//对话框类型
                },
                dialogCommand:[],
                errorTips:{//对话框 错误提示
                    message:'',
                    details:'',
                },
                buttonGroup:[{
                    text:'新增',
                    class:'bt_add',
                    icon:'icon-xinzeng',
                    disabled:false,
                },{
                    text:'删除',
                    class:'bt_del',
                    icon:'icon-shanchu',
                    disabled:false,
                },{
                    text:'审核',
                    class:'bt_audit',
                    icon:'icon-shenhe',
                    disabled:false,
                },{
                    text:'导入',
                    class:'bt_in',
                    icon:'icon-daoru',
                    disabled:false,
                },{
                    text:'导出',
                    class:'bt_out',
                    icon:'icon-daochu',
                    disabled:false,
                }],
                httpUrl:{
                   //Initial:'/api/services/app/CategoryManagement/GetAll',//数据初始化
                   view:'/commodityleimu/CommodityCategoriesDetails/',//查看详情
                   delete:'/api/services/app/CategoryManagement/Delete',//单条删除
                   query:'/api/services/app/CategoryManagement/GetListByCondition',//条件查询
                   treeQuery:'/api/services/app/CategoryManagement/GetCategoryList',//树节点查询
                },
                queryParams:{//查询条件参数
                    CategoryId:'',
                    CategoryCode:'',
                    CategoryName:'',
                    IsService:'',
                    Status:'',
                    SkipCount:(this.$store.state.commodityClassHeadingCurrentPage-1)*this.$store.state.commodityClassHeadingEachPage,
                    MaxResultCount:this.$store.state.commodityClassHeadingEachPage,
                },
                column: [{
                    prop: 'categoryParentid_CategoryName',
                    label: '上级类目',
                    controls:'text',
                    isDisable:true,
                    sortable:false,
                    }, {
                    prop: 'categoryCode',
                    label: '类目编码',
                    controls:'text',
                    isDisable:true,
                    sortable:false,
                    }, {
                    prop: 'categoryName',
                    label: '类目名称',
                    controls:'text',
                    isDisable:true,
                    sortable:false,
                    }, {
                    prop: 'status',
                    label: '状态',
                    controls:'select',
                    isDisable:true,
                    sortable:false,
                    dataSource:[],
                    }, {
                    prop: 'mnemonic',
                    label: '助记码',
                    controls:'text',
                    isDisable:true,
                    sortable:false,
                    }, {
                    prop: 'isService',
                    label: '服务类',
                    controls:'checkbox',
                    isDisable:true,
                    sortable:false,
                }],
                pluginSetting:{
                    hasPagination:true,
                    mutiSelect:true,//多选栏
                    isDisable:true,
                },
                command:[{
                    text:'查看',
                    class:'green'
                },{
                    text:'删除',
                    class:'blue'
                }],
                statusOptions:[{
                        value: 1,
                        label: '启用'
                    },{
                        value: 0,
                        label: '未启用'
                    }],
                enableEdit:true,
                tableModel:'commodityClassHeading',
                SystemOptions: [{
                    value: null,
                    label: '全部'
                    }, {
                    value: false,
                    label: '否'
                    }, {
                    value: true,
                    label: '是'
                    }],
                value: '',
                classTree:  [//类目tree
                    // {areaName:'根目录',id:'0',items:[]},
                ],
                defaultProps: {//tree渲染参数
                    children:'childNodes',
                    label:'categoryName',
                    id:'id',
                },
                expandParams:{//默认展开节点参数控制
                    expandId:'id',
                    expandkey:[],
                },
                treeSearch:false,//是否包含树节点过滤功能
                treeParams:{
                    treeName:'commodityClassHeading',//树节点名称
                    treeApi:'/api/services/app/CategoryManagement/GetCategoryTree',//接口地址
                },
                delAarry:{
                    ids:[]
                },
                tableData: [],
                currentPage:1,//分页的当前页码
                eachPage:10,//每页有多少条信息
                totalPage:100,//当前分页总数
                SelectionChange:[],//多选集合
                routerCategoryName:'',
            }
        },
        mounted:function(){   
            let content1=document.getElementById('bg-white');//设置高度为全屏
            let height1=window.innerHeight-123;
            content1.style.minHeight=height1+'px';
        },
        created:function(){ 
            this.InitStatus();      
        },
        watch:{
            queryParams:{
                handler:function(val,oldVal){
                     
                },
                deep:true
            },
        },
        methods:{
        	closeLeft:function(){
                let self = this;
                self.ifWidth = false;
                let obgh=document.getElementById('bgj');
                obgh.style.width="100%";
            },
            openLeft:function(){
               let self = this;
               self.ifWidth = true;
               let obgh=document.getElementById('bgj');
                obgh.style.width="calc(100% - 340px)";
            },
            btnClick:function(data){
                if(data=="新增"){
                   this.add();
                }else if(data=="删除"){
                    this.SelectionChange= this.$store.state[this.tableModel+'Selection'];
                    if(this.SelectionChange.length==0){
                        this.$message({
                            type: 'info',
                            message: '请勾选需要更改删除的记录！'
                        });
                    }else{
                        this.dialogSetting.dialogName='delDialog'
                        this.dialogSetting.message="确定删除？";
                        this.dialogSetting.dialogType="confirm";
                        this.dialogCommand=[{text:'确定',class:'btn-confirm'},{text:'取消',class:'btn-cancel'}];
                        this.dialogVisible=true;
                    }        
                }
                let oleftBox=document.getElementById('left-box');
                oleftBox.style.display="block";
                let ocate= document.getElementById('bgj')
                ocate.style.width="calc(100% - 340px)";
            },
            add(){//新增页面跳转
                this.$store.state.url='/commodityleimu/CommodityCategoriesDetails/default'
           		this.$router.push({path:this.$store.state.url,query:{CategoryId:this.queryParams.CategoryId,CategoryName:this.routerCategoryName}})//点击切换路由
            },
            querylog:function(data){
                let _this=this;
                if(data){
                    let ocate= document.getElementById('bgj')
                    ocate.style.width="100%";
                    _this.bottonbox.botton.push({
                        class: 'erp_bt bt_auxiliary',
                        imgsrc: '../../../static/image/common/bt_stop.png',
                        text: '查询'
                    })
                }
            },
            InitStatus(){
                let _this=this;
                _this.$axios.gets('/api/services/app/DataDictionary/GetDictItem',{dictName:'Status002'}).then(function(res){
                    _this.column[3].dataSource=res.result;
                })
            },
            TreeNodeClick(data){//树节点点击回调             
                let _this=this;
                _this.queryParams.CategoryId=data.id;
                _this.routerCategoryName=data.categoryName
                _this.tableLoading=true;
                    _this.$axios.gets('/api/services/app/CategoryManagement/GetListByCondition',_this.queryParams).then(function(res){                     
                        _this.$store.commit('Init_Table',res.result.items);
                        let totalPage=Math.ceil(res.result.totalCount/_this.$store.state.commodityClassHeadingEachPage);
                        _this.$store.commit('Init_pagination',totalPage);
                        _this.$store.commit('Init_TotalCount',res.result.totalCount);
                        _this.$store.commit('setCurrentPage',1)//设置当前页码为初始值1    
                    })
            },
            query(){//条件查询
                let _this=this;
                _this.$axios.gets('/api/services/app/CategoryManagement/GetListByCondition',_this.queryParams).then(function(res){//查询表格数据
                    _this.queryParams.CategoryId="";
                    _this.$store.commit('setQueryParams',_this.queryParams)
                    _this.$store.commit('Init_Table',res.result.items); 
                    let totalPage=Math.ceil(res.result.totalCount/_this.$store.state.commodityClassHeadingEachPage);
                    _this.$store.commit('Init_pagination',totalPage) 
                    _this.$store.commit('Init_TotalCount',res.result.totalCount);
                    _this.$store.commit('setCurrentPage',1)//设置当前页码为初始值1                       
                })
                _this.$axios.gets('/api/services/app/CategoryManagement/SearchTree',{//查询树形数据
                    CategoryCode:_this.queryParams.CategoryCode,
                    CategoryName:_this.queryParams.CategoryName,
                    IsService:_this.queryParams.IsService,
                    Status:_this.queryParams.Status
                }).then(function(res){
                    _this.$store.commit('Init_Tree',res.result);
                }).catch(function(err){
                });;
            },
            open(tittle,iconClass,className) {//提示框
                this.$notify({
                position: 'bottom-right',
                iconClass:iconClass,
                title: tittle,
                showClose: false,
                duration: 3000,
                customClass:className
                });
            },
            dialogClick(parmas){//对话框按钮点击事件
                if(parmas.dialogButton=="确定"){
                    if(parmas.dialogName=="delDialog"){
                        this.SelectionChange= this.$store.state[this.tableModel+'Selection'];
                        console.log(this.SelectionChange);
                        for(var i in this.SelectionChange){
                            this.delAarry.ids.push(this.SelectionChange[i].id)
                        }
                        let _this=this;
                       
                       //批量删除
                        _this.$axios.posts('http://192.168.100.107:8082/api/services/app/CategoryManagement/BatchDelete',_this.delAarry).then(function(res){
                                _this.queryParams.CategoryId="";
                                _this.$store.commit('setQueryParams',_this.queryParams)
                                _this.$store.dispatch('InitTable');
                                _this.$store.commit('setTableSelection',[])
                                _this.dialogVisible=false;
                                _this.loadTree();
                                _this.delAarry.ids=[];
                                _this.open('删除成功','el-icon-circle-check','successERP');    
                        }).catch(function(err){
                            _this.dialogVisible=false;
                            _this.delAarry.ids=[];
                            _this.$message({
                                type: 'warning',
                                message: err.error.message
                            });
                        });
                    }
                }else if(parmas.dialogButton=="取消"){
                    this.dialogVisible=false;
                }
                      
                  
            },
            
        },
        components:{
            buttonGroup,
            Table,
            dialogBox,
            Tree
        }
    }
</script>

<style scoped>
.bg-white{
    background: white;
    border-radius: 3px;
}
.h48{
    height: 48px;
    line-height: 48px;
    border-bottom: 1px solid #E4E4E4;
}
.open-search{
    background-image: url(../../../static/image/common/btn-circle.png);
    background-repeat: no-repeat;
    background-position: center;
    color: #E3E3E3;
    font-size: 12px;
    width: 19px;
    float: right;
    margin-right: 10px;
} 
.pl10{
    padding-left: 10px;
}
.pl15{
    padding-left: 15px;
}
.pt10{
    padding-top: 10px;
}
.pb10{
    padding-bottom: 10px;
}
.pr10{
    padding-right: 10px;
}
.border-left{
    border-left: 1px solid #E4E4E4;
}
.biao{
    float: left;
    width: calc(100% - 200px)
}
#bgj{
    float: left;
    width: calc(100% - 340px);
}
.tree-container{
    height: 450px;
}
.tree-container>div{
    height: 100%;
}
</style>

<style>
.fs14{
    font-size: 14px;
    color: rgba(0, 0, 0, 0.349019607843137);
}
.fs12{
    font-size: 12px;
}
.open{
    display: inline-block;
    width: 49px;
    height: 22px;
    line-height: 22px;
    border: 1px solid #cccccc;
    color: #cccccc;
    text-align: center;
    cursor: pointer;
}
.search-btn{
        font-size: 12px;
        display: inline-block;
        width: 87px;
        height: 30px;
        line-height: 30px;
        border-radius: 3px;
        background: #4A6997;
        color: white;
        cursor: pointer;
    }
.el-checkbox__inner{
    width: 18px;
    height: 18px;
    background: #f4f4f5;
}
.el-checkbox__inner::after{
    left: 4px;
    top: -2px;
}
</style>