<script setup lang="ts">
  import { reactive, ref, Ref, watch } from "vue";
  import { useRouter } from "vue-router";
  import useTeamsStore from "@/store/teams";
  import { TypeTeamCreate } from "@/types/teams";

  const router = useRouter();
  const teamsStore = useTeamsStore();

  const isSubmitButtonDisabled: Ref<boolean> = ref(true);

  const form: TypeTeamCreate = reactive({
    name: "",
    description: "",
  });

  watch(
    () => form.name,
    () => {
      isSubmitButtonDisabled.value = form.name.length < 2;
    },
  );

  const onAddNewTeam = async () => {
    const id = await teamsStore.postTeam(form);
    await router.push({ name: "team", params: { id } });
  };
</script>

<template>
  <s-card
    class="d-flex direction-column mb-auto flex-gap-12"
    width="400px"
  >
    <template #title> Add Team </template>
    <template #content>
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
        size="large"
        :disabled="isSubmitButtonDisabled"
        @click="onAddNewTeam"
      >
        Create new team
      </s-button>
    </template>
  </s-card>
</template>

<style scoped lang="scss"></style>
