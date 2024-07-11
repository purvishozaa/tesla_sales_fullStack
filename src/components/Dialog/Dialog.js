import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';



import './Dialog.scss';
import icon from '../../assets/images/close.png';

const CustomDialog  = ({
  isOpen,
  handleClose,
  dialogWidth,
  classInfo,
    configResult,
  title,
  cancelLabel,
  submitLabel,
  ...props}) => {
    return(
      <>
      <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      fullWidth={true}
      maxWidth={dialogWidth}
      className={classInfo || ""}
      >
      <div className="modal-title-container">
      <DialogTitle id="responsive-dialog-title">Battery Configuaration Result</DialogTitle>
      <img src = {icon} onClick={handleClose} alt = "Cancel icon" className= "cross" />
      </div>

      <DialogContent id="modal_body">
      <DialogContent dividers>
          <Typography gutterBottom>
          {configResult && (
        <div className="result-details">
          <h3>Configuration Result</h3>
          <div>
            <label>Total Cost:</label>
            <span>${configResult.totalCost}</span>
          </div>

          <div>
            <label>Total Energy:</label>
            <span>{configResult.totalEnergy} MWh</span>
          </div>

          <div>
            <label>Total Area:</label>
            <span> {configResult.totalArea} square feet</span>
          </div>

          <div>
            <label>Transformers Needed:</label>
            <span>{configResult.transformersNeeded}</span>
          </div>

          <div className="environmental-impact">
            <label> Carbon Footprint Avoided: </label>
            <span>{configResult.carbonFootprint} metric tons</span>
          </div>
        </div>
      )}
          </Typography>
        </DialogContent>
      </DialogContent>
      <DialogActions>
          <Button autoFocus onClick={handleClose}>
           Close
          </Button>
        </DialogActions>
      </Dialog>
      </>
    )
  }

  export default CustomDialog;
