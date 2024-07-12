import {TypeTimeTrackingItemRead} from "@/types/time-tracking";

export type TypeTaskInDayData = {
  hours: Pick<TypeTimeTrackingItemRead, 'hours'>
  task: Pick<TypeTimeTrackingItemRead, 'task'>
}

export type TypeDayData = {
  id: Pick<TypeTimeTrackingItemRead, 'id'>,
  tasks: TypeTaskInDayData[]
}
