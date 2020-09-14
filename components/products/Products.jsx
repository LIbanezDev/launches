import React, {useState} from 'react';
import Card from '@material-ui/core/Card';
import Grid from "@material-ui/core/Grid";
import AlertSnackbar from "../AlertSnackbar";
import ProductReadMode from "./ProductReadMode";
import ProductEditMode from "./ProductEditMode";


export default function Products(props) {
    const [editMode, setEditMode] = useState(false)
    const [alertData, setAlertData] = useState({})

    return (
        <>
            <AlertSnackbar {...alertData} setAlertData={setAlertData} />
            <Grid item>
                <Card elevation={5}>
                    {
                        ! editMode ?
                            <ProductReadMode
                                {...props}
                                setEditMode={setEditMode}
                                setAlertData={setAlertData}
                            />
                            :
                            <ProductEditMode
                                {...props}
                                setEditMode={setEditMode}
                                setAlertData={setAlertData}
                            />
                    }
                </Card>
            </Grid>
        </>
    );
}