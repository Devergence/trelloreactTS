import React from 'react';
import { ColumnContainer, ColumnTitle } from "./styles";
import {AddNewItem} from "./AddNewItem";
import { useAppState } from "./AppStateContext";
import {Card} from "./Card";

interface ColumnProps {
  id: string
  text: string
  index: number
}

export const Column = ({text, index, id}: ColumnProps) => {
  const { state, dispatch } = useAppState();

  return (
    <ColumnContainer>
      <ColumnTitle>{text}</ColumnTitle>
      {
        state.lists[index].tasks.map((task, i) => (
          <Card text={task.text} key={task.id} index={i}/>
        ))
      }
      <AddNewItem toggleButtonText="+ Add another list" onAdd={text => dispatch({type: "ADD_TASK", payload: {text, listId: id}})} dark/>
    </ColumnContainer>
  );
};
