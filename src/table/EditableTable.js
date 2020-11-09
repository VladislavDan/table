import React from 'react';
import {Table, Button} from 'antd';
import {DeleteOutlined, PlusCircleOutlined} from '@ant-design/icons';
import './Table.css';
import {Cell, TypeOfCell} from "./Cell";
import {Row} from "./Row";

export class EditableTable extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: '',
                width: '5%',
                dataIndex: '0',
                render: (text, record) =>
                    this.state.dataSource.length >= 1 ? (
                        <Button
                            type="primary"
                            icon={<DeleteOutlined/>}
                            onClick={() => this.handleDelete(record.key)}
                        />
                    ) : null,
            },
            {
                title: 'Процентный период',
                editable: true,
                typeOfCell: TypeOfCell.Date,
                dataIndex: '1',
                children: [
                    {
                        title: 'Дата начала',
                        dataIndex: 'startdate',
                        key: 'startdate',
                        width: 150

                    },
                    {
                        title: 'Дата конца',
                        dataIndex: 'enddate',
                        key: 'enddate',
                        width: 150
                    },
                ]
            },
            {
                title: 'Float',
                dataIndex: '2',
                width: '45%',
                editable: true,
                typeOfCell: TypeOfCell.Float
            },
        ];
        this.state = {
            dataSource: [
                {
                    key: '0',
                    startdate: '10-02-2020',
                    enddate: '10-02-2020',
                    float: '32'
                },
                {
                    key: '1',
                    startdate: '10-02-2020',
                    enddate: '10-02-2020',
                    float: '32'
                },
            ],
            count: 2,
        };
    }

    handleDelete = (key) => {
        const dataSource = [...this.state.dataSource];
        this.setState({
            dataSource: dataSource.filter((item) => item.key !== key),
        });
    };
    handleRemoveAll = () => {
        this.setState({
            dataSource: [],
        });
    };
    handleAdd = () => {
        const {count, dataSource} = this.state;
        const newData = {
            key: count,
            name: `Edward King ${count}`,
            age: 32,
            address: `London, Park Lane no. ${count}`,
        };
        this.setState({
            dataSource: [...dataSource, newData],
            count: count + 1,
        });
    };
    handleSave = (row) => {
        const newData = [...this.state.dataSource];
        const index = newData.findIndex((item) => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {...item, ...row});
        this.setState({
            dataSource: newData,
        });
    };

    render() {
        const {dataSource} = this.state;
        const components = {
            body: {
                row: Row,
                cell: Cell
            },
        };
        const columns = this.columns.map((col) => {
            if (!col.editable) {
                return col;
            }

            return {
                ...col,
                onCell: (record) => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    typeOfCell: col.typeOfCell,
                    handleSave: this.handleSave,
                }),
            };
        });
        return (
            <div>
                <Table
                    pagination={false}
                    components={components}
                    rowClassName={() => 'editable-row'}
                    bordered
                    dataSource={dataSource}
                    columns={columns}
                    footer={() => (
                        <>
                            <Button
                                onClick={this.handleAdd}
                                type="primary"
                                icon={<PlusCircleOutlined/>}
                                style={{
                                    marginBottom: 16,
                                }}
                            />
                            <Button
                                onClick={this.handleRemoveAll}
                                type="primary"
                                style={{
                                    marginBottom: 16,
                                }}
                            >
                                Очистить
                            </Button>
                            <Button
                                onClick={() => {}}
                                type="primary"
                                style={{
                                    marginBottom: 16,
                                }}
                            >
                                Копировать
                            </Button>
                            <Button
                                onClick={() => {}}
                                type="primary"
                                style={{
                                    marginBottom: 16,
                                }}
                            >
                                Генерация расписания
                            </Button>
                        </>
                    )}
                />
            </div>
        );
    }
}