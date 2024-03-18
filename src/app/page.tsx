'use client'
import { useState } from "react";
import Image from "next/image";
import Task from "@/components/task";
import TaskForm from "@/components/taskForm";
import { ToastContainer } from 'react-toastify';
import { Binoculars, List, Moon } from "@phosphor-icons/react";

export default function Page() {
  const [tasks, setTasks] = useState([
    {
      id:1,
      text: "Fazer trilha de capacitação",
      tag: "Estudos",
      isCompleted: false,
    },
    {
      id:2,
      text: "Jogar Overcooked! 2",
      tag: "Lazer",
      isCompleted: false,
    },
    {
      id:3,
      text: "Me matar às 23:59 no dia 30/02/2024",
      tag: "Socorro",
      isCompleted: false,
    }
  ]);

  const [activeTab, setActiveTab] = useState("All");
  const [orderAlphabetically, setOrderAlphabetically] = useState(false);
  const [searchMode, setSearchMode] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const addTask = (text: string, tag: string) => {
    const newTasks = [
      ...tasks,
      {
        id: tasks.length + 1,
        text,
        tag,
        isCompleted: false
      }
    ];
    setTasks(newTasks);
  };

  const removeTask = (id: number) => {
    const newTasks = tasks.filter(task => task.id !== id);
    setTasks(newTasks);
  };

  const completeTask = (id: number) => {
    const newTasks = tasks.map(task =>
      task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
    );
    setTasks(newTasks);
  };

  const toggleOrderAlphabetically = () => {
    setOrderAlphabetically(!orderAlphabetically);
  };

  const toggleSearchMode = () => {
    setSearchMode(!searchMode);
  };

  const handleSearchInputChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  const filterTasks = () => {
    switch (activeTab) {
       case "All":
         return tasks;
       case "Active":
         return tasks.filter(task => !task.isCompleted);
       case "Completed":
         return tasks.filter(task => task.isCompleted);
       default:
         return tasks;
    }
  };

  const filteredTasks = filterTasks();
  const filteredTasksBySearch = filteredTasks.filter(task => task.text.toLowerCase().includes(searchKeyword.toLowerCase()));
  const sortedTasks = orderAlphabetically ? [...filteredTasksBySearch].sort((a, b) => a.text.localeCompare(b.text)) : filteredTasksBySearch;

  const completedTasks = tasks.filter(task => task.isCompleted);
  const progress = (completedTasks.length / tasks.length) * 100;

  const showEmptyState = filteredTasksBySearch.length === 0;
  const emptyStateImage = activeTab === "All" ? "/escrever.svg" : activeTab === "Active" ? "/checklistcompleta.svg" : "/esforço.svg";
  const emptyStateText = activeTab === "All" ? "Adicione suas tarefas!" : activeTab === "Active" ? "Que delícia, você completou todas as tarefas!" : "Melhore!";

 return (
    <div className="min-h-screen w-full flex items-center flex-col justify-center gap-2">
      <div className="LogoContainer flex items-center gap-2">
        <h1 className="font-montserrat text-4xl leading-tighter tracking-wider">
          PraFazê!
        </h1>
        <Image src={"/todo.svg"} alt="Ícone da logo" width={40} height={48}/>
      </div>
      <section className="w-100 min-w-[320px] min-h-[600px] sm:min-w-[460px] sm:min-h-[410px] rounded-lg border-2 border-black">
        <div className="TasksContainer p-4">
          <TaskForm addTask={addTask} />
          <ToastContainer />
          <div className="Progress-bar my-4">
            <div className="bg-gray-200 h-2 rounded-md">
              <div className="bg-terracota h-full rounded-md" style={{ width: `${progress}%` }} />
            </div>
          </div>
          <div className="TaskSearch flex items-center justify-between">
            <List size={20} onClick={toggleOrderAlphabetically} cursor={"pointer"} />
            <div className="relative">
              <Binoculars size={20} onClick={toggleSearchMode} cursor={"pointer"} />
              {searchMode && (
                <input
                  type="text"
                  className="flex justify-center px-2 py-1 border border-gray-300 rounded-md"
                  placeholder="Pesquisar..."
                  value={searchKeyword}
                  onChange={handleSearchInputChange}
                />
              )}
            </div>
            <Moon size={20} cursor={"pointer"} />
          </div>
          <div className="taskContent min-h-[350px] sm:min-h-[226px]">
            {showEmptyState ? (
              <div className="flex flex-col items-center justify-center h-full" style={{ width: '100%', height: '100%' }}>
                <div style={{ width: '25vw', height: '25vh', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                 <Image
                    src={emptyStateImage}
                    alt="Empty state image"
                    layout="fill"
                    objectFit="contain"
                 />
                </div>
                <p className="mt-4 text-gray-500 text-center">{emptyStateText}</p>
              </div>
            ) : (
              sortedTasks.map(task => (
                <Task
                 key={task.id}
                 task={task}
                 removeTask={removeTask}
                 completeTask={completeTask}
                />
              ))
            )}
          </div> 
        </div>
        <div className="w-100 border border-black">
        </div>
        <div className="TabBar p-4 flex justify-between items-center max-h-[72px]">
          <div className="grid">
            <p className="text-sm text-gray-500">Tarefas concluídas: {completedTasks.length}</p>
            <p className="text-sm text-gray-500">Tarefas pendentes: {tasks.length - completedTasks.length}</p>
          </div>
          <div className="flex gap-2">
            <p className={`text-sm ${activeTab === "All" ? "text-black cursor-pointer" : "text-gray-500 cursor-pointer"}`} onClick={() => setActiveTab("All")}>Tudo</p>
            <p className={`text-sm ${activeTab === "Active" ? "text-black cursor-pointer" : "text-gray-500 cursor-pointer"}`} onClick={() => setActiveTab("Active")}>Ativas</p>
            <p className={`text-sm ${activeTab === "Completed" ? "text-black cursor-pointer" : "text-gray-500 cursor-pointer"}`} onClick={() => setActiveTab("Completed")}>Completas</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 cursor-pointer" onClick={() => setTasks(tasks.filter(task => !task.isCompleted))}>Limpar completas</p>
          </div>
        </div>
      </section>
    </div>
 )
}
