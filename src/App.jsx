import './App.css'
import { useState, useEffect } from 'react'
import Card from './components'
const cardImages = [
  { "src": "src/helmet-1.png", matched: false },
  { "src": "src/potion-1.png", matched: false },
  { "src": "src/sword-1.png", matched: false },
  { "src": "src/shield-1.png", matched: false },
  { "src": "src/ring-1.png", matched: false },
  { "src": "src/scroll-1.png", matched: false },
  
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
