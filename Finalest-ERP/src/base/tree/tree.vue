<template>
	<div style="min-width:200px;width:200px;float:left;">
        <el-col :span='24' class="tree-container pl10 pt10">
            <el-tree :data="datc"></el-tree>
        </el-col>
    </div>
</template>
<script type="text/javascript">
	export	default{
		props:['datc'],
		data(){
			return{
				
			}
		}
	}
</script>
<style scoped >
	.el-tree{
	    background-color: transparent;
	}
	.pt10{
	    padding-top: 10px;
	}
	.pl10{
	    padding-left: 10px;
	}
</style>