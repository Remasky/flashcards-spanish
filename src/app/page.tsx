"use client";

import { useState } from "react";
import { Flashcard } from "@/components/Flashcard";
import { FlashcardForm } from "@/components/FlashcardForm";
import { DeckList } from "@/components/DeckList";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [flashcards, setFlashcards] = useState([
    { id: 1, front: "What is React?", back: "A JavaScript library for building user interfaces." },
    { id: 2, front: "What is Next.js?", back: "A React framework for building full-stack web applications." },
  ]);
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [decks, setDecks] = useState(["Default Deck"]);
  const [selectedDeck, setSelectedDeck] = useState("Default Deck");

  const addFlashcard = (front: string, back: string) => {
    const newFlashcard = { id: flashcards.length + 1, front, back };
    setFlashcards([...flashcards, newFlashcard]);
  };

  const nextFlashcard = () => {
    setCurrentFlashcardIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
  };

  const prevFlashcard = () => {
    setCurrentFlashcardIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">FlashLearn</h1>

      <div className="flex flex-col md:flex-row gap-4">
        {/* Deck Management */}
        <div className="md:w-1/4">
          <DeckList decks={decks} selectedDeck={selectedDeck} onSelectDeck={(deck) => setSelectedDeck(deck)} />
        </div>

        {/* Flashcard Display */}
        <div className="md:w-2/4">
          {flashcards.length > 0 ? (
            <Flashcard flashcard={flashcards[currentFlashcardIndex]} />
          ) : (
            <p>No flashcards created yet.</p>
          )}

          <div className="flex justify-between mt-4">
            <Button variant="outline" onClick={prevFlashcard}>Previous</Button>
            <Button onClick={nextFlashcard}>Next</Button>
          </div>
        </div>

        {/* Flashcard Creation */}
        <div className="md:w-1/4">
          <FlashcardForm onSubmit={addFlashcard} />
        </div>
      </div>
    </div>
  );
}
