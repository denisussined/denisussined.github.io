import './Builder.sass'
import {useFormik} from "formik";
import * as Yup from 'yup'

const Builder = (props) => {

    const initialValues = {columns: '', rows: '', cells: ''}

    const onSubmit = values => {
        props.createMatrixThunk(values.columns, values.rows, values.cells)
        props.setBuilderMode(false)
    }

    const validationSchema = Yup.object({
        columns: Yup.number().required('required').min(1).max(20),
        rows: Yup.number().required('required').min(1).max(20),
        cells: Yup.number().required('required').min(1).max(20),
    })


    const form = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    })

    return (
        <form onSubmit={form.handleSubmit} className="builder">

            <h2>MATRIX BUILDER</h2>

            <div className="params">
                <label htmlFor="columns" >Enter the number of columns</label>
                <input
                    id="columns"
                    name="columns"
                    type="number"
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    value={form.values.columns}
                />
            </div>
            {form.errors.columns && form.touched.columns ? <span className="error">{form.errors.columns}</span> : null}

            <div className="params">
                <label htmlFor="rows" >Enter the number of rows</label>
                <input
                    id="rows"
                    name="rows"
                    type="number"
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    value={form.values.rows}
                />
            </div>
            {form.errors.rows && form.touched.rows ? <span className="error">{form.errors.rows}</span> : null}

            <div className="params">
                <label htmlFor="cells" >Enter the number of cells</label>
                <input
                    id="cells"
                    name="cells"
                    type="number"
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    value={form.values.cells}
                />
            </div>
            {form.errors.cells && form.touched.cells ? <span className="error">{form.errors.cells}</span> : null}

            <button type="submit">create matrix</button>

        </form>
    )
}

export default Builder