import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { DEFAULT_DATA, DEFAULT_LABELS, VerticalChartProps } from './types';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Chart.js Bar Chart',
        },
    },
};

export default function VerticalChart({ labels = DEFAULT_LABELS, datasets = DEFAULT_DATA }: VerticalChartProps) {
    return (
        <div className='w-full h-auto'>
            <Bar
                options={options}
                data={{
                    labels,
                    datasets: [{ ...datasets, backgroundColor: 'rgba(53, 162, 235, 0.5)', }],
                }}
            />
        </div>
    );
}
