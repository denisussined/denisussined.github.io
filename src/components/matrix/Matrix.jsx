import styled from "styled-components";
import './Matrix.sass'

const Matrix = (props) => {
    return (
        <div className="matrix">
            <div className="matrix__buttons">
                <button onClick={() => props.setBuilderMode(true)}>RESET</button>
                <button onClick={props.addRowThunk}>ADD ROW</button>
            </div>
            <Grid {...props}/>
        </div>
    )
}

const Grid = (props) => {

    const deleteRow = (rowIndex) => {
        props.deleteRowThunk(rowIndex)
    }

    const increaseAmount = (cellId) => {
        props.increaseAmountThunk(cellId)
    }

    const showPercents = (rowIndex, percentsMode) => {
        props.showPercentsThunk(rowIndex, percentsMode)
    }

    const showNearestCells = (cellId, nearestMode) => {
        props.showNearestThunk(cellId, nearestMode)
    }

    const genMatrix = () => props.matrix.map((row, rowIndex) =>
        <div key={rowIndex} className="grid__row">
            {
                row.map(cell =>
                    <span
                        key={cell.id}
                        id={cell.id}
                        className={
                        cell.percentMode
                            ? `grid__cell percentMode`
                            : cell.nearestMode
                                ? `grid__cell nearestMode`
                                : `grid__cell ${cell.type}`}
                        onClick={
                            cell.type === "delete"
                                ? () => deleteRow(rowIndex - 1)
                                : cell.type === "common"
                                    ? () => increaseAmount(cell.id)
                                    : null
                        }
                        onMouseEnter={
                            cell.type === "common"
                                ? () => showNearestCells(cell.id, true)
                                : cell.type === "sum"
                                    ? () => showPercents(rowIndex, true)
                                    : null
                        }
                        onMouseLeave={
                            cell.type === "common"
                                ? () => showNearestCells(cell.id, false)
                                : cell.type === "sum"
                                    ? () => showPercents(rowIndex, false)
                                    : null
                        }
                    >
                        {
                            cell.percentMode
                                ? <PercentCell percent={cell.percent}/>
                                : cell.nearestMode
                                    ? <NearestCell amount={cell.amount}/>
                                    : cell.type === "delete"
                                        ? <>&#10006;</>
                                        : cell.amount
                        }
                    </span>
                )
            }
        </div>
    )

    return (
        <div className="grid">{genMatrix()}</div>
    )
}

const PercentBackground = styled.span`
  position: absolute;
  z-index: 0;
  height: ${props => props.percent}%;
  width: 45px;
  background-color: red;
  align-self: end;
`

const PercentCell = (props) => (
    <span className="percent">
            <PercentBackground percent={props.percent}></PercentBackground>
            <span className="content">{`${props.percent}%`}</span>
    </span>
)


const NearestCell = (props) => (
    <span className="neighbor">{props.amount}</span>
)

export default Matrix