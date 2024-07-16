<script setup lang="ts">
import {
  computed,
  Ref,
  useAttrs,
  defineModel,
  StyleValue,
  PropType,
} from "vue";

const $attrs = useAttrs();
const props = defineProps({
  width: {
    type: String,
    default: "auto",
  },
  textAlign: {
    type: String as PropType<"left" | "center" | "right">,
    default: "left",
  },
  labelAlign: {
    type: String as PropType<"left" | "center" | "right">,
    default: "left",
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
});
const model = defineModel();

const placeholder: Ref<string> = computed(() => $attrs?.placeholder as string);

const sInputStyle: Ref<StyleValue> = computed(() => ({
  width: props.width,
}));

const sInputClassList: Ref<string[]> = computed(() => [
  "s-input",
  `s-input_text-align-${props.textAlign}`,
  { "s-input_disabled": props.isDisabled },
]);

const sInputLabelClassList: Ref<string[]> = computed(() => [
  "s-input--label",
  `s-input--label-align-${props.labelAlign}`,
]);
</script>

<template>
  <div
    :class="sInputClassList"
    :style="sInputStyle"
  >
    <div
      v-if="$attrs.label"
      :class="sInputLabelClassList"
    >
      {{ $attrs.label }}
    </div>
    <input
      v-model="model"
      type="text"
      :placeholder="placeholder"
      :disabled="isDisabled"
    />
  </div>
</template>

<style scoped lang="scss">
.s-input {
  &--label {
    font-size: 14px;
    color: #4a4a4a;
    margin-bottom: 4px;

    &-align {
      &-left {
        text-align: left;
      }

      &-center {
        text-align: center;
      }

      &-right {
        text-align: right;
      }
    }
  }

  &_text-align {
    &-left {
      input {
        text-align: left;
      }
    }
    &-center {
      input {
        text-align: center;
      }
    }
    &-right {
      input {
        text-align: right;
      }
    }
  }

  &_disabled {
    input {
      border-color: #ececec;
      background-color: #f6f6f6;
      cursor: not-allowed;
    }
  }

  input {
    width: 100%;
    border: 1px solid #b3b3b3;
    border-radius: 8px;
    padding: 16px;
    font-size: 14px;
    transition: border-color 0.2s;
    will-change: border-color;

    &:focus {
      outline: none;
      border-color: $c-primary;
    }

    &::placeholder {
      color: #c1c1c1;
    }
  }
}
</style>
