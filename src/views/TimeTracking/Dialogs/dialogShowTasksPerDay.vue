<script setup lang="ts">
  import dayjs from "dayjs";
  import { defineModel, PropType, ref, Ref, watch } from "vue";
  import { TypeTaskInDayData } from "@/views/TimeTracking/types";
  import useTimeTrackingStore from "@/store/timeTracking";

  const timeTrackingStore = useTimeTrackingStore();

  const props = defineProps({
    day: {
      type: String,
      default: "",
    },
    tasks: {
      type: Array as PropType<TypeTaskInDayData[]>,
      default: () => [],
    },
  });

  const emit = defineEmits(["submit"]);

  const isOpen = defineModel();

  const currentlyEditingElementIndex: Ref<number | null> = ref(null);
  const currentlyDeletingElementIndex: Ref<number | null> = ref(null);
  const tasksToMutate: Ref<TypeTaskInDayData[]> = ref([]);
  const isButtonSaveDisabled: Ref<boolean> = ref(false);
  const isButtonSaveLoading: Ref<boolean> = ref(false);

  const isInputDisabled = (index: number) =>
    currentlyEditingElementIndex.value !== index;

  const isInEditMode = (index: number | null) =>
    currentlyEditingElementIndex.value === index;

  const isDeleting = (index: number | null) =>
    currentlyDeletingElementIndex.value === index;

  const onEdit = (index: number) => {
    currentlyEditingElementIndex.value = index;
    isInEditMode(index);
  };

  const onSave = async (index: number) => {
    currentlyEditingElementIndex.value = index;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...payload } = tasksToMutate.value[index];
    try {
      isButtonSaveDisabled.value = true;
      isButtonSaveLoading.value = true;
      await timeTrackingStore.updateTimeTracking(
        tasksToMutate.value[index].id,
        payload,
      );
      currentlyEditingElementIndex.value = null;
      isInEditMode(index);
      emit("submit");
    } catch (e) {
      console.error(e);
    } finally {
      isButtonSaveDisabled.value = false;
      isButtonSaveLoading.value = false;
    }
  };

  const onDelete = async (index: number) => {
    currentlyDeletingElementIndex.value = index;
    try {
      await timeTrackingStore.deleteTimeTracking(tasksToMutate.value[index].id);
      currentlyDeletingElementIndex.value = null;
      emit("submit");
    } catch (e) {
      console.error(e);
    } finally {
      currentlyDeletingElementIndex.value = null;
    }
  };

  const onCancel = (index: number) => {
    tasksToMutate.value[index] = props.tasks[index];
    currentlyEditingElementIndex.value = null;
    currentlyDeletingElementIndex.value = null;
    isInEditMode(null);
  };

  const setTasksToMutate = () => {
    tasksToMutate.value = JSON.parse(JSON.stringify(props.tasks));
  };

  watch(
    isOpen,
    () => {
      if (isOpen.value) {
        isInEditMode(null);
        currentlyEditingElementIndex.value = null;
        currentlyDeletingElementIndex.value = null;
        setTasksToMutate();
      }
    },
    {
      immediate: true,
    },
  );

  watch(
    () => props.tasks.length,
    () => {
      setTasksToMutate();
    },
  );
</script>

<template>
  <s-dialog
    v-model="isOpen"
    min-width="600px"
  >
    <template #title>
      {{ dayjs(day).format("DD MMMM YYYY") }}
    </template>
    <template #content>
      <div
        v-for="(taskItem, index) in tasksToMutate"
        :key="taskItem.id"
        class="d-flex flex-column-gap-4 mb-4"
      >
        <s-input
          v-model="taskItem.hours"
          width="50px"
          text-align="center"
          :is-disabled="isInputDisabled(index)"
        />
        <s-input
          v-model="taskItem.task"
          class="flex-grow-1"
          :is-disabled="isInputDisabled(index)"
        />
        <template v-if="isInEditMode(index)">
          <s-button
            is-only-icon
            icon="mdiContentSave"
            color="success"
            :disabled="isButtonSaveDisabled"
            :loading="isButtonSaveLoading"
            @click="onSave(index)"
          />
          <s-button
            is-only-icon
            color="error"
            variant="outlined"
            icon="mdiCancel"
            @click="onCancel(index)"
          />
        </template>
        <template v-else>
          <s-button
            is-only-icon
            icon="mdiPencil"
            @click="onEdit(index)"
          />
          <s-button
            is-only-icon
            icon="mdiTrashCanOutline"
            color="error"
            :disabled="isDeleting(index)"
            :loading="isDeleting(index)"
            @click="onDelete(index)"
          />
        </template>
      </div>
    </template>
  </s-dialog>
</template>

<style scoped lang="scss"></style>
