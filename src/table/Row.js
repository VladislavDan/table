import React from "react";
import { Form } from 'antd';
import './Table.css';
const EditableContext = React.createContext();

export const Row = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};