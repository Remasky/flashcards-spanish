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
}

export const Flashcard: React.FC<FlashcardProps> = ({ flashcard, userAnswer, setUserAnswer }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);


  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    setIsCorrect(null); // Reset correctness when flipping
  };

  const checkAnswer = () => {
    const correct = userAnswer.trim().toLowerCase() === flashcard.back.trim().toLowerCase();
    setIsCorrect(correct);
  };

  return (
    <Card className={`w-full h-64 flex items-center justify-center cursor-pointer transition-transform duration-500 ${isFlipped ? 'rotate-y-180' : ''}`} onClick={handleFlip}>
      <CardContent className="p-4">
        <div className="w-full h-full flex items-center justify-center text-center">
          {isFlipped ? (
            <p className="mb-4">{flashcard.back}</p>
          ) : (
            <div>
              <p className="mb-4">{flashcard.front}</p>
              <Input
                type="text"
                placeholder="Your answer"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                className="mb-2"
                onClick={(e) => e.stopPropagation()} // Prevent card flip on input click
                autoFocus
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
