<script setup lang="ts">
  import { computed, ComputedRef, onMounted, Ref, ref, watch } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import dayjs from "dayjs";
  import { months, years } from "./dates";
  import { TypeTimeTrackingItemRead } from "@/types/time-tracking";
  import useTimeTrackingStore from "@/store/timeTracking";
  import DialogAddTask from "./Dialogs/dialogAddTask.vue";
  import DialogShowTasksPerDay from "./Dialogs/dialogShowTasksPerDay.vue";
  import { TypeTaskInDayData } from "@/views/TimeTracking/types";
  import { ButtonVariant } from "@/components/shared/types/button";

  const route = useRoute();
  const router = useRouter();
  const timeTrackingStore = useTimeTrackingStore();

  const month: Ref<string> = ref("");
  const year: Ref<string> = ref("");
  const isDialogAddTaskVisible: Ref<boolean> = ref(false);
  const isDialogShowTaskPerDayVisible: Ref<boolean> = ref(false);
  const selectedDate: Ref<string> = ref("");
  const selectedDay: Ref<string> = ref("");
  const timeTrackingData: Ref<TypeTimeTrackingItemRead[]> = ref([]);
  const isButtonExportToExcelDisabled: Ref<boolean> = ref(false);
  const isButtonExportToExcelLoading: Ref<boolean> = ref(false);

  const tasks: ComputedRef<{ [key: string]: TypeTaskInDayData[] }> = computed(
    () =>
      timeTrackingData.value.reduce(
        (
          acc: { [key: string]: TypeTaskInDayData[] },
          val: TypeTimeTrackingItemRead,
        ) => {
          const key: string = dayjs(val.date.seconds * 1000).format("YYYY-M-D");
          const dayData: TypeTaskInDayData = {
            id: val.id,
            hours: val.hours,
            task: val.task,
          };

          if (!acc[key]) acc[key] = [dayData];
          else acc[key].push(dayData);

          return acc;
        },
        {},
      ),
  );

  const downloadExcelFields = {
    Date: "date",
    Hours: "hours",
    "Task Name": "task",
  };

  const downloadExcelData = computed(() =>
    timeTrackingData.value.map((timeTrackingItem) => ({
      ...timeTrackingItem,
      date: dayjs(timeTrackingItem.date.seconds * 1000).format("DD.MM.YYYY"),
    })),
  );

  const downloadExcelName = computed(
    () =>
      `${dayjs(route.params.month.toString()).format("MMMM")} ${route.params.year.toString()}`,
  );

  const tasksPerDay: ComputedRef<TypeTaskInDayData[]> = computed(
    () => tasks.value[selectedDay.value] || [],
  );

  const goToMonth = (month: string) => {
    router.push(`/time-tracking/${route.params.year}/${month}`);
  };

  const goToYear = (year: string) => {
    router.push(`/time-tracking/${year}/${route.params.month}`);
  };

  const fetchTimeTrackingForCurrentMonthAndYear = async () => {
    timeTrackingData.value = await timeTrackingStore.fetchTimeTracking(
      Number(route.params.month),
      Number(route.params.year),
    );
  };

  const onAddTask = () => {
    isDialogAddTaskVisible.value = true;
  };

  const onExportToFile = () => {
    isButtonExportToExcelDisabled.value = true;
    isButtonExportToExcelLoading.value = true;
    document.getElementById("downloadExcelButton")?.click();
  };

  const onShowDayWithTimeTracking = (day: string) => {
    selectedDay.value = day;
    isDialogShowTaskPerDayVisible.value = true;
  };

  const onBeforeFinishDownloadExcel = () => {
    isButtonExportToExcelDisabled.value = false;
    isButtonExportToExcelLoading.value = false;
  };

  watch(
    () => route.params,
    async () => {
      await fetchTimeTrackingForCurrentMonthAndYear();
      selectedDate.value = dayjs(
        `${route.params.year}-${route.params.month}-01`,
        "YYYY-M-D",
      ).format("YYYY-M-D");
    },
    {
      immediate: true,
    },
  );

  onMounted(() => {
    month.value = route.params.month.toString() || dayjs().format("M");
    year.value = route.params.year.toString() || dayjs().format("YYYY");
  });
</script>

<template>
  <download-excel
    :data="downloadExcelData"
    :fields="downloadExcelFields"
    :worksheet="downloadExcelName"
    :name="downloadExcelName"
    :before-finish="onBeforeFinishDownloadExcel"
    id="downloadExcelButton"
    class="download-excel-button"
  />
  <div class="d-flex full-width mb-6">
    <s-select
      v-if="year"
      v-model="year"
      :items="years"
      class="mr-6"
      @update:model-value="goToYear"
    />
    <s-select
      v-if="month"
      v-model="month"
      :items="months"
      width="160px"
      @update:model-value="goToMonth"
    />
    <s-button
      icon="mdiMicrosoftExcel"
      class="ml-auto"
      :variant="ButtonVariant.Outlined"
      :disabled="isButtonExportToExcelDisabled"
      :loading="isButtonExportToExcelLoading"
      @click="onExportToFile"
    >
      Export to XLSX
    </s-button>
    <s-button
      icon="mdiPlus"
      class="ml-8"
      @click="onAddTask"
    >
      Add task
    </s-button>
  </div>
  <s-calendar
    v-model="selectedDate"
    :dataset="tasks"
    is-weekdays-visible
    format-dataset-item-element="{hours}h – {task}"
    @select-day="onShowDayWithTimeTracking"
  />

  <dialog-add-task
    v-model="isDialogAddTaskVisible"
    @submit="fetchTimeTrackingForCurrentMonthAndYear"
  />
  <dialog-show-tasks-per-day
    v-model="isDialogShowTaskPerDayVisible"
    :day="selectedDay"
    :tasks="tasksPerDay"
    @submit="fetchTimeTrackingForCurrentMonthAndYear"
  />
</template>

<style scoped lang="scss">
  .years {
    border-right: 1px solid #d6d6d6;
  }
  .row {
    display: grid;
    grid-template-columns: repeat(4, minmax(110px, 1fr));
    grid-gap: 16px;
  }

  .download-excel-button {
    display: none;
  }
</style>
