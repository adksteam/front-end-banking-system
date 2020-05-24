import React from 'react'
import TableRow from './TableRow'
import Utilities from '../Utilities'

function DetailsTableBuilder(props){
  return (Utilities.fields.map(function(field, index){
    if(index < 3)
    return (
      <TableRow style={{"padding-left": "33%"}} className="text-primary" fieldName={Utilities.fieldNames[index]} field={props.customer[field]} />
    )
    else {
      return <TableRow style={{"padding-left": "33%"}} className="text-danger" fieldName={Utilities.fieldNames[index]} field={props.customer[field]} />
    }
  }));
}

export default DetailsTableBuilder;
