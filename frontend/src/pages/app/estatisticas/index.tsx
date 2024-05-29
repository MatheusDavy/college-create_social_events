/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react"
import { getByCategoryRequest } from "../../../services/requests/chart/by-category";
import { toast } from "react-toastify";
import PieChart from "../../../components/Charts/PieChart";
import { getByMonthRequest } from "../../../services/requests/chart/by-events-month";
import LineChart from "../../../components/Charts/LineChart";
import VerticalChart from "../../../components/Charts/VerticalChart";
import { getByCategorySubscripionRequest } from "../../../services/requests/chart/by-category-subscription";
import { getByMonthSubscriptionRequest } from "../../../services/requests/chart/by-month-subscription";
import { createRecord } from "../../../utils/create-record";

export default function EstatisticaPage() {
    return (
        <section className="pt-10 w-[80%] max-w-[1280px] mx-auto flex flex-col gap-5">
            <div className="mx-auto">
                <CategoryChart />
            </div>
            <br />
            <br />
            <hr />
            <div className="w-full">
                <CategorySubscriptionsChart />
            </div>
            <br />
            <br />
            <hr />
            <div className="w-full">
                <MonthChart />
            </div>
            <br />
            <br />
            <hr />
            <div className="w-full mt-10">
                <MonthSubscriptionChart />
            </div>
        </section>
    )
}

const CategoryChart = () => {
    const [data, setData] = useState<any[]>([]);

    const getDatas = async () => {
        await getByCategoryRequest()
            .then(({ data }) => {
                setData(data);
            })
            .catch((error) => {
                toast(error.response.data.error, { type: 'error' })
            })
    }

    useEffect(() => {
        getDatas()
    }, [])

    if (data.length == 0) return;

    const labels = data.map((data) => data.nome);
    const qtd = data.map((data) => Number(data.num_eventos))

    return (
        <div className="flex flex-col gap-5 items-center" id="record-category">
            <h2 className="text-gray-500 text-2xl font-bold">Eventos por categorias</h2>
            {qtd.every(value => value === 0) ? (
                <h2>Ainda não há eventos criados</h2>
            ) : (
                <>
                    <PieChart
                        labels={labels}
                        datasets={{
                            data: qtd,
                            backgroundColor: [
                                '#FF0000',
                                '#008000',
                                '#0000FF',
                                '#ADD8E6',
                                'orange',
                            ]
                        }}
                    />
                    <button onClick={() => createRecord('record-category', 'relatorio-eventos-por-categoria')} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                        Gerar relatório
                    </button>
                </>
            )}
        </div>
    )
}

const CategorySubscriptionsChart = () => {
    const [data, setData] = useState<any[]>([]);

    const getDatas = async () => {
        await getByCategorySubscripionRequest()
            .then(({ data }) => {
                setData(data);
            })
            .catch((error) => {
                toast(error.response.data.error, { type: 'error' })
            })
    }

    useEffect(() => {
        getDatas()
    }, [])

    if (data.length == 0) return;

    const labels = data.map((data) => data.nome);
    const qtd = data.map((data) => Number(data.num_inscricoes))

    return (
        <div className="flex flex-col gap-5 items-center" id="record-category-by-subscription">
            <h2 className="text-gray-500 text-2xl font-bold">Incrições por categorias</h2>
            {qtd.every(value => value === 0) ? (
                <h2>Ainda não há inscrições em eventos</h2>
            ) : (
                <>
                    <VerticalChart labels={labels} datasets={{
                        data: qtd,
                        label: 'Inscrições'
                    }} />
                    <button onClick={() => createRecord('record-category-by-subscription', 'relatorio-inscricoes-por-categoria')} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                        Gerar relatório
                    </button>
                </>
            )}

        </div>
    )
}

const MonthChart = () => {
    const [data, setData] = useState<any[]>([]);

    const getDatas = async () => {
        await getByMonthRequest()
            .then(({ data }) => {
                setData(data);
            })
            .catch((error) => {
                toast(error.response.data.error, { type: 'error' })
            })
    }

    useEffect(() => {
        getDatas()
    }, [])

    if (data.length == 0) return;

    const qtd = data.map((data) => Number(data))

    return (
        <div className="flex flex-col gap-5 items-center" id="record-event-month">
            <h2 className="text-gray-500 text-2xl font-bold">Eventos por Mês</h2>

            <LineChart
                labels={[
                    'Janeiro',
                    'Fevereiro',
                    'Março',
                    'Abril',
                    'Maio',
                    'Junho',
                    'Julho',
                    'Agosto',
                    'Setembro',
                    'Outubro',
                    'Novembro',
                    'Dezembro'
                ]}
                datasets={{
                    data: qtd,
                    label: 'Eventos'
                }}
            />
            <button onClick={() => createRecord('record-event-month', 'relatorio-eventos-por-mes')} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                Gerar relatório
            </button>
        </div>
    )
}

const MonthSubscriptionChart = () => {
    const [data, setData] = useState<any[]>([]);

    const getDatas = async () => {
        await getByMonthSubscriptionRequest()
            .then(({ data }) => {
                setData(data);
            })
            .catch((error) => {
                toast(error.response.data.error, { type: 'error' })
            })
    }

    useEffect(() => {
        getDatas()
    }, [])

    if (data.length == 0) return;

    const qtd = data.map((data) => Number(data))

    return (
        <div className="flex flex-col gap-5 items-center" id="record-subcription-month">
            <h2 className="text-gray-500 text-2xl font-bold">Inscrições por Mês</h2>

            <LineChart
                labels={[
                    'Janeiro',
                    'Fevereiro',
                    'Março',
                    'Abril',
                    'Maio',
                    'Junho',
                    'Julho',
                    'Agosto',
                    'Setembro',
                    'Outubro',
                    'Novembro',
                    'Dezembro'
                ]}
                datasets={{
                    data: qtd,
                    label: 'Inscrições'
                }}
            />
            <button onClick={() => createRecord('record-subcription-month', 'relatorio-inscricoes-por-mes')} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                Gerar relatório
            </button>
        </div>
    )
}