import { Pen, Trash } from "@phosphor-icons/react";
import { useState } from "react";

interface Task {
    id: number;
    text: string;
    tag?: string;
    isCompleted: boolean;
}

type RemoveTask = (id: number) => void;
type CompleteTask = (id: number) => void;

interface TaskProps {
    task: Task;
    removeTask: RemoveTask;
    completeTask: CompleteTask;
}

export default function Task({ task, removeTask, completeTask }: TaskProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <article
            className={`flex items-center justify-between p-4 rounded-md transition duration-300 gap-2 ${
                isHovered ? "shadow-lg hover:shadow-terracota" : "shadow-md hover:shadow-lg"
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="flex items-center flex-grow" style={{ textDecoration: task.isCompleted ? "line-through" : "" }}>
                <input type="checkbox" checked={task.isCompleted} onChange={() => completeTask(task.id)} />
                <p className="mx-2 break-all">{task.text}</p>
            </div>
            <div className="flex items-center gap-1">
                {task.tag && (
                    <span
                        className="bg-verdepastel px-2 text-white text-sm rounded-full"
                    >
                        {task.tag}
                    </span>
                )}
                <Pen size={20} className="text-marrompastel cursor-pointer" />
                <Trash size={20} className="text-terracota cursor-pointer" onClick={() => removeTask(task.id)} />
            </div>
        </article>
    );
}
