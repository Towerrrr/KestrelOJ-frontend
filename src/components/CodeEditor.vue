<template>
  <div
    id="code-editor"
    ref="codeEditorRef"
    style="min-height: 400px; height: 70vh"
  ></div>
  <!--  <a-button @click="fillValue"></a-button>-->
</template>
<script setup lang="ts">
import * as monaco from "monaco-editor";
import {
  defineProps,
  onMounted,
  ref,
  toRaw,
  watch,
  watchEffect,
  withDefaults,
} from "vue";

interface Props {
  value: string;
  language: string;
  handleChange: (v: string) => void;
}

const props = withDefaults(defineProps<Props>(), {
  value: () => "",
  language: () => "java",
  handleChange: (v: string) => {
    console.log(v);
  },
});
const codeEditorRef = ref();
const codeEditor = ref();
// const fillValue = () => {
//   if (!codeEditor.value) return;
//   toRaw(codeEditor.value).setValue("新的值");
// };
// watch(
//   () => props.language,
//   () => {
//     codeEditor.value = monaco.editor.create(codeEditorRef.value, {
//       value: props.value,
//       language: props.language,
//       automaticLayout: true,
//       minimap: {
//         enabled: true,
//       },
//       // lineNumbers: "off",
//       // roundedSelection: false,
//       // scrollBeyondLastLine: false,
//       readOnly: false,
//       theme: "vs-dark",
//     });
//   }
// );
onMounted(() => {
  if (!codeEditorRef.value) {
    return;
  }
  // Hover on each property to see its docs!
  codeEditor.value = monaco.editor.create(codeEditorRef.value, {
    value: props.value,
    language: props.language,
    automaticLayout: true,
    minimap: {
      enabled: true,
    },
    // lineNumbers: "off",
    // roundedSelection: false,
    // scrollBeyondLastLine: false,
    readOnly: false,
    theme: "vs-dark",
  });
  //编辑监听内容变化
  codeEditor.value.onDidChangeModelContent(() => {
    props.handleChange(toRaw(codeEditor.value).getValue());
  });
});
</script>

<style scoped></style>
