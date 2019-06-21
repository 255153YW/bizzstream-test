import React from 'react';
import { connect } from 'react-redux';
import AddColumn from './AddColumn';

const uuidv1 = require('uuid/v1');

const mapStateToProps = state => {
    let fieldData={};
    let fieldDataIndex={};

    state.documentReducer.schema.fields.forEach((field, index) => {
        fieldDataIndex[field._id] = index;
        fieldData[field._id] = field;
    });
    
    return {
        header: state.layoutReducer.header,
        fieldData: fieldData,
        fieldDataIndex: fieldDataIndex
    };
};

const Home = class Home extends React.Component {
    constructor(props){
        super(props);
    
        this.state={
            selectedRowIndex:-1,
            showModal:false,
        }
    }

    toggleAddFieldAction(condition, rowIndex){
        if(condition && rowIndex > -1){
            this.setState({
                selectedRowIndex:rowIndex
            });
        }
        this.setState({
            showModal:condition
        });
    }

    saveAction(){
        alert("Soon....");
    }

    onChangeValue(fieldId, fieldIndex, fieldKey, event){
        let payload = {
            "type":"UPDATE_FIELD_SINGLE_KEY",
            "targetFieldIndex":fieldIndex,
            "targetFieldId":fieldId,
            "targetFieldKey":fieldKey,
            "targetFieldValue":event.target.value
        }
        this.props.dispatch(payload);
    }

    addNewRow(){
        this.props.dispatch({"type":"ADD_ROW"});
    }

    addNewColumn(columnData){
        let newFieldData = {
            "_id":uuidv1()
        };
        Object.assign(newFieldData,columnData);

        this.props.dispatch({"type":"ADD_FIELD","rowIndex":this.state.selectedRowIndex,"newFieldData":newFieldData});

        this.toggleAddFieldAction(false);
    }

    renderRows(rows){
        return rows.map((row, index)=>{
            let columns = row.columns;
            return (
                <div key={`row-${index}`} className="row-container">
                    {this.renderColumn(columns)}
                    <div className="field-container">
                        <input type="button" value="+" onClick={this.toggleAddFieldAction.bind(this,true,index)}/>
                    </div>
                </div>
            );
        });
    }

    renderColumn(columns){
        return columns.map((column)=>{
            let fieldId = column.fieldId;
            let fieldData = this.props.fieldData[fieldId];
            if(fieldData){
                if(!fieldData.value && fieldData.value === undefined){
                    fieldData.value = "";
                }
                return (
                    <div key={`${fieldId}`} className="field-container">
                        <label htmlFor={fieldData.name}>{fieldData.label}</label>
                        <input {...fieldData} onChange={this.onChangeValue.bind(this, fieldId, this.props.fieldDataIndex[fieldId], 'value')}/>
                    </div>
                );
            }else{
                return false;
            }
        });
    }

    render() {
        return (
            <div>
                <h2>Home</h2>
                {this.props.header && Array.isArray(this.props.header.rows) && this.props.header.rows.length > 0 &&
                    <React.Fragment>
                        {this.renderRows(this.props.header.rows)}
                        <input type="button" value="add new row" onClick={this.addNewRow.bind(this)}/>
                    </React.Fragment>
                }
                <br/>
                <input type="button" value="save" onClick={this.saveAction.bind(this)}/>

                {this.state.showModal &&
                    <AddColumn
                    closeModal={this.toggleAddFieldAction.bind(this, false)} 
                    addNewColumn={this.addNewColumn.bind(this)}/>
                }
            </div>
            
        );
    }
}

export default connect(mapStateToProps)(Home);