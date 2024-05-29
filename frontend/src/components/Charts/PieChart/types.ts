export interface PieChartProps {
  labels?: string[]
  datasets?: {
    backgroundColor: string[]
    data: number[]
  }
}

export const DEFAULT_LABELS = [
  'Red',
  'Blue',
  'Yellow',
  'Green',
  'Purple',
  'Orange',
]

export const DEFAULT_DATA = {
  backgroundColor: [
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)',
  ],
  data: [10, 20, 30, 10, 5, 7],
}
