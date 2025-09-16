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
      <template #optional="{ record }">
        <a-space>
          <a-button type="primary" @click="doUpdate(record)">修改</a-button>
          <a-button status="danger" @click="doDelete(record)">删除</a-button>
        </a-space>
      </template>
      <template #createTime="{ record }">
        {{ formatDateTime(record.createTime) }}
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

interface JudgeConfigItem {
  timeLimit?: number;
  memoryLimit?: number;
  stackLimit?: number;
}

const parseJudgeConfig = (
  judgeConfig: string | JudgeConfigItem[] | null
): JudgeConfigItem[] | null => {
  if (!judgeConfig) return null;

  if (typeof judgeConfig === "string") {
    try {
      return JSON.parse(judgeConfig);
    } catch (e) {
      console.error("Failed to parse judgeConfig:", e);
      return null;
    }
  }

  return judgeConfig;
};

const getJudgeConfigValue = (
  judgeConfig: string | JudgeConfigItem[] | null,
  field: string
) => {
  const parsedConfig = parseJudgeConfig(judgeConfig);

  if (
    !parsedConfig ||
    !Array.isArray(parsedConfig) ||
    parsedConfig.length === 0
  ) {
    return "-";
  }

  const configItem = parsedConfig[0];
  return configItem[field as keyof JudgeConfigItem] !== undefined
    ? configItem[field as keyof JudgeConfigItem]
    : "-";
};

const loadData = async () => {
  const res = await QuestionControllerService.listQuestionByPageUsingPost(
    searchParams.value
  );
  if (res.code === 0) {
    // console.log(res);
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
    title: "用户ID",
    dataIndex: "userId",
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
    slotName: "createTime",
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

const formatDateTime = (dateString: string) => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}`;
};
</script>

<style scoped></style>
