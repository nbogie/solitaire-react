import { useState } from 'react';
import { CardView } from './CardView';
import {
    Card, cardToString, Column, differentColourSuits, isKing, makeColumns
} from './deck';

function canPlaceOn(baseCard: Card, nextCard: Card) {
    return (
        baseCard.rank === nextCard.rank + 1 &&
        differentColourSuits(baseCard.suit, nextCard.suit)
    );
}

function Solitaire() {
    const [logMessages, setLogMessages] = useState<string[]>([]);
    const [selectedCard, setSelectedCard] = useState<Card | null>(null);

    const addMessage = (m: string) => {
        setLogMessages([...logMessages, m]);
    };
    function removeCardsFrom(c: Card) {
        const column = columns.find(cl => cl.includes(c))!;
        const ix = column.findIndex(a => a === c);
        if (ix === -1) {
            throw new Error("can't find card in column");
        }
        const removed = column.splice(ix);

        setColumns([...columns]);
        return removed;
    }
    function tryToPlaceOn(baseCard: Card, nextCard: Card) {
        if (baseCard === nextCard) {
            addMessage("Can't place on self!");
            setSelectedCard(null);
            return;
        }
        const columnEndingWithBaseCard = columns.find(
            col => col[col.length - 1] === baseCard
        );

        if (!columnEndingWithBaseCard) {
            addMessage("Can't place on non-end card: " + cardToString(baseCard));
            setSelectedCard(null);
            return;
        }

        if (canPlaceOn(baseCard, nextCard)) {
            const removed = removeCardsFrom(nextCard);
            columnEndingWithBaseCard.push(...removed);
            setColumns([...columns]);
            setSelectedCard(null);
        } else {
            addMessage(
                `Can't place ${cardToString(nextCard)} on ${cardToString(baseCard)}`
            );
            setSelectedCard(null);
        }
    }

    function handleClickedCard(card: Card) {
        if (selectedCard) {
            tryToPlaceOn(card, selectedCard);
        } else {
            setSelectedCard(card);
        }
    }
    function handleClickedFaceDownCard(card: Card) {
        card.isFaceup = true;
        setColumns([...columns]);
    }

    function handleClickedEmptyColumn(col: Column) {
        if (selectedCard && isKing(selectedCard)) {
            const removed = removeCardsFrom(selectedCard);
            col.push(...removed);
            setColumns([...columns]);
            setSelectedCard(null);
        }
    }
    const [columns, setColumns] = useState<Column[]>(makeColumns());

    return (
        <div>
            <h1>Klondike / Solitaire (React prototype)</h1>
            <div className="cardTable">
                {columns.map((col, ix) => (
                    <div className="column" key={ix}>
                        <div
                            onClick={
                                col.length === 0
                                    ? () => handleClickedEmptyColumn(col)
                                    : () => { }
                            }
                        >
                            Column:
                        </div>
                        {col.map((card, ixc) => (
                            <CardView
                                card={card}
                                key={ixc}
                                handleClickedCard={handleClickedCard}
                                handleClickedFaceDownCard={() => {
                                    if (ixc === col.length - 1) {
                                        handleClickedFaceDownCard(card);
                                    } else {
                                        addMessage('not last card');
                                    }
                                }}
                            />
                        ))}
                    </div>
                ))}
                <div>
                    {selectedCard && (
                        <div>
                            Selected card: <CardView
                                card={selectedCard}
                                handleClickedCard={() => { }}
                                handleClickedFaceDownCard={() => { }}
                            />
                            <button onClick={() => setSelectedCard(null)}>cancel</button>
                        </div>
                    )}
                </div>
            </div>
            <h3>Messages:</h3>
            {[...logMessages].reverse().map(m => (
                <p>{m}</p>
            ))}
        </div>
    );
}

export default Solitaire;