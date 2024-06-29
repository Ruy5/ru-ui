<script setup>
import { onBeforeUnmount, ref, shallowRef, toRefs, watch } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

defineOptions({
  name: "RuRichtext"
})

const props = defineProps({
  modelValue: {
    type: String,
    default: ""
  },
  placeholder: {
    type: String,
    default: "请输入内容..."
  }
})

const {modelValue, placeholder} = toRefs(props)

const emit = defineEmits(["update:modelValue"]);

const valueHtml = ref(modelValue.value)

watch(valueHtml, (newValue, OldValue, onCleanup) => {
  emit("update:modelValue", newValue)
});

// 编辑器实例，必须用 shallowRef，重要！
const editorRef = shallowRef()

// 编辑器配置
const editorConfig = {
    placeholder: placeholder.value,
    MENU_CONF: { /* 菜单配置，下文解释 */ }
}

const handleCreated = (editor) => {
    editorRef.value = editor // 记录 editor 实例，重要！
}

// 组件销毁时，及时销毁编辑器
onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
})
</script>

<template>
    <div style="border: 1px solid #ccc; display: flex; flex-direction: column; width: 100%; height: 100%;">
        <!-- 工具栏 -->
        <Toolbar
            :editor="editorRef"
            style="border-bottom: 1px solid #ccc"
        />
        <!-- 编辑器 -->
        <Editor
            v-model="valueHtml"
            :defaultConfig="editorConfig"
            style="flex: 1; min-height: 100px; overflow-y: hidden;"
            @onCreated="handleCreated"
        />
       
    </div>
    {{ valueHtml }}
</template>

<!-- 别忘了引入样式 -->
<style src="@wangeditor/editor/dist/css/style.css"></style>
