
// 自定义指令处理图片错误
/**
 * dom 使用指令的DOM元素-----img图片 ,带参数的用binding
 */
const imgerr = {
  inserted (dom, binding) {
    dom.onerror = () => {
      dom.src = binding.value
    }
  }
}
export { imgerr }
