import { toast } from "react-toastify";

export const notify = {
  success: (msg) =>
    toast.success(msg, {
      icon: "☕",
      style: {
        background: "#0f172a", // slate-900
        color: "#ffffff",
        border: "1px solid #facc15", // yellow-400
        borderRadius: "12px",
      },
      progressStyle: {
        background: "#facc15",
      },
    }),

  error: (msg) =>
    toast.error(msg, {
      icon: "❌",
      style: {
        background: "#0f172a",
        color: "#ffffff",
        border: "1px solid #ef4444", // red-500
        borderRadius: "12px",
      },
    }),

  info: (msg) =>
    toast.info(msg, {
      icon: "✨",
      style: {
        background: "#0f172a",
        color: "#ffffff",
        border: "1px solid #3b82f6", // blue-500
        borderRadius: "12px",
      },
    }),
};