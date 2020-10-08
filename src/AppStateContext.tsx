import React, {createContext, PropsWithChildren, useReducer, useContext} from 'react'
import { nanoid } from "nanoid";
import {findItemIndexById} from "./utils/findItemIndexById";
import {moveItem} from "./moveItem";

interface Task {
  id: string
  text: string
}

interface List {
  id: string
  text: string
  tasks: Task[]
}

export interface AppState {
  lists: List[]
}

interface AppStateContextProps {
  state: AppState
  dispatch: React.Dispatch<Action>
}

const appData: AppState = {
  lists: [
    {
      id: '0',
      text: 'To Do',
      tasks: [{id:'c0', text: "Generate app scaffold"}]
    },
    {
      id: '1',
      text: 'In Progress',
      tasks: [{id:'c2', text: "Learn TypeScript"}]
    },
    {
      id: '2',
      text: 'Done',
      tasks: [{id:'c3', text: "Begin to use static typing"}]
    }
  ]
}

type Action =
  | {
  type: "ADD_LIST"
  payload: string
}
  | {
  type: "ADD_TASK"
  payload: { text: string; listId: string }
} | {
  type: "MOVE_LIST"
  payload: { dragIndex: number; hoverIndex: number }
}

export const useAppState = () => {
  return useContext(AppStateContext);
}

const AppStateContext = createContext<AppStateContextProps>({} as AppStateContextProps);

export const AppStateProvide = ({children}: PropsWithChildren<{}>) => {
  const [state, dispatch] = useReducer(appStateReducer, appData);

  return (
    <AppStateContext.Provider value={{state, dispatch}}>
      {children}
    </AppStateContext.Provider>
  )
}

const appStateReducer = (state: AppState, action: Action): AppState => {
  switch (action.type){
    case "ADD_LIST": {
      return {
        ...state,
        lists: [
          ...state.lists,
          { id: nanoid(), text: action.payload, tasks: [] }
        ]
      }
    }
    case "ADD_TASK": {
      const targetLaneIndex = findItemIndexById(
        state.lists,
        action.payload.listId
      )
      state.lists[targetLaneIndex].tasks.push({
        id: nanoid(),
        text: action.payload.text
      })
      return {
        ...state
      }
    }
    case "MOVE_LIST": {
      const { dragIndex, hoverIndex } = action.payload;
      state.lists = moveItem(state.lists, dragIndex, hoverIndex)
      return {
        ...state
      }
    }
    default: {
      return state
    }
  }
}