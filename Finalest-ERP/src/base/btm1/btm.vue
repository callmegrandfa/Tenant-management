
<template>
	<div>
    <el-row class="h48 pt5">
    		<div class="ml5" style="float:left" v-for="item in date.botton" >
    			<button   v-show="item.show" class="abc" :class="[item.class,item.increased.toString()]" @click="selectItem(item)" ><div class="btImg"><img  :src="item.imgsrc"></div><span :class="String(item.imgsrc)" class="btDetail">{{item.text}}</span></button>
    		</div>                   
    </el-row>
    <!-- dialog数据变动提示 -->
        <el-dialog :visible.sync="dialogUserConfirm" class="dialog_confirm_message" width="25%">
            <template slot="title">
                <span class="dialog_font">提示</span>
            </template>
            <el-col :span="24" style="position: relative;">
                <el-col :span="24">
                    <p class="dialog_body_icon"><i class="el-icon-warning"></i></p>
                    <p class="dialog_font dialog_body_message">此操作将忽略您的更改，是否继续？</p>
                </el-col>
            </el-col>
            
            <span slot="footer">
                <button class="dialog_footer_bt dialog_font" @click="sureDoing">确 认</button>
                <button class="dialog_footer_bt dialog_font" @click="dialogUserConfirm = false">取 消</button>
            </span>
        </el-dialog>
    <!-- dialog -->
    </div>
</template>
<script type="text/javascript">
	export default{
		props: ['date'], 
		data(){
			return{
				stop:'',
				dialogUserConfirm:false,//信息更改提示控制
			}
		},
		created() {
	      
	    },
	    methods:{
	    	selectItem(item){
	    		let _this=this;
	    		if(item.class=='erp_bt bt_add'|| item.class=='erp_bt bt_back'){
	    			if(item.update){
	    				_this.dialogUserConfirm=true;
	    			}else{
	    				// if(this.date.Add){
	    					if(typeof(item.detailParentId)=='number'){
		                    	this.$store.state.url=this.date.url +'/'+ item.detailParentId;
		           		    	this.$router.push({path:this.$store.state.url})//点击切换路由
		           		    }else{
		           		    	this.$store.state.url=`${this.date.url}/default`
	           		    		this.$router.push({path:this.$store.state.url})//点击切换路由
		           		    }
	    				// }else{
	    				// 	// alert('该树目前只能新增2级');
	    				// 	this.$store.state.url=`${this.date.url}/default`
	        //    		    	this.$router.push({path:this.$store.state.url})//点击切换路由
	    				// }
                	}	
	    		}else if(item.text == '保存'){
	    			_this.stop='新增保存';
	    			this.$emit('listbtm', _this.stop)
	    		}else{
	    			_this.stop= item.text;
	    			this.$emit('listbtm', _this.stop)
	    		} 
	    	},
	    	sureDoing(){
	    		this.$store.state.url=`${this.date.url}/default`
           		this.$router.push({path:this.$store.state.url})//点击切换路由
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
	.false{
		background-color: #ccc !important;
		padding: 0 10px !important;
	}
</style>
<style>
	
</style>