<template>
  <div>
    <app-header></app-header>
    <div class="wrapper">
      <app-sidebar></app-sidebar>
      <app-content></app-content>
    </div>   
  </div>
</template>

<script>
import header from './header'
import sidebar from './sidebar'
import content from './content'

export default {
  name: 'index',
  components: {
    'app-header':header,
    'app-sidebar':sidebar,
    'app-content':content,
  },
  data(){
      return{
          go:0,
      }
  },
  mounted:function(){
    let _this=this;
    $('body').on('mousedown','.el-tree-node__expand-icon',function(e){
        $('.TreeMenu').css({
                display:'none'
            })
    }).on('click',function(){
        $('.TreeMenu').css({
              display:'none'
          })
    })

      _this.go=document.getElementById('window').offsetWidth;//页签每次移动的长度
      let content=document.getElementById('contents');//设置高度为全屏
      let height=window.innerHeight-123;
      content.style.minHeight=height+'px';
      window.onresize = function(){
        let he=window.innerHeight-123;
        content.style.minHeight=he+'px';
        _this.$store.state.slidbarHeight=$(window).height();

        $('.menu').css({height:_this.$store.state.slidbarHeight-43+'px'}) 
        $('.slid1').each(function(){
            $(this).css({
                height:_this.$store.state.slidbarHeight-93+'px'
            })
        })
        $('.slid2').each(function(x){
            $(this).css({
                height:_this.$store.state.slidbarHeight-93+'px'
            })
            if($(this).height()<$(this).children('.three').length*50){
                $(this).css({width:'470px'})
            }else{
                $(this).css({width:'235px'})
            }
        })
    }

      $(window).scroll(function(){
        if($(window).scrollTop()>61){
          if(!_this.$store.state.show){
            $('.fixed').css({
              position:'fixed',
              top:'93px',
              zIndex:'998',
              width:'calc(100% - 265px)',
              transition: 'width 0s'
            }).next('div').css({marginTop:$('.fixed').height()})
          }else{
             $('.fixed').css({
              position:'fixed',
              top:'93px',
              zIndex:'998',
              width:'calc(100% - 80px)',
              transition: 'width 0s'
            }).next('div').css({marginTop:$('.fixed').height()})
          }
          _this.$store.commit('go1');
        }else{
          $('.fixed').css({
            position:'relative',
            top:'0',
            width:'100%',
            transition: 'width 0s'
          }).next('div').css({marginTop:0})
          _this.$store.commit('go2');
        }
      })
  },
}
</script>
<style scoped>
.wrapper{
  padding-top: 50px;
  position: relative;
  overflow: hidden;
}
</style>

