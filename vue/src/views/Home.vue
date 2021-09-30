<template>
    <div>
        <el-container direction="horizontal"
            style="height: 50px;line-height: 50px;border-bottom: 1px solid #ccc;display: flex">
            <el-header style="width: 300px; padding-left: 30px; font-weight: bold; color: rgb(136, 136, 255);">
                校园二手商品交易系统
            </el-header>
            <el-header style="flex: 1">
                <el-row :gutter="20">
                    <el-col :span="6">
                        <el-link type="primary">首 页</el-link>
                    </el-col>
                    <el-col :span="6">
                        <el-dropdown>
                            <span class="el-dropdown-link">
                                商 城<i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item>电气电子</el-dropdown-item>
                                    <el-dropdown-item>日常用品</el-dropdown-item>
                                    <el-dropdown-item>生鲜食品</el-dropdown-item>
                                    <el-dropdown-item disabled>学习资料</el-dropdown-item>
                                    <el-dropdown-item divided>其他商品</el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </el-col>
                    <el-col :span="6">
                        <el-link type="primary">求购申请</el-link>
                    </el-col>
                    <el-col :span="6">
                        <el-link type="primary">联系我们</el-link>
                    </el-col>
                </el-row>
            </el-header>
            <el-header style="width: 200px; text-align: left;">
                <el-dropdown>
                    <span class="el-dropdown-link" v-if="this.user.realname === ''">
                        请先登录<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <span class="el-dropdown-link">
                        {{this.user.realname}}<i class="el-icon-arrow-down el-icon--right"
                            v-if="this.user.realname !== ''"></i>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click=" $router.push('/login')" v-if="this.user.status === ''">登录账号
                            </el-dropdown-item>
                            <el-dropdown-item @click="$router.push('/register')" v-if="this.user.status === ''">注册账号
                            </el-dropdown-item>
                            <el-dropdown-item @click="$router.push('/person')" v-if="this.user.status !== ''">个人信息
                            </el-dropdown-item>
                            <el-dropdown-item v-if="this.user.status === 'guest'">我的商品
                            </el-dropdown-item>
                            <el-dropdown-item v-if="this.user.status === 'guest'">我的订单</el-dropdown-item>
                            <el-dropdown-item @click="$router.push('/layout')" v-if="this.user.status === 'admin'">后台管理
                            </el-dropdown-item>
                            <el-dropdown-item @click="$router.push('/')" v-if="this.user.status !== ''">返回首页
                            </el-dropdown-item>
                            <el-dropdown-item @click="$router.push('/login')">退出系统 </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </el-header>
        </el-container>
        <el-container style="margin-left: 100px; margin-right: 100px;">
            <el-main>
                <el-carousel indicator-position="outside" style="overflow: hidden;">
                    <el-carousel-item v-for="item in 4" :key="item">
                        <img src="http://img3m1.ddimg.cn/44/8/22601051-1_w_5.jpg" style="padding-left: 1000px;">
                    </el-carousel-item>
                </el-carousel>
                <el-row :gutter="20" style="padding-top: 20px;">
                    <el-col :span="8">
                        <el-card style="text-align: center;">
                            <img src="http://img3m1.ddimg.cn/44/8/22601051-1_w_5.jpg">
                            <span>数据结构</span>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card style="text-align: center;">
                            <img src="http://img3m1.ddimg.cn/44/8/22601051-1_w_5.jpg">
                            <span>计算机网络</span>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card style="text-align: center;">
                            <img src="http://img3m1.ddimg.cn/44/8/22601051-1_w_5.jpg">
                            <span>操作系统</span>
                        </el-card>
                    </el-col>
                </el-row>
                <el-row :gutter="20" style="padding-top: 20px;">
                    <el-col :span="8">
                        <el-card style="text-align: center;">
                            <img src="http://img3m1.ddimg.cn/44/8/22601051-1_w_5.jpg">
                            <span>数据结构</span>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card style="text-align: center;">
                            <img src="http://img3m1.ddimg.cn/44/8/22601051-1_w_5.jpg">
                            <span>计算机网络</span>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card style="text-align: center;">
                            <img src="http://img3m1.ddimg.cn/44/8/22601051-1_w_5.jpg">
                            <span>操作系统</span>
                        </el-card>
                    </el-col>
                </el-row>
            </el-main>
        </el-container>

    </div>
</template>

<script>
    import request from "@/utils/request"

    export default {
        name: "Home",
        data() {
            return {
                user: {
                    id: 0,
                    status: '',
                    realname: '',
                    username: '',
                    password: '',
                    address: '',
                    sex: '',
                }
            }
        },
        created() {
            let str = sessionStorage.getItem("user")
            if (str === null || str === undefined) {
                str = {}
            } else {
                this.user = JSON.parse(str);
                request.get("/user/" + this.user.id).then(res => {
                    if (res.code === '0') {
                        this.user = res.data
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .el-carousel__item h3 {
        color: #475669;
        font-size: 18px;
        opacity: 0.75;
        line-height: 300px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n + 1) {
        background-color: #d3dce6;
    }
</style>