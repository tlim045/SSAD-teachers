import React from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

export default function Report({ lineChart, pieChart, barChart, table, openReport, closeReport }){
    return (
    <Dialog open={openReport} onClose={closeReport} aria-labelledby="form-dialog-title" maxWidth='xl'>
        <DialogTitle id="form-dialog-title" color='primary'>View report</DialogTitle>
        <DialogContent>
            <div id="divToPrint" 
                    style={{backgroundColor: '#f5f5f5',
                            width: '210mm',
                            minHeight: '297mm',
                            marginLeft: 'auto',
                            marginRight: 'auto'}}>
                    {barChart}
                    {lineChart}
                    {pieChart}
                    {table}
            </div>
        </DialogContent>
        <DialogActions>
            <Button onClick={closeReport} color="primary">
                Close
            </Button>
        </DialogActions>
    </Dialog>
    );
}




// import React from "react";
// import ReactToPrint from "react-to-print";
// import GetAppIcon from '@material-ui/icons/GetApp';
// import Hidden from "@material-ui/core/Hidden";
// import Tooltip from '@material-ui/core/Tooltip';
// import Button from '@material-ui/core/Button';

// class ComponentToPrint extends React.Component {
//     constructor(props){
//         super(props)
//     }
//     render() {
//         const { componentToPrint } = this.props;
//         return <div style={{ display: 'none' }}>{componentToPrint}</div>
//     }
// }

// class Report extends React.Component {
//     constructor(props){
//         super(props);
//     }

    
//     render() {
//         const { componentToPrint, classes } = this.props;
//         const triggerBtn = <Tooltip
//             id="tooltip-top"
//             title="Export report PDF"
//             placement="top"
//             classes={{ tooltip: classes.tooltip }}
//             >
//             <Button
//                 style={{ marginLeft: '70em', backgroundColor: '#9c27b0', color: 'white', marginBottom: 20 }}
//                 color={window.innerWidth > 959 ? "transparent" : "white"}
//                 justIcon={window.innerWidth > 959}
//                 simple={!(window.innerWidth > 959)}
//                 // aria-owns={openNotification ? "notification-menu-list-grow" : null}
//                 aria-haspopup="true"
//                 className={classes.buttonLink}
//                 variant="contained"
//                 >
//                 <GetAppIcon className={classes.icons} />
//             </Button>
//         </Tooltip>

//         return (
//         <div>
//             <ReactToPrint
//             trigger={() => triggerBtn}
//             content={() => this.componentRef}
//             />
//             <ComponentToPrint componentToPrint={componentToPrint} ref={el => (this.componentRef = el)}/>
//         </div>
//         );
//     }
// }

// export default Report;
