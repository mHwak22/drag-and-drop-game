import React, { useState } from 'react';
import './App.css'; // Import custom CSS file
import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap,
  move
} from "react-grid-dnd";

function App() {
  const [cards, setCards] = useState([
    { id: 1, name: 'Card 1' },
    { id: 2, name: 'Card 2' },
    { id: 3, name: 'Card 3' },
    { id: 4, name: 'Card 4' },
    { id: 5, name: 'Card 5' },
    { id: 6, name: 'Card 6' },
    { id: 7, name: 'Card 7' },
    { id: 8, name: 'Card 8' },
    { id: 9, name: 'Card 9' },
  ]);

  // Define items state to keep track of cards in each drop zone
  const [items, setItems] = useState({
    'drop-source': [],
    'drop-load': [],
    'drop-path': []
  });

  function onChange(sourceId, sourceIndex, targetIndex, targetId) {
    if (targetId) {
      const sourceList = sourceId === 'card-zone' ? cards : items[sourceId];
      const targetList = targetId === 'card-zone' ? cards : items[targetId];
      const result = move(sourceList, targetList, sourceIndex, targetIndex);
      
      if (sourceId === 'card-zone') {
        setCards(result);
      } else {
        setItems({
          ...items,
          [sourceId]: result[0],
          [targetId]: result[1]
        });
      }
    } else {
      const result = swap(cards, sourceIndex, targetIndex);
      setCards(result);
    }
  }

  const dropZoneStyle = {
    height: '200px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    width: '400px'
  };

  const dropZoneStyle1 = {
    height: '600px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    width: '400px'
  };

  return (
    <div className="container">
      <div className="column drop-zone-column">
        <h2>Drop Zone</h2>
        <GridContextProvider onChange={onChange}>
          <GridDropZone id="drop-source" boxesPerRow={3} rowHeight={100} style={dropZoneStyle}>
            {[1, 2, 3].map(index => (
              <GridItem key={`source-${index}`}>
                <button>Source</button>
                <div className="drop-item"></div>
              </GridItem>
            ))}
          </GridDropZone>
          <GridDropZone id="drop-load" boxesPerRow={3} rowHeight={100} style={dropZoneStyle}>
            {[1, 2, 3].map(index => (
              <GridItem key={`load-${index}`}>
                <button>Load</button>
                <div className="drop-item"></div>
              </GridItem>
            ))}
          </GridDropZone>
          <GridDropZone id="drop-path" boxesPerRow={3} rowHeight={100} style={dropZoneStyle}>
            {[1, 2, 3].map(index => (
              <GridItem key={`path-${index}`}>
                <button>Path</button>
                <div className="drop-item"></div>
              </GridItem>
            ))}
          </GridDropZone>
        </GridContextProvider>
      </div>
      <div className="column card-zone-column">
        <h2>Card Zone</h2>
        <GridContextProvider>
          <GridDropZone id="card-zone" boxesPerRow={3} rowHeight={100} style={dropZoneStyle1}>
            {cards.map(card => (
              <GridItem key={card.id}>
                <div className="card-item">{card.name}</div>
              </GridItem>
            ))}
          </GridDropZone>
        </GridContextProvider>
      </div>
      <div className="buttons">
        <button className="check-button">CHECK</button>
        <button className="reset-button">RESET</button>
      </div>
    </div>
  );
}

export default App;
