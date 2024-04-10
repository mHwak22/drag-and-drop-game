// App.jsx
import React, { useState } from 'react';
import './App.css'; // Import custom CSS file
import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap
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

  function onChange(sourceId, sourceIndex, targetIndex, targetId) {
    // Get the card being dragged
    const draggedCard = cards[sourceIndex];
  
    // Determine the target drop zone
    let newCards = [...cards];
    if (targetId) {
      // If dropping into a drop zone
      const targetIndexInZone = targetIndex % 3; // Get index within the drop zone
      const targetZoneIndex = Math.floor(targetIndex / 3); // Get drop zone index
  
      // Remove the card from the source
      newCards.splice(sourceIndex, 1);
  
      // Insert the card into the target drop zone
      const insertIndex = targetZoneIndex * 3 + targetIndexInZone;
      newCards.splice(insertIndex, 0, draggedCard);
    } else {
      // If dropping back to the card zone, simply swap positions
      newCards = swap(cards, sourceIndex, targetIndex);
    }
  
    // Update the state with the new card positions
    setCards(newCards);
  }
  

  const dropZoneStyle = {
    height: '400px',
    border: '1px solid #ccc',
    padding: '10px',
    borderRadius: '5px',
  };

  return (
    <div className="container">
      <div className="column drop-zone-column">
        <h2>Drop Zone</h2>
        <GridContextProvider onChange={onChange}>
          <GridDropZone id="drop-source" boxesPerRow={3} rowHeight={100} style={dropZoneStyle}>
            <div className="drop-row">
              <button>Source</button>
              {[1, 2, 3].map(index => (
                <GridItem key={`source-${index}`}>
                  <div className="drop-item"></div>
                </GridItem>
              ))}
            </div>
          </GridDropZone>
          <GridDropZone id="drop-load" boxesPerRow={3} rowHeight={100} style={dropZoneStyle}>
            <div className="drop-row">
              <button>Load</button>
              {[1, 2, 3].map(index => (
                <GridItem key={`load-${index}`}>
                  <div className="drop-item"></div>
                </GridItem>
              ))}
            </div>
          </GridDropZone>
          <GridDropZone id="drop-path" boxesPerRow={3} rowHeight={100} style={dropZoneStyle}>
            <div className="drop-row">
              <button>Path</button>
              {[1, 2, 3].map(index => (
                <GridItem key={`path-${index}`}>
                  <div className="drop-item"></div>
                </GridItem>
              ))}
            </div>
          </GridDropZone>
        </GridContextProvider>
      </div>
      <div className="column card-zone-column">
        <h2>Card Zone</h2>
        <GridContextProvider>
          <GridDropZone id="card-zone" boxesPerRow={3} rowHeight={100} style={dropZoneStyle}>
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
