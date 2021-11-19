import store from '@/store'
export default {
  // 定义一个方法匹配用户信息中point和权限列表的key是否能匹配===》或者操作权限是否存在用户的point中\
  methods: {
    /**
     *
     * @param {*} key 权限按钮操作标识
     * 返回布尔值
     */
    checkPermission (key) {
      const { userInfo } = store.state.user
      // console.log(roles)
      // 此处有bug因为没有进行无权限处理所以当用户退出后vuex会更新数据刷新页面点击后导致登出报错单不会影响功能使用用es2020语法 ?
      // 记得刷新页面
      return userInfo.roles?.points.includes(key)
      /**
       * 方案二：
       * 可选链扩展
       * 可选链操作符( ?. )允许读取位于连接对象链深处的属性的值，而不必明确验证链中的每个引用是否有效。?. 操作符的功能类似于 . 链式操作符，不同之处在于，在引用为空(nullish ) (null 或者 undefined) 的情况下不会引起错误，该表达式短路返回值是 undefined。与函数调用一起使用时，如果给定的函数不存在，则返回 undefined。

当尝试访问可能不存在的对象属性时，可选链操作符将会使表达式更短、更简明。在探索一个对象的内容时，如果不能确定哪些属性必定存在，可选链操作符也是很有帮助的。

obj?.prop  // 获取obj中的属性
obj?.[expr] // 根据obj是否存在来执行[]内的表达式
arr?.[index] // 获取arr中的元素
func?.(args) // 根据func是否存在来执行函数

一般当我们访问一个对象的深层属性的值时，都会一层一层判断属性值是否存在。不然当一个属性不存在时，再去访问它的子属性，就会抛出错误：Cannot read property 'XXX' of undefined

 为了避免报错，在访问obj.home.address之前，要保证 obj.home的值既不是 null，也不是 undefined。如果只是直接访问 obj.home.address，而不对 obj.home进行校验，则有可能抛出错误。

使用空值合并操作符
空值合并操作符可以在使用可选链时设置一个默认值：

空值合并操作符（??）是一个逻辑操作符，当左侧的操作数为 null 或者 undefined 时，返回其右侧操作数，否则返回左侧操作数。
       * if (userInfo.roles?.points && userInfo.roles.points.length) {
        return userInfo.roles.points.some(item => item === key)
      }
      return false
       */
    }
  }
}
