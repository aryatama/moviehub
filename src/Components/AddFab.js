import React from 'react'
import { Fab, Icon } from 'native-base';


const AddFab = (props) => {
    return (
        <Fab
            style={{ backgroundColor: '#ffa500' }}
            position="bottomRight"
            onPress={() => props.handleAddModal()}>
            <Icon name={props.iconName} style={{color:"white"}} />
        </Fab>
    )
}

export default AddFab
