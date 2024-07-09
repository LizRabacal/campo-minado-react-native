import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import params from './src/params';
import MineField from './src/components/MineField';
import {  createMinedBoard,
    cloneBoard,
    openField,
    hasExplosion,
    wonGame,
    invertFlag,
    flagsUsed,
    showMines } from './src/functions';

export default function App() {

  const minesAmount = () => {
    const cols = params.getColumnsAmount();
    const rows = params.getRowsAmount();
    return Math.ceil(cols * rows * params.difficultLevel);
  }

  const createState = () => {
    const cols = params.getColumnsAmount();
    const rows = params.getRowsAmount();
    return {
      won: false,
      lost: false,
      board: createMinedBoard(rows, cols, minesAmount()),
    };
  }

  const [state, setState] = useState(createState);


    onOpenField = (r, c) =>{
      const board = cloneBoard(state.board)
      openField(board, r, c);
      const lost = hasExplosion(board, r, c)
      const won = wonGame(board, r, c)

      if(lost) {
        showMines(board)
        Alert.alert('Perdeeeu!', 'que buuuurro!')
      }
      if(won) {
        Alert.alert('Parabens!', 'Você venceu!')
      }

      setState({board, lost, won});

    }

    onSelect = (r, c) => {
       const board = cloneBoard(state.board)
      invertFlag(board, r, c);
      const lost = hasExplosion(board, r, c)
      const won = wonGame(board, r, c)

      if(lost) {
        showMines(board)
        Alert.alert('Perdeeeu!', 'que buuuurro!')
      }
      if(won) {
        Alert.alert('Parabens!', 'Você venceu!')
      }

      setState({board, lost, won});
    }

  return (
    <View style={styles.container}>
  
          <View style={styles.board}>

      <MineField board={state.board} onOpenField={onOpenField} onSelect={onSelect}/>

          </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  board: {
    flex: 1,
    alignItems:'center',
    backgroundColor: '#AAA',
  },


});
