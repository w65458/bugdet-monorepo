import { useState, useEffect } from "react";
import axios from "axios";
import { PopUpBg } from "../components/PopUpBg.jsx";
import { GoalForm } from "../components/GoalForm.jsx";
import { PageTemplate } from "../components/PageTemplate.jsx";
import { GoalCard } from "../components/GoalCard.jsx";
import { DonateForm } from "../components/DonateForm.jsx";

export const Goals = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [currentForm, setCurrentForm] = useState(null);
  const [currentGoalName, setCurrentGoalName] = useState('');
  const [currentGoalId, setCurrentGoalId] = useState(null);
  const [goals, setGoals] = useState([]);
  const [initialData, setInitialData] = useState({});

  const userId = 1; // Replace with dynamic user ID as needed

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await axios.get(`/api/goals/user/${userId}`);
        setGoals(response.data);
      } catch (error) {
        console.error('Error fetching goals:', error);
      }
    };

    fetchGoals();
  }, [userId]);

  const handleOnClose = () => setShowPopup(false);

  const openAddGoalForm = () => {
    setCurrentForm('addGoal');
    setCurrentGoalId(null);
    setShowPopup(true);
  };

  const openDonateForm = (goalName) => {
    setCurrentGoalName(goalName);
    setCurrentForm('donate');
    setShowPopup(true);
  };

  const openEditGoalForm = (goalId) => {
    const goal = goals.find(goal => goal.id === goalId);
    setInitialData(goal);
    setCurrentGoalId(goalId);
    setCurrentForm('editGoal');
    setShowPopup(true);
  };

  const handleGoalCreated = (newGoal) => {
    if (currentGoalId) {
      setGoals(prevGoals => prevGoals.map(goal => goal.id === newGoal.id ? newGoal : goal));
    } else {
      setGoals(prevGoals => [...prevGoals, newGoal]);
    }
    setShowPopup(false);
  };

  const handleDonation = (goalName, donationAmount) => {
    setGoals(prevGoals =>
        prevGoals.map(goal =>
            goal.name === goalName ? { ...goal, amount: (goal.amount || 0) + parseFloat(donationAmount) } : goal
        )
    );
    setShowPopup(false);
  };

  return (
      <PageTemplate>
        <div className="flex flex-col bg-gray-100 w-full h-full">
          <div className="bg-blue-100 p-2 h-[60px] text-center flex items-center justify-between w-full">
            <h2 className="text-center text-black text-3xl font-bold">Twoje Cele</h2>
            <button onClick={openAddGoalForm} className="bg-blue-500 text-white px-4 py-2 rounded">Dodaj Cel</button>
          </div>
          <div className="h-auto p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-gray-100 overflow-y-auto scrollbar-none md:scrollbar scrollbar-w-1.5 scrollbar-thumb-rounded-full scrollbar-thumb-blue-500 flex-col" style={{ maxHeight: '710px' }}>
            {goals.map((goal) => (
                <GoalCard
                    key={goal.id}
                    id={goal.id}
                    name={goal.name}
                    description={goal.description || "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."}
                    amount={goal.amount || 0}
                    goal={goal.targetAmount}
                    onDonateClick={() => openDonateForm(goal.name)}
                    onEditClick={() => openEditGoalForm(goal.id)}
                />
            ))}
          </div>
        </div>
        <PopUpBg onClose={handleOnClose} visible={showPopup}>
          {currentForm === 'addGoal' && <GoalForm onClose={handleOnClose} onGoalCreated={handleGoalCreated} />}
          {currentForm === 'editGoal' && <GoalForm onClose={handleOnClose} onGoalCreated={handleGoalCreated} goalId={currentGoalId} initialData={initialData} />}
          {currentForm === 'donate' && <DonateForm goalName={currentGoalName} onClose={handleOnClose} onDonation={handleDonation} />}
        </PopUpBg>
      </PageTemplate>
  );
};
