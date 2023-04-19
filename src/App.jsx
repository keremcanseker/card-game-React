
import { useState, useEffect } from 'react'
import Card from './components'
import helmet from "./assets/helmet-1.png"
import potion from  "./assets/potion-1.png"
import sword from "./assets/sword-1.png"
import shield from "./assets/shield-1.png"
import ring from "./assets/ring-1.png"
import scroll from "./assets/scroll-1.png"

const cardImages = [
  { "src": helmet, matched: false },
  { "src": potion, matched: false },
  { "src": sword, matched: false },
  { "src": shield, matched: false },
  { "src": ring, matched: false },
  { "src": scroll, matched: false },
  
]



function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setchoiceOne] = useState(null)
  const [choiceTwo, setchoiceTwo] = useState(null)
  //shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))

    setCards(shuffledCards)
    setTurns(0);
  }
  //handle a choice
  const handleChoice = (card) => {
    choiceOne ? setchoiceTwo(card) : setchoiceOne(card)
  }

  useEffect(() => {
    if ((choiceTwo)) {
      if ((choiceOne.src === choiceTwo.src)) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceTwo.src) {
              return { ...card, matched: true }
            } else {
              return card
            }
          })
        })
        resetTurn();
      } else {
        console.log("not a match")
        setTimeout(() => resetTurn()

          , 1000);

      }

    }





  }, [choiceTwo])

  console.log(cards);

  //reset turns
  const resetTurn = () => {
    setchoiceOne(null);
    setchoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1);
  }
  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className='card-grid'>
        {cards.map(card => (
          <Card key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
          >

          </Card>
        ))}
      </div>
    </div>
  );
}

export default App
