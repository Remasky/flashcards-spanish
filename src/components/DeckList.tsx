"use client";

interface DeckListProps {
  decks: string[];
  selectedDeck: string;
  onSelectDeck: (deck: string) => void;
}

export const DeckList: React.FC<DeckListProps> = ({ decks, selectedDeck, onSelectDeck }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Decks</h3>
      <ul>
        {decks.map((deck) => (
          <li key={deck} className="mb-1">
            <button
              onClick={() => onSelectDeck(deck)}
              className={`w-full text-left p-2 rounded hover:bg-accent ${selectedDeck === deck ? 'bg-accent text-accent-foreground' : ''}`}
            >
              {deck}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
