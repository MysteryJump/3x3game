import React, { useState, useEffect } from "react";
import "./App.css";

const App: React.FC = () => {
  // -1 is ×, 1 is ○

  const initialState = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ];
  const [boardState, setBoardState] = useState(initialState);

  // 100 is ...
  const [winner, setWinner] = useState(0);

  useEffect(() => {
    for (let i = 0; i < 3; i++) {
      let isWin = true;
      const firstElement = boardState[i][0];
      for (let j = 1; j < 3; j++) {
        if (firstElement !== boardState[i][j]) {
          isWin = false;
          break;
        }
      }
      if (isWin && firstElement !== 0) {
        setWinner(firstElement);
      }
    }
    for (let i = 0; i < 3; i++) {
      let isWin = true;
      const firstElement = boardState[0][i];
      for (let j = 1; j < 3; j++) {
        if (firstElement !== boardState[j][i]) {
          isWin = false;
          break;
        }
      }
      if (isWin && firstElement !== 0) {
        setWinner(firstElement);
      }
    }
    if (
      boardState[0][0] === boardState[1][1] &&
      boardState[1][1] === boardState[2][2] &&
      boardState[0][0] !== 0
    ) {
      setWinner(boardState[0][0]);
    }
    if (
      boardState[0][2] === boardState[1][1] &&
      boardState[1][1] === boardState[2][0] &&
      boardState[0][2] !== 0
    ) {
      setWinner(boardState[1][1]);
    }
    let isDraw = false;
    if (winner === 0) {
      let temp = false;
      boardState.forEach(x => {
        const ind = x.findIndex(x => x === 0);
        if (ind >= 0) {
          temp = true;
        }
      });
      if (!temp) {
        isDraw = true;
      }
    }
    if (isDraw) {
      setWinner(100);
    }
  }, [boardState, winner]);
  // first is 1 (○)
  const [turn, setTurn] = useState(1);
  return (
    <div>
      <p>Now turn is {turn === 1 ? "○" : "×"}</p>
      <table style={{ borderStyle: "solid", borderCollapse: "collapse" }}>
        {boardState.map((x, xindex) => {
          return (
            <tr>
              {x.map((y, yindex) => {
                return (
                  <td
                    onClick={() => {
                      let current: number[][] = [];
                      Object.assign(current, boardState);
                      if (current[xindex][yindex] !== 0) {
                        return;
                      }
                      current[xindex][yindex] = turn;
                      setTurn(-1 * turn);
                      setBoardState(current);
                    }}
                    style={{
                      height: "1.4rem",
                      width: "1.4rem",
                      border: "solid",
                      textAlign: "center"
                    }}
                  >
                    <span>{y === -1 ? "×" : y === 1 ? "○" : " "}</span>
                  </td>
                );
              })}
            </tr>
          );
        })}
      </table>
      {winner !== 0 && winner !== 100 ? (
        <>
          <p>Winner is {winner === 1 ? "○" : "×"}</p>{" "}
        </>
      ) : (
        <></>
      )}
      {winner === 100 ? <p>Draw</p> : <></>}
      <button
        onClick={() => {
          setTurn(1);
          setWinner(0);
          setBoardState(initialState);
        }}
      >
        Reset
      </button>
    </div>
  );
};

export default App;
