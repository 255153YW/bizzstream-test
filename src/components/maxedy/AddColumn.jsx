import React from 'react';

export default class AddColumn extends React.Component {
    constructor(props){
        super(props);
    
        this.state={
            type:undefined,
            name:"",
            label:"",
            maxLength:0
        }
    }

    handleInputChangeAction(stateName, event){
        this.setState({
            [stateName]:event.target.value
        });
    }

    componentWillUnmount(){
        this.setState({
            fieldType:undefined,
            labelText:""
        });
    }

    handleSubmitAction(){
        let columnData={
            type:this.state.type,
            name:this.state.name,
            label:this.state.label,
            maxLength:this.state.maxLength
        }
        this.props.addNewColumn(columnData);
    }

    render() {
        return (
            <div className="modal">
                <div className="modal-content">
                    <span className="close" onClick={this.props.closeModal}>&times;</span>
                    
                    <div>
                        <label htmlFor="type">Input Type:</label>
                        <select name="type" 
                        value={this.state.type} onChange={this.handleInputChangeAction.bind(this,"type")}>
                            <option value={""}></option>
                            <option value={"text"}>text</option>
                            <option value={"number"}>Number</option>
                        </select>

                        {this.state.type === "text" &&
                            <React.Fragment>
                                <br/>
                                <label htmlFor="maxLength">Max Length:</label>
                                <input name="maxLength" className="w-input"  value={this.state.maxLength} type="number" required 
                                onChange={this.handleInputChangeAction.bind(this,"maxLength")}/>
                            </React.Fragment>
                        }
                        
                        <br/>
                        <label htmlFor="name">Input name:</label>
                        <input name="name" className="w-input"  value={this.state.name} type="text" required 
                        onChange={this.handleInputChangeAction.bind(this,"name")}/>

                        <br/>
                        <label htmlFor="label">Input label:</label>
                        <input name="label" className="w-input"  value={this.state.label} type="text" required 
                        onChange={this.handleInputChangeAction.bind(this,"label")}/>

                        <br/>
                        <input type="button" value="submit" onClick={this.handleSubmitAction.bind(this)}/>
                    </div>
                </div>
            </div>
        );
    }
}