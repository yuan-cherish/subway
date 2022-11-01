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
        <!-- <div v-dragscroll class="imgs1"> -->
            <!-- <div>
                <div v-lazy-container="{ selector: 'img' }" style="display: inline-block" v-for="img in orign_images" :key="img">
                    <img class="dmp" :data-src="'http://192.168.190.88:7002/' + img">
                </div>
            </div> -->
            <!-- <div>
                <div style="display: inline-block" v-for="img in ims_small" :key="img">
                    <img class="dmp" :src="img">
                </div>
            </div>
            <div>
                <div style="display: inline-block" v-for="img in ims_small" :key="img">
                    <img class="dmp" :src="img">
                </div>
            </div> -->

        <!-- </div> -->
        <div id="cloud">
            <div id="container"></div>
            <div id="container1"></div>
        </div>
    </div>
    
</template>
<script>
import Vue from 'vue'
import * as Three from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import {PCDLoader} from "three/examples/jsm/loaders/PCDLoader"


// 创建路由实例对象
export default {
    data() {
    return {
        number: '100',
        orign_images: [],
        result_images: [],
        playingStatus: false,
        ims_small: [
            '/static/3D.jpg',
            // '/static/3D1.jpg',
        ],
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
        // camera: null,
        // scence: null,
        // renderer: null,
        // mesh: null,
        // controls: null,
        // pcdLoader: new PCDLoader(),
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
        this.pcdLoader = new PCDLoader();
        this.init();
        this.animate();
    },
    methods: {

        init(){
            const This = this
            this.scence = new Three.Scene();
            this.scence1 = new Three.Scene();
            let container = document.getElementById("container");
            let container1 = document.getElementById("container1");
            var width = container.clientWidth;
            var height = container.clientHeight;
            var k = width / height;
            var s = 150;
            // this.camera = new Three.PerspectiveCamera(100, container.clientWidth/container.clientHeight, 0.01, 1000);
            this.camera = new Three.OrthographicCamera(-s*k, s*k, s, -s ,1, 1000);
            this.camera.position.z = 500;
            // this.camera.position.x = 100;
            // this.camera.position.y = -50;
            // this.camera1 = new Three.PerspectiveCamera(70, container.clientWidth/container.clientHeight, 0.01, 1000);
            // this.camera1.position.z = 400;
            // let geometry = new Three.CylinderGeometry(0.2, 0.2, 0.2);
            // let material = new Three.MeshNormalMaterial();
            // this.mesh = new Three.Mesh(geometry, material);
            this.pcdLoader.load('/static/cloud/177_cloud_out.pcd',
                function(points){
                    points.geometry.center();
                    points.material.size = 0.5;
                    // points.material.color = "#FFFFFF";
					// points.geometry.rotateX( Math.PI );
                    points.name = '177.pcd';
                    This.scence.add(points);
                    // This.scence1.add(points);
                    // This.animate();
                },
                function(xhr){
                    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
                },
                function(error){
                    console.log(" An error happened");
                    console.log(error)
                }
            )
            // this.pcdLoader.load('/static/cloud/177_cloud_out.pcd',
            //     function(points){
            //         points.geometry.center();
            //         points.material.size = 0.3;
            //         // points.material.color = "#FFFFFF";
			// 		// points.geometry.rotateX( Math.PI );
            //         points.name = '177_1.pcd';
            //         // This.scence.add(points);
            //         This.scence1.add(points);
            //         // This.animate();
            //     },
            //     function(xhr){
            //         console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
            //     },
            //     function(error){
            //         console.log(" An error happened");
            //         console.log(error)
            //     }
            // )
            this.renderer = new Three.WebGLRenderer({
                antialias: true,
                precision: "highp",
                alpha: true,
                premultipliedAlpha: false,
                stencil: false,
                preserveDrawingBuffer: true,
            });
            // this.renderer1 = new Three.WebGLRenderer({
            //     antialias: true,
            //     precision: "highp",
            //     alpha: true,
            //     premultipliedAlpha: false,
            //     stencil: false,
            //     preserveDrawingBuffer: true,
            // });
            this.renderer.setSize(container.clientWidth, container.clientHeight);
            this.renderer.setClearColor("#0A3D5E", 1)
            // this.renderer.autoClear = false;
            this.renderer.compile(this.scence, this.camera);
            // this.renderer1.setSize(container.clientWidth, container.clientHeight);
            // this.renderer1.setClearColor("#0A3D5E", 1)
            // this.renderer1.autoClear = false;
            // this.renderer1.compile(this.scence1, this.camera1);
            container.appendChild(this.renderer.domElement)
            // container1.appendChild(this.renderer1.domElement);
            // let father = document.getElementById("cloud");
            // this.controls = new OrbitControls(this.camera, father);
            this.controls = new OrbitControls(this.camera, this.renderer.domElement);
            this.controls.enableDamping = true;
        },
        animate() {
            requestAnimationFrame(this.animate);
            this.controls.update();
            // 同步两个相机位置
            // this.camera1.position.copy(this.camera.position);
            // this.camera1.quaternion.copy(this.camera.quaternion);
            // this.camera1.zoom = this.camera.zoom
            // this.camera1.updateProjectionMatrix()
            // this.mesh.rotation.x += 0.01;
            // this.mesh.rotation.y += 0.02;
            this.renderer.autoClear = false;
            this.renderer.clear(true, true, true);
            // this.renderer1.autoClear = false;
            // this.renderer1.clear(true, true, true);
            this.renderer.render(this.scence, this.camera);
            // this.renderer1.render(this.scence1, this.camera1);
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




