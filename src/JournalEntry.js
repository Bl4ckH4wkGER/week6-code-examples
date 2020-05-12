import React from 'react';
import firebase from 'firebase';

const db = firebase.firestore();

export default class JournalEntry extends React.Component {
    onEditClick = (e) => {
        const { entry } = this.props;
        const { name } = entry.data();
        const updatedEntry = prompt('Edit entry', name);
        
        if (updatedEntry) {
            db.collection('journalEntries')
                .doc(entry.id)
                .update({ name: updatedEntry });
        }
    }

    onDeleteClick = (e) => {
        const { entry } = this.props;
        const shouldDelete = window.confirm('Are you sure?');

        if (shouldDelete) {
            db.collection('journalEntries')
                .doc(entry.id)
                .delete();
        }
    }

    render() {
        const { entry } = this.props;

        return (
            <li>
                <button onClick={this.onEditClick}>Edit</button>
                <button onClick={this.onDeleteClick}>Delete</button>
                <span>{entry.data().name}</span>
            </li>
        )
    }
}

// export default function JournalEntry({ entry }) {
//     const onEditClick = (e) => {
//         const { name } = entry.data();
//         const updatedEntry = prompt('Edit entry', name);
        
//         if (updatedEntry) {
//             db.collection('journalEntries')
//                 .doc(entry.id)
//                 .update({ name: updatedEntry });
//         }
//     }

//     const onDeleteClick = (e) => {
//         const shouldDelete = window.confirm('Are you sure?');

//         if (shouldDelete) {
//             db.collection('journalEntries')
//                 .doc(entry.id)
//                 .delete();
//         }
//     }

//     return (
//         <li>
//             <button onClick={onEditClick}>Edit</button>
//             <button onClick={onDeleteClick}>Delete</button>
//             <span>{entry.data().name}</span>
//         </li>
//     )
// }