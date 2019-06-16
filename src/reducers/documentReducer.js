import jsonFileDocument from 'jsonDump/document.json';

export default function documentReducer(state = jsonFileDocument, action) {
    let workCopyState = JSON.parse(JSON.stringify(state));
    let targetFieldIndex = action.targetFieldIndex;
    let targetFieldId = action.targetFieldId;
    let newFieldData = action.newFieldData;

    switch (action.type) {
        case 'ADD_FIELD':
            workCopyState.schema.fields.push(newFieldData);
            return workCopyState;
        case 'UPDATE_FIELD_SINGLE_KEY':
            let targetField = workCopyState.schema.fields[targetFieldIndex];
            let targetFieldKey = action.targetFieldKey;

            if(targetField._id !== targetFieldId){
                //seems like there is a mismatch, search the correct index by ID
                targetFieldIndex = workCopyState.schema.fields.findIndex((field)=>{
                    return field._id === targetFieldId;
                });

                targetField = workCopyState.schema.fields[targetFieldIndex];
            }

            if(targetField){
                targetField[targetFieldKey] = action.targetFieldValue;
            }
            
            return workCopyState;
        case 'REMOVE_FIELD':
            let selectedId = action.fieldId;
            if(selectedId){
                let fieldIndex =  workCopyState.schema.fields.find((field, index) => {
                    return field._id === selectedId;
                });

                if(typeof fieldIndex === "number" && fieldIndex > -1){
                    workCopyState.schema.fields.splice(fieldIndex,1);
                }
            }
            return workCopyState;
        default:
            return workCopyState;
    }
}