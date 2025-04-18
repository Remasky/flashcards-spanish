"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Flashcard } from "@/components/Flashcard";
import { FlashcardForm } from "@/components/FlashcardForm";
import { DeckList } from "@/components/DeckList";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export default function Home() {
  const initialFlashcards = [
    { id: 1, front: "opowiadać", back: "narrar, contar" },
    { id: 2, front: "odciążać", back: "aliviar" },
    { id: 3, front: "guma do żucia", back: "el chicle" },
    { id: 4, front: "witryna sklepowa", back: "el escaparate/la vidriera" },
    { id: 5, front: "dzwonek do drzwi", back: "el timbre" },
    { id: 6, front: "należeć", back: "pertenecer" },
    { id: 7, front: "food truck", back: "el camión de comida" },
    { id: 8, front: "z dostawą", back: "a domicilio" },
    { id: 9, front: "słony", back: "salado" },
    { id: 10, front: "przyprawy", back: "los condimentos" },
    { id: 11, front: "płatność z góry", back: "pago por adelantado" },
    { id: 12, front: "okrągły", back: "redondo" },
    { id: 13, front: "klimatyzacja", back: "el aire acondicionado" },
    { id: 14, front: "należeć", back: "pertenecer" },
    { id: 15, front: "hulajnoga elektryczna", back: "el patinete eléctrico" },
    { id: 16, front: "pieczątka", back: "el sello" },
    { id: 17, front: "gościć", back: "acoger" },
    { id: 18, front: "zagrożenie", back: "la amenaza" },
    { id: 19, front: "odbywać służbę wojskową", back: "hacer la mili" },
    { id: 20, front: "wokół", back: "alrededor" },
    { id: 21, front: "ognisko", back: "la fogata" },
    { id: 22, front: "myśliwy", back: "el cazador" },
    { id: 23, front: "kliknięcie", back: "el clic" },
    { id: 24, front: "ubezpieczenie", back: "el seguro" },
    { id: 25, front: "budżet", back: "el presupuesto" },
    { id: 26, front: "podlewać", back: "regar" },
    { id: 27, front: "dziki (zwierzę)", back: "salvaje" },
    { id: 28, front: "właściciel", back: "el dueño" },
    { id: 29, front: "grad", back: "el granizo" },
    { id: 30, front: "odliczanie", back: "cuenta atrás" },
    { id: 31, front: "kosztować dużo wysiłku", back: "costarme" },
    { id: 32, front: "pokonać", back: "superar, vencer" },
    { id: 33, front: "skrzydło", back: "el ala" },
    { id: 34, front: "zapisany", back: "inscrito" },
    { id: 35, front: "pianka", back: "la espuma" },
    { id: 36, front: "prażyć, piec", back: "tostar" },
    { id: 37, front: "nieudany", back: "fallido" },
    { id: 38, front: "podejrzewać", back: "sospechar" },
    { id: 39, front: "wsiadać/wysiadać", back: "subir/bajar" },
    { id: 40, front: "peron", back: "el anden" },
    { id: 41, front: "konferencja", back: "la conferencia" },
    { id: 42, front: "uczestnik", back: "el participante" },
    { id: 43, front: "cud", back: "el milagro" },
    { id: 44, front: "mocny", back: "potente" },
    { id: 45, front: "sportowy", back: "deportivo" },
    { id: 46, front: "wytrzymały", back: "resistente" },
    { id: 47, front: "okulary do pływania", back: "las gafas de natación" },
    { id: 48, front: "chlor", back: "el cloro" },
    { id: 49, front: "intensywnie", back: "intensivamente" },
    { id: 50, front: "smaczny", back: "sabroso" },
    { id: 51, front: "radosny", back: "alegre" },
    { id: 52, front: "zatłoczony", back: "concurrido" },
    { id: 53, front: "odległy", back: "lejano" },
    { id: 54, front: "relaksujący", back: "relajante" },
    { id: 55, front: "niezapomniany", back: "inolvidable" },
    { id: 56, front: "ryzykowny", back: "arriesgado" },
    { id: 57, front: "cichy", back: "silencioso" },
    { id: 58, front: "zorganizowany", back: "organizado" },
    { id: 59, front: "stresujący", back: "estresante" },
    { id: 60, front: "konkurencyjny", back: "competitivo" },
    { id: 61, front: "zazdrościć", back: "envidiar" },
    { id: 62, front: "brzeg", back: "la orilla" },
    { id: 63, front: "mgła", back: "la niebla" },
    { id: 64, front: "krajobraz", back: "el paisaje" },
    { id: 65, front: "ciężary", back: "las pesas" },
    { id: 66, front: "brzuszki", back: "las abdominales" },
    { id: 67, front: "rozciąganie", back: "el estiramiento" },
    { id: 68, front: "mur zamku", back: "la muralla" },
    { id: 69, front: "wieża", back: "el torre" },
    { id: 70, front: "forteca", back: "la fortaleza" },
    { id: 71, front: "łucznik", back: "el arquero" },
    { id: 72, front: "przymiotnik", back: "el adjetivo" },
    { id: 73, front: "czasownik", back: "el verbo" },
    { id: 74, front: "rzeczownik", back: "el sustantivo" },
    { id: 75, front: "pogrzeb", back: "el entierro" },
    { id: 76, front: "cmentarz", back: "el cementerio" },
    { id: 77, front: "żałoba", back: "el luto" },
    { id: 78, front: "drukarka", back: "la impresora" },
    { id: 79, front: "scena koncertów", back: "el escenario" },
    { id: 80, front: "perkusja", back: "la batería" },
    { id: 81, front: "maska samochodu", back: "el capó" },
    { id: 82, front: "kierownica", back: "el volante" },
    { id: 83, front: "silnik", back: "el motor" },
    { id: 84, front: "hamulec", back: "el freno" },
    { id: 85, front: "mąka", back: "la harina" },
    { id: 86, front: "kromka", back: "la rebanada" },
    { id: 87, front: "chleb pełnoziarnisty", back: "el pan integral" },
    { id: 88, front: "mięta", back: "la menta" },
    { id: 89, front: "premiera", back: "el estreno" },
    { id: 90, front: "okładka", back: "la portada" },
    { id: 91, front: "spis treści", back: "el índice" },
    { id: 92, front: "szaszłyk", back: "la brocheta" },
    { id: 93, front: "pieczeń, grillowane mięso", back: "el asado" },
    { id: 94, front: "stek", back: "el churrasco" },
    { id: 95, front: "wędzony", back: "ahumado" },
    { id: 96, front: "osoba obsługująca grill", back: "el parrillero" },
    { id: 97, front: "zaułek", back: "el callejón" },
    { id: 98, front: "mur obronny", back: "la muralla" },
    { id: 99, front: "olimpiada", back: "la olimpiada, juegos Olímpicos" },
    { id: 100, front: "medal", back: "la medalla" },
    { id: 101, front: "zawody", back: "la competencia" },
    { id: 102, front: "pochodnia", back: "la antorcha" },
    { id: 103, front: "ceremonia otwarcia", back: "la ceremonia de apertura" },
    { id: 104, front: "ostrzegać", back: "avisar" },
    { id: 105, front: "prognoza", back: "el pronóstico" },
    { id: 106, front: "tęcza", back: "el arcoiris" },
    { id: 107, front: "tankować", back: "repostar el coche" },
    { id: 108, front: "stacja benzynowa", back: "la gasolinera" },
    { id: 109, front: "paliwo", back: "el combustible" },
    { id: 110, front: "napełniać", back: "llenar" },
    { id: 111, front: "podanie", back: "la solicitud" },
    { id: 112, front: "wymagania", back: "los requisitos" },
    { id: 113, front: "mielenie", back: "molienda" },
    { id: 114, front: "kawa z odrobiną mleka", back: "cortado" },
    { id: 115, front: "palenie kawy", back: "torrefacción" },
    { id: 116, front: "pościel", back: "la ropa de cama" },
    { id: 117, front: "stolik nocny", back: "la mesita de noche" },
    { id: 118, front: "poseł", back: "el diputado" },
    { id: 119, front: "przemówienie", back: "el discurso" },
    { id: 120, front: "podanie", back: "el pase" },
    { id: 121, front: "strzał", back: "el tiro" },
    { id: 122, front: "oferta pracy", back: "la oferta de trabajo" },
    { id: 123, front: "umiejętności", back: "los habilidades" },
    { id: 124, front: "przywództwo", back: "el liderazgo" },
    { id: 125, front: "karta do głosowania", back: "la boleta" },
    { id: 126, front: "kaczka", back: "un pato" },
    { id: 127, front: "wiejski", back: "rural" },
    { id: 128, front: "kibic", back: "el aficionado" },
    { id: 129, front: "strzelać na bramkę", back: "disparar/tirar a puerta" },
    { id: 130, front: "przemyt", back: "el contrabando" },
    { id: 131, front: "urząd celny", back: "la aduana" },
    { id: 132, front: "subskrybent", back: "el suscriptor" },
    { id: 133, front: "wyświetlenia", back: "los visualizaciones" },
    { id: 134, front: "krem przeciwsłoneczny", back: "la crema solar" },
    { id: 135, front: "szlak", back: "el sendero" },
    { id: 136, front: "wodospad", back: "la cascada" },
    { id: 137, front: "pot", back: "el sudor" },
    { id: 138, front: "wentylator", back: "el ventilador" },
    { id: 139, front: "cień", back: "la sombra" },
    { id: 140, front: "ograniczenie prędkości", back: "el limite de velocidad" },
    { id: 141, front: "punkt poboru opłat", back: "el peaje" },
    { id: 142, front: "rozbić się", back: "estrellarse" },
    { id: 143, front: "duch", back: "el fantasma, el espíritu" },
    { id: 144, front: "powiększać", back: "alargar" },
    { id: 145, front: "pasować", back: "caber" },
    { id: 146, front: "nadawca", back: "el remitente" },
    { id: 147, front: "trasa koncertowa", back: "la gira" },
    { id: 148, front: "scena", back: "el escenario" },
    { id: 149, front: "schronisko", back: "el refugio de animales" },
    { id: 150, front: "kość", back: "el hueso" },
    { id: 151, front: "obroża", back: "el collar" },
    { id: 152, front: "szczeniak", back: "el cachorro" },
    { id: 153, front: "smycz", back: "la correa" },
    { id: 154, front: "plik", back: "el archivo" },
    { id: 155, front: "platforma", back: "plataforma" },
    { id: 156, front: "szermierka", back: "la esgrima" },
    { id: 157, front: "błagać", back: "mendigar" },
    { id: 158, front: "grób", back: "la tumba" },
    { id: 159, front: "płonąć", back: "arder" },
    { id: 160, front: "słuchawki", back: "los auriculares" },
    { id: 161, front: "wydajność", back: "el rendimiento" },
    { id: 162, front: "jestem zmotywowany", back: "estoy arriba" },
    { id: 163, front: "mózg", back: "el cerebro" },
    { id: 164, front: "stanowisko", back: "el puesto" },
    { id: 165, front: "udawać", back: "fingir" },
    { id: 166, front: "strajk", back: "la huelga" },
    { id: 167, front: "zgadywać", back: "adivinar" },
    { id: 168, front: "zamiennik", back: "el sustituto" },
  ];

  const [flashcards, setFlashcards] = useState(initialFlashcards);
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [decks, setDecks] = useState(["Default Deck"]);
  const [selectedDeck, setSelectedDeck] = useState("Default Deck");
  const [userAnswer, setUserAnswer] = useState("");
  const [isRandom, setIsRandom] = useState(false); // New state for random toggle
  const inputRef = useRef<HTMLInputElement>(null);


  const addFlashcard = (front: string, back: string) => {
    const newFlashcard = { id: flashcards.length + 1, front, back };
    setFlashcards([...flashcards, newFlashcard]);
  };

  const nextFlashcard = () => {
    if (isRandom) {
      // Generate a random index
      const randomIndex = Math.floor(Math.random() * flashcards.length);
      setCurrentFlashcardIndex(randomIndex);
    } else {
      // Go to the next flashcard in order
      setCurrentFlashcardIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
    }
    setUserAnswer(""); // Clear the answer field
    if (inputRef.current) {
      inputRef.current.focus(); // Set focus to the input field
    }
  };

  const prevFlashcard = () => {
    setCurrentFlashcardIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
    setUserAnswer(""); // Clear the answer field
    if (inputRef.current) {
      inputRef.current.focus(); // Set focus to the input field
    }
  };

  const randomizeFlashcards = useCallback(() => {
    const shuffledFlashcards = [...flashcards].sort(() => Math.random() - 0.5);
    setFlashcards(shuffledFlashcards);
    setCurrentFlashcardIndex(0); // Reset to the first flashcard after shuffling
    setUserAnswer(""); // Clear the answer field
  }, [flashcards]);

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
            <Flashcard flashcard={flashcards[currentFlashcardIndex]} userAnswer={userAnswer} setUserAnswer={setUserAnswer} inputRef={inputRef}/>
          ) : (
            <p>No flashcards created yet.</p>
          )}

          <div className="flex justify-between mt-4">
            <Button variant="outline" onClick={prevFlashcard}>Previous</Button>
            <Button onClick={nextFlashcard}>Next</Button>
          </div>
          <div className="flex justify-center mt-2">
           <Checkbox id="randomize" checked={isRandom} onCheckedChange={(checked) => setIsRandom(checked)}/>
           <label htmlFor="randomize" className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Randomize</label>
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
