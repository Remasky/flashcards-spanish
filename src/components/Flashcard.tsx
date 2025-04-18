"use client";

import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface FlashcardProps {
  flashcard: {
    id: number;
    front: string;
    back: string;
  };
  userAnswer: string;
  setUserAnswer: (answer: string) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  isGuessingFront: boolean;
}

export const Flashcard: React.FC<FlashcardProps> = ({ flashcard, userAnswer, setUserAnswer, inputRef, isGuessingFront }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    setIsCorrect(null); // Reset correctness when flipping
  };

  const checkAnswer = () => {
    const correctAnswer = isGuessingFront ? flashcard.front : flashcard.back;
    const correct = userAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase();
    setIsCorrect(correct);
  };

  const question = isGuessingFront ? flashcard.back : flashcard.front;
  const answer = isGuessingFront ? flashcard.front : flashcard.back;

  return (
    <Card className={`w-full h-64 flex items-center justify-center cursor-pointer transition-transform duration-500 ${isFlipped ? 'rotate-y-180' : ''}`} onClick={handleFlip}>
      <CardContent className="p-4">
        <div className="w-full h-full flex items-center justify-center text-center">
          {isFlipped ? (
            <p className="mb-4">{answer}</p>
          ) : (
            <div>
              <p className="mb-4">{question}</p>
              <Input
                type="text"
                placeholder="Your answer"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                className="mb-2"
                onClick={(e) => e.stopPropagation()} // Prevent card flip on input click
                autoFocus
                ref={inputRef}
              />
              <Button onClick={checkAnswer}>Check</Button>
              {isCorrect !== null && (
                <p className={isCorrect ? "text-green-500" : "text-red-500"}>
                  {isCorrect ? "Correct!" : "Incorrect. Try again."}
                </p>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
