<template>
    <div class="layout" :class="{'layout-hide-text': spanLeft < 4}">
        <Row type="flex" >
            
            <i-col :span="spanLeft" class="layout-menu-left">
                <div style="background: #0672e5; height: 40px; width=100%; border-radius: 5%;">
                    <Icon type="md-subway" :size=32 color=white style="position: relative; top: 1%; left: 10%;" ></Icon>
                </div>
                <Menu 
                :unique-opened="true"
                :active-name="activeName" 
                width="auto"
                class="menu"
                theme="dark"
                accordion
                @on-select="turnUrl"
                ref='menu'
                >
                    <MenuItem name="/house" to="">
                            <Icon type="md-home" :size="iconSize" color=white></Icon>
                            <span class="layout-text">首页</span>
                    </MenuItem>
                    <Submenu name="/index2">
                        <template #title>
                            <Icon type="md-clipboard" :size="iconSize" color=white></Icon>
                            <span class="layout-text">检修作业</span>
                        </template>
                    </Submenu>
                    <Submenu name="/index3">
                        <template #title>
                            <Icon type="ios-paper" :size="iconSize" color=white></Icon>
                            <span class="layout-text">检测记录</span>
                        </template>
                        <MenuItem name="/index3/detection" to="/detection">
                            <span style="font-size: 16px;">2D检测</span>
                        </MenuItem>
                        <MenuItem name="/index3/3Ddetection" to="/3Ddetection">
                            <span style="font-size: 16px;">3D检测</span>
                        </MenuItem>
                    </Submenu>
                    <Submenu name="/index4">
                        <template #title>
                            <Icon type="ios-stats" :size="iconSize" color=white></Icon>
                            <span class="layout-text">统计管理</span>
                        </template>
                    </Submenu>
                    <Submenu name="/index5">
                        <template #title>
                            <Icon type="logo-youtube" :size="iconSize" color=white></Icon>
                            <span class="layout-text">铁路管理</span>
                        </template>
                    </Submenu>
                    <Submenu name="/index5">
                        <template #title>
                            <Icon type="md-calculator" :size="iconSize" color=white></Icon>
                            <span class="layout-text">设备管理</span>
                        </template>
                    </Submenu>
                    <Submenu name="/index6">
                        <template #title>
                            <Icon type="md-settings" :size="iconSize" color=white></Icon>
                        <span class="layout-text">系统管理</span>
                        </template>
                    </Submenu>
                </Menu>
            </i-col>
            <i-col :span="spanRight">
                <div class="layout-header">
                    <div style="position: absolute; left: 1%; top: 1%;">
                        <Icon type="ios-menu" :size=32 @click="toggleClick" color="#d7dde4"></Icon>
                    </div>
                    <div style="padding: 0%;width:80%;">
                        <span class="tittle">{{tittle}}</span>
                    </div>
                    <div style="position: absolute; left: 83%; top: 0%;">
                        <Button shape="circle" size="large" icon="ios-bulb-outline" style="background-color:#013a76; border: none; font-size: 20px; color: white;">提示</Button>
                    </div>
                    <div style="position: absolute; left: 91%; top: 0%;">
                        <Button shape="circle" size="large" icon="ios-contact-outline" style="background-color:#013a76; border: none; font-size: 20px; color: white;" >用户</Button>
                    </div>
                </div>
                
                <div id="app" class="layout-content">
                    
                    <router-view></router-view>
                </div>
                <div class="layout-copy">
                    2022 &copy; SHU
                </div>
            </i-col>
        </Row>
    </div>
    
</template>

<script>
// 创建路由实例对象
export default {
    name: 'app',
    data() {
    return {
        spanLeft: 4,
        spanRight: 20,
        model: "0",
        activeName: "",
        tittle: "地铁智能化综合检测系统"
    }   
    },
    computed: {
        iconSize () {
            return this.spanLeft === 4 ? 20 : 24;
        }
    },
    created() {
        // if (window.sessionStorage.getItem('activePath') != null){
        //     this.activeName = window.sessionStorage.getItem('activePath')
        // }
        this.$router.path = '/'
        window.sessionStorage.clear()

    },
    methods: {
        toggleClick () {
            if (this.spanLeft === 4) {
                this.spanLeft = 2;
                this.spanRight = 22;
            } else { 
                this.spanLeft = 4;
                this.spanRight = 20;
            }
        },
        turnUrl(e){
            if (this.activeName != e){
                this.activeName = e
                window.sessionStorage.setItem('activePath', this.activeName)
                this.$router.path = e
                // console.log(e)
            }
        },
        mounted(){
        }
    },
    
}
</script>
<style lang="less" scoped>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
    }
    .layout-breadcrumb{
        padding: 10px 15px 0;
    }
    .layout-content{
        // position: fixed;
        min-height: 650px;
        margin: 10px;
        overflow: hidden;
        background: #fff;
        border-radius: 4px;
        // overflow-x:auto;
        // overflow-y:hidden;
        // white-space: nowrap;
    }
    .layout-copy{
        // width: 150px;
        min-height: 100px;
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }
    .layout-menu-left{
        background: #013a76;
        border-radius: 1%;
    }
    .layout-header{
        height: 60px;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
        border: 0em;
        background: #013a76;
        border-radius: 1%;
    }
    .layout-logo-left{
        width: 90%;
        height: 30px;
        background: #5b6270;
        // background: #2C8CF0;
        border-radius: 3px;
        margin: 15px auto;
    }
    .layout-ceiling-main a{
        color: #9ba7b5;
    }
    .layout-hide-text .layout-text{
        display: none;
        
    }
    .layout-text{
        position: absolute;
        font-size: 18px;
        top: 25%;
        left: 20%;
        color: #fff;
    }
    .ivu-col{
        transition: width .2s ease-in-out;
    }
    .tittle{
        position: absolute;
        
        color: #fff;
        font-size: 25px;
        left: 40%;
        top: 1%;
        margin: 0%;
        padding: 0%;
    }
    .menu{
        top: 0%;
        background: #013a76;
        // background: #0672e5;
        
    }

</style>