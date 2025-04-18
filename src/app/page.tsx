"use client";

import { useState, useCallback } from "react";
import { Flashcard } from "@/components/Flashcard";
import { FlashcardForm } from "@/components/FlashcardForm";
import { DeckList } from "@/components/DeckList";
import { Button } from "@/components/ui/button";

export default function Home() {
  const initialFlashcards = [
    { id: 5, front: "opowiadać", back: "narrar, contar" },
    { id: 6, front: "odciążać", back: "aliviar" },
    { id: 7, front: "guma do żucia", back: "el chicle" },
    { id: 8, front: "witryna sklepowa", back: "el escaparate/la vidriera" },
    { id: 9, front: "dzwonek do drzwi", back: "el timbre" },
    { id: 10, front: "należeć", back: "pertenecer" },
    { id: 11, front: "food truck", back: "el camión de comida" },
    { id: 12, front: "z dostawą", back: "a domicilio" },
    { id: 13, front: "słony", back: "salado" },
    { id: 14, front: "przyprawy", back: "los condimentos" },
    { id: 15, front: "płatność z góry", back: "pago por adelantado" },
    { id: 16, front: "okrągły", back: "redondo" },
    { id: 17, front: "klimatyzacja", back: "el aire acondicionado" },
    { id: 18, front: "należeć", back: "pertenecer" },
    { id: 19, front: "hulajnoga elektryczna", back: "el patinete eléctrico" },
    { id: 20, front: "pieczątka", back: "el sello" },
    { id: 21, front: "gościć", back: "acoger" },
    { id: 22, front: "zagrożenie", back: "la amenaza" },
    { id: 23, front: "odbywać służbę wojskową", back: "hacer la mili" },
    { id: 24, front: "wokół", back: "alrededor" },
    { id: 25, front: "ognisko", back: "la fogata" },
    { id: 26, front: "myśliwy", back: "el cazador" },
    { id: 27, front: "kliknięcie", back: "el clic" },
    { id: 28, front: "ubezpieczenie", back: "el seguro" },
    { id: 29, front: "budżet", back: "el presupuesto" },
    { id: 30, front: "podlewać", back: "regar" },
    { id: 31, front: "dziki (zwierzę)", back: "salvaje" },
    { id: 32, front: "właściciel", back: "el dueño" },
    { id: 33, front: "grad", back: "el granizo" },
    { id: 34, front: "odliczanie", back: "cuenta atrás" },
    { id: 35, front: "kosztować dużo wysiłku", back: "costarme" },
    { id: 36, front: "pokonać", back: "superar, vencer" },
    { id: 37, front: "skrzydło", back: "el ala" },
    { id: 38, front: "zapisany", back: "inscrito" },
    { id: 39, front: "pianka", back: "la espuma" },
    { id: 40, front: "prażyć, piec", back: "tostar" },
    { id: 41, front: "nieudany", back: "fallido" },
    { id: 42, front: "podejrzewać", back: "sospechar" },
    { id: 43, front: "wsiadać/wysiadać", back: "subir/bajar" },
    { id: 44, front: "peron", back: "el anden" },
    { id: 45, front: "konferencja", back: "la conferencia" },
    { id: 46, front: "uczestnik", back: "el participante" },
    { id: 47, front: "cud", back: "el milagro" },
    { id: 48, front: "mocny", back: "potente" },
    { id: 49, front: "sportowy", back: "deportivo" },
    { id: 50, front: "wytrzymały", back: "resistente" },
    { id: 51, front: "okulary do pływania", back: "las gafas de natación" },
    { id: 52, front: "chlor", back: "el cloro" },
    { id: 53, front: "intensywnie", back: "intensivamente" },
    { id: 54, front: "smaczny", back: "sabroso" },
    { id: 55, front: "radosny", back: "alegre" },
    { id: 56, front: "zatłoczony", back: "concurrido" },
    { id: 57, front: "odległy", back: "lejano" },
    { id: 58, front: "relaksujący", back: "relajante" },
    { id: 59, front: "niezapomniany", back: "inolvidable" },
    { id: 60, front: "ryzykowny", back: "arriesgado" },
    { id: 61, front: "cichy", back: "silencioso" },
    { id: 62, front: "zorganizowany", back: "organizado" },
    { id: 63, front: "stresujący", back: "estresante" },
    { id: 64, front: "konkurencyjny", back: "competitivo" },
    { id: 65, front: "zazdrościć", back: "envidiar" },
    { id: 66, front: "brzeg", back: "la orilla" },
    { id: 67, front: "mgła", back: "la niebla" },
    { id: 68, front: "krajobraz", back: "el paisaje" },
    { id: 69, front: "ciężary", back: "las pesas" },
    { id: 70, front: "brzuszki", back: "las abdominales" },
    { id: 71, front: "rozciąganie", back: "el estiramiento" },
    { id: 72, front: "mur zamku", back: "la muralla" },
    { id: 73, front: "wieża", back: "el torre" },
    { id: 74, front: "forteca", back: "la fortaleza" },
    { id: 75, front: "łucznik", back: "el arquero" },
    { id: 76, front: "przymiotnik", back: "el adjetivo" },
    { id: 77, front: "czasownik", back: "el verbo" },
    { id: 78, front: "rzeczownik", back: "el sustantivo" },
    { id: 79, front: "pogrzeb", back: "el entierro" },
    { id: 80, front: "cmentarz", back: "el cementerio" },
    { id: 81, front: "żałoba", back: "el luto" },
    { id: 82, front: "drukarka", back: "la impresora" },
    { id: 83, front: "scena koncertów", back: "el escenario" },
    { id: 84, front: "perkusja", back: "la batería" },
    { id: 85, front: "maska samochodu", back: "el capó" },
    { id: 86, front: "kierownica", back: "el volante" },
    { id: 87, front: "silnik", back: "el motor" },
    { id: 88, front: "hamulec", back: "el freno" },
    { id: 89, front: "mąka", back: "la harina" },
    { id: 90, front: "kromka", back: "la rebanada" },
    { id: 91, front: "chleb pełnoziarnisty", back: "el pan integral" },
    { id: 92, front: "mięta", back: "la menta" },
    { id: 93, front: "premiera", back: "el estreno" },
    { id: 94, front: "okładka", back: "la portada" },
    { id: 95, front: "spis treści", back: "el índice" },
    { id: 96, front: "szaszłyk", back: "la brocheta" },
    { id: 97, front: "pieczeń, grillowane mięso", back: "el asado" },
    { id: 98, front: "stek", back: "el churrasco" },
    { id: 99, front: "wędzony", back: "ahumado" },
    { id: 100, front: "osoba obsługująca grill", back: "el parrillero" },
    { id: 101, front: "zaułek", back: "el callejón" },
    { id: 102, front: "mur obronny", back: "la muralla" },
    { id: 103, front: "olimpiada", back: "la olimpiada, juegos Olímpicos" },
    { id: 104, front: "medal", back: "la medalla" },
    { id: 105, front: "zawody", back: "la competencia" },
    { id: 106, front: "pochodnia", back: "la antorcha" },
    { id: 107, front: "ceremonia otwarcia", back: "la ceremonia de apertura" },
    { id: 108, front: "ostrzegać", back: "avisar" },
    { id: 109, front: "prognoza", back: "el pronóstico" },
    { id: 110, front: "tęcza", back: "el arcoiris" },
    { id: 111, front: "tankować", back: "repostar el coche" },
    { id: 112, front: "stacja benzynowa", back: "la gasolinera" },
    { id: 113, front: "paliwo", back: "el combustible" },
    { id: 114, front: "napełniać", back: "llenar" },
    { id: 115, front: "podanie", back: "la solicitud" },
    { id: 116, front: "wymagania", back: "los requisitos" },
    { id: 117, front: "mielenie", back: "molienda" },
    { id: 118, front: "kawa z odrobiną mleka", back: "cortado" },
    { id: 119, front: "palenie kawy", back: "torrefacción" },
    { id: 120, front: "pościel", back: "la ropa de cama" },
    { id: 121, front: "stolik nocny", back: "la mesita de noche" },
    { id: 122, front: "poseł", back: "el diputado" },
    { id: 123, front: "przemówienie", back: "el discurso" },
    { id: 124, front: "podanie", back: "el pase" },
    { id: 125, front: "strzał", back: "el tiro" },
    { id: 126, front: "oferta pracy", back: "la oferta de trabajo" },
    { id: 127, front: "umiejętności", back: "los habilidades" },
    { id: 128, front: "przywództwo", back: "el liderazgo" },
    { id: 129, front: "karta do głosowania", back: "la boleta" },
    { id: 130, front: "kaczka", back: "un pato" },
    { id: 131, front: "wiejski", back: "rural" },
    { id: 132, front: "kibic", back: "el aficionado" },
    { id: 133, front: "strzelać na bramkę", back: "disparar/tirar a puerta" },
    { id: 134, front: "przemyt", back: "el contrabando" },
    { id: 135, front: "urząd celny", back: "la aduana" },
    { id: 136, front: "subskrybent", back: "el suscriptor" },
    { id: 137, front: "wyświetlenia", back: "los visualizaciones" },
    { id: 138, front: "krem przeciwsłoneczny", back: "la crema solar" },
    { id: 139, front: "szlak", back: "el sendero" },
    { id: 140, front: "wodospad", back: "la cascada" },
    { id: 141, front: "pot", back: "el sudor" },
    { id: 142, front: "wentylator", back: "el ventilador" },
    { id: 143, front: "cień", back: "la sombra" },
    { id: 144, front: "ograniczenie prędkości", back: "el limite de velocidad" },
    { id: 145, front: "punkt poboru opłat", back: "el peaje" },
    { id: 146, front: "rozbić się", back: "estrellarse" },
    { id: 147, front: "duch", back: "el fantasma, el espíritu" },
    { id: 148, front: "powiększać", back: "alargar" },
    { id: 149, front: "pasować", back: "caber" },
    { id: 150, front: "nadawca", back: "el remitente" },
    { id: 151, front: "trasa koncertowa", back: "la gira" },
    { id: 152, front: "scena", back: "el escenario" },
    { id: 153, front: "schronisko", back: "el refugio de animales" },
    { id: 154, front: "kość", back: "el hueso" },
    { id: 155, front: "obroża", back: "el collar" },
    { id: 156, front: "szczeniak", back: "el cachorro" },
    { id: 157, front: "smycz", back: "la correa" },
    { id: 158, front: "plik", back: "el archivo" },
    { id: 159, front: "platforma", back: "plataforma" },
    { id: 160, front: "szermierka", back: "la esgrima" },
    { id: 161, front: "błagać", back: "mendigar" },
    { id: 162, front: "grób", back: "la tumba" },
    { id: 163, front: "płonąć", back: "arder" },
    { id: 164, front: "słuchawki", back: "los auriculares" },
    { id: 165, front: "wydajność", back: "el rendimiento" },
    { id: 166, front: "jestem zmotywowany", back: "estoy arriba" },
    { id: 167, front: "mózg", back: "el cerebro" },
    { id: 168, front: "stanowisko", back: "el puesto" },
    { id: 169, front: "udawać", back: "fingir" },
    { id: 170, front: "strajk", back: "la huelga" },
    { id: 171, front: "zgadywać", back: "adivinar" },
    { id: 172, front: "zamiennik", back: "el sustituto" },
  ];

  const [flashcards, setFlashcards] = useState(initialFlashcards);
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [decks, setDecks] = useState(["Default Deck"]);
  const [selectedDeck, setSelectedDeck] = useState("Default Deck");
  const [userAnswer, setUserAnswer] = useState("");

  const addFlashcard = (front: string, back: string) => {
    const newFlashcard = { id: flashcards.length + 1, front, back };
    setFlashcards([...flashcards, newFlashcard]);
  };

  const nextFlashcard = () => {
    setCurrentFlashcardIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
    setUserAnswer(""); // Clear the answer field
  };

  const prevFlashcard = () => {
    setCurrentFlashcardIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
    setUserAnswer(""); // Clear the answer field
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
            <Flashcard flashcard={flashcards[currentFlashcardIndex]} userAnswer={userAnswer} setUserAnswer={setUserAnswer}/>
          ) : (
            <p>No flashcards created yet.</p>
          )}

          <div className="flex justify-between mt-4">
            <Button variant="outline" onClick={prevFlashcard}>Previous</Button>
            <Button onClick={nextFlashcard}>Next</Button>
          </div>
          <div className="flex justify-center mt-2">
            <Button variant="secondary" onClick={randomizeFlashcards}>Randomize</Button>
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
