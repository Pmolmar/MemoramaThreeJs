import React from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, orderBy, query } from "firebase/firestore";
// import styles from './Interfaz.module.css';
import { Paper, Grid, Typography, Modal, Button, TextField, Divider, ListItem, List } from "@mui/material";
import { DatosUsuario } from "../../types/datos";

// Ponerlo con dialogs para hacer la interfaz
const Puntuacion = (props: { puntuacion: number, nivel: number }) => {

    const [open, setOpen] = React.useState(true);
    const [nombre, setNombre] = React.useState("")
    const [puntosFacil, setPuntosFacil] = React.useState<Array<DatosUsuario>>([])
    const [puntosMedio, setPuntosMedio] = React.useState<Array<DatosUsuario>>([])
    const [puntosDificil, setPuntosDificil] = React.useState<Array<DatosUsuario>>([])
    const [subir, setSubir] = React.useState(false)

    React.useEffect(() => {
        console.log("renderizando")
    }, [subir])

    // BBDD
    const firebaseConfig = {
        apiKey: "AIzaSyAUoPQC7dabFWjPPDX0MZ23K2lrm5mANvM",
        authDomain: "gcce-32b1d.firebaseapp.com",
        projectId: "gcce-32b1d",
        storageBucket: "gcce-32b1d.appspot.com",
        messagingSenderId: "290661324919",
        appId: "1:290661324919:web:4c01c4ab2863547ec4ce72"
    };
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const handleNombre = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNombre(event.target.value);
    };

    const getDatos = async () => {
        console.log("llamado firebase getDocs")
        const q = query(collection(db, "Puntuacion"), orderBy("puntos", "desc"))
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            let datos: DatosUsuario = {
                nombre: doc.data().nombre,
                puntuacion: `${doc.data().puntos}.pts`,
            }

            if (doc.data().dificultad === 0) {
                let puntos = puntosFacil
                puntos.push(datos)
                setPuntosFacil(puntos)
            } else
                if (doc.data().dificultad === 1) {
                    let puntos = puntosMedio
                    puntos.push(datos)
                    setPuntosMedio(puntos)
                } else
                    if (doc.data().dificultad === 2) {
                        let puntos = puntosDificil
                        puntos.push(datos)
                        setPuntosDificil(puntos)
                    }

            console.log(`${doc.id} => ${doc.data().nombre} ${doc.data().puntos} ${doc.data().dificultad}`);
            setSubir(true)
        });

    }

    const subirDatos = async () => {

        const docRef = await addDoc(collection(db, "Puntuacion"), {
            nombre: nombre,
            puntos: `${props.puntuacion}`,
            dificultad: props.nivel
        });
        getDatos()


        console.log("Document written with ID: ", docRef.id);
    }


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
        width: 600,
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
                    <Grid item container xs={12} justifyContent={'center'} maxHeight={'30%'} overflow={"auto"}>
                        {subir ? <><Grid item xs={3}>
                            <Typography>
                                Facil
                            </Typography>
                            <List>
                                {puntosFacil.map(el => { return (<ListItem>{el.nombre}: {el.puntuacion}</ListItem>) })}
                            </List>
                        </Grid>
                            <Divider orientation="vertical" ></Divider>
                            <Grid item xs={3}>
                                <Typography>
                                    Medio
                                </Typography>
                                <List>
                                    {puntosMedio.map(el => { return (<ListItem>{el.nombre}: {el.puntuacion}</ListItem>) })}
                                </List>
                            </Grid>
                            <Divider orientation="vertical" ></Divider>
                            <Grid item xs={3}>
                                <Typography>
                                    Dificil
                                </Typography>
                                <List>
                                    {puntosDificil.map(el => { return (<ListItem>{el.nombre}: {el.puntuacion}</ListItem>) })}
                                </List>
                            </Grid>
                        </>
                            :
                            <Typography>Suba su puntuacion</Typography>}
                    </Grid>
                    <Grid item xs={12}>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Puntuacion final: {props.puntuacion}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField value={nombre} onChange={handleNombre}></TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <Button disabled={subir} onClick={subirDatos}>Subir puntos</Button>
                    </Grid>
                </Grid>
            </Paper>
        </Modal>
    )
}

export default Puntuacion;