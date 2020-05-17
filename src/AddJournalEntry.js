import React, { useState } from 'react';
import firebase from 'firebase';

const db = firebase.firestore();

// db.collection('journalEntries').add({
//     name: 'May 9th: Did some running and went on a hike'
// }).then(doc => console.log(doc.id));

export default class AddJournalEntry extends React.Component {
    state = { entry: '' };

    onEntryChange = (e) => {
        this.setState({ entry: e.target.value });
    }

    addNewEntry = (e) => {
        e.preventDefault();
        db.collection('journalEntries').add({
            name: this.state.entry,
            createdAt: new Date()
        }).then(() => {
            this.setState({ entry: '' });
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.addNewEntry}>
                    <textarea
                        value={this.state.entry}
                        onChange={this.onEntryChange}
                    />
                    <button type="submit">Add New Entry</button>
                </form>
            </div>
        )
    }
}

// export default function AddJournalEntry() {
//     const [entry, updateEntry] = useState('');

//     const onEntryChange = (e) => updateEntry(e.target.value);

//     const addNewEntry = (e) => {
//         e.preventDefault();
//         db.collection('journalEntries').add({
//             name: entry,
//             createdAt: new Date()
//         }).then(() => updateEntry(''));
//     }

//     return (
//         <div>
//             <form onSubmit={addNewEntry}>
//                 <textarea
//                     value={entry}
//                     onChange={onEntryChange}
//                 />
//                 <button type="submit">Add New Entry</button>
//             </form>
//         </div>
//     );
// }