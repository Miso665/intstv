import React from "react";
import {
    AppBar,
    Toolbar,
    CssBaseline,
    Typography
} from "@mui/material";
import { Link } from "react-router-dom";


const styles = {
    navlinks: {
        marginLeft: 10,
        display: "flex",
    },
    logo: {
        flexGrow: "1",
        cursor: "pointer",
    },
    link: {
        textDecoration: "none",
        color: "white",
        fontSize: "20px",
        marginLeft: 10,
        paddingRight: "15px",
        paddingLeft: "15px",
        paddingTop: "8px",
        "&:hover": {
            color: "yellow",
            borderBottom: "1px solid white",
        },
    },
    linkAdmin: {
        textDecoration: "none",
        color: "white",
        fontSize: "20px",
        float: "right",
        marginLeft: "auto",
        "&:hover": {
            color: "yellow",
            borderBottom: "1px solid white",
        },
    },
};

function Navbar() {

    return (
        <AppBar position="static" >
            <CssBaseline />
            <Toolbar style={{ backgroundColor: "#03a9f4" }}>
                <Typography variant="h4">
                    Knjižnica
                </Typography>
                <div style={styles.navlinks}>
                    <Link to="/" style={styles.link}>
                        Početna
                    </Link>
                    <Link to="/temperature" style={styles.link}>
                        Temperatura
                    </Link>
                    <Link to="/humidity" style={styles.link}>
                        Vlažnost
                    </Link>
                    <Link to="/people" style={styles.link}>
                        Broj ljudi
                    </Link>
                    <Link to="/sound" style={styles.link}>
                        Glasnoća
                    </Link>

                </div>
                <Link to="/admin" style={styles.linkAdmin}>
                    Administrator
                </Link>
            </Toolbar>
        </AppBar>
    );
}
export default Navbar;