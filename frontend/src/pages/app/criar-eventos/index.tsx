/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import { getCategoriesRequest } from "../../../services/requests/get-categories";
import { createEventRequest } from "../../../services/requests/create-event";
import { toast } from "react-toastify";

export default function CriarEventosPage() {
    const [categories, setCategories] = useState([])
    const { register, handleSubmit, reset } = useForm();

    const currentDate = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate() + 1).padStart(2, '0');

        return `${year}-${month}-${day}T${0}:${0}Z`;
    }

    const onSubmit = async (data: any) => {
        await createEventRequest(data)
            .then(() => {
                toast('Evento criado com sucesso', { type: 'success' })
                reset()
            })
            .catch(() => {
                toast('Não foi possivel criar um evento', { type: 'error' })
            })
    };

    const getCategories = async () => {
        await getCategoriesRequest()
            .then(({ data }) => {
                setCategories(data)
            })
            .catch(() => {

            })
    }

    useEffect(() => {
        getCategories()
    }, [])

    return (
        <form className="max-w-sm mx-auto mt-10 mb-20" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-2xl font-bold text-center mb-5">Criar seu evento</h1>
            <div className="mb-5">
                <label htmlFor="nome" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome do evento</label>
                <input type="nome" id="nome" {...register("nome", { required: true })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>
            <div className="mb-5">
                <label htmlFor="data" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Data do evento</label>
                <input type="datetime-local" min={currentDate()} id="" {...register("data", { required: true })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>
            <div className="mb-5">
                <label htmlFor="localidade" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cidade e Estado</label>
                <input type="localidade" id="localidade" {...register("localidade", { required: true })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>
            <div className="mb-5">
                <label htmlFor="" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Decrição do evento</label>
                <select id="category" required {...register("categoria", { required: true })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="" disabled selected>Escolha uma categoria</option>
                    {categories.length > 0 && categories.map((data: any, index) => (
                        <option key={index} value={data.id}>{data.nome}</option>
                    ))}
                </select>
            </div>
            <div className="mb-5">
                <label htmlFor="descricao" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Decrição do evento</label>
                <textarea id="descricao" {...register("descricao", { required: true })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Criar Evento</button>
        </form>
    )
}