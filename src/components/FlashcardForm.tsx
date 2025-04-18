"use client";

import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface FlashcardFormProps {
  onSubmit: (front: string, back: string) => void;
}

export const FlashcardForm: React.FC<FlashcardFormProps> = ({ onSubmit }) => {
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(front, back);
    setFront("");
    setBack("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <Textarea
          placeholder="Front of the flashcard (Question)"
          value={front}
          onChange={(e) => setFront(e.target.value)}
        />
      </div>
      <div>
        <Textarea
          placeholder="Back of the flashcard (Answer)"
          value={back}
          onChange={(e) => setBack(e.target.value)}
        />
      </div>
      <Button type="submit">Add Flashcard</Button>
    </form>
  );
};
