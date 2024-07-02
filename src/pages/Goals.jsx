import { useState, useEffect } from "react";
import axios from "axios";
import { PopUpBg } from "../components/PopUpBg.jsx";
import { GoalForm } from "../components/GoalForm.jsx";
import { PageTemplate } from "../components/PageTemplate.jsx";
import { GoalCard } from "../components/GoalCard.jsx";
import confetti from 'canvas-confetti';

export const Goals = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [currentForm, setCurrentForm] = useState(null);
  const [currentGoalName, setCurrentGoalName] = useState('');
  const [currentGoalId, setCurrentGoalId] = useState(null);
  const [goals, setGoals] = useState([]);
  const [initialData, setInitialData] = useState({});
  const [donationAmount, setDonationAmount] = useState('');
  const [showAchievementMessage, setShowAchievementMessage] = useState(false);

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

  const handleOnClose = () => {
    setShowPopup(false);
    setDonationAmount('');
  };

  const openAddGoalForm = () => {
    setCurrentForm('addGoal');
    setCurrentGoalId(null);
    setShowPopup(true);
  };

  const openDonateForm = (goalId, goalName) => {
    setCurrentGoalId(goalId);
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

  const handleDonation = async () => {
    if (!donationAmount) return;

    const goal = goals.find(g => g.id === currentGoalId);
    const updatedValue = (goal.currentValue || 0) + parseFloat(donationAmount);

    handleOnClose(); // Close the popup immediately

    try {
      const response = await axios.put(`/api/goals/${currentGoalId}`, {
        ...goal,
        currentValue: updatedValue,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        setGoals(prevGoals =>
            prevGoals.map(goal =>
                goal.id === currentGoalId ? { ...goal, currentValue: updatedValue } : goal
            )
        );

        if (updatedValue >= goal.targetAmount) {
          confetti({
            particleCount: 200,
            spread: 100,
            origin: { y: 0.6 },
          });

          setShowAchievementMessage(true);

          // Wait for the confetti to finish before deleting the goal
          setTimeout(async () => {
            setShowAchievementMessage(false);
            try {
              await axios.delete(`/api/goals/${currentGoalId}`, {
                headers: {
                  'Content-Type': 'application/json',
                },
              });

              setGoals(prevGoals => prevGoals.filter(goal => goal.id !== currentGoalId));
            } catch (error) {
              console.error('Error deleting goal', error);
            }
          }, 3000); // 3 seconds delay for confetti and message
        }
      } else {
        console.error('Error updating goal');
      }
    } catch (error) {
      console.error('Błąd połączenia z serwerem', error);
    }
  };

  return (
      <PageTemplate>
        <div className="flex flex-col bg-gray-100 w-full h-full">
          <div className="bg-blue-100 p-2 h-[60px] text-center flex items-center justify-between w-full">
            <h2 className="text-center text-black text-3xl font-bold">Twoje Cele</h2>
            <button onClick={openAddGoalForm} className="bg-blue-500 text-white px-4 py-2 rounded">Dodaj Cel</button>
          </div>
          <div className="h-auto p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-gray-100 overflow-y-auto scrollbar-none md:scrollbar scrollbar-w-1.5 scrollbar-thumb-rounded-full scrollbar-thumb-blue-500">
          {goals.map((goal) => (
            <GoalCard
              key={goal.id}
              id={goal.id}
              name={goal.name}
              description={goal.description || "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."}
              amount={goal.currentValue || 0}
              goal={goal.targetAmount}
              onDonateClick={() => openDonateForm(goal.id, goal.name)}
              onEditClick={() => openEditGoalForm(goal.id)}
            />
          ))}
          </div>
          {showAchievementMessage && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white p-6 rounded shadow-lg text-center">
                  <h2 className="text-2xl font-bold mb-4">Cel Osiągnięty!</h2>
                  <p className="mb-4">Gratulacje! Udało Ci się osiągnąć cel: <strong>{currentGoalName}</strong></p>
                </div>
              </div>
          )}
        </div>
        <PopUpBg onClose={handleOnClose} visible={showPopup}>
          {currentForm === 'addGoal' && <GoalForm onClose={handleOnClose} onGoalCreated={handleGoalCreated} />}
          {currentForm === 'editGoal' && <GoalForm onClose={handleOnClose} onGoalCreated={handleGoalCreated} goalId={currentGoalId} initialData={initialData} />}
          {currentForm === 'donate' && (
              <div className="p-4 bg-white rounded">
                <h1 className="text-center text-2xl font-bold mb-6">Wpłać na Cel: {currentGoalName}</h1>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
                    Kwota
                  </label>
                  <input
                      id="amount"
                      type="number"
                      value={donationAmount}
                      onChange={(e) => setDonationAmount(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Wpisz kwotę"
                  />
                </div>
                <div className="flex items-center justify-center">
                  <button
                      onClick={handleDonation}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Wpłać
                  </button>
                </div>
              </div>
          )}
        </PopUpBg>
      </PageTemplate>
  );
};
