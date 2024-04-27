<script setup lang="ts">
import { computed } from "vue";
import { TypeTableHeader, TypeTableRow } from "@/components/shared/s-table/types";

defineProps({
  headers: {
    type: Array as () => TypeTableHeader[],
    default: () => []
  },
  rows: {
    type: Array as () => TypeTableRow[],
    default: () => []
  }
})

const headerStyle = computed(() => (style) => ({
  width: style.width
}))
</script>

<template>
<div class="s-table">
  <table>
    <thead>
      <tr>
        <th
          v-for="header in headers"
          :key="header.key"
          :style="headerStyle(header)"
        >
          {{ header.label }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="row in rows"
        :key="row.id"
      >
        <td
          v-for="header in headers"
          :key="`${row.id}-cell`"
        >
          <slot :name="header.key" :row="row" />
          <template v-if="!$slots[header.key]">
            {{ row[header.key] }}
          </template>
        </td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<style scoped lang="scss">
.s-table {
  table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;

    thead {
      tr {
        th {
          text-align: left;
          color: #ffffff;
          padding: 16px;
          font-weight: 400;
          background-color: $c-primary;

          &:first-child {
            border-radius: 8px 0 0 8px;
          }

          &:last-child {
            border-radius: 0 8px 8px 0;
          }
        }
      }
    }

    tbody {
      tr {
        td {
          padding: 16px;
          border-bottom: 1px solid #d6d6d6;
        }
      }
    }
  }
}
</style>
