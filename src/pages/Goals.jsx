import { useState } from "react";
import { PopUpBg } from "../components/PopUpBg.jsx";
import { GoalForm } from "../components/GoalForm.jsx";
import { PageTemplate } from "../components/PageTemplate.jsx";
import { GoalCard } from "../components/GoalCard.jsx";

export const Goals = () => {
  const [showPopup, setShowPopup] = useState(false);
  const handleOnClose = () => setShowPopup(false);

  return (
    <PageTemplate>
      <div className="flex-grow">
        <div className="flex justify-between items-center p-4 w-full h-full border-b-2 border-gray">
          <h2 className="text-left text-xl font-bold">Twoje Cele</h2>
          <button onClick={() => setShowPopup(true)} className="bg-blue-500 text-white px-4 py-2 rounded">
            Dodaj Cel
          </button>
        </div>
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <GoalCard
            name="Nowy Telefon"
            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
            amount="0"
            goal="5000"
          />
            <GoalCard
            name="Nowy Telefon"
            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
            amount="0"
            goal="5000"
          />
            <GoalCard
            name="Nowy Telefon"
            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
            amount="0"
            goal="5000"
          />
        </div>
      </div>
      <PopUpBg onClose={handleOnClose} visible={showPopup}>
        <GoalForm />
      </PopUpBg>
    </PageTemplate>
  );
};