<script setup lang="ts">
  import { computed } from "vue";
  import {
    TypeTableHeader,
    TypeTableRow,
  } from "@/components/shared/s-table/types";

  const props = defineProps({
    headers: {
      type: Array as () => TypeTableHeader[],
      default: () => [],
    },
    rows: {
      type: Array as () => TypeTableRow[],
      default: () => [],
    },
  });

  const mergedCells = computed(() => {
    const mergedCellsMap = new Map<string, number>();

    props.rows.forEach((row) => {
      const key: string = row[props.headers[0].key] as string; // Get the content of the first column
      if (!mergedCellsMap.has(key)) {
        mergedCellsMap.set(key, 1); // Initialize count for the content
      } else {
        mergedCellsMap.set(key, mergedCellsMap.get(key)! + 1); // Increment count for the content
      }
    });

    return mergedCellsMap;
  });

  const headerStyle = computed(() => (style: Record<string, string>) => ({
    width: style.width,
  }));
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
        <template
          v-for="(row, index) in rows"
          :key="index"
        >
          <tr>
            <template
              v-if="
                index === 0 ||
                row[headers[0].key] !== rows[index - 1][headers[0].key]
              "
            >
              <td :rowspan="mergedCells.get(row[headers[0].key] as string)">
                {{ row[headers[0].key] }}
              </td>
            </template>
            <td
              v-for="header in headers.slice(1)"
              :key="`${row.id}-${header.key}`"
            >
              <slot
                :name="header.key"
                :row="row"
              />
              <template v-if="!$slots[header.key]">{{
                row[header.key]
              }}</template>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<style scoped lang="scss">
  .s-table {
    width: 100%;

    table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0;
      background-color: #fff;
      box-shadow: 0 0 16px 0 #d9d9d9;

      thead {
        tr {
          th {
            text-align: left;
            color: #ffffff;
            padding: 16px;
            font-weight: 400;
            background-color: $c-primary;

            &:first-child {
              border-radius: 8px 0 0 0;
            }

            &:last-child {
              border-radius: 0 8px 0 0;
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

          &:last-child {
            td {
              border: none;

              &:first-child {
                border-radius: 0 0 0 8px;
              }

              &:last-child {
                border-radius: 0 0 8px 0;
              }
            }
          }
        }
      }
    }
  }
</style>
