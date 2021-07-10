import { Card, CardContent, Typography } from '@material-ui/core';
import React from 'react';
import "./InfoBox.css";
import numeral from 'numeral';

function InfoBox({title, cases, total}) {
    return (
        <div className="infoBox">
            <Card className={`infoBox__${title}`}>
                <CardContent>
                    <Typography className="infoBox__title" color="textSecondary">
                        {title}
                    </Typography>
                    <h2 className="infoBox__cases">{numeral(cases).format("0,0")}</h2>
                    <Typography className="infoBox__total" color="textSecondary">
                        {numeral(total).format("0,0")} Total 
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}

export default InfoBox
