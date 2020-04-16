import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: [],
    inputValue: '',
    addMessage: {
      id: '',
      info: '',
      done: true
    },
    nextId: 5,
    viewKey: 'all'
  },
  mutations: {
    initlist (state, list) {
      state.list = list
    },
    // input输入框双向绑定
    changeInputValue (state, vals) {
      state.inputValue = vals
    },
    // 添加
    addItem (state) {
      const addMessage = {
        id: state.nextId,
        info: state.inputValue.trim(),
        done: false
      }
      state.list.push(addMessage)
      state.nextId++
      state.inputValue = ''
    },
    // 根据id删除
    deleteItem (state, id) {
      // for (let i = 0; i < state.list.length; i++) {
      //   if (state.list[i].info === item.info) {
      //     state.list.splice(i, 1)
      //   }
      // }
      const i = state.list.findIndex(x => x.id === id)
      if (i !== -1) {
        state.list.splice(i, 1)
      }
    },
    // 改变勾选状态
    changeStatus (state, params) {
      const i = state.list.findIndex(x => x.id === params.id)
      if (i !== -1) {
        state.list[i].done = params.status
      }
    },
    // 清除已完成
    deleteDone (state) {
      state.list = state.list.filter(x => x.done === false)
    },
    changeView (state, key) {
      state.viewKey = key
    }
  },
  actions: {
    getlist (context) {
      axios.get('/list.json').then(({ data }) => {
        context.commit('initlist', data)
      })
    }
  },
  getters: {
    // 未完成的数量
    undoneTotal (state) {
      return state.list.filter(x => x.done === false).length
    },
    // 根据所选标签筛选显示列表
    viewList (state) {
      if (state.viewKey === 'all') {
        return state.list
      }
      if (state.viewKey === 'undone') {
        return state.list.filter(x => !x.done)// x=> x.done = false
      }
      if (state.viewKey === 'done') {
        return state.list.filter(x => x.done)
      }
      return state.list
    }
  },
  modules: {
  }
})
