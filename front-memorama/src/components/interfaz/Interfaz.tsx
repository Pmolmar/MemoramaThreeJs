import React from "react";
import styles from './Interfaz.module.css';
import { Paper, Grid, Box, Typography, Modal } from "@mui/material";

// Ponerlo con dialogs para hacer la interfaz
const Interfaz = () => {
    return (
        <Grid container>
            <Grid item md={10} padding={2}>
                <Paper elevation={2} className={styles.interfaz}>
                    <Typography>
                        Bienvenido a mi juego
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
    )

}

export default Interfaz;