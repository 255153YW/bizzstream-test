import { createStore } from 'redux';
import { switchStatement } from '@babel/types';

const defaultLayout = {
    "header":{
        "rows":[
            {
                "columns":[
                    {
                        "fieldId": "cc4cb134-fda0-44d8-8e92-e42ebbceb415"
                    },
                    {
                        "fieldId": "228b905f-4a43-4a40-b829-0c6a04ad4782"
                    }
                ]
            }
        ]
    }
}

function layout(state = defaultLayout, action) {
    let workCopyState = JSON.parse(JSON.stringify(state));

    switch (action.type) {
        case 'ADD_COLUMN':
            let columnToAdd = action.column;
            if(columnToAdd){
                let rowIndex = action.rowIndex;
                if(rowIndex && rowIndex > -1){
                    let selectedRow = workCopyState.header.rows[rowIndex];
                    if(!selectedRow){
                        workCopyState.header.rows.push({"columns":[action.column]});
                    }else{
                        selectedRow.push(action.column);
                    }
                }
            }
            return workCopyState;
        case 'REMOVE_COLUMN':
            let rowIndex = action.rowIndex;
            let columnIndex = action.columnIndex;
            if(rowIndex && rowIndex > -1){
                let selectedRow = workCopyState.header.rows[rowIndex];
                if(selectedRow){
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

let LayoutStore = createStore(layout);

export default LayoutStore;