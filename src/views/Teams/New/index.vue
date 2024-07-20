<script setup lang="ts">
  import { reactive, ref, Ref } from "vue";
  import { useRouter } from "vue-router";
  import useTeamsStore from "@/store/teams";
  import { TypeTeamCreate } from "@/types/teams";

  const router = useRouter();
  const teamsStore = useTeamsStore();

  const isButtonSubmitDisabled: Ref<boolean> = ref(false);
  const isButtonSubmitLoading: Ref<boolean> = ref(false);

  const form: TypeTeamCreate = reactive({
    name: "",
    description: "",
  });

  const onAddNewTeam = async () => {
    const id = await teamsStore.postTeam(form);
    await router.push({ name: "team", params: { id } });
  };
</script>

<template>
  <h1 class="page-title">Create team</h1>

  <div class="width-50-p">
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
      @click="onAddNewTeam"
    >
      Create new team
    </s-button>
  </div>
</template>

<style scoped lang="scss"></style>
