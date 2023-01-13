import React from "react";
import styles from './Interfaz.module.css';
import { Paper, Grid, Typography, Modal, Button } from "@mui/material";

// Ponerlo con dialogs para hacer la interfaz
const Interfaz = (props:{setNivel:any}) => {
    
    const [open, setOpen] = React.useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = (event: any, reason: any) => {
        if (reason && reason == "backdropClick")
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

    const setNivelFacil = () => {
        props.setNivel(0)
        setOpen(false)
    }
    const setNivelMedio = () => {
        props.setNivel(1)
        setOpen(false)
    }
    const setNivelDificil = () => {
        props.setNivel(2)
        setOpen(false)
    }

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
                            Seleccione nivel para empezar
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" onClick={setNivelFacil}>Facil</Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" onClick={setNivelMedio}>Medio</Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" onClick={setNivelDificil}>Dificil</Button>
                    </Grid>
                </Grid>
            </Paper>
        </Modal>
    )
}

export default Interfaz;