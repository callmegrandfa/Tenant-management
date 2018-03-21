
<template>
    <el-row class="h48 pt5">
    		<div class="ml5" style="float:left" v-for="item in date.botton">
    			<button v-show="item.show" :class="item.class" @click="selectItem(item)" ><div class="btImg"><img  :src="item.imgsrc"></div><span :class="String(item.imgsrc)" class="btDetail">{{item.text}}</span></button>
    		</div>                   
    </el-row>
</template>
<script type="text/javascript">
	export default{
		props: ['date'], 
		data(){
			return{
				stop:'',
				
			}
		},
		created() {
	      
	    },
	    methods:{
	    	selectItem(item){
	    		let _this=this;
	    		if(item.class=='erp_bt bt_add'|| item.class=='erp_bt bt_back'){
	    			this.$store.state.url=`${this.date.url}/default`
           		    this.$router.push({path:this.$store.state.url})//点击切换路由
	    		}else if(item.text == '保存' && item.class == 'erp_bt bt_save'){
	    			_this.stop='新增保存';
	    			this.$emit('listbtm', _this.stop)
	    		}else if(item.text == '保存' && item.class == 'erp_bt bt_save amend_save'){
	    			_this.stop='修改保存';
	    			this.$emit('listbtm', _this.stop)
	    		}else{
	    			_this.stop= item.text;
	    			this.$emit('listbtm', _this.stop)
	    		} 
	    	}
	    }
	}
</script>
<style scoped>
	.false{
		padding: 0;
	}
	.h48{
	    height: 48px;
	    line-height: 48px;
	    border-bottom: 1px solid #E4E4E4;
	}
	.pt5{
	    padding-top: 5px;
	}
	.ml5:first-child{
		margin-left: 5px;
	}
	.erp_bt:first-child{
		margin-left: 0px;
	}
	.bt_audit{
	    background-color: rgb(225,153,51);
	}
	.bt_in{
	    background-color: rgb(130,170,252);
	}
	.bt_save_add{
	    background-color: rgb(22,155,213);
	}
	.bt_interposition{
		background-color: rgb(102,153,255)
	}
	.bt_eraseline{
		background-color: rgb(255,102,0);
	}
</style>