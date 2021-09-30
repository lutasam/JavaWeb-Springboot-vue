<template>
  <div :style="backgrounddiv" style="width: 100%; min-height: 100vh; overflow: hidden;">
    <div style="width: 400px; margin: 200px auto">
      <div style="color: #505050; font-size: 30px; text-align: center; padding: 30px 0">
        欢迎注册<br>校园二手商品交易系统
      </div>
      <el-form ref="form" :model="form" size="normal" :rules="rules">
        <el-form-item prop="username">
          <el-input v-model="form.username" prefix-icon="el-icon-user" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" show-password prefix-icon="el-icon-lock" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item prop="confirm">
          <el-input v-model="form.confirm" show-password prefix-icon="el-icon-lock" placeholder="请再次确认密码"></el-input>
        </el-form-item>
        <el-form-item prop="realname">
          <el-input v-model="form.realname" prefix-icon="el-icon-male" placeholder="请输入真实姓名"></el-input>
        </el-form-item>
        <el-form-item prop="sex">
          <el-radio-group v-model="form.sex">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
            <el-radio label="其他">其他</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="myclass">
          <el-input v-model="form.myclass" prefix-icon="el-icon-school" placeholder="请输入班级"></el-input>
        </el-form-item>
        <el-form-item prop="address">
          <el-input v-model="form.address" prefix-icon="el-icon-position" placeholder="请输入地址（寝室）"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="width: 100%" type="primary" @click="register"> 注 册 </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src
  import request from "@/utils/request";
  export default {
    name: "Register",
    data() {
      return {
        backgrounddiv: {
          backgroundImage: 'url(' + require('../assets/img/background.jpg') + ')',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%'
        },
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

    methods: {
      register() {

        if (this.form.password !== this.form.confirm) {
          this.$message({
            type: "error",
            message: "两次密码不一致！",
          });
          return;
        }

        this.$refs["form"].validate((valid) => {
          if (valid) {
            request.post("/user/register", this.form).then((res) => {
              if (res.code === "0") {
                this.$message({
                  type: "success",
                  message: "注册成功！",
                });
                this.$router.push("/login"); //页面跳转到主页
              } else {
                this.$message({
                  type: "error",
                  message: res.msg,
                });
              }
            });
          } else {
            this.$message({
              type: "error",
              message: "请按照要求填写",
            });
          }
        });
      },
    },
  };
</script>

<style scoped></style>