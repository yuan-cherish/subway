<template>
    <div>
        <!-- <div class="content-head">
            <Button 
            type="primary" 
            size="large" 
            style="position: relative; left:20px; font-size: 20px; margin-bottom: 10px;"
            icon="ios-cloud-upload-outline" 
            @click="compare"
            >
            <span v-if="!playingStatus" style="font-size:18px;">开始对比</span>
            <span v-if="playingStatus" style="font-size:18px;">停止对比</span>
            </Button>
            <span style="font-size:30px; margin-bottom: 10px; position: absolute; top: 10rem; left: 45rem;">缺陷内容</span>
            <Table 
            class="qx_table"
            :columns="columns" 
            :data="data"
            height="350" 
            size="default" 
            stripe 
            border
            style="border-radius: 1%; position: relative; top: 30px;"
            ></Table>
        </div> -->
        <div id="cloud">
            <div id="container"></div>
            <div id="container1"></div>
        </div>
    </div>
    
</template>
<script>
import Vue from 'vue'
import * as THREE from "three";
import { OrbitControls} from "three/examples/jsm/controls/OrbitControls"
import {PCDLoader} from "three/examples/jsm/loaders/PCDLoader"

// 创建路由实例对象
export default {
    data() {
    return {
        number: '100',
        orign_images: [],
        result_images: [],
        playingStatus: false,
        columns: [
                {
                    title: '',
                    align: 'center',
                    key: 'index'
                },
                {
                    title: '是否有划痕',
                    align: 'center',
                    sortable: true,
                    key: 'huahen',
                    render: (h, params)=>{
                        if (params.row.huahen == '有'){
                            return h('div', {
                                'style': {
                                    'background': 'red'
                                }
                            }, params.row.huahen)
                        }else{
                            return h('div', {}, params.row.huahen)
                        }
                    }
                },
                {
                    title: '是否有异物',
                    align: 'center',
                    sortable: true,
                    key: 'yiwu',
                    render: (h, params)=>{
                        if (params.row.yiwu == '有'){
                            return h('div', {
                                'style': {
                                    'background': 'red'
                                }
                            }, params.row.yiwu)
                        }else{
                            return h('div', {}, params.row.yiwu)
                        }
                    }
                },
                {
                    title: '车厢序号',
                    align: 'center',
                    sortable: true,
                    key: 'location'
                }
            ],
        data: [
            {
                index: 1,
                huahen: '无',
                yiwu: "有",
                location: '4',
            },
            {
                index: 2,
                huahen: '有',
                yiwu: "有",
                location: '4',
            },
            {
                index: 3,
                huahen: '有',
                yiwu: "无",
                location: '3',
            },
            {
                index: 4,
                huahen: '无',
                yiwu: "有",
                location: '5',
            },
            {
                index: 5,
                huahen: '无',
                yiwu: "无",
                location: '2',
            },
            {
                index: 6,
                huahen: '无',
                yiwu: "有",
                location: '1',
            },

        ],
        pcdPath1: '/static/cloud/177_cloud_out.pcd',
        pcdPath2: '/static/cloud/177_cloud_out.pcd',
    }   
    },
    computed: {
    },
    created() {
        // this.dragscroll()
        // this.getOrign()
    },
    mounted(){
        this.camera;
        this.camera1;
        this.scence;
        this.scence1;
        this.renderer;
        this.renderer1;
        this.mesh;
        this.controls;
        // this.controls1;
        this.pcdLoader = new PCDLoader();
        this.init();
    },
    methods: {
        init(){
            this.createScene() // 创建场景
            this.createMesh() // 创建网格模型
            // this.createLight() // 创建光源
            this.createCamera() // 创建相机
            this.createRender() // 创建渲染器
            this.createControls() // 创建控件对象
            this.render() // 渲染
        },
        createScene(){
            this.scence = new THREE.Scene();
            this.scence1 = new THREE.Scene();
        },
        createMesh(){
            const This = this;
            this.pcdLoader.load(this.pcdPath1, function(points){
                    points.geometry.center();
                    points.material.size = 0.5;
                    points.name = '177.pcd';
                    This.scence.add(points);
                    This.scence.add(new THREE.AxesHelper( 500 ));
                },
                function(xhr){
                    console.log( 'Num1' + ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
                },
                function(error){
                    console.log(" An error happened");
                    console.log(error)
                }
            )
            this.pcdLoader.load(this.pcdPath2, function(points){
                    points.geometry.center();
                    points.material.size = 0.5;
                    points.name = '177_1.pcd';
                    This.scence1.add(points);
                    This.scence1.add(new THREE.AxesHelper( 500 ));
                },
                function(xhr){
                    console.log( 'Num2' + ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
                },
                function(error){
                    console.log(" An error happened");
                    console.log(error)
                }
            )
        },
        createLight(){
            console.log("创建光源");
        },
        createCamera(){
            var container = document.getElementById("container");
            var width = container.clientWidth;
            var height = container.clientHeight;
            var k = width / height;
            var s = 150;
            this.camera = new THREE.OrthographicCamera(-s*k, s*k, s, -s ,1, 1000);
            // this.camera = new THREE.PerspectiveCamera(100, container.clientWidth/container.clientHeight, 0.01, 1000);
            this.camera.position.z = 500;
            // this.camera1 = new THREE.PerspectiveCamera(100, container.clientWidth/container.clientHeight, 0.01, 1000);
            this.camera1 = new THREE.OrthographicCamera(-s*k, s*k, s, -s ,1, 1000);
            this.camera1.position.z = 500;
        },
        createRender(){
            var container = document.getElementById("container");
            var container1 = document.getElementById("container1");
            this.renderer = new THREE.WebGLRenderer({antialias: true});
            this.renderer1 = new THREE.WebGLRenderer({antialias: true});
            this.renderer.setSize(container.clientWidth, container.clientHeight);
            this.renderer.setClearColor("#0A3D5E", 1);
            this.renderer.compile(this.scence, this.camera);
            this.renderer1.setSize(container.clientWidth, container.clientHeight);
            this.renderer1.setClearColor("#0A3D5E", 1);
            this.renderer1.compile(this.scence, this.camera);
            container.appendChild(this.renderer.domElement);
            container1.appendChild(this.renderer1.domElement);
        },
        createControls(){
            var cloud = document.getElementById("cloud");
            // var container = document.getElementById("container");
            // var container1 = document.getElementById("container1");
            this.controls = new OrbitControls(this.camera, cloud);
            this.controls.enableDamping = true;
            // this.controls1 = new OrbitControls(this.camera1, container1);
            // this.controls1.enableDamping = true;
        },
        // 更新属性
        animate() {
            console.log("更新属性");
        },
        render(){
            requestAnimationFrame(this.render)
            this.controls.update();
            // this.controls1.update();
            // 同步两个相机位置
            this.camera1.position.copy(this.camera.position);
            this.camera1.quaternion.copy(this.camera.quaternion);
            this.camera1.zoom = this.camera.zoom;
            this.camera1.updateProjectionMatrix();
            this.renderer.autoClear = false;
            this.renderer.clear(true, true, true);
            this.renderer1.autoClear = false;
            this.renderer1.clear(true, true, true);
            this.renderer.render(this.scence, this.camera);
            this.renderer1.render(this.scence1, this.camera1);
        },

        dragscroll(){
                Vue.directive('dragscroll', function (el) {
                el.onmousedown = function (ev) {
                const disX = ev.clientX
                const disY = ev.clientY
                const originalScrollLeft = el.scrollLeft
                const originalScrollTop = el.scrollTop
                const originalScrollBehavior = el.style['scroll-behavior']
                const originalPointerEvents = el.style['pointer-events']
                el.style['scroll-behavior'] = 'auto'
                el.style['cursor'] = 'grabbing'
                document.onmousemove = function (ev) {
                ev.preventDefault()
                // 计算拖拽的偏移距离
                const distanceX = ev.clientX - disX
                const distanceY = ev.clientY - disY

                el.scrollTo(originalScrollLeft - distanceX, originalScrollTop - distanceY)
                el.style['pointer-events'] = 'none'
                document.body.style['cursor'] = 'grabbing'
                }
                document.onmouseup = function () {
                document.onmousemove = null
                document.onmouseup = null
                el.style['scroll-behavior'] = originalScrollBehavior
                el.style['pointer-events'] = originalPointerEvents
                el.style['cursor'] = 'grab'
                }
                }
            })
        },
        compare(){

        },
        getOrign(){
            this.$axios.get('http://192.168.190.88:7002/getImagesPaths/' + this.number, 
            ).then((res) => {
                console.log(res)
                if (res.status == "200"){
                    this.orign_images = res.data.file_names
                    // console.log(this.orign_images)
                }
            })
        },
    },
    
}
</script>
<style lang="less">
    .dmp{
        width: 1100px;
        height: 400px;
        word-break: break-all !important;
        white-space: nowrap;
        -webkit-user-drag: none;
    }
    .image_div{
        height: 560px;
        overflow-x:auto;
        overflow-y:hidden;
        white-space: nowrap;
    }
    .imgs1{
        height: 800px;
        width: 1400px;
        // overflow-x:auto;
        // overflow-y:hidden;
        // white-space: nowrap;
        // cursor: grab;
    }
    .imgs2{
        height: 410px;
        overflow-x:auto;
        overflow-y:hidden;
        white-space: nowrap;
        cursor: grab;
    }
    .content-head{
        width: 100%;
        height: 500px;
        background-color: white;
        padding: 10px;
        border: 3px solid #013A76;
        border-radius: 1%;
        margin-bottom: 10px;
        
    }
    .qx_table .ivu-table-cell{
        font-size: 20px;
    }
    #container{
        height: 400px;
    }
    #container1{
        position: relative;
        top: 10px;
        height: 410px;
    }
</style>




