<template>
  <div :style="backgrounddiv" style="width: 100%; min-height: 100vh; overflow: hidden;">
    <div style="width: 400px; margin: 200px auto">
      <div style="
          color: #505050;
          font-size: 30px;
          text-align: center;
          padding: 30px 0;
        ">
        欢迎登录<br>校园二手商品交易系统
      </div>
      <el-form ref="form" :model="form" size="normal" :rules="rules">
        <el-form-item prop=" username">
          <el-input v-model="form.username" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" show-password prefix-icon="el-icon-lock"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="width: 100%" type="primary" @click="login">
            登 录
          </el-button>
        </el-form-item>
      </el-form>
      <div style="text-align:right; font-size: 10px;">
        <span>
          没有账号？
        </span>
        <el-link type="primary" @click="$router.push('/register')">注册</el-link>
      </div>
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src
  import request from "@/utils/request";
  export default {
    name: "Login",
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
        },
      };
    },

    creater() {
      sessionStorage.removeItem("user")
    },

    methods: {
      login() {
        this.$refs["form"].validate((valid) => {
          if (valid) {
            request.post("/user/login", this.form).then((res) => {
              if (res.code === "0") {
                this.$message({
                  type: "success",
                  message: "登录成功！",
                });
                console.log(res)
                sessionStorage.setItem("user", JSON.stringify(res.data));
                this.$router.push("/"); //页面跳转到主页
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