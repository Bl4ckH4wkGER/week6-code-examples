import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import firebase from 'firebase';

import Home from './Home';
import Journal from './Journal';
import Nav from './Nav';

const firestore = firebase.firestore();

// firestore
//   .collection('/vegetables')
//   .doc('potato')
//   .collection('recipes')
//   .doc('CSXhi26IjdfSd7DbEgi2')
//   .get()
//   .then(data => console.log(data.data()));

// componentDidMount
// const unsubscribe = firestore
//   .collection('journalEntries')
//   .onSnapshot(
//     snapshot => console.log(
//       snapshot.docs.map(doc => doc.data())
//     ),
//     err => console.log(err)
//   );

// setTimeout(() => {
//   // componentWillUnmount
//   unsubscribe();
// }, 10_000)

class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <Nav />
          <Route exact path="/" component={Home} />
          <Route path="/journal" component={Journal} />
        </Router>
      </div>
    )
  }
}

export default App;
