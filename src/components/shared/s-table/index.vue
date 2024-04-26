<script setup lang="ts">
import { TypeTableHeader, TypeTableRow } from "@/components/shared/s-table/types";

defineProps({
  headers: {
    type: Array as () => TypeTableHeader[],
    default: () => []
  },
  rows: {
    type: Array as () => TypeTableRow[]
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
          v-for="cell in Object.entries(row)"
          :key="`${row.id}-${cell[0]}`"
        >
          {{ cell[1] }}
        </td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<style scoped lang="scss">

</style>
