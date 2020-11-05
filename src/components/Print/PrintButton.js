import React from "react";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import GetAppIcon from '@material-ui/icons/GetApp';

const pxToMm = (px) => {
    return Math.floor(px/document.getElementById('myMm').offsetHeight);
};

const mmToPx = (mm) => {
  return document.getElementById('myMm').offsetHeight*mm;
};

const range = (start, end) => {
    return Array(end-start).join(0).split(0).map(function(val, id) {return id+start});
};

export default function PrintButton({id, classes}){
    return <div>
    <div id="myMm" style={{height: "1mm"}}/>
    <Tooltip
        id="tooltip-top"
        title="Export report PDF"
        placement="top"
        classes={{ tooltip: classes.tooltip }}
        >
        <Button
            style={{ marginLeft: '70em', backgroundColor: '#9c27b0', color: 'white', marginBottom: 20 }}
            color={window.innerWidth > 959 ? "transparent" : "white"}
            justIcon={window.innerWidth > 959}
            simple={!(window.innerWidth > 959)}
            // aria-owns={openNotification ? "notification-menu-list-grow" : null}
            aria-haspopup="true"
            className={classes.buttonLink}
            variant="contained"
            onClick={() => {
                const input = document.getElementById(id);
                const inputHeightMm = pxToMm(input.offsetHeight);
                const a4WidthMm = 210;
                const a4HeightMm = 297; 
                const a4HeightPx = mmToPx(a4HeightMm); 
                const numPages = inputHeightMm <= a4HeightMm ? 1 : Math.floor(inputHeightMm/a4HeightMm) + 1;
                console.log({
                  input, inputHeightMm, a4HeightMm, a4HeightPx, numPages, range: range(0, numPages), 
                  comp: inputHeightMm <= a4HeightMm, inputHeightPx: input.offsetHeight
                });
                
          
                html2canvas(input)
                  .then((canvas) => {
                    const imgData = canvas.toDataURL('image/png');
                    var pdf;
                    // Document of a4WidthMm wide and inputHeightMm high
                    if (inputHeightMm > a4HeightMm) {
                      // elongated a4 (system print dialog will handle page breaks)
                      pdf = new jsPDF('p', 'mm', [inputHeightMm+16, a4WidthMm]);
                    } else {
                      // standard a4
                      pdf = new jsPDF();
                    }
                    
                    pdf.addImage(imgData, 'PNG', 0, 0);
                    pdf.save(`${id}.pdf`);
                  });
                ;
              }}
            >
            <GetAppIcon className={classes.icons} />
        </Button>
    </Tooltip>
</div>
};