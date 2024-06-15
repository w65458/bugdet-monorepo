import React from "react";
import { GoalForm } from "./GoalForm";

export function AddGoal({ visible, onClose }) {
  const handleOnClose = (e) => {
    if (e.target.id === "blurbackground") onClose();
  };

  if (!visible) return null;
  return (
    <div
      id="blurbackground"
      onClick={handleOnClose}
      className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex justify-center items-center z-50"
    >
      <div className="bg-white p-8 rounded-lg shadow-lg h-auto w-full max-w-md">
        <GoalForm />
      </div>
    </div>
  );
};