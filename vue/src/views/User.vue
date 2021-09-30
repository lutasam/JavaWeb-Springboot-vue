<template>
  <div style="padding: 10px" class="home">
    <!-- 功能区 -->
    <div style="margin: 10px 0">
      <el-button type="primary" @click="add">新增</el-button>
      <el-button type="primary">导入</el-button>
      <el-button type="primary">导出</el-button>
    </div>

    <!-- 搜索区 -->
    <div style="margin: 10px 0">
      <el-input v-model="search" placeholder="请输入查询对象的真实姓名" style="width: 20%" clearable></el-input>
      <el-button type="primary" style="margin-left: 5px" @click="load">查询</el-button>
    </div>

    <!-- 表格 -->
    <el-table :data="tableData" border style="width: 100%" stripe>
      <el-table-column prop="id" label="ID"> </el-table-column>
      <el-table-column prop="username" label="用户名"> </el-table-column>
      <el-table-column prop="status" label="身份">
        <template #default="scope">
          <span v-if="scope.row.status === 'guest'">用户</span>
          <span v-if="scope.row.status === 'admin'">管理员</span>
        </template>
      </el-table-column>
      <el-table-column prop="realname" label="真实姓名"> </el-table-column>
      <el-table-column prop="sex" label="性别"> </el-table-column>
      <el-table-column prop="myclass" label="班级"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template #default="scope">
          <el-button @click="handleEdit(scope.row)" size="mini">编辑</el-button>
          <el-popconfirm title="确定删除吗？" @confirm="handleDelete(scope.row.id)">
            <template #reference>
              <el-button type="danger" size="mini">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-row :gutter="20">
      <el-col :span="12" :offset="8">
        <div class="grid-content bg-purple" style="margin: 10px 0">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page="currentPage" :page-sizes="[5, 10, 20]" :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper" :total="totalNum">
          </el-pagination>
        </div>
      </el-col>
    </el-row>


    <!-- 新增弹窗 -->
    <el-dialog title="新增用户" v-model="dialogVisible1" width="30%">
      <el-form :model="form" label-width="120px" :rules="rules">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" style="width: 80%" show-password></el-input>
        </el-form-item>
        <el-form-item label="身份" prop="status">
          <el-radio v-model="form.status" label="admin">管理员</el-radio>
          <el-radio v-model="form.status" label="guest">用户</el-radio>
        </el-form-item>
        <el-form-item label="真实姓名" prop="realname">
          <el-input v-model="form.realname" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio v-model="form.sex" label="男">男</el-radio>
          <el-radio v-model="form.sex" label="女">女</el-radio>
          <el-radio v-model="form.sex" label="其他">其他</el-radio>
        </el-form-item>
        <el-form-item label="班级" prop="myclass">
          <el-input v-model="form.myclass" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input type="textarea" v-model="form.address" style="width: 80%"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="save">确 定</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 更改弹窗 -->
    <el-dialog title="编辑用户" v-model="dialogVisible2" width="30%">
      <el-form :model="form" label-width="120px" :rules="rules">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" style="width: 80%" show-password></el-input>
        </el-form-item>
        <el-form-item label="身份" prop="status">
          <el-radio v-model="form.status" label="admin">管理员</el-radio>
          <el-radio v-model="form.status" label="guest">用户</el-radio>
        </el-form-item>
        <el-form-item label="真实姓名" prop="realname">
          <el-input v-model="form.realname" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio v-model="form.sex" label="男">男</el-radio>
          <el-radio v-model="form.sex" label="女">女</el-radio>
          <el-radio v-model="form.sex" label="其他">其他</el-radio>
        </el-form-item>
        <el-form-item label="班级" prop="myclass">
          <el-input v-model="form.myclass" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input type="textarea" v-model="form.address" style="width: 80%"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="save">确 定</el-button>
        </span>
      </template>
    </el-dialog>

  </div>
</template>

<script>
  // @ is an alias to /src
  import request from "@/utils/request";

  export default {
    name: "Home",
    components: {},
    data() {
      return {
        form: {},
        dialogVisible1: false,
        dialogVisible2: false,
        search: "",
        currentPage: 1,
        pageSize: 10,
        totalNum: 0,
        tableData: [],

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
          realname: [{
            required: true,
            message: '姓名不能为空',
            trigger: 'blur'
          }, ],
          status: [{
            required: true,
            message: '请选择身份',
            trigger: 'change'
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
      this.load();
    },

    methods: {
      handleEdit(row) {
        this.form = JSON.parse(JSON.stringify(row));
        this.dialogVisible2 = true;
      },

      handleSizeChange(pageSize) {
        //改变当前每页个数触发
        this.pageSize = pageSize;
        this.load();
      },

      handleCurrentChange(currentPage) {
        //改变当前页触发
        this.currentPage = currentPage;
        this.load();
      },

      handleDelete(id) {
        //删除
        request.delete("/user/" + id).then((res) => {
          if (res.code === "0") {
            this.$message({
              type: "success",
              message: "删除成功！",
            });
          } else {
            this.$message({
              type: "error",
              message: res.msg,
            });
          }
          this.load();
        });
      },

      add() {
        this.dialogVisible1 = true;
        this.form = {};
      },

      save() {
        if (this.form.id) {
          //更新
          request.put("/user", this.form).then((res) => {
            console.log(res);
            if (res.code === "0") {
              this.$message({
                type: "success",
                message: "更新成功！",
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
        } else {
          //新增
          request.post("/user", this.form).then((res) => {
            console.log(res);
            if (res.code === "0") {
              this.$message({
                type: "success",
                message: "新增成功！",
              });
            } else {
              this.$message({
                type: "error",
                message: res.msg,
              });
            }
            this.dialogVisible1 = false;
            this.load();
          });
        }
      },

      load() {
        request
          .get("/user", {
            params: {
              pageNum: this.currentPage,
              pageSize: this.pageSize,
              search: this.search,
            },
          })
          .then((res) => {
            console.log(res);
            this.tableData = res.data.records;
            this.totalNum = res.data.total;
          });
      },
    },
  };
</script>