"use client";

export default function TaskModal({
  isOpen,
  mode,
  task,
  onClose,
  onSave,
  onDelete,
  onSwitchToEdit,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4">
          {mode === "create"
            ? "Tambah Tugas"
            : mode === "edit"
              ? "Edit Tugas"
              : "Detail Tugas"}
        </h2>

        {mode === "detail" && task ? (
          <div>
            <p>{task.text}</p>

            <button
              onClick={() => onSwitchToEdit(task)}
              className="bg-blue-500 text-white px-3 py-2 rounded mt-3"
            >
              Edit
            </button>

            <button
              onClick={() => {
                onDelete(task.id);
                onClose();
              }}
              className="bg-red-500 text-white px-3 py-2 rounded mt-3 ml-2"
            >
              Hapus
            </button>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();

              const input = e.target.task.value;

              if (!input.trim()) return;

              onSave({
                id: task?.id ?? "task-" + Date.now(),

                text: input,

                description: "",

                priority: "biasa",

                completed: task?.completed ?? false,

                createdAt: new Date().toISOString().split("T")[0],
              });

              onClose();
            }}
          >
            <input
              name="task"
              defaultValue={task?.text || ""}
              className="border p-2 w-full"
              placeholder="Nama tugas"
            />

            <div className="mt-4">
              <button
                type="button"
                onClick={onClose}
                className="border px-3 py-2 rounded"
              >
                Batal
              </button>

              <button
                type="submit"
                className="bg-blue-600 text-white px-3 py-2 rounded ml-2"
              >
                Simpan
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
