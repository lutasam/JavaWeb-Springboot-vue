<template>
    <div>
        <div style="height: 50px;line-height: 50px;border-bottom: 1px solid #ccc;display: flex">
            <div style="width: 200px; padding-left: 30px; font-weight: bold; color: rgb(136, 136, 255);">
                校园二手商品交易系统
            </div>
            <div style="flex: 1">

            </div>
            <div style="width: 100px">
                <el-dropdown>
                    <span class="el-dropdown-link">
                        {{this.form.realname}}
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click="$router.push('/person')">个人信息 </el-dropdown-item>
                            <el-dropdown-item v-if="this.form.status ==='guest'">我的商品
                            </el-dropdown-item>
                            <el-dropdown-item v-if="this.form.status ==='guest'">我的订单</el-dropdown-item>
                            <el-dropdown-item @click="$router.push('/layout')" v-if="this.form.status ==='admin'">后台管理
                            </el-dropdown-item>
                            <el-dropdown-item @click="$router.push('/')">返回首页 </el-dropdown-item>
                            <el-dropdown-item @click="$router.push('/login')">退出系统 </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
        <div style="width: 100%; height: 100vh; overflow: hidden">
            <div style="width: 400px; margin: 200px auto">
                <div style="color: #505050; font-size: 30px; padding: 30px 0; text-align:center;">
                    个人信息
                </div>
                <el-form :model="form" label-width="120px" :rules="rules">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="form.username" style="width: 100%"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="form.password" style="width: 100%" show-password></el-input>
                    </el-form-item>
                    <el-form-item label="身份" prop="status">
                        <el-radio v-model="form.status" label="admin">管理员</el-radio>
                        <el-radio v-model="form.status" label="guest">用户</el-radio>
                    </el-form-item>
                    <el-form-item label="真实姓名" prop="realname">
                        <el-input v-model="form.realname" style="width: 100%"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" prop="sex">
                        <el-radio v-model="form.sex" label="男">男</el-radio>
                        <el-radio v-model="form.sex" label="女">女</el-radio>
                        <el-radio v-model="form.sex" label="其他">其他</el-radio>
                    </el-form-item>
                    <el-form-item label="班级" prop="myclass">
                        <el-input v-model="form.myclass" style="width: 100%"></el-input>
                    </el-form-item>
                    <el-form-item label="地址" prop="address">
                        <el-input type="textarea" v-model="form.address" style="width: 100%"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button style="width: 100%" type="primary" @click="update">
                            修 改
                        </el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>


<script>
    // @ is an alias to /src
    import request from "@/utils/request";
    export default {
        name: "Person",
        data() {
            return {
                form: {},
                rules: {
                    username: [{
                        required: true,
                        message: "用户名不能为空",
                        trigger: "blur",
                    }, {
                        min: 3,
                        max: 20,
                        message: '长度在 3 到 20 个字符',
                        trigger: 'blur',
                    }, ],
                    password: [{
                        required: true,
                        message: "密码不能为空",
                        trigger: "blur",
                    }, {
                        min: 3,
                        max: 20,
                        message: '长度在 3 到 20 个字符',
                        trigger: 'blur',
                    }, ],
                    confirm: [{
                        required: true,
                        message: "请再次确认密码",
                        trigger: "blur",
                    }, {
                        min: 3,
                        max: 20,
                        message: '长度在 3 到 20 个字符',
                        trigger: 'blur',
                    }, ],
                    realname: [{
                        required: true,
                        message: '姓名不能为空',
                        trigger: 'blur'
                    }, ],
                    sex: [{
                        required: true,
                        message: '请选择性别',
                        trigger: 'change'
                    }, ],
                    myclass: [{
                        required: true,
                        message: '班级不能为空',
                        trigger: 'blur'
                    }, ],
                    address: [{
                        required: true,
                        message: '地址不能为空',
                        trigger: 'blur'
                    }, ],
                },
            };
        },

        created() {
            this.form = JSON.parse(sessionStorage.getItem("user"));
        },

        methods: {
            update() {
                request.put("/user", this.form).then((res) => {
                    console.log(res);
                    if (res.code === "0") {
                        this.$message({
                            type: "success",
                            message: "修改成功！",
                        });
                    } else {
                        this.$message({
                            type: "error",
                            message: res.msg,
                        });
                    }
                    this.dialogVisible2 = false;
                    this.load();
                });
            },
        },
    };
</script>

<style scoped></style>