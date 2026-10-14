"use client";

import { useEffect, useState } from "react";
import TaskModal from "@/components/TaskModal";

const INITIAL_TASKS = [
  {
    id: "task-1",
    text: "Memahami struktur folder Next.js",
    description:
      "Pelajari hubungan antara layout.js, page.js, dan folder dinamis.",
    completed: true,
    priority: "penting",
    createdAt: "2026-10-12",
  },
  {
    id: "task-2",
    text: "Membuat aplikasi CRUD To-Do List",
    description:
      "Implementasikan Create, Read, Update, dan Delete menggunakan modal.",
    completed: false,
    priority: "penting",
    createdAt: "2026-10-12",
  },
];

export default function TodoApp() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);

  const [filter, setFilter] = useState("semua");

  const [isLoaded, setIsLoaded] = useState(false);

  const [modalState, setModalState] = useState({
    isOpen: false,
    mode: "create",
    task: null,
  });

  // Membaca data LocalStorage saat halaman dibuka
  useEffect(() => {
    const saved = localStorage.getItem("to-do-next-tasks");

    if (saved) {
      setTasks(JSON.parse(saved));
    }

    setIsLoaded(true);
  }, []);

  // Menyimpan data ke LocalStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("to-do-next-tasks", JSON.stringify(tasks));
    }
  }, [tasks, isLoaded]);

  // CREATE
  const handleCreateTask = (newTask) => {
    setTasks((prev) => [newTask, ...prev]);
  };

  // UPDATE
  const handleUpdateTask = (updatedTask) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
    );
  };

  // DELETE
  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  // CHECKLIST SELESAI
  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
            }
          : task,
      ),
    );
  };

  // FILTER
  const filteredTasks = tasks.filter((task) => {
    if (filter === "aktif") return !task.completed;

    if (filter === "selesai") return task.completed;

    return true;
  });

  // BUKA MODAL CREATE
  const openCreateModal = () => {
    setModalState({
      isOpen: true,
      mode: "create",
      task: null,
    });
  };

  // BUKA DETAIL
  const openDetailModal = (task) => {
    setModalState({
      isOpen: true,
      mode: "detail",
      task,
    });
  };

  // BUKA EDIT
  const openEditModal = (task) => {
    setModalState({
      isOpen: true,
      mode: "edit",
      task,
    });
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      mode: "create",
      task: null,
    });
  };

  return (
    <div className="space-y-6">
      <button
        onClick={openCreateModal}
        className="rounded-lg bg-blue-600 px-4 py-2 text-white"
      >
        + Tambah Tugas Baru
      </button>

      <div className="space-x-2">
        <button onClick={() => setFilter("semua")}>Semua</button>

        <button onClick={() => setFilter("aktif")}>Aktif</button>

        <button onClick={() => setFilter("selesai")}>Selesai</button>
      </div>

      {filteredTasks.map((task) => (
        <div key={task.id} className="rounded-lg border p-4">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleTask(task.id)}
          />

          <span
            onClick={() => openDetailModal(task)}
            className="ml-3 cursor-pointer"
          >
            {task.text}
          </span>

          <button onClick={() => openEditModal(task)} className="ml-4">
            Edit
          </button>

          <button
            onClick={() => deleteTask(task.id)}
            className="ml-2 text-red-500"
          >
            Hapus
          </button>
        </div>
      ))}

      <TaskModal
        isOpen={modalState.isOpen}
        mode={modalState.mode}
        task={modalState.task}
        onClose={closeModal}
        onSave={(data) => {
          if (modalState.mode === "create") handleCreateTask(data);
          else handleUpdateTask(data);
        }}
        onDelete={deleteTask}
        onSwitchToEdit={(task) => openEditModal(task)}
      />
    </div>
  );
}
