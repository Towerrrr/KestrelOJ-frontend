<template>
  <div id="questionSubmitView">
    <a-form :model="searchParams" layout="inline">
      <a-form-item field="questionId" label="题号" style="min-width: 240px">
        <a-input v-model="searchParams.questionId" placeholder="请输入名称" />
      </a-form-item>
      <a-form-item field="language" label="编程语言" style="min-width: 240px">
        <a-select
          :style="{ width: '320px' }"
          placeholder="请选择编程语言"
          v-model="searchParams.language"
        >
          <a-option>java</a-option>
          <a-option>cpp</a-option>
          <a-option>go</a-option>
          <a-option>html</a-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-button @click="doSubmit()" type="primary">搜索</a-button>
      </a-form-item>
    </a-form>
    <a-divider :size="0"></a-divider>
    <a-table
      :columns="columns"
      :data="dataList"
      :pagination="{
        pageSize: searchParams.pageSize,
        current: searchParams.current,
        showTotal: true,
        total,
      }"
      @page-change="onPageChange"
    >
      <template #judgeMessage="{ record }">
        {{ record.judgeInfo?.message || "-" }}
      </template>
      <template #memory="{ record }">
        {{ record.judgeInfo?.memory || "-" }}
      </template>
      <template #time="{ record }">
        {{ record.judgeInfo?.time || "-" }}
      </template>
      <template #status="{ record }">
        {{ statusMap[record.status] }}
      </template>
      <template #createTime="{ record }">
        {{ moment(record.createTime).format("YYYY-MM-DD") }}
      </template>
    </a-table>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import {
  Question,
  QuestionSubmitControllerService,
  QuestionSubmitQueryRequest,
} from "../../../generated/question";
import { Message } from "@arco-design/web-vue";
import { useRouter } from "vue-router";
import moment from "moment";

const router = useRouter();
const dataList = ref([]);
const total = ref(0);
const searchParams = ref<QuestionSubmitQueryRequest>({
  questionId: undefined,
  language: undefined,
  pageSize: 10,
  current: 1,
});
const loadData = async () => {
  const res =
    await QuestionSubmitControllerService.listQuestionSubmitByPageUsingPost({
      ...searchParams.value,
      sortField: "createTime",
      sortOrder: "descend",
    });
  console.log(res);
  if (res.code === 0) {
    dataList.value = res.data.records;
    total.value = Number(res.data.total);
  } else {
    Message.error("加载失败" + res.message);
  }
};

onMounted(() => {
  loadData();
});
const columns = [
  {
    title: "提交号",
    dataIndex: "id",
  },
  {
    title: "编程语言",
    dataIndex: "language",
  },
  {
    title: "判题消息",
    dataIndex: "judgeInfo",
    slotName: "judgeMessage",
  },
  {
    title: "内存(kb)",
    dataIndex: "judgeInfo",
    slotName: "memory",
  },
  {
    title: "时间(ms)",
    dataIndex: "judgeInfo",
    slotName: "time",
  },
  {
    title: "判题状态",
    dataIndex: "status",
    slotName: "status",
  },
  {
    title: "题目 id",
    dataIndex: "questionId",
    slotName: "questionId",
  },
  {
    title: "提交者 id",
    dataIndex: "userId",
    slotName: "userId",
  },
  {
    title: "创建时间",
    slotName: "createTime",
  },
];

const statusMap: Record<number, string> = {
  0: "等待中",
  1: "判题中",
  2: "成功",
  3: "失败",
};

watchEffect(() => {
  loadData();
});
const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
};
//跳转到做题页面
const toQuestionPage = (question: Question) => {
  router.push({
    path: `/view/question/${question.id}`,
  });
};
const doSubmit = () => {
  //这里需要重置搜索页号
  searchParams.value = {
    ...searchParams.value,
    current: 1,
  };
};
</script>
<style scoped>
#questionSubmitView {
  max-width: 1280px;
  margin: 0 auto;
}
</style>
