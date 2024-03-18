import { Task } from "@/types/task";

type Error = {
    [key: string]: string;
}

export const validate = (data: Task) => {
    const errors: Error = {};

    if (!data.text?.trim()) {
        errors['text'] = 'É preciso preencher a tarefa.';
    }

    return errors;
}
