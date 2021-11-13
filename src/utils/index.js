/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime (time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    // date对象
    date = time
  } else {
    if ((typeof time === 'string')) {
      if ((/^[0-9]+$/.test(time))) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        // 如果版本不一致core导致编译出错注释或者因为丢包可以把node_modules删除npm i 下载
        // time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime (time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj (url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}

// 转换数据结构 平铺的==》树形结构
/**
 *
 * @param {*} list 数组不是树形结构的
 * 转为[{name:'',children:''}] 有父子关系的
 * 一定要让后端去做因为此次练习的数据少计算少多了很耗性能，浏览器卡死
 * 规律：
 * 1. 公司的pid为-1
 * 2. 公司下的顶级部门pid为''空字符串
 * 3. 公司下的子孙级部门的pid 为父级的id
 * 核心 pid
 * 子pid====父id(除公司和特殊)
 * 新建一个转换后的[]存储组织架构
 * 构建map {}映射关系去找
 * 对比
 * 返回新的[]
 */
export function transformTreeData (list) {
  // console.log('要转换的数据老数组', list)
  const treeData = []
  const map = {}
  // 遍历 存映射关系
  list.forEach(item => {
    // item表示单个部门数据(有id和pid，顶级为空字符串)
    // 映射到map对象中且 id 为键 数据为值
    map[item.id] = item
  })
  // 重点 对比
  list.forEach(item => {
    // 因为返回的老数据是平铺的一层数据索引没有递归
    /**
     * 根据map映射关系去查找父级id
     * ''=====>顶级部门 取不到
     * 有值且为父部门的id======>父级部门追加children
     */
    // 排除-1公司 字符串
    if (item.id === '-1') { return }
    const parent = map[item.pid] // map[item.pid]==>有值表示map[id]
    if (parent) {
      // 子孙部门
      if (!parent.children) {
        // 初始化一个
        parent.children = []
      }
      parent.children.push(item)
    } else {
      // 顶级部门
      treeData.push(item)
    }
  })
  // console.log('映射关系：', map)
  // console.table(treeData)
  return treeData
}
// excel时间格式化
/**
 *excel时间要比正确时间多70年
 * @param {*} numb excel时间格式
 * @param {*} format 转换分隔符
 * @returns 标准时间格式
 */
export function formatExcelDate (numb, format) {
  // 天数
  const time = new Date((numb - 1) * 24 * 3600000 + 1)
  // console.log(time)
  time.setYear(time.getFullYear() - 70)
  const year = time.getFullYear() + ''
  const month = time.getMonth() + 1 + ''
  const date = time.getDate() + ''
  // 转换的格式符号
  if (format && format.length === 1) {
    return year + format + month + format + date
  }
  return year + (month < 10 ? '0' + month : month) + (date < 10 ? '0' + date : date)
}
