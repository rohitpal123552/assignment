import React from 'react';
import{ List,  ListItem,  ListItemText } from '@material-ui/core';
import './Card.css';
import { db } from './firebase';
import firebase from 'firebase';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

function Card(props) {
    return (
        <div className='card'>
             <List className='list'>
                <ListItem>
                    <ListItemText primary={props.post.post} />
                    <DeleteOutlineIcon className='deleteButton' onClick={event => db.collection('posts').doc(props.post.id).delete()} />
                </ListItem>
                
            </List>
            
        </div>
    )
}

export default Card;
