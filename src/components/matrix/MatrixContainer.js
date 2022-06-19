import {connect} from "react-redux";
import Matrix from "./Matrix";
import {
    addRowThunk,
    deleteRowThunk,
    increaseAmountThunk,
    showNearestThunk,
    showPercentsThunk
} from "../../redux/matrixReducer";

const MatrixContainer = (props) => <Matrix {...props}/>

const mapStateToProps = (state) => ({matrix: state.matrixData.matrix})

export default connect(mapStateToProps, {
    increaseAmountThunk,
    showPercentsThunk,
    showNearestThunk,
    deleteRowThunk,
    addRowThunk
})(MatrixContainer)