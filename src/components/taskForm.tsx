import { Task } from "@/types/task";
import { validate } from "@/utils/validate";
import { useState, FormEvent } from "react";
import { Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function TaskForm({ addTask } : { addTask: (text: string, tag: string) => void }) {
    const [text, setText] = useState("");
    const [tag, setTag] = useState("");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        setErrors(null)

        const validateErrors = validate({text, tag});

        if(Object.keys(validateErrors).length > 0) {
            setErrors(validateErrors);
            return;
        }

        addTask(text, tag);

        setText("");
        setTag("");
        toast.success('Tarefa adicionada com sucesso!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            });
    }

    const [errors, setErrors] = useState<Task | null>(null);

    return (
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <div >
                <input 
                    type="text" 
                    value={text} 
                    onChange={(e) => setText(e.target.value)} 
                    placeholder={`Adicionar tarefa...`}
                    maxLength={150}
                    className="w-full border-2 border-black rounded-lg p-2 text-sm placeholder:text-sm"/>
                    {errors?.text && (
                    <small className="text-xs text-red-500 mt-1">
                        {errors?.text}
                    </small>)}
            </div>
            <div className="flex items-center">
                <input 
                    type="text" 
                    value={tag} 
                    onChange={(e) => setTag(e.target.value)} 
                    placeholder="Adicionar tag... (opcional)" 
                    maxLength={50}
                    className="w-full border-2 border-black rounded-lg p-2 mr-4 text-sm placeholder:text-sm"/>
                    {errors?.tag && (
                    <small className="text-xs text-red-500 mt-1">
                        {errors?.tag}
                    </small>)}  
                <button type="submit" className="bg-terracota text-white px-4 py-2 rounded-lg">
                    Adicionar
                </button>
            </div>    

        </form>
    )
}
