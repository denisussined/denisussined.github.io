export const setInitialMatrix = (rowsNumber, columnsNumber) => {
    let initialMatrix = []

    for (let i = 0; i < rowsNumber; i++) {
        let row = []

        for (let j = 0; j < columnsNumber; j++) {
            row.push({
                id: `${i}_${j}`,
                type: "common",
                amount: Math.floor(Math.random()*(999-100+1)+100),
                percentMode: false,
                nearestMode: false
            })
        }

        initialMatrix.push(row)
    }

    return initialMatrix
}

export const setMatrix = (initialMatrix) => {
    let initialMatrixCopy = initialMatrix.map(row => row.map(column => ({...column})))
    let initialRowsCount = initialMatrix.length
    let initialColumnsCount = initialMatrix[0].length

    function addAverageRow(initialMatrix) {
        let averageRow = []

        for (let i = 0; i < initialColumnsCount; i++) {
            averageRow.push({
                id: `avg_${i}`,
                type: 'average',
                amount: 0
            })
        }

        for (let i = 0; i < initialRowsCount; i++) {
            for (let j = 0; j < initialColumnsCount; j++) {
                averageRow[j].amount += initialMatrix[i][j].amount
            }
        }

        for (let i = 0; i < initialColumnsCount; i++) {
            averageRow[i].amount = Math.round(averageRow[i].amount / initialRowsCount)
        }

        initialMatrix.push(averageRow)

        return initialMatrix
    }

    function addSumColumn(averagedMatrix) {
        let sumColumn = []

        for (let i = 0; i < initialRowsCount + 1; i++) {

            let sumInRow = 0

            for (let j = 0; j < initialColumnsCount; j++) {
                sumInRow += averagedMatrix[i][j].amount
            }

            sumColumn.push(sumInRow)
        }

        for (let i = 0; i < initialRowsCount + 1; i++) {
            averagedMatrix[i].push({id: `sum_${i}`, type: 'sum', amount: sumColumn[i]})

            for (let j = 0; j < initialColumnsCount; j++) {
                averagedMatrix[i][j].percent = Math.round((averagedMatrix[i][j].amount / sumColumn[i]) * 100)
            }
        }

        return averagedMatrix
    }

    function addNumeric(summedMatrix) {

        for (let i = 0; i < initialRowsCount + 1; i++) {
            if (i === initialRowsCount) {
                summedMatrix[i].unshift({id: `Ypos_${i}`, type: 'position', amount: 'Avg'})
            } else if (i !== initialRowsCount) {
                summedMatrix[i].unshift({id: `Ypos_${i}`, type: 'position', amount: i + 1})
            }
        }

        let numericRow = []

        for (let i = 0; i < initialColumnsCount + 2; i++) {
            if (i === 0) {
                numericRow.push({id: `Xpos_${i}`, type: 'position', amount: '№'})
            } else if (i === initialColumnsCount + 1) {
                numericRow.push({id: `Xpos_${i}`, type: 'position', amount: 'Sum'})
            } else if (i !== 0 && i !== initialColumnsCount + 1) {
                numericRow.push({id: `Xpos_${i}`, type: 'position', amount: i})
            }
        }

        summedMatrix.unshift(numericRow)

        return summedMatrix
    }

    function addDeleteColumn(numberedMatrix) {

        for (let i = 0; i < initialRowsCount + 2; i++) {
            if (i !== 0 && i !== initialRowsCount + 1) {
                numberedMatrix[i].push({id: `del_${i-1}`, type: 'delete'})
            }
        }

        return numberedMatrix
    }

    return addDeleteColumn(addNumeric(addSumColumn(addAverageRow(initialMatrixCopy))))
}

export const increaseAmount = (initialMatrix, id) => {
    let initialMatrixCopy = initialMatrix.map(row => row.map(column => ({...column})))
    let initialColumnsCount = initialMatrix[0].length
    let initialRowsCount = initialMatrix.length

    for (let i = 0; i < initialRowsCount; i++) {
        for (let j = 0; j < initialColumnsCount; j++) {
            if (initialMatrixCopy[i][j].id === id) {
                initialMatrixCopy[i][j].amount += 1
            }
        }
    }

    return initialMatrixCopy
}

export const showPercents = (matrix, rowIndex, percentMode) => {
    let matrixCopy = matrix.map(row => row.map(column => ({...column})))
    let copyRowsCount = matrixCopy.length
    let copyColumnsCount = matrixCopy[0].length

    for (let i = 1; i < copyRowsCount; i++) {

        if (i === rowIndex) {
            for (let j = 1; j < copyColumnsCount - 1; j++) {
                matrixCopy[i][j].percentMode = percentMode
            }
        }
    }

    return matrixCopy
}

export const setNearestMode = (initialMatrix, matrix, cellsNumber, id, nearestMode) => {
    let initialMatrixCopy = initialMatrix.map(row => row.map(column => ({...column})))
    let initialRowsCount = initialMatrixCopy.length
    let initialColumnsCount = initialMatrixCopy[0].length
    let currentCell = {
        i: null,
        j: null,
        value: null
    }
    let cellsSortedForId = []
    let matrixCopy = matrix.map(row => row.map(column => ({...column})))

    for (let i = 0; i < initialRowsCount; i++) {
        for (let j = 0; j < initialColumnsCount; j++) {
            cellsSortedForId.push(initialMatrixCopy[i][j])
            if (initialMatrixCopy[i][j].id === id) {
                currentCell.value = initialMatrixCopy[i][j].amount
                currentCell.i = i
                currentCell.j = j
            }
        }
    }

    cellsSortedForId.sort((a, b) => Math.abs(currentCell.value - a.amount) - Math.abs(currentCell.value - b.amount))
    let slicedSortedCells = cellsSortedForId.slice(1, cellsNumber + 1)

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length - 1; j++) {
            for (let k = 0; k < slicedSortedCells.length; k++) {
                if (slicedSortedCells[k].id === matrixCopy[i][j].id) {
                    matrixCopy[i][j].nearestMode = nearestMode
                }
            }
        }
    }

    return matrixCopy
}

export const addRow = (initialMatrix) => {
    let initialMatrixCopy = initialMatrix.map(row => row.map(column => ({...column})))
    let initialColumnsCount = initialMatrix[0].length
    let additionalRow = []

    for (let j = 0; j < initialColumnsCount; j++) {
        additionalRow.push({id: '', type: "common", amount: Math.floor(Math.random()*(999-100+1)+100), percentMode: false, nearestMode: false})
    }

    initialMatrixCopy.push(additionalRow)

    let copyRowsCount = initialMatrixCopy.length
    let copyColumnsCount = initialMatrixCopy[0].length

    for (let i = 0; i < copyRowsCount; i++) {
        for (let j = 0; j < copyColumnsCount; j++) {
            initialMatrixCopy[i][j].id = `${i}_${j}`
        }
    }

    return initialMatrixCopy
}

export const deleteRow = (initialMatrix, rowIndex) => {
    let initialMatrixCopy = initialMatrix.map(row => row.map(column => ({...column})))

    initialMatrixCopy = initialMatrixCopy.filter((row, currentRowIndex) => {
        return rowIndex !== currentRowIndex
    })

    let copyRowsCount = initialMatrixCopy.length
    let copyColumnsCount = initialMatrixCopy[0].length

    for (let i = 0; i < copyRowsCount; i++) {
        for (let j = 0; j < copyColumnsCount; j++) {
            initialMatrixCopy[i][j].id = `${i}`+`${j}`
        }
    }

    return initialMatrixCopy
}