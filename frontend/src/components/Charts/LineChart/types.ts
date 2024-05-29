export interface LineChartProps {
  labels?: string[]
  title?: string

  datasets?: {
    label: string
    data: number[]
  }
}

// Default Datas
export const DEFAULT_LABELS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
]

export const DEFAULT_DATA = {
  label: 'Receita do periodo',
  data: [10, 20, 30, 50, 40, 10, 15],
}
