export type TypeTimeTrackingItemRead = {
  id: string
  hours: number
  date: {
    seconds: number,
    nanoseconds: number
  }
  task: string
}
