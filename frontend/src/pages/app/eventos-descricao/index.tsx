/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getEventRequest } from '../../../services/requests/get-event';
import { toast } from 'react-toastify';
import { createCommentRequest } from '../../../services/requests/create-new-comment';
import { enterEventRequest } from '../../../services/requests/enter-event';
import { leaveEventRequest } from '../../../services/requests/leave-event';

export default function EventDescriptionPage() {
    const { id } = useParams();
    const [event, setEvent] = useState<any>(null)
    const [comments, setComments] = useState([])

    const getEvent = async () => {
        await getEventRequest({ id })
            .then(({ data }) => {
                setEvent(data.evento)
                setComments(data.comentarios)
            })
            .catch((error) => {
                toast(error.response.data.error, { type: 'error' })
            })
    }

    const enterEnvet = async () => {
        await enterEventRequest({ eventId: id })
            .then(() => {
                getEvent()
                toast('Você entrou em um evento', { type: 'success' })
            })
            .catch(() => {
                toast('Erro ao entrar no evento', { type: 'error' })
            })
    }

    const leaveEvent = async () => {
        await leaveEventRequest({ eventId: id })
            .then(() => {
                getEvent()
                toast('Você saiu do evento', { type: 'warning' })
            })
            .catch(() => {
                toast('Erro ao sair do evento', { type: 'error' })
            })
    }

    useEffect(() => {
        getEvent()
    }, [id])

    return (
        <>
            {event && (
                <div className="mx-auto h-auto flex flex-col items-center justify-center px-8 pt-[30px]">
                    <div className="flex flex-col w-full bg-white rounded shadow-lg">
                        <div className="w-full h-64 bg-top bg-cover rounded-t"
                            style={{ backgroundImage: 'url(https://www.si.com/.image/t_share/MTY4MTkyMjczODM4OTc0ODQ5/cfp-trophy-deitschjpg.jpg)' }}
                        />
                        <div className="flex flex-col w-full md:flex-row">
                            <div className="flex flex-row justify-around p-4 font-bold leading-none text-gray-800 uppercase bg-gray-400 rounded md:flex-col md:items-center md:justify-center md:w-1/4">
                                <div className="md:text-lg">{event.data}</div>
                                <div className="md:text-2xl">{event.localidade}</div>
                            </div>
                            <div className="p-4 font-normal text-gray-800 md:w-3/4">
                                <span className="block text-md text-indigo-600 font-medium mb-3">{event.nome_categoria}</span>
                                <h1 className="mb-4 text-4xl font-bold leading-none tracking-tight text-gray-800">{event.nome}</h1>
                                <p className="leading-normal">{event.descricao}</p>
                                <div className="flex flex-row items-center mt-4 text-gray-700">
                                    {event.joined ? (
                                        <button onClick={leaveEvent} type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                                            Sair
                                        </button>
                                    ) : (
                                        <button onClick={enterEnvet} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                            Participar
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <Comments reloadComments={() => getEvent()} comments={comments} />
                </div>
            )}
            {!event && (
                <h1 className="mb-4 text-4xl font-bold leading-none tracking-tight text-gray-800">Não foi possível carregar os dados desse evento :(</h1>
            )}
        </>
    );
}

const Comments = ({ comments, reloadComments }: { comments: any[], reloadComments: () => void }) => {
    const [newComment, setNewComment] = useState('')
    const { id } = useParams();
    const [loading, setLoading] = useState(false)

    const createNewComment = async () => {
        setLoading(true)
        if (!newComment) {
            setLoading(false)
            return toast('Você não pode enviar comentários vazios', { type: 'error' })
        }
        await createCommentRequest({ comment: newComment, eventId: id })
            .then(() => {
                reloadComments()
                setNewComment('')
                toast('Comentário adicionado com sucesso', { type: 'success' })
            })
            .catch((error) => {
                toast(error.response.data.error, { type: 'error' })
            })
        setLoading(false)
    }

    return (
        <div className="flex-1 mt-5 w-full border-gray-500 border-t-2">
            {/* Chat Header */}
            <header className="bg-white p-4 text-gray-700">
                <h1 className="text-2xl font-semibold">Comentários sobre o evento</h1>
            </header>

            {/* Chat Messages */}
            <div className="h-auto min-h-20 overflow-y-auto p-4 gap-5 flex flex-col">
                {/* Outgoing Message */}

                {comments.length > 0 && comments.map((data: any, index: number) => (
                    <div className="flex items-start gap-2.5" key={index}>
                        <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                            <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                <span className="text-sm font-semibold text-gray-900 dark:text-white">{data.nome_usuario_comentario} {data.usuario_id == localStorage.getItem('token') && <>{"("}Você{")"}</>}</span>
                            </div>
                            <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">{data.comentario}</p>
                        </div>
                    </div>
                ))}

                {comments.length == 0 && (
                    <span className="block text-md text-indigo-600 font-medium mb-3 text-center">Seja o primeiro a comentar</span>
                )}
            </div>

            {/* Chat Input */}
            <footer className="bg-white border-t border-gray-300 p-4 w-full flex items-center">

                <input
                    value={newComment}
                    onChange={(e: any) => {
                        setNewComment(e.target.value)
                    }}
                    type="text"
                    placeholder="Type a message..."
                    className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
                />

                {!loading && (
                    <button className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2" onClick={createNewComment}>Enviar</button>
                )}
            </footer>
        </div>
    );
};
