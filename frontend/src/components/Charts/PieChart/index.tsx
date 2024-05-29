// Types
import { DEFAULT_DATA, DEFAULT_LABELS, PieChartProps } from './types'

// Styles
import * as S from './styles'

// Chart
import { Pie } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

export default function PieChart({
  labels = DEFAULT_LABELS,
  datasets = DEFAULT_DATA,
}: PieChartProps) {
  return (
    <S.Container className='chart-pie'>
      <Pie
        data={{
          labels,
          datasets: [
            {
              ...datasets,
              borderColor: 'transparent',
            },
          ],
        }}
      />
    </S.Container>
  )
}
