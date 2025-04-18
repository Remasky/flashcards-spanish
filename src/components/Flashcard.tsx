"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface FlashcardProps {
  flashcard: {
    id: number;
    front: string;
    back: string;
  };
}

export const Flashcard: React.FC<FlashcardProps> = ({ flashcard }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <Card onClick={handleFlip} className={`w-full h-64 flex items-center justify-center cursor-pointer transition-transform duration-500 ${isFlipped ? 'rotate-y-180' : ''}`}>
      <CardContent className="p-4">
        <div className="w-full h-full flex items-center justify-center text-center">
          {isFlipped ? flashcard.back : flashcard.front}
        </div>
      </CardContent>
    </Card>
  );
};
