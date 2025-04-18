"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface FlashcardProps {
  flashcard: {
    id: number;
    front: string;
    back: string;
  };
}

export const Flashcard: React.FC<FlashcardProps> = ({ flashcard }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    setIsCorrect(null); // Reset correctness when flipping
  };

  const checkAnswer = () => {
    const correct = userAnswer.trim().toLowerCase() === flashcard.back.trim().toLowerCase();
    setIsCorrect(correct);
  };

  return (
    <Card onClick={handleFlip} className={`w-full h-64 flex items-center justify-center cursor-pointer transition-transform duration-500 ${isFlipped ? 'rotate-y-180' : ''}`}>
      <CardContent className="p-4">
        <div className="w-full h-full flex items-center justify-center text-center">
          {isFlipped ? (
            <div>
              <p className="mb-4">{flashcard.back}</p>
              <Input
                type="text"
                placeholder="Your answer"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                className="mb-2"
              />
              <Button onClick={checkAnswer}>Check</Button>
              {isCorrect !== null && (
                <p className={isCorrect ? "text-green-500" : "text-red-500"}>
                  {isCorrect ? "Correct!" : "Incorrect. Try again."}
                </p>
              )}
            </div>
          ) : (
            flashcard.front
          )}
        </div>
      </CardContent>
    </Card>
  );
};

