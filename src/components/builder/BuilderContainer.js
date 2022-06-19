import {connect} from "react-redux";
import {createMatrixThunk} from "../../redux/matrixReducer";
import Builder from "./Builder";

const BuilderContainer = (props) => <Builder {...props}/>

export default connect(null, {createMatrixThunk})(BuilderContainer)
