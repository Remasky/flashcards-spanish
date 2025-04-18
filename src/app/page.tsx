"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Flashcard } from "@/components/Flashcard";
import { DeckList } from "@/components/DeckList";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";


export default function Home() {
  const initialFlashcards = [
    { id: 3, front: "opowiadać", back: "narrar, contar" },
    { id: 4, front: "odciążać", back: "aliviar" },
    { id: 5, front: "guma do żucia", back: "el chicle" },
    { id: 6, front: "witryna sklepowa", back: "el escaparate/la vidriera" },
    { id: 7, front: "dzwonek do drzwi", back: "el timbre" },
    { id: 8, front: "należeć", back: "pertenecer" },
    { id: 9, front: "food truck", back: "el camión de comida" },
    { id: 10, front: "z dostawą", back: "a domicilio" },
    { id: 11, front: "słony", back: "salado" },
    { id: 12, front: "przyprawy", back: "los condimentos" },
    { id: 13, front: "płatność z góry", back: "pago por adelantado" },
    { id: 14, front: "okrągły", back: "redondo" },
    { id: 15, front: "klimatyzacja", back: "el aire acondicionado" },
    { id: 16, front: "należeć", back: "pertenecer" },
    { id: 17, front: "hulajnoga elektryczna", back: "el patinete eléctrico" },
    { id: 18, front: "pieczątka", back: "el sello" },
    { id: 19, front: "gościć", back: "acoger" },
    { id: 20, front: "zagrożenie", back: "la amenaza" },
    { id: 21, front: "odbywać służbę wojskową", back: "hacer la mili" },
    { id: 22, front: "wokół", back: "alrededor" },
    { id: 23, front: "ognisko", back: "la fogata" },
    { id: 24, front: "myśliwy", back: "el cazador" },
    { id: 25, front: "kliknięcie", back: "el clic" },
    { id: 26, front: "ubezpieczenie", back: "el seguro" },
    { id: 27, front: "budżet", back: "el presupuesto" },
    { id: 28, front: "podlewać", back: "regar" },
    { id: 29, front: "dziki (zwierzę)", back: "salvaje" },
    { id: 30, front: "właściciel", back: "el dueño" },
    { id: 31, front: "grad", back: "el granizo" },
    { id: 32, front: "odliczanie", back: "cuenta atrás" },
    { id: 33, front: "kosztować dużo wysiłku", back: "costarme" },
    { id: 34, front: "pokonać", back: "superar, vencer" },
    { id: 35, front: "skrzydło", back: "el ala" },
    { id: 36, front: "zapisany", back: "inscrito" },
    { id: 37, front: "pianka", back: "la espuma" },
    { id: 38, front: "prażyć, piec", back: "tostar" },
    { id: 39, front: "nieudany", back: "fallido" },
    { id: 40, front: "podejrzewać", back: "sospechar" },
    { id: 41, front: "wsiadać/wysiadać", back: "subir/bajar" },
    { id: 42, front: "peron", back: "el anden" },
    { id: 43, front: "konferencja", back: "la conferencia" },
    { id: 44, front: "uczestnik", back: "el participante" },
    { id: 45, front: "cud", back: "el milagro" },
    { id: 46, front: "mocny", back: "potente" },
    { id: 47, front: "sportowy", back: "deportivo" },
    { id: 48, front: "wytrzymały", back: "resistente" },
    { id: 49, front: "okulary do pływania", back: "las gafas de natación" },
    { id: 50, front: "chlor", back: "el cloro" },
    { id: 51, front: "intensywnie", back: "intensivamente" },
    { id: 52, front: "smaczny", back: "sabroso" },
    { id: 53, front: "radosny", back: "alegre" },
    { id: 54, front: "zatłoczony", back: "concurrido" },
    { id: 55, front: "odległy", back: "lejano" },
    { id: 56, front: "relaksujący", back: "relajante" },
    { id: 57, front: "niezapomniany", back: "inolvidable" },
    { id: 58, front: "ryzykowny", back: "arriesgado" },
    { id: 59, front: "cichy", back: "silencioso" },
    { id: 60, front: "zorganizowany", back: "organizado" },
    { id: 61, front: "stresujący", back: "estresante" },
    { id: 62, front: "konkurencyjny", back: "competitivo" },
    { id: 63, front: "zazdrościć", back: "envidiar" },
    { id: 64, front: "brzeg", back: "la orilla" },
    { id: 65, front: "mgła", back: "la niebla" },
    { id: 66, front: "krajobraz", back: "el paisaje" },
    { id: 67, front: "ciężary", back: "las pesas" },
    { id: 68, front: "brzuszki", back: "las abdominales" },
    { id: 69, front: "rozciąganie", back: "el estiramiento" },
    { id: 70, front: "mur zamku", back: "la muralla" },
    { id: 71, front: "wieża", back: "el torre" },
    { id: 72, front: "forteca", back: "la fortaleza" },
    { id: 73, front: "łucznik", back: "el arquero" },
    { id: 74, front: "przymiotnik", back: "el adjetivo" },
    { id: 75, front: "czasownik", back: "el verbo" },
    { id: 76, front: "rzeczownik", back: "el sustantivo" },
    { id: 77, front: "pogrzeb", back: "el entierro" },
    { id: 78, front: "cmentarz", back: "el cementerio" },
    { id: 79, front: "żałoba", back: "el luto" },
    { id: 80, front: "drukarka", back: "la impresora" },
    { id: 81, front: "scena koncertów", back: "el escenario" },
    { id: 82, front: "perkusja", back: "la batería" },
    { id: 83, front: "maska samochodu", back: "el capó" },
    { id: 84, front: "kierownica", back: "el volante" },
    { id: 85, front: "silnik", back: "el motor" },
    { id: 86, front: "hamulec", back: "el freno" },
    { id: 87, front: "mąka", back: "la harina" },
    { id: 88, front: "kromka", back: "la rebanada" },
    { id: 89, front: "chleb pełnoziarnisty", back: "el pan integral" },
    { id: 90, front: "mięta", back: "la menta" },
    { id: 91, front: "premiera", back: "el estreno" },
    { id: 92, front: "okładka", back: "la portada" },
    { id: 93, front: "spis treści", back: "el índice" },
    { id: 94, front: "szaszłyk", back: "la brocheta" },
    { id: 95, front: "pieczeń, grillowane mięso", back: "el asado" },
    { id: 96, front: "stek", back: "el churrasco" },
    { id: 97, front: "wędzony", back: "ahumado" },
    { id: 98, front: "osoba obsługująca grill", back: "el parrillero" },
    { id: 99, front: "zaułek", back: "el callejón" },
    { id: 100, front: "mur obronny", back: "la muralla" },
    { id: 101, front: "olimpiada", back: "la olimpiada, juegos Olímpicos" },
    { id: 102, front: "medal", back: "la medalla" },
    { id: 103, front: "zawody", back: "la competencia" },
    { id: 104, front: "pochodnia", back: "la antorcha" },
    { id: 105, front: "ceremonia otwarcia", back: "la ceremonia de apertura" },
    { id: 106, front: "ostrzegać", back: "avisar" },
    { id: 107, front: "prognoza", back: "el pronóstico" },
    { id: 108, front: "tęcza", back: "el arcoiris" },
    { id: 109, front: "tankować", back: "repostar el coche" },
    { id: 110, front: "stacja benzynowa", back: "la gasolinera" },
    { id: 111, front: "paliwo", back: "el combustible" },
    { id: 112, front: "napełniać", back: "llenar" },
    { id: 113, front: "podanie", back: "la solicitud" },
    { id: 114, front: "wymagania", back: "los requisitos" },
    { id: 115, front: "mielenie", back: "molienda" },
    { id: 116, front: "kawa z odrobiną mleka", back: "cortado" },
    { id: 117, front: "palenie kawy", back: "torrefacción" },
    { id: 118, front: "pościel", back: "la ropa de cama" },
    { id: 119, front: "stolik nocny", back: "la mesita de noche" },
    { id: 120, front: "poseł", back: "el diputado" },
    { id: 121, front: "przemówienie", back: "el discurso" },
    { id: 122, front: "podanie", back: "el pase" },
    { id: 123, front: "strzał", back: "el tiro" },
    { id: 124, front: "oferta pracy", back: "la oferta de trabajo" },
    { id: 125, front: "umiejętności", back: "los habilidades" },
    { id: 126, front: "przywództwo", back: "el liderazgo" },
    { id: 127, front: "karta do głosowania", back: "la boleta" },
    { id: 128, front: "kaczka", back: "un pato" },
    { id: 129, front: "wiejski", back: "rural" },
    { id: 130, front: "kibic", back: "el aficionado" },
    { id: 131, front: "strzelać na bramkę", back: "disparar/tirar a puerta" },
    { id: 132, front: "przemyt", back: "el contrabando" },
    { id: 133, front: "urząd celny", back: "la aduana" },
    { id: 134, front: "subskrybent", back: "el suscriptor" },
    { id: 135, front: "wyświetlenia", back: "los visualizaciones" },
    { id: 136, front: "krem przeciwsłoneczny", back: "la crema solar" },
    { id: 137, front: "szlak", back: "el sendero" },
    { id: 138, front: "wodospad", back: "la cascada" },
    { id: 139, front: "pot", back: "el sudor" },
    { id: 140, front: "wentylator", back: "el ventilador" },
    { id: 141, front: "cień", back: "la sombra" },
    { id: 142, front: "ograniczenie prędkości", back: "el limite de velocidad" },
    { id: 143, front: "punkt poboru opłat", back: "el peaje" },
    { id: 144, front: "rozbić się", back: "estrellarse" },
    { id: 145, front: "duch", back: "el fantasma, el espíritu" },
    { id: 146, front: "powiększać", back: "alargar" },
    { id: 147, front: "pasować", back: "caber" },
    { id: 148, front: "nadawca", back: "el remitente" },
    { id: 149, front: "trasa koncertowa", back: "la gira" },
    { id: 150, front: "scena", back: "el escenario" },
    { id: 151, front: "schronisko", back: "el refugio de animales" },
    { id: 152, front: "kość", back: "el hueso" },
    { id: 153, front: "obroża", back: "el collar" },
    { id: 154, front: "szczeniak", back: "el cachorro" },
    { id: 155, front: "smycz", back: "la correa" },
    { id: 156, front: "plik", back: "el archivo" },
    { id: 157, front: "platforma", back: "plataforma" },
    { id: 158, front: "szermierka", back: "la esgrima" },
    { id: 159, front: "błagać", back: "mendigar" },
    { id: 160, front: "grób", back: "la tumba" },
    { id: 161, front: "płonąć", back: "arder" },
    { id: 162, front: "słuchawki", back: "los auriculares" },
    { id: 163, front: "wydajność", back: "el rendimiento" },
    { id: 164, front: "jestem zmotywowany", back: "estoy arriba" },
    { id: 165, front: "mózg", back: "el cerebro" },
    { id: 166, front: "stanowisko", back: "el puesto" },
    { id: 167, front: "udawać", back: "fingir" },
    { id: 168, front: "strajk", back: "la huelga" },
    { id: 169, front: "zgadywać", back: "adivinar" },
    { id: 170, front: "zamiennik", back: "el sustituto" },
  ];

  const [flashcards, setFlashcards] = useState(initialFlashcards);
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [decks, setDecks] = useState(["Default Deck"]);
  const [selectedDeck, setSelectedDeck] = useState("Default Deck");
  const [isRandom, setIsRandom] = useState(false);
  const [isGuessingFront, setIsGuessingFront] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [open, setOpen] = useState(false);
  const [shuffledFlashcards, setShuffledFlashcards] = useState([...flashcards]);


  useEffect(() => {
    if (isRandom) {
        setShuffledFlashcards(prevFlashcards => {
            const shuffled = [...prevFlashcards].sort(() => Math.random() - 0.5);
            return shuffled;
        });
    } else {
        setShuffledFlashcards([...flashcards]);
    }
}, [isRandom, flashcards]);

  const nextFlashcard = () => {
    let nextIndex;
    if (isRandom) {
        nextIndex = Math.floor(Math.random() * shuffledFlashcards.length);
    } else {
        nextIndex = (currentFlashcardIndex + 1) % flashcards.length;
    }
    setCurrentFlashcardIndex(nextIndex);
    setIsFlipped(false);
  };

  const prevFlashcard = () => {
    setCurrentFlashcardIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
    setIsFlipped(false);
  };

  const removeFlashcard = () => {
      const updatedFlashcards = flashcards.filter((_, index) => index !== currentFlashcardIndex);

      if (updatedFlashcards.length === 0) {
          setFlashcards([]);
          setCurrentFlashcardIndex(0);
          return;
      }

      setFlashcards(updatedFlashcards);

      const newIndex = Math.min(currentFlashcardIndex, updatedFlashcards.length - 1);
      setCurrentFlashcardIndex(newIndex);
      setIsFlipped(false);
  };

  const handleDontKnow = () => {
    nextFlashcard();
  };

  const handleGotIt = () => {
    removeFlashcard();
  };


  return (
    <div className="container mx-auto p-4 transition-all duration-300">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">FlashLearn</h1>
      </div>
        <div>Flashcards left: {flashcards.length}</div>

      <div className="flex flex-col md:flex-row gap-4">
        {/* Deck Management */}
        <div className="md:w-1/4">
          <DeckList decks={decks} selectedDeck={selectedDeck} onSelectDeck={(deck) => setSelectedDeck(deck)} />
        </div>

        {/* Flashcard Display */}
        <div className="md:w-3/4">
          {flashcards.length > 0 ? (
            
            <Flashcard
              flashcard={flashcards[currentFlashcardIndex]}
              isGuessingFront={isGuessingFront}
              isFlipped={isFlipped}
              setIsFlipped={setIsFlipped}
            />
            
          ) : (
            <p>No flashcards created yet.</p>
          )}
         <div className="flex justify-center mt-4 gap-4">
              <Button variant="outline" onClick={handleDontKnow}>Don't Know</Button>
              <Button onClick={handleGotIt}>Got It!</Button>
            </div>
          <div className="flex justify-between mt-4">
            <Button variant="outline" onClick={prevFlashcard} className="transition-transform duration-300">Previous</Button>
            <Button onClick={nextFlashcard} className="transition-transform duration-300">Next</Button>
          </div>
          <div className="flex justify-center mt-2">
           <Checkbox id="randomize" checked={isRandom} onCheckedChange={(checked) => setIsRandom(checked)}/>
           <label htmlFor="randomize" className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Randomize</label>
          </div>
            <div className="flex justify-center mt-2">
              <Checkbox
                id="guess-front"
                checked={isGuessingFront}
                onCheckedChange={(checked) => setIsGuessingFront(checked)}
              />
              <label
                htmlFor="guess-front"
                className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Guess Front
              </label>
            </div>
             <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">View All Words</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>All Flashcards</DialogTitle>
                    <DialogDescription>
                      Here's a preview of all the words in your flashcards:
                    </DialogDescription>
                  </DialogHeader>
                  <ScrollArea className="h-[300px]">
                    <div className="grid gap-4 py-4">
                      {flashcards.map((card) => (
                        <div key={card.id} className="flex justify-between">
                          <span>{card.front}</span>
                          <span>-</span>
                          <span>{card.back}</span>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </DialogContent>
              </Dialog>
        </div>
      </div>
    </div>
  );
}


