// Types
import { DEFAULT_DATA, DEFAULT_LABELS, LineChartProps } from './types'

// Styles 
import * as S from './styles'

// Chart
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export default function LineChart({
  labels = DEFAULT_LABELS,
  title,
  datasets = DEFAULT_DATA,
}: LineChartProps) {
  return (
    <S.Container className='chart-line'>
      <Line
        data={{
          labels,
          datasets: [
            {
              ...datasets,
              backgroundColor: 'rgba(0, 0, 0, 1)',
              borderColor: 'rgba(0, 0, 0, 1)',
            },
          ],
        }}
        options={{
          responsive: true,
          aspectRatio: window.innerWidth < 1080 ? 1.3 : 3.5,
          plugins: {
            title: {
              align: 'start',
              text: title,
              color: '#000',
            },
          },
        }}
      />
    </S.Container>
  )
}
