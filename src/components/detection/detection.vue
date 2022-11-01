<template>
    <div>
        <div class="content-head">
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
        </div>
        <div v-dragscroll class="imgs1">
            <!-- <div>
                <div v-lazy-container="{ selector: 'img' }" style="display: inline-block" v-for="img in orign_images" :key="img">
                    <img class="dmp" :data-src="'http://192.168.190.88:7002/' + img">
                </div>
            </div> -->
            <div>
                <div style="display: inline-block" v-for="img in ims_small" :key="img">
                    <img class="dmp" :src="img">
                </div>
            </div>
        </div>
    </div>
    
</template>
<script>
import Vue from 'vue'


// 创建路由实例对象
export default {
    data() {
    return {
        number: '100',
        orign_images: [],
        result_images: [],
        playingStatus: false,
        ims_small: [
            '/static/images/1.bmp',
            '/static/images/2.bmp',
            '/static/images/3.bmp',
            '/static/images/4.bmp',
            '/static/images/5.bmp',
            '/static/images/6.bmp',
            '/static/images/7.bmp',
            '/static/images/8.bmp',
            '/static/images/9.bmp',
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
        
    }   
    },
    computed: {
    },
    created() {
        this.dragscroll()
        this.getOrign()
    },
    methods: {
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
        mounted(){
        }
    },
    
}
</script>
<style lang="less">
    .dmp{
        height: 400px;
        word-break: break-all !important;
        white-space: nowrap;
        -webkit-user-drag: none;
    }
    .image_div{
        // height: 560px;
        overflow-x:auto;
        overflow-y:hidden;
        white-space: nowrap;
    }
    .imgs1{
        height: 820px;
        overflow-x:auto;
        overflow-y:hidden;
        white-space: nowrap;
        cursor: grab;
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
</style>




