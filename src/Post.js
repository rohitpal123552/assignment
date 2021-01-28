import React, { useEffect, useState } from 'react';

import Card from './Card';
import './Post.css';
import { db } from './firebase';
import firebase from 'firebase';


function Post() {
    const [posts, setPosts] = useState([]);
    const [input, setInput] = useState('');
 
    useEffect(() => {
        db.collection('posts').orderBy('timestamp', 'asc').onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => ({id: doc.id, post: doc.data().post })))
        })
    }, [])

    const addPost = (event) => {
        event.preventDefault();

        db.collection('posts').add({
            post: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        setPosts([...posts, input]);
        setInput('');
    }
    const clearPost = (event) => {
        event.preventDefault();
        setInput('');
    }

   
    return (
        <div className='form'>
            <form className='inputForm'>
                <input className='form__input' value={input} 
                onChange={(e) => setInput(e.target.value)} />
                <div className='buttons'>
                <button className='form__button'  type='submit'  onClick={addPost}>ADD+</button>
                    <button className='form__button' onClick={clearPost}>CLEAR</button>
                </div>
            </form>
            
            <ul className='cards'>
                {posts.map((post) => 
                (
                    <Card post={post} />
                    ))}
            </ul>
            
        </div>
    )
}

export default Post;

