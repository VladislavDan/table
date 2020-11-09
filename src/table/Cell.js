import React from 'react';
import {DatePicker, Input} from 'antd';
import './Table.css';

export const TypeOfCell = {
    Float: 'Float',
    Date: 'Date',
};

export const Cell = ({
                         title,
                         editable,
                         children,
                         dataIndex,
                         record,
                         handleSave,
                         type,
                         typeOfCell,
                         ...restProps
                     }) => {

    let childNode = children;

    if (typeOfCell && typeOfCell === TypeOfCell.Date) {
        childNode = (
            <DatePicker/>
        );
    } else if (typeOfCell && typeOfCell === TypeOfCell.Float) {
        childNode = (
            <Input/>
        );
    }

    return <td {...restProps}>{childNode}</td>;
};