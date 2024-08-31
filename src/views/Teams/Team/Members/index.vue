<script setup lang="ts">
  import { useRoute } from "vue-router";
  import { computed, ComputedRef, onMounted, ref, Ref, watch } from "vue";
  import { TypeTeamMemberRead, TypeTeamRead } from "@/types/teams";
  import useTeamsStore from "@/store/teams";
  import { useEventBus } from "@vueuse/core";
  import { TypeTaskInDayData } from "@/views/TimeTracking/types";
  import { TypeTimeTrackingItemRead } from "@/types/time-tracking";
  import dayjs from "dayjs";
  import useTimeTrackingStore from "@/store/timeTracking";
  import { months, years } from "@/views/TimeTracking/dates";
  import DialogShowTasksPerDay from "./Dialogs/dialogShowTasksPerDay.vue";
  import { Breadcrumb } from "@/components/shared/types/breadcrumbs";

  const route = useRoute();
  const eventBus = useEventBus<string>("toast");

  const teamsStore = useTeamsStore();
  const timeTrackingStore = useTimeTrackingStore();

  const team: Ref<TypeTeamRead | null> = ref(null);
  const teamMember: Ref<TypeTeamMemberRead | null> = ref(null);
  const selectedDate: Ref<string> = ref("");
  const selectedDay: Ref<string> = ref("");
  const month: Ref<string> = ref(dayjs().format("M"));
  const year: Ref<string> = ref(dayjs().format("YYYY"));
  const isDialogShowTaskPerDayVisible: Ref<boolean> = ref(false);

  const tasksPerDay: ComputedRef<TypeTaskInDayData[]> = computed(
    () => tasks.value[selectedDay.value] || [],
  );

  const tasks: ComputedRef<{ [key: string]: TypeTaskInDayData[] }> = computed(
    () =>
      timeTrackingStore.state.timeTrackingData.reduce(
        (
          acc: { [key: string]: TypeTaskInDayData[] },
          val: TypeTimeTrackingItemRead,
        ) => {
          const key: string = dayjs(val.date.seconds * 1000).format("YYYY-M-D");
          const dayData: TypeTaskInDayData = {
            id: val.id,
            hours: val.hours,
            minutes: val.minutes,
            task: val.task,
          };

          if (!acc[key]) acc[key] = [dayData];
          else acc[key].push(dayData);

          return acc;
        },
        {},
      ),
  );

  const breadcrumbs: ComputedRef<Breadcrumb[]> = computed(() => [
    {
      label: "Teams",
      to: "/teams",
    },
    {
      label: team.value?.name || "",
      to: `/teams/${team.value?.id}`,
    },
    {
      label: teamMember.value?.displayName || "",
    },
  ]);

  const fetchTimeTrackingForCurrentMonthAndYear = async () => {
    await timeTrackingStore.fetchTimeTracking(
      Number(month.value),
      Number(year.value),
      `${teamMember.value?.id}`,
    );
  };

  const fetchTeam = async () => {
    try {
      team.value = await teamsStore.fetchTeam(route.params.team_id.toString());
    } catch (error) {
      eventBus.emit("toast", {
        text: error,
        status: "error",
      });
    }
  };

  const fetchTeamMember = async () => {
    try {
      teamMember.value = await teamsStore.fetchTeamMemberById(
        route.params.member_id.toString(),
      );
    } catch (error) {
      eventBus.emit("toast", {
        text: error,
        status: "error",
      });
    }
  };

  const onShowDayWithTimeTracking = (day: string) => {
    selectedDay.value = day;
    isDialogShowTaskPerDayVisible.value = true;
  };

  const setSelectedDate = (month: string, year: string) => {
    selectedDate.value = dayjs(`${year}-${month}-01`, "YYYY-M-D").format(
      "YYYY-M-D",
    );
  };

  watch(
    () => [month.value, year.value],
    async () => {
      setSelectedDate(month.value, year.value);
      await fetchTimeTrackingForCurrentMonthAndYear();
    },
  );

  onMounted(async () => {
    setSelectedDate(`${dayjs().month() + 1}`, `${dayjs().year()}`);
    await fetchTeam();
    await fetchTeamMember();
    await fetchTimeTrackingForCurrentMonthAndYear();
  });
</script>

<template>
  <s-breadcrumbs :breadcrumbs="breadcrumbs" />
  <div class="d-flex mb-8">
    <s-select
      v-if="year"
      v-model="year"
      :items="years"
      class="mr-6"
    />
    <s-select
      v-if="month"
      v-model="month"
      :items="months"
      width="160px"
    />
  </div>

  <s-calendar
    v-model="selectedDate"
    :dataset="tasks"
    is-weekdays-visible
    format-dataset-item-element="{hours}h – {task}"
    @select-day="onShowDayWithTimeTracking"
  />

  <dialog-show-tasks-per-day
    v-model="isDialogShowTaskPerDayVisible"
    :day="selectedDay"
    :tasks="tasksPerDay"
    @submit="fetchTimeTrackingForCurrentMonthAndYear"
  />
</template>

<style scoped lang="scss"></style>
