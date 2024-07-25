import messageComponent from "./messageComponent.vue"
import messageGroup from "./messageGroup.vue"
import { createVNode, render } from "vue"


export const Message = (options) => {
  if(typeof options == "string") {
    options = { message: options }
  }

  if(! document.querySelector("#ru-msg-group")) {
    const groupVm = createVNode(messageGroup)
    const GroupContainer = document.createElement("div")
    render(groupVm, GroupContainer)
    document.body.appendChild(GroupContainer.firstElementChild)
  }

  const groupDom = document.querySelector("#ru-msg-group")

  options = {... options, onclose: () => {
    console.log("onclone emit")
  }}
  // 将组件变成虚拟dom
  let vm = createVNode(messageComponent, options)
  const container = document.createElement("div")
  // 将虚拟dom放到容器上
  render(vm, container)
  groupDom.appendChild(container.firstElementChild)
  // 销毁虚拟dom
  vm.props.onDestroy = () => {
    console.log("onDestroy")
    render(null, container)
  }
}