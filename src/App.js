import './App.css';
import BuilderContainer from "./components/builder/BuilderContainer";
import MatrixContainer from "./components/matrix/MatrixContainer";
import {useState} from "react";

export default function App() {

    const [builder, setBuilder] = useState(true)

    const setBuilderMode = builderMode => {
        setBuilder(builderMode)
    }

    return (
        <div className="app">
            {
                builder
                    ? <BuilderContainer setBuilderMode={setBuilderMode}/>
                    : <MatrixContainer setBuilderMode={setBuilderMode}/>
            }
        </div>
    )
}
