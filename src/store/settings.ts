import { defineStore } from "pinia";
import { ref, Ref } from "vue";
import { TypeSettings } from "@/store/types/types";

export default defineStore("settings", () => {
  const settings: Ref<TypeSettings> = ref({
    isTeamManager: false,
  });

  function setInitialSettings(): void {
    const settingsLS = localStorage.getItem("settings");
    if (settingsLS) settings.value = JSON.parse(settingsLS);
    else localStorage.setItem("settings", JSON.stringify(settings.value));
  }

  function setSetting<K extends keyof TypeSettings>(
    key: K,
    value: TypeSettings[K],
  ): void {
    settings.value[key] = value;
    localStorage.setItem("settings", JSON.stringify(settings.value));
  }

  return { settings, setSetting, setInitialSettings };
});
