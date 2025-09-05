<template>
  <div id="manageQuestionView">
    <div style="text-align: right; margin-bottom: 16px">
      <a-button type="primary" @click="goToAddQuestion">添加题目</a-button>
    </div>

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
      <template #timeLimit="{ record }">
        {{ record.judgeConfig?.timeLimit || "-" }}
      </template>
      <template #memoryLimit="{ record }">
        {{ record.judgeConfig?.memoryLimit || "-" }}
      </template>
      <template #stackLimit="{ record }">
        {{ record.judgeConfig?.stackLimit || "-" }}
      </template>
      <template #optional="{ record }">
        <a-space>
          <a-button type="primary" @click="doUpdate(record)">修改</a-button>
          <a-button status="danger" @click="doDelete(record)">删除</a-button>
        </a-space>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import {
  Question,
  QuestionControllerService,
} from "../../../generated/question";
import { Message } from "@arco-design/web-vue";
import { useRouter } from "vue-router";

const router = useRouter();
const dataList = ref([]);
const total = ref(0);
const searchParams = ref({
  pageSize: 10,
  current: 1,
});

const goToAddQuestion = () => {
  router.push("/add/question");
};

const loadData = async () => {
  const res = await QuestionControllerService.listQuestionByPageUsingPost(
    searchParams.value
  );
  if (res.code === 0) {
    dataList.value = res.data.records;
    total.value = res.data.total;
  } else {
    Message.error("加载失败" + res.message);
  }
};

const show = ref(true);

onMounted(() => {
  loadData();
});

const columns = [
  {
    title: "id",
    dataIndex: "id",
  },
  {
    title: "标题",
    dataIndex: "title",
  },
  {
    title: "标签",
    dataIndex: "tags",
  },
  {
    title: "提交数",
    dataIndex: "submitNum",
  },
  {
    title: "通过数",
    dataIndex: "acceptedNum",
  },
  {
    title: "时间限制(ms)",
    dataIndex: "judgeConfig.timeLimit",
    slotName: "timeLimit",
  },
  {
    title: "内存限制(kb)",
    dataIndex: "judgeConfig.memoryLimit",
    slotName: "memoryLimit",
  },
  {
    title: "堆栈限制(kb)",
    dataIndex: "judgeConfig.stackLimit",
    slotName: "stackLimit",
  },
  {
    title: "用户ID",
    dataIndex: "userId",
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
  },
  {
    title: "操作",
    slotName: "optional",
  },
];

watchEffect(() => {
  loadData();
});

const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
};

const doDelete = async (question: Question) => {
  const res = await QuestionControllerService.deleteQuestionUsingPost({
    id: question.id,
  });
  if (res.code === 0) {
    Message.success("删除成功");
    loadData();
  } else {
    Message.error("删除失败" + res.message);
  }
};

const doUpdate = (question: Question) => {
  router.push({
    path: "/update/question",
    query: {
      id: question.id,
    },
  });
};
</script>

<style scoped></style>
