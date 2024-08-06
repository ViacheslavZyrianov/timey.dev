<script setup lang="ts">
  import { reactive, ref, Ref } from "vue";
  import { ButtonType } from "@/components/shared/types/button";
  import { TypeTeamCreate } from "@/types/teams";
  import useTeamsStore from "@/store/teams";
  import { useEventBus } from "@vueuse/core";

  const emit = defineEmits(["submit"]);

  const isOpen = defineModel({
    type: Boolean,
    default: false,
  });

  const eventBus = useEventBus<string>("toast");
  const teamsStore = useTeamsStore();

  const isButtonSubmitDisabled: Ref<boolean> = ref(false);
  const isButtonSubmitLoading: Ref<boolean> = ref(false);

  const form: TypeTeamCreate = reactive({
    name: "",
    description: "",
  });

  const onFormSubmit = async () => {
    try {
      isButtonSubmitDisabled.value = true;
      isButtonSubmitLoading.value = true;

      await teamsStore.postTeam(form);
      isOpen.value = false;
      emit("submit");
    } catch (error) {
      eventBus.emit("toast", {
        text: error,
        status: "error",
      });
    } finally {
      isButtonSubmitDisabled.value = false;
      isButtonSubmitLoading.value = false;
    }
  };
</script>

<template>
  <s-dialog v-model="isOpen">
    <template #title> New Team </template>
    <template #content>
      <form @submit.prevent="onFormSubmit">
        <s-input
          v-model="form.name"
          label="Name"
          placeholder="Enter name"
          class="mb-8"
        />
        <s-input
          v-model="form.description"
          label="Description"
          placeholder="Enter description"
          class="mb-8"
        />
        <s-button
          :disabled="isButtonSubmitDisabled"
          :loading="isButtonSubmitLoading"
          :type="ButtonType.Submit"
        >
          Create new team
        </s-button>
      </form>
    </template>
  </s-dialog>
</template>

<style scoped lang="scss"></style>
