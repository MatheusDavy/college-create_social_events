/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react"
import { getEventsRequest } from "../../../services/requests/get-events"
import { toast } from "react-toastify"
import { Pagination } from "@mui/material"

export default function HomePage() {
    return (
        <main>
            <section className="py-10 bg-white sm:py-16 lg:py-24">
                <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                    <div className="max-w-2xl mx-auto text-center">
                        <div className="flex items-center justify-center">
                            <div className="w-20 h-20 -mr-6 overflow-hidden bg-gray-300 rounded-full">
                                <img className="object-cover w-full h-full" src="https://cdn.rareblocks.xyz/collection/celebration/images/cta/2/female-avatar-1.jpg" alt="" />
                            </div>

                            <div className="relative overflow-hidden bg-gray-300 border-8 border-white rounded-full w-28 h-28">
                                <img className="object-cover w-full h-full" src="https://cdn.rareblocks.xyz/collection/celebration/images/cta/2/male-avatar-1.jpg" alt="" />
                            </div>

                            <div className="w-20 h-20 -ml-6 overflow-hidden bg-gray-300 rounded-full">
                                <img className="object-cover w-full h-full" src="https://cdn.rareblocks.xyz/collection/celebration/images/cta/2/female-avatar-2.jpg" alt="" />
                            </div>
                        </div>

                        <h2 className="mt-8 text-3xl font-bold leading-tight text-black lg:mt-12 sm:text-4xl lg:text-5xl">Encontre <span className="border-b-8 border-yellow-300">eventos</span> próximos a você</h2>
                    </div>
                </div>
            </section>
            <Cards />
        </main>
    )
}

const Cards = () => {
    const [events, setEvents] = useState([])
    const [pagination, setPagination] = useState({
        page: 1,
        total: 1,
    })

    const getEvents = async () => {
        await getEventsRequest({ pagination: pagination.page })
            .then(({ data }) => {
                const total = Math.ceil(data.total / 10)
                setPagination(props => ({
                    ...props,
                    total,
                }))
                setEvents(data.data)
            })
            .catch((error) => {
                toast(error.response.data.error, { type: 'error' })
            })
    }

    useEffect(() => {
        getEvents()
    }, [pagination.page])

    return (
        <section className="py-28 flex flex-col items-center">
            <div className="max-w-screen-lg w-full mx-auto px-4 md:px-8">
                <div className="max-w-md">
                    <h1 className="text-gray-800 text-2xl font-extrabold sm:text-3xl">Todos os eventos </h1>
                </div>
                <ul className="mt-12 divide-y space-y-3">
                    {events.length == 0 && (
                        <h3 className="text-center text-2xl font-bold">Não há eventos disponíveis</h3>
                    )}
                    {events.length > 0 && events.map((data: any, index) => (
                        <li key={index} className="px-4 py-5 duration-150 hover:border-white hover:rounded-xl hover:bg-gray-50">
                            <a className="space-y-3" href={`/evento-descricao/${data.id}`}>
                                <div>
                                    <span className="block text-sm text-indigo-600 font-medium">{data.nome_categoria}</span>
                                    <h3 className="text-base text-gray-800 font-semibold mt-1">{data.nome}</h3>
                                </div>
                                <p className="text-gray-600 sm:text-sm">
                                    {data.descricao}
                                </p>
                                <div className="text-sm text-gray-600 flex items-center gap-6">
                                    <span className="flex items-center gap-2">
                                        <svg className="w-5 h-5 text-gray-500" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M5.05025 4.05025C7.78392 1.31658 12.2161 1.31658 14.9497 4.05025C17.6834 6.78392 17.6834 11.2161 14.9497 13.9497L10 18.8995L5.05025 13.9497C2.31658 11.2161 2.31658 6.78392 5.05025 4.05025ZM10 11C11.1046 11 12 10.1046 12 9C12 7.89543 11.1046 7 10 7C8.89543 7 8 7.89543 8 9C8 10.1046 8.89543 11 10 11Z" fill="#9CA3AF" />
                                        </svg>
                                        {data.localidade} às {data.data}
                                    </span>
                                </div>
                                <span className="text-sm text-gray-600"><b>Criado por</b>: {data.nome_criador}</span>
                            </a>
                        </li>
                    ))}

                </ul>
            </div>
            {events.length > 0 && (
                <Pagination
                    count={pagination.total} 
                    page={pagination.page} 
                    className="mt-6"
                    onChange={(_, value) => {
                        setPagination(props => ({ ...props, page: value }))
                    }}
                    variant="outlined"
                    shape="rounded"
                />
            )}
        </section>
    )
}