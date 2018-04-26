<template>
    <div>
		<el-input v-show="treeSearch" v-model="treeQuery" class="search_input" placeholder="搜索...">
			<i slot="prefix" class="el-input__icon el-icon-search"></i>
		</el-input>
		<vue-scroll :ops="$store.state.option"> 
			<el-tree
			:render-content="renderContent_componyTree"
			v-loading="treeLoading" 
			:highlight-current="true"
			:data="treeData"
			:props="defaultProps"
			:node-key="expandParams.expandId"
			:default-expanded-keys="expandParams.expandkey"
			ref="tree"
			:expand-on-click-node="false"
			:filter-node-method="filterNode"
			@node-click="nodeClick"
			>
			</el-tree>
		</vue-scroll>
    </div>
</template>
<script type="text/javascript">
	export default{
		//props: ['defaultProps','expandParams','treeSearch'], 
		props:{
			defaultProps:{type:Object},
			expandParams:{type:Object},
			treeSearch:{type:Boolean},
			treeParams:{type:Object}
		},
		data(){
			return{
				treeLoading:true,//加载动画
				treeQuery:'',//树节点过滤条件
			}
		},
		created() {
			this.$store.commit('setTableName',this.treeParams.treeName)//传递具体数据模型名称
			this.$store.commit('setInitTreeApi',this.treeParams.treeApi)//初始化接口地址
			this.$store.dispatch('InitTree');//初始化树型数据
			setTimeout(() => {
				this.treeLoading=false;
			}, 800);
		},
		computed:{
			treeData(){
				return this.$store.state[this.treeParams.treeName+'TreeData']
			},
		},
		watch:{
			treeQuery(val) {
                this.$refs.tree.filter(val);
            }
		},
	    methods:{
			filterNode(value, data) {//根据输入条件过滤树型
                if (!value) return true;
                 return data[this.defaultProps.label].indexOf(value) !== -1;
            },
			renderContent_componyTree(h, { node, data, store }){//添加树型文件夹图标
                if(typeof(data[this.defaultProps.children])!='undefined' && data[this.defaultProps.children]!=null && data[this.defaultProps.children].length>0){
                    return (
                        <span class="el-tree-node__label" data-id={data[this.defaultProps.id]}>
                        <i aria-hidden="true" class="preNode fa fa-folder-open" style="color:#f1c40f;margin-right:5px"></i>
                            {data[this.defaultProps.label]}
                        </span>
                    );
                }else{
                    return (
                        <span class="el-tree-node__label" data-id={data[this.defaultProps.id]}>
                        <i class="preNode fa fa-file" aria-hidden="true" style="color:#f1c40f;margin-right:5px"></i>
                            {data[this.defaultProps.label]}
                        </span>
                    );
                }
			},
			nodeClick(data){//树节点点击事件
				this.$emit('nodeClick',data);
			},
	    }
	}
</script>
<style>
@import"//at.alicdn.com/t/font_561828_maf6xgd190be29.css";
</style>