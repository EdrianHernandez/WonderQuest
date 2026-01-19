import React, { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, ChevronRight, RefreshCcw } from 'lucide-react';

const QuizInterface = ({ quiz, onComplete, onExit }) => {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const currentQuestion = quiz.questions[currentQuestionIdx];
  const progress = ((currentQuestionIdx) / quiz.questions.length) * 100;

  const handleOptionSelect = (id) => {
    if (isAnswerChecked) return;
    setSelectedOptionId(id);
    
    // Play subtle pop sound effect logic here if allowed
  };

  const handleCheckAnswer = () => {
    if (!selectedOptionId) return;
    setIsAnswerChecked(true);
    if (selectedOptionId === currentQuestion.correctOptionId) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIdx < quiz.questions.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
      setSelectedOptionId(null);
      setIsAnswerChecked(false);
    } else {
      setShowResult(true);
    }
  };

  const handleFinish = () => {
    onComplete(score);
  };

  if (showResult) {
    const percentage = Math.round((score / quiz.questions.length) * 100);
    const isSuccess = percentage >= 70;
    
    return (
      <div className="fixed inset-0 z-50 bg-brand-green flex flex-col items-center justify-center p-6 animate-fade-in">
        <div className="bg-white rounded-3xl p-8 w-full max-w-md text-center shadow-card animate-scale-up">
          <div className="text-6xl mb-4">{isSuccess ? '🎉' : '💪'}</div>
          <h2 className="text-3xl font-black text-gray-700 mb-2">
            {isSuccess ? 'Lesson Complete!' : 'Good Effort!'}
          </h2>
          <p className="text-gray-500 font-bold mb-6 text-lg">
            You scored {score} out of {quiz.questions.length}
          </p>
          
          <div className="space-y-3">
             <button 
              onClick={handleFinish}
              className="w-full bg-brand-green hover:bg-brand-dark-green text-white font-extrabold text-xl py-4 rounded-2xl shadow-btn active:shadow-none active:translate-y-[4px] transition-all uppercase tracking-wide"
            >
              Continue
            </button>
            {!isSuccess && (
               <button 
               onClick={() => {
                 setScore(0);
                 setCurrentQuestionIdx(0);
                 setShowResult(false);
                 setIsAnswerChecked(false);
                 setSelectedOptionId(null);
               }}
               className="w-full bg-white hover:bg-gray-50 text-gray-400 font-extrabold text-lg py-4 rounded-2xl border-2 border-gray-200 transition-all uppercase tracking-wide flex items-center justify-center gap-2"
             >
               <RefreshCcw size={20} /> Try Again
             </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col h-full animate-fade-in">
      {/* Header with X and Progress */}
      <div className="px-6 py-6 flex items-center gap-4 max-w-3xl mx-auto w-full">
        <button onClick={onExit} className="text-gray-300 hover:text-gray-500 transition-colors">
          <XCircle size={32} />
        </button>
        <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-brand-green transition-all duration-500 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-6 max-w-3xl mx-auto w-full pb-32">
        <h2 className="text-2xl sm:text-3xl font-black text-gray-700 mb-8 leading-tight">
          {currentQuestion.text}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {currentQuestion.options.map((opt) => {
            let stateClass = "bg-white border-2 border-gray-200 hover:bg-gray-50 active:bg-gray-100 shadow-[0_4px_0_#e5e7eb]"; // Default
            
            if (selectedOptionId === opt.id && !isAnswerChecked) {
              stateClass = "bg-brand-blue/10 border-2 border-brand-blue text-brand-blue shadow-[0_4px_0_#1899D6]"; // Selected
            }
            
            if (isAnswerChecked) {
              if (opt.id === currentQuestion.correctOptionId) {
                stateClass = "bg-green-100 border-2 border-brand-green text-brand-green shadow-none"; // Correct
              } else if (opt.id === selectedOptionId) {
                stateClass = "bg-red-100 border-2 border-brand-red text-brand-red shadow-none"; // Wrong
              } else {
                stateClass = "opacity-50 border-2 border-gray-100 shadow-none"; // Dimmed others
              }
            }

            return (
              <button
                key={opt.id}
                onClick={() => handleOptionSelect(opt.id)}
                disabled={isAnswerChecked}
                className={`
                  relative p-4 rounded-2xl text-left transition-all duration-200 h-full min-h-[120px] flex flex-col items-center justify-center gap-2 group
                  ${stateClass}
                `}
              >
                <div className="text-4xl">{opt.icon}</div>
                <span className="font-extrabold text-lg">{opt.text}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer Area */}
      <div className={`fixed bottom-0 left-0 right-0 p-6 border-t-2 ${
        isAnswerChecked 
          ? (selectedOptionId === currentQuestion.correctOptionId ? 'bg-green-100 border-green-200' : 'bg-red-100 border-red-200')
          : 'bg-white border-gray-200'
      }`}>
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Feedback Text */}
          <div className="flex-1 w-full">
            {isAnswerChecked && (
              <div className="animate-slide-up">
                <div className="flex items-center gap-2 mb-1">
                  {selectedOptionId === currentQuestion.correctOptionId ? (
                    <CheckCircle2 className="text-brand-green w-8 h-8" />
                  ) : (
                    <XCircle className="text-brand-red w-8 h-8" />
                  )}
                  <h3 className={`font-black text-xl ${
                    selectedOptionId === currentQuestion.correctOptionId ? 'text-brand-green' : 'text-brand-red'
                  }`}>
                    {selectedOptionId === currentQuestion.correctOptionId ? 'Excellent!' : 'Correct Answer:'}
                  </h3>
                </div>
                {selectedOptionId !== currentQuestion.correctOptionId && (
                  <p className="text-brand-red/80 font-bold ml-10">
                    {currentQuestion.explanation}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Action Button */}
          <button 
            onClick={isAnswerChecked ? handleNext : handleCheckAnswer}
            disabled={!selectedOptionId}
            className={`
              w-full sm:w-auto px-8 py-3 rounded-2xl font-extrabold text-lg uppercase tracking-wide transition-all shadow-btn active:shadow-none active:translate-y-[4px]
              ${!selectedOptionId 
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none transform-none' 
                : (isAnswerChecked 
                    ? (selectedOptionId === currentQuestion.correctOptionId ? 'bg-brand-green text-white hover:bg-brand-dark-green' : 'bg-brand-red text-white hover:bg-red-600')
                    : 'bg-brand-green text-white hover:bg-brand-dark-green'
                  )
              }
            `}
          >
            {isAnswerChecked ? (currentQuestionIdx === quiz.questions.length - 1 ? 'Finish' : 'Continue') : 'Check'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizInterface;
