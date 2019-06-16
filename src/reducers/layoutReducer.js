import jsonFileLayout from 'jsonDump/layout.json';

export default function layoutReducer(state = jsonFileLayout, action) {
    let workCopyState = JSON.parse(JSON.stringify(state));
    let rowIndex = action.rowIndex;
    let columnIndex = action.columnIndex;
    let newFieldData = action.newFieldData;

    switch (action.type) {
        case 'ADD_ROW':
            workCopyState.header.rows.push({"columns":[]});
            return workCopyState;
        case 'ADD_FIELD':
            if(newFieldData && newFieldData._id){
                let selectedRow;
                if(typeof rowIndex === "number" && rowIndex > -1){
                    selectedRow = workCopyState.header.rows[rowIndex];
                }

                let newColumn = {"fieldId":newFieldData._id};
                if(!selectedRow){
                    workCopyState.header.rows.push({"columns":[newColumn]});
                }else{
                    selectedRow.columns.push(newColumn);
                }
            }

            return workCopyState;
        case 'REMOVE_FIELD':
            if(typeof rowIndex === "number" && rowIndex > -1){
                let selectedRow = workCopyState.header.rows[rowIndex];
                if(selectedRow && typeof columnIndex === "number" && columnIndex > -1){
                    let selectedColumn = selectedRow[columnIndex];

                    if(selectedColumn){
                        selectedColumn.splice(columnIndex,1);
                    }
                }
            }
            return workCopyState;
        default:
            return workCopyState;
    }
}