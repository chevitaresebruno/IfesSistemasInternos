import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useEffect, useState } from "react";


export interface DeleteConfirmationProps
{
    open?: boolean;
    label?: string;
    content?: string;
    onConfirm?: (()=>Promise<void>) | null;
}


const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({ open=false, label="esse registro", content, onConfirm = null }) =>
{
    const [opened, setOpened] = useState(open);

    useEffect(()=>{setOpened(open)}, [open]);

    return (
        <>
            <Dialog
                open={opened}
            > 
                <DialogTitle> Tem certeza que deseja deletar { label }? </DialogTitle>
                <DialogContent>
                    { content??'' }
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>setOpened(false)} color="info"> Cancelar </Button>
                    <Button onClick={()=>{if(onConfirm){onConfirm()}}} color="warning"> Confirmar </Button>
                </DialogActions>
            </Dialog>        
        </>
    )
}


export default DeleteConfirmation;

