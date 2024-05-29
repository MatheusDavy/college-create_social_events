/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react"
import { Pagination } from "@mui/material"
import { toast } from "react-toastify"
import { getUserEventsCreatedRequest } from "../../../services/requests/get-user-created-events"
import { ActionModal } from "../../../components/Dialog"
import { deleteEventRequest } from "../../../services/requests/delete-events"

export default function MeusEventosCriadosPage() {
    const [openModal, setOpenModal] = useState(false)
    const [idToDelete, setIdToDelete] = useState<string>('')
    const [events, setEvents] = useState([])
    const [pagination, setPagination] = useState({
        page: 1,
        total: 1,
    })

    const deleteEvent = async () => {
        await deleteEventRequest({ eventId: idToDelete })
            .then(() => {
                toast('Seu evento foi deletado com sucesso', { type: 'warning' })
                setIdToDelete('')
                setOpenModal(false)
                getEvents()
            })
            .catch(() => {
                toast('Não foi possível deletar seu evento', { type: 'error' })
            })
    }
    const getEvents = async () => {
        await getUserEventsCreatedRequest({ pagination: pagination.page })
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
        <>
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
                            <li key={index} className="px-4 grid items-center grid-cols-[1fr_auto] py-5 duration-150 hover:border-white hover:rounded-xl hover:bg-gray-50">
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
                                </a>
                                <div className="flex flex-col gap-1">
                                    <a href={`/editar-evento/${data.id}`} className="w-fit text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#FFF" viewBox="0 0 256 256"><path d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.68,147.31,64l24-24L216,84.68Z"></path></svg>
                                    </a>
                                    <button 
                                        onClick={() => {
                                            setIdToDelete(data.id)
                                            setOpenModal(true)
                                        }}
                                        type="button"
                                        className="w-fit text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#000000" viewBox="0 0 256 256"><path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path></svg>
                                    </button>
                                </div>
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
            <ActionModal
                open={openModal}
                action={deleteEvent}
                onClose={() => {
                    setOpenModal(false)
                }}
            />
        </>
    );
}
