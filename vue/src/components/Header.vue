<template>
  <div style="height: 50px;line-height: 50px;border-bottom: 1px solid #ccc;display: flex">
    <div style="width: 200px; padding-left: 30px; font-weight: bold; color: rgb(136, 136, 255);">
      校园二手商品交易系统
    </div>
    <div style="flex: 1">

    </div>
    <div style="width: 100px">
      <el-dropdown>
        <span class="el-dropdown-link">
          {{this.user.realname}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="$router.push('/person')">个人信息 </el-dropdown-item>
            <el-dropdown-item v-if="this.user.status ==='guest'">我的商品
            </el-dropdown-item>
            <el-dropdown-item v-if="this.user.status ==='guest'">我的订单</el-dropdown-item>
            <el-dropdown-item @click="$router.push('/layout')" v-if="this.user.status ==='admin'">后台管理
            </el-dropdown-item>
            <el-dropdown-item @click="$router.push('/')">返回首页 </el-dropdown-item>
            <el-dropdown-item @click="$router.push('/login')">退出系统 </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
  import request from "@/utils/request"
  export default {
    name: "Header",
    data() {
      return {
        user: {}
      }
    },
    created() {
      this.user = JSON.parse(sessionStorage.getItem("user"));
      request.get("/user/" + this.user.id).then(res => {
        if (res.code === '0') {
          this.user = res.data
        }
      })
    }
  }
</script>

<style scoped>

</style>