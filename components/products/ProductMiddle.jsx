import React, {useState} from 'react';
import Card from '@material-ui/core/Card';
import Grid from "@material-ui/core/Grid";
import ProductReadMode from "./ProductReadMode";
import ProductEditMode from "./ProductEditMode";


export default function ProductMiddle(props) {

    const [editMode, setEditMode] = useState(false)

    return (
        <>
            <Grid item>
                <Card elevation={5}>
                    {
                        ! editMode ?
                            <ProductReadMode
                                {...props}
                                setEditMode={setEditMode}
                            />
                            :
                            <ProductEditMode
                                {...props}
                                setEditMode={setEditMode}
                            />
                    }
                </Card>
            </Grid>
        </>
    );
}
