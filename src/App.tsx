import React from "react";
import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  move,
} from "react-grid-dnd";

import "./App.css";
import { correctAnswers, initialItems } from "./itemsData";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [items, setItems] = React.useState<any>(initialItems);

  // function onChange(
  //   sourceId: string,
  //   sourceIndex: number,
  //   targetIndex: number,
  //   targetId: string
  // ) {
  //   if (targetId) {
  //     const result = move(
  //       items[sourceId],
  //       items[targetId],
  //       sourceIndex,
  //       targetIndex
  //     );
  //     return setItems({
  //       ...items,
  //       [sourceId]: result[0],
  //       [targetId]: result[1],
  //     });
  //   }
  // }

  function onChange(
    sourceId: string,
    sourceIndex: number,
    targetIndex: number,
    targetId: string
  ) {
    // If source and target are the same, or target dropzone is full, exit early
    if (sourceId === targetId || (targetId && items[targetId].length >= 3)) {
      return;
    }
  
    if (targetId) {
      const result = move(
        items[sourceId],
        items[targetId],
        sourceIndex,
        targetIndex
      );
      
      return setItems({
        ...items,
        [sourceId]: result[0],
        [targetId]: result[1],
      });
    } else {
      // Moving within the same drop zone
      const newItems = [...items[sourceId]];
      const [removed] = newItems.splice(sourceIndex, 1);
      newItems.splice(targetIndex, 0, removed);
      
      return setItems({
        ...items,
        [sourceId]: newItems,
      });
    }
  }
  
  
  
  

  function compareArrays(arr1: any[], arr2: any[]): boolean {
    if (arr1.length !== arr2.length) {
      return false;
    }

    const copyArr1 = [...arr1];
    const copyArr2 = [...arr2];

    copyArr1.sort((a, b) => a.name.localeCompare(b.name));
    copyArr2.sort((a, b) => a.name.localeCompare(b.name));

    for (let i = 0; i < copyArr1.length; i++) {
      if (copyArr1[i].name !== copyArr2[i].name) {
        return false;
      }
    }

    return true;
  }

  function checkAnswers() {
    const sourceMatch = compareArrays(items.source, correctAnswers.source);
    const loadMatch = compareArrays(items.load, correctAnswers.load);
    const pathMatch = compareArrays(items.path, correctAnswers.path);

    if (sourceMatch) {
      toast.success("Source is correct");
    } else {
      toast.error("Source is incorrect");
    }

    if (loadMatch) {
      toast.success("Load is correct");
    } else {
      toast.error("Load is incorrect");
    }

    if (pathMatch) {
      toast.success("Path is correct");
    } else {
      toast.error("Path is incorrect");
    }
  }

  function resetGame() {
    console.log("Resetting the game...");
    setItems(initialItems);
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <GridContextProvider onChange={onChange}>
        <div className="container">
          <div className="dropzone-container">
            <GridDropZone
              className="dropzone"
              id="source"
              boxesPerRow={4}
              rowHeight={70}
            >
              <div className="drop-name">
                <button className="name-btn">Source</button>
              </div>
                {items.source.map((item) => (
                  <GridItem key={item.name}>
                    <div className="grid-item">
                      <div className="grid-item-content">
                        <img width={50} height={50} src={item.image} alt="" />
                        <p>{item.name}</p>
                      </div>
                    </div>
                  </GridItem>
                ))}
            </GridDropZone>
            <GridDropZone
              className="dropzone"
              id="load"
              boxesPerRow={4}
              rowHeight={70}
            >
              <div className="drop-name">
                <button className="name-btn">Load</button>
              </div>
                {items.load.map((item) => (
                  <GridItem key={item.name}>
                    <div className="grid-item">
                      <div className="grid-item-content">
                        <img width={50} height={50} src={item.image} alt="" />
                        <p>{item.name}</p>
                      </div>
                    </div>
                  </GridItem>
                ))}
            </GridDropZone>
            <GridDropZone
              className="dropzone"
              id="path"
              boxesPerRow={4}
              rowHeight={70}
            >
              <div className="drop-name">
                <button className="name-btn">Path</button>
              </div>
                {items.path.map((item) => (
                  <GridItem key={item.name}>
                    <div className="grid-item">
                      <div className="grid-item-content">
                        <img width={50} height={50} src={item.image} alt="" />
                        <p>{item.name}</p>
                      </div>
                    </div>
                  </GridItem>
                ))}
            </GridDropZone>
          </div>
          <GridDropZone
            className="dropzone right"
            id="right"
            boxesPerRow={3}
            rowHeight={150}
          >
            {items.right.map((item) => (
              <GridItem key={item.name}>
                <div className="grid-item">
                  <div className="grid-item-content">
                    <img width={50} height={50} src={item.image} alt="" />
                    <p>{item.name}</p>
                  </div>
                </div>
              </GridItem>
            ))}
          </GridDropZone>
        </div>
      </GridContextProvider>

      <div className="buttons">
        <button className="check-button" onClick={checkAnswers}>
          CHECK
        </button>
        <button className="reset-button" onClick={resetGame}>
          RESET
        </button>
      </div>
    </>
  );
}

export default App;
