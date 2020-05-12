import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import JournalEntry from './JournalEntry';

const db = firebase.firestore();

// db.collection('journalEntries').doc('yY1FbU9zMJI4elJPFfAN').update({
//     name: ''
// })

// const newValue = prompt('What is your entry?', 'default value');

export default class JournalEntries extends React.Component {
    state = {
        journalEntries: []
    }

    componentDidMount() {
        this.unsubscribe = db
            .collection('journalEntries')
            .orderBy('createdAt', 'asc')
            .onSnapshot(snapshot => {
                this.setState({ journalEntries: snapshot.docs });
            });
    }

    componentWillUnmount() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    }

    render() {
        const listItems = this.state.journalEntries
            .map(entry => <JournalEntry key={entry.id} entry={entry} />);

        return (
            <ul>
                {listItems}
            </ul>
        )
    }
}

// export default function JournalEntries() {
//     const [journalEntries, updateJournalEntries] = useState([]);

//     useEffect(() => {
//         const unsubscribe = db
//             .collection('journalEntries')
//             .orderBy('createdAt', 'asc')
//             .onSnapshot(snapshot => updateJournalEntries(snapshot.docs));

//         // Here, we return a function that executes when the component unmounts
//         return () => unsubscribe();

//     // This is a list of variable dependencies. useEffect will only re-run if variables
//     // in this list change, which is why we pass in db. Otherwise, useEffect will always run,
//     // causing the component to unsubscribe/resubscribe when the state changes.
//     // (you can try removing db from the array to see what happens)
//     }, [db]);

//     const listItems = journalEntries
//         .map(entry => <JournalEntry key={entry.id} entry={entry} />);

//     return (
//         <ul>
//             {listItems}
//         </ul>
//     )
// }