import React from "react";
// import styles from './Interfaz.module.css';
import { Paper, Grid, Typography, Modal, Button } from "@mui/material";

// Ponerlo con dialogs para hacer la interfaz
const Puntuacion = (props:{puntuacion:number}) => {
    
    const [open, setOpen] = React.useState(true);
    // const handleOpen = () => setOpen(true);
    const handleClose = (event: any, reason: any) => {
        if (reason && reason === "backdropClick")
            return;
        setOpen(false)
    };

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4
    };



    return (
        <Modal
            open={open}
            disableEscapeKeyDown={true}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Paper elevation={2} sx={style}>
                <Grid container textAlign={'center'} gap={1}>
                    <Grid item xs={12}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Memoraja Three JS
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Puntuacion final: {props.puntuacion}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Button>Subir puntos</Button>
                    </Grid>
                </Grid>
            </Paper>
        </Modal>
    )
}

export default Puntuacion;