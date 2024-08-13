import { defineStore } from "pinia";
import { reactive } from "vue";
import { TypeSettings } from "@/store/types/types";

export default defineStore("settings", () => {
  const settings: TypeSettings = reactive({
    teamManager: {
      isTeamManager: false,
    },
    calendar: {
      isShowWeekends: true,
    },
  });

  function setInitialSettings(): void {
    const settingsLS = localStorage.getItem("settings");
    if (settingsLS) Object.assign(settings, JSON.parse(settingsLS));
    else localStorage.setItem("settings", JSON.stringify(settings));
  }

  function setSetting<
    C extends keyof TypeSettings,
    S extends keyof TypeSettings[C],
    V extends TypeSettings[C][S],
  >(category: C, setting: S, value: V): void {
    settings[category][setting] = value;
    localStorage.setItem("settings", JSON.stringify(settings));
  }

  return { settings, setSetting, setInitialSettings };
});
