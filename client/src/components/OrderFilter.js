import React, {useState} from 'react';
import {Row} from "react-bootstrap";
import {DateRangePicker} from "rsuite"
import 'rsuite/dist/rsuite.css'

const OrderFilter = ({dateRange, addDateRange}) => {

    return (
        <Row>
            <div className="text">
                ПЕРІОД
            </div>
            <div className= "data-pick">
                <DateRangePicker

                    size="lg"
                    appearance="subtle"
                    placeholder="Оберіть період"
                    style={{ width: 200, backgroundColor:"white", borderRadius:10 }}
                    value={dateRange}
                    onChange={(e) =>  addDateRange(e)}
                >

                </DateRangePicker>
            </div>
        </Row>
    );
};

export default OrderFilter;