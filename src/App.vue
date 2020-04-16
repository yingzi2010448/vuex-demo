<template>
  <div id="app">
    <a-input placeholder="请输入任务" class="my_ipt" :value="inputValue" @change="handleInput" />
    <a-button type="primary" @click="addItem">添加事项</a-button>

    <a-list bordered :dataSource="viewList" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox :checked="item.done" @change="(e)=>{statusChanged(e, item)}">{{item.info}}</a-checkbox>
        <!-- 删除链接 -->
        <a slot="actions" @click="deletItem(item.id)">删除</a>
      </a-list-item>

      <!-- footer区域 -->
      <div slot="footer" class="footer">
        <!-- 未完成的任务个数 -->
        <span>{{undoneTotal}}条剩余</span>
        <!-- 操作按钮 -->
        <a-button-group>
          <a-button :type="'viewKey' === 'all' ? 'primary' : 'default'" @click="changeList('all')">全部</a-button>
          <a-button :type="'viewKey' === 'undone' ? 'primary' : 'default'" @click="changeList('undone')">未完成</a-button>
          <a-button :type="'viewKey' === 'done' ? 'primary' : 'default'" @click="changeList('done')">已完成</a-button>
        </a-button-group>
        <!-- 把已经完成的任务清空 -->
        <a @click="deleteDone">清除已完成</a>
      </div>
    </a-list>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'app',
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['inputValue', 'viewKey']),
    ...mapGetters(['undoneTotal', 'viewList'])
  },
  created () {
    this.$store.dispatch('getlist')
  },
  methods: {
    // 将input的value值双向绑定：关联到mutation中的'changeInputValue'，并传入目前的input的value值
    handleInput (e) {
      this.$store.commit('changeInputValue', e.target.value)
    },
    addItem () {
      if (this.inputValue.trim().length <= 0) {
        return this.$message.error('输入框不能为空')
      }
      this.$store.commit('addItem')
    },
    deletItem (id) {
      this.$store.commit('deleteItem', id)
    },
    statusChanged (e, item) {
      const params = {
        id: item.id,
        status: e.target.checked
      }
      this.$store.commit('changeStatus', params)
    },
    changeList (key) {
      this.$store.commit('changeView', key)
    },
    deleteDone () {
      this.$store.commit('deleteDone')
    }
  }
}
</script>

<style scoped>
#app {
  padding: 10px;
}
.my_ipt {
  width: 500px;
  margin-right: 10px;
}
.dt_list {
  width: 500px;
  margin-top: 10px;
}
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
