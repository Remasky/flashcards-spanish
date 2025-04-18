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
    swipeDirection: "left" | "right" | null;
}

export const Flashcard: React.FC<FlashcardProps> = ({ flashcard, isGuessingFront, isFlipped, setIsFlipped, swipeDirection }) => {

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const question = isGuessingFront ? flashcard.back : flashcard.front;
  const answer = isGuessingFront ? flashcard.front : flashcard.back;

    let cardClassName = "w-full h-64 flex items-center justify-center cursor-pointer transition-transform duration-200";

    const swipeAmount = swipeDirection ? (swipeDirection === "left" ? -200 : 200) : 0;
    const backgroundColor = swipeDirection === "left" ? 'bg-red-200' : swipeDirection === "right" ? 'bg-green-200' : 'bg-card';

  cardClassName += ` ${isFlipped ? 'rotate-y-180' : ''}`;

    const cardStyle = {
        transform: `translateX(${swipeAmount}px)`,
        backgroundColor: backgroundColor,
        transition: 'transform 0.3s ease-out, background-color 0.3s ease-out',
    };

  return (
    <Card style={cardStyle} className={cardClassName} onClick={handleFlip}>
      <CardContent className="p-4">
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
