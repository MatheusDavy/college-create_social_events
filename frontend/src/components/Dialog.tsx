import { DialogTitle } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

type Props = {
    onClose: () => void
    action: () => void
    open: boolean
}

export function ActionModal({ onClose, open = false, action }: Props) {

    return (
        <Dialog onClose={onClose} open={open}>
            <DialogTitle>Aviso</DialogTitle>
            <DialogContent>Você tem certeza que deseja fazer isto?</DialogContent>
            <DialogActions>
                <button type="button" onClick={onClose} className="w-fit text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    Cancelar
                </button>
                <button onClick={action} type="button" className="w-fit text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                    Confirmar
                </button>
            </DialogActions>
        </Dialog>
    );
}