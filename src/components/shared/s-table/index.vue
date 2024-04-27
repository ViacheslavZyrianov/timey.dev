<script setup lang="ts">
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
</script>

<template>
<div class="s-table">
  <table>
    <thead>
      <tr>
        <th
          v-for="header in headers"
          :key="header.key"
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
          v-for="cell in headers"
          :key="`${row.id}-cell`"
        >
          {{ row[cell.key] }}
        </td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<style scoped lang="scss">

</style>
