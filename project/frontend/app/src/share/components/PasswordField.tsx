import { Visibility } from "@mui/icons-material";
import { Grid, TextField } from "@mui/material";
import { useState } from "react";

interface PasswordFieldProps
{
    onChange?: { (value: any): void; };
}

const PasswordField: React.FC<PasswordFieldProps> = (props: PasswordFieldProps) =>
{
    const [show, setShow] = useState(false);

    return (
        <>
            <Grid container spacing={2} alignItems={"end"}>

                <TextField
                    label="Senha"
                    type={ show ? "" : "password" }
                    variant="standard"
                    color="primary"
                    name="password"
                    onChange={(e: any)=>{if(props.onChange){props.onChange(e)}}}
                />

                <Visibility
                    onClick={()=>setShow(!show)}
                />
            </Grid>
        </>
    )
}


export default PasswordField;

