"use client";

import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface FlashcardProps {
  flashcard: {
    id: number;
    front: string;
    back: string;
  };
  isGuessingFront: boolean;
  isFlipped: boolean;
  setIsFlipped: (isFlipped: boolean) => void;
}

export const Flashcard: React.FC<FlashcardProps> = ({ flashcard, isGuessingFront, isFlipped, setIsFlipped }) => {

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const question = isGuessingFront ? flashcard.back : flashcard.front;
  const answer = isGuessingFront ? flashcard.front : flashcard.back;

  return (
    <Card className="w-full h-64 flex items-center justify-center cursor-pointer transition-transform duration-200" onClick={handleFlip}>
      <CardContent className={`p-4 w-full h-full flex items-center justify-center ${isFlipped ? 'bg-yellow-200' : 'bg-card'}`}>
        <div className="w-full h-full flex items-center justify-center text-center">
          {isFlipped ? (
            <p className="mb-4">{answer}</p>
          ) : (
            <div>
              <p className="mb-4">{question}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};


