<template>
    <div>
        <el-menu style="width: 200px; min-height: 100vh;" default-active="user" class="el-menu-vertical-demo" router>
            <el-sub-menu index="1">
                <template #title>
                    <i class="el-icon-setting"></i>
                    <span style="font-weight: bold;">系统管理</span>
                </template>
                <el-menu-item index="user">
                    <template #title>
                        <i class="el-icon-user"></i>
                        <span>用户管理</span>
                    </template>
                </el-menu-item>
                <el-menu-item index="good">
                    <template #title>
                        <i class="el-icon-shopping-bag-1"></i>
                        <span>商品管理</span>
                    </template>
                </el-menu-item>
                <el-menu-item index="exchange">
                    <template #title>
                        <i class="el-icon-coin"></i>
                        <span>交易管理</span>
                    </template>
                </el-menu-item>
            </el-sub-menu>
        </el-menu>
    </div>
</template>

<script>
    export default {
        name: "Aside",
    }
</script>

<style scoped>

</style>