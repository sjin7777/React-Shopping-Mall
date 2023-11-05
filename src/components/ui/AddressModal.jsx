import { useState } from "react";
import DaumPostcodeEmbed from "react-daum-postcode";

import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


function AddressModal({addressModal, onCloseAddressModal}) {
    const [ address, setAddress ] = useState("");
    const onAddressHandler = (e) => setAddress(e.target.value);

    return (
        <>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={addressModal}
                onClose={onCloseAddressModal}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                backdrop: {
                    timeout: 500,
                },
                }}
            >
                <Fade in={addressModal}>
                    <Box sx={style}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            <input type="text" value={address} onChange={onAddressHandler}/>
                        </Typography>
                    </Box>
                </Fade>
            </Modal>
        </>
    )

}
export default AddressModal;