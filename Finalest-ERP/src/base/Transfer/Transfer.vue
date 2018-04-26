<template>
    <el-row >
        <el-col :span="11" class="transfer_warapper">
            <el-col :span="24" class="transfer_header">
                <span>已选</span>
                <div class="transfer_search" @keyup.enter="searchSelected">
                    <el-input
                        placeholder="搜索..."
                        v-model="querySelected"
                        class="search_input"
                        >
                        <i slot="prefix" class="el-input__icon el-icon-search"></i>
                    </el-input>
                </div>    
            </el-col>    
            <el-col :span="24" class="transfer_table">
                <el-table ref="multipleTable" :data="selectedTable" @selection-change="handleSelected" border style="width: 100%" height="250">
                    <el-table-column type="selection" label="" width="50">
                    </el-table-column>
                    <el-table-column v-for="item in OptionalCols" :key="item.prop" :label="item.label" :prop="item.prop" >
                    </el-table-column>
                </el-table>
                <el-pagination
                    v-show='selectedTable.length>0'
                    class="fr mt10"
                    small
                    layout="prev, pager, next"
                    :total="selectedTable.length">
                </el-pagination>
            </el-col>
        </el-col>
        <el-col :span="2" class="transfer_btns">
            <el-col :span="24" class="transfer_btn_wrapper">
                <el-button class="el_transfer" :disabled="toSeletedBtn"  @click="optionalToSeleted" type="primary" icon="el-icon-arrow-left" round></el-button>
                <el-button class="el_transfer" :disabled="toOptionalBtn" @click="seletedToOptional" type="primary" icon="el-icon-arrow-right" round></el-button>
            </el-col>
        </el-col>
        <el-col :span="11" class="transfer_warapper">
            <el-col :span="24" class="transfer_header">
                <span>可选</span>
                <div class="transfer_search" @keyup.enter="searchOptional">
                    <el-input
                        placeholder="搜索..."
                        v-model="queryOptional"
                        class="search_input"
                        >
                        <i slot="prefix" class="el-input__icon el-icon-search"></i>
                    </el-input>
                </div>
            </el-col>    
            <el-col :span="24" class="transfer_table">
                <el-table ref="multipleTable"  :data="OptionalTable" @selection-change="handleOptional" border style="width: 100%" height="250">
                    <el-table-column type="selection" label="" width="50">
                    </el-table-column>
                    <el-table-column v-for="item in OptionalCols" :key="item.prop" :label="item.label" :prop="item.prop" >
                    </el-table-column>
                </el-table>
                <el-pagination
                    v-show='OptionalTable.length>0'
                    class="fr mt10"
                    small
                    layout="prev, pager, next"
                    :total="OptionalTable.length">
                </el-pagination>
            </el-col>
        </el-col>
    </el-row>
</template>
<script type="text/javascript">
	export default{
		props: ['transferHttpSetting','OptionalCols'], 
		data(){
			return{
                querySelected:'',//已选搜索
                queryOptional:'',//可选搜索
                OptionalHandle:[],//可选项勾选数据
                selectedHanled:[],//已选项勾选数据
                selectedTable:[],//已选表格数据模型
                toOptionalBtn:true,
                toSeletedBtn:true,
			}
		},
		created() {
            this.$store.commit('setTransferName',this.transferHttpSetting.transferName)
            this.$store.commit('setTransferApi',this.transferHttpSetting.transferApi)
            this.$store.commit('setTransferParams',this.transferHttpSetting.transferParams)
            this.$store.dispatch('InitTransfer');//初始化可选表格数据
        },
        watch:{
            selectedTable:{
                handler:function(val,oldVal){
                    this.$emit('transferConfirm',this.selectedTable);
                },
                deep:true
            }
        },
        computed:{
            OptionalTable(){
                return  this.$store.state[this.transferHttpSetting.transferName+'Table'];   
            }
        },
	    methods:{
            handleSelected(val){//操作已选表格数据
                if(val.length>0){
                    this.selectedHanled=val;
                    this.toOptionalBtn=false;
                }else{
                    this.toOptionalBtn=true;
                }
            },
            handleOptional(val){//操作可选表格数据
                if(val.length>0){
                    this.OptionalHandle=val;
                    this.toSeletedBtn=false;
                }else{
                    this.toSeletedBtn=true;
                }
            },
            seletedToOptional(){//已选到可选
                for(let i in this.selectedHanled){//循环添加至已选数据模型
                     this.$store.state[this.transferHttpSetting.transferName+'Table'].push(this.selectedHanled[i]);
                }
                this.selectedTable=this.array_diff(this.selectedHanled, this.selectedTable);
                this.selectedHanled=[];//置空选中集合
            },
            optionalToSeleted(){//可选到已选
                for(let i in this.OptionalHandle){//循环添加至已选数据模型
                    this.selectedTable.push(this.OptionalHandle[i]);
                }
                this.$store.state[this.transferHttpSetting.transferName+'Table']=this.array_diff(this.OptionalHandle, this.$store.state[this.transferHttpSetting.transferName+'Table']);
                this.OptionalHandle=[];//置空选中集合
            },
            array_diff(a, b) {//求两个json数组的并集
                return diff(a, b).concat( diff(b, a) );
                function diff(a, b) {
                    var c = {};
                    b.forEach(function(o){ c[ JSON.stringify(o) ] = 0 });
                    a.forEach(function(o){ delete c[ JSON.stringify(o) ]; });
                    return Object.keys(c).map(JSON.parse);
                }
            }
	    }
	}
</script>
<style>
@import"//at.alicdn.com/t/font_561828_maf6xgd190be29.css";
button.erp_bt[disabled] {
    cursor: not-allowed;
    background: #ccc;
}
</style>