import {
    addRow,
    deleteRow,
    increaseAmount,
    setInitialMatrix,
    setMatrix,
    setNearestMode,
    showPercents
} from "./matrixFunctions";

let initialState = {
    rowsNumber: null,
    columnsNumber: null,
    cellsNumber: null,
    initialMatrix: [],
    matrix: [],
}

export default function matrixReducer(matrixData = initialState, action) {
    switch (action.type) {
        case SET_PARAMETERS: return {
            ...matrixData,
            rowsNumber: action.rowsNumber,
            columnsNumber: action.columnsNumber,
            cellsNumber: action.cellsNumber,
        }

        case SET_INITIAL_MATRIX: return {
            ...matrixData,
            initialMatrix: setInitialMatrix(matrixData.rowsNumber, matrixData.columnsNumber)
        }

        case SET_MATRIX: return {
                ...matrixData,
                matrix: setMatrix(matrixData.initialMatrix)
            }


        case INCREASE_AMOUNT: return {
            ...matrixData,
            initialMatrix: increaseAmount(matrixData.initialMatrix, action.id)
        }

        case SHOW_PERCENTS: return {
            ...matrixData,
            matrix: showPercents(matrixData.matrix, action.rowIndex, action.percentMode)
        }

        case SHOW_NEAREST: return {
            ...matrixData,
            matrix: setNearestMode(matrixData.initialMatrix, matrixData.matrix, matrixData.cellsNumber, action.id, action.nearestMode)
        }

        case ADD_ROW: return {
            ...matrixData,
            initialMatrix: addRow(matrixData.initialMatrix)
        }

        case DELETE_ROW: return {
            ...matrixData,
            initialMatrix: deleteRow(matrixData.initialMatrix, action.rowIndex)
        }

        default: return matrixData
    }
}

// ACTIONS
const SET_PARAMETERS = "SET_PARAMETERS"
const SET_INITIAL_MATRIX = "SET_INITIAL_MATRIX"
const SET_MATRIX = "SET_MATRIX"

const INCREASE_AMOUNT = "INCREASE_AMOUNT"
const SHOW_PERCENTS = "SHOW_PERCENTS"
const SHOW_NEAREST = "SET_NEAREST_MODE"

const ADD_ROW = "ADD_ROW"
const DELETE_ROW = "DELETE_ROW"



// ACTION CREATORS
const setParametersAC = (rowsNumber, columnsNumber, cellsNumber) => ({type: SET_PARAMETERS, rowsNumber, columnsNumber, cellsNumber})
const setInitialMatrixAC = () => ({type: SET_INITIAL_MATRIX})
const setMatrixAC = () => ({type: SET_MATRIX})
const increaseAmountAC = (id) => ({type: INCREASE_AMOUNT, id})
const showPercentsAC = (rowIndex, percentMode) => ({type: SHOW_PERCENTS, rowIndex, percentMode})
const setNearestModeAC = (id, nearestMode) => ({type: SHOW_NEAREST, id, nearestMode})
const deleteRowAC = (rowIndex) => ({type: DELETE_ROW, rowIndex})
const addRowAC = () => ({type: ADD_ROW})

// THUNKS
export const createMatrixThunk = (rowsNumber, columnsNumber, cellsNumber) => dispatch => {
    dispatch(setParametersAC(rowsNumber, columnsNumber, cellsNumber))
    dispatch(setInitialMatrixAC())
    dispatch(setMatrixAC())
}

export const increaseAmountThunk = (id) => dispatch => {
    dispatch(increaseAmountAC(id))
    dispatch(setMatrixAC())
}

export const showPercentsThunk = (rowIndex, percentMode) => dispatch => {
    dispatch(showPercentsAC(rowIndex, percentMode))
}

export const showNearestThunk = (id, nearestMode) => dispatch => {
    dispatch(setNearestModeAC(id, nearestMode))
}

export const deleteRowThunk = (rowIndex) => dispatch => {
    dispatch(deleteRowAC(rowIndex))
    dispatch(setMatrixAC())
}

export const addRowThunk = () => dispatch => {
    dispatch(addRowAC())
    dispatch(setMatrixAC())
}



