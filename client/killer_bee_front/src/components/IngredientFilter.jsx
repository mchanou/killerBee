import { Search, Block } from '@mui/icons-material';
import { Fragment, useState, useEffect} from 'react';
import { TextField, Button } from '@mui/material';
import moment, { now } from 'moment';

export default function IngredientFilter(props) {
    const [values, setValues] = useState(props.initialValues);

    useEffect(() => {
        props.searchFunction(values);
    }, []); 

    /** RESET BUTTON */
    const clearValues = () => {
        setValues(props.emptyValues);
        props.searchFunction(props.emptyValues);
    };

    /** SEND VALUE */
    const handleSearch = (id, value) => {
        let filter = values;
        filter = { ...filter, [id]: value };

        setValues(filter);
    };

    //Search for data depending on filters settings
    const handleClickQuery = (event) => {
        event.preventDefault();
        const filter = { ...values, timestamp: now().valueOf() };
        setValues(filter);
        props.searchFunction(filter);
    };

    return (
        <Fragment>
            <form onSubmit={handleClickQuery}>
                <div className="p-2 mt-2 rounded-md bg-panel shadow">
                    <div className="relative">
                        <div className="grid grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-2 items-end justify-center">
                            <div className="col-span-1">
                                <TextField
                                    id="NomIngredient"
                                    label="Ingredient Name"
                                    value={values['NomIngredient'] || ''}
                                    onChange={(e) =>
                                        handleSearch('NomIngredient', e.target.value)
                                    }
                                    fullWidth
                                />
                            </div>
                        </div>
                        <div className="flex mr-3 justify-end gap-2">
                                <Button
                                    size="small"
                                    onClick={clearValues}
                                    startIcon={<Block fontSize="small" />}
                                >
                                    Reset
                                </Button>

                                <Button
                                    type="submit"
                                    size="small"
                                    variant="contained"
                                    startIcon={<Search fontSize="small" />}
                                >
                                    Find
                                </Button>
                            </div>
                    </div>
                </div>
            </form>
        </Fragment>
    );
}
