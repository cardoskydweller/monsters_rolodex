import React, { Component } from 'react';
import { CardList } from './components/card-list/card-list.component.jsx';
import { SearchBox } from './components/search-box/search-box.component.jsx';
import './App.css';

class App extends Component {
    constructor() {
      super(); //calls React.Component's constructor(), extending the class

      //this refers to Component because App only "extends" the class
      //App is not a whole independent class on it's own, i think
      this.state = {
        monsters: [],
        searchField: ''
      };
    } //end of constructor()
    
    //user Lifecycle Method to fetch data from API and use that data to render on the page
    //waits for the page to mount before fetcthing all the data
    componentDidMount() {
      fetch('https://jsonplaceholder.typicode.com/users')
        .then( response => response.json() )
        .then( users => this.setState({ monsters: users }) );
    }

    //Set the scope of the user defined function to the context of Component
    //Because it does not know which class 'this' refers to
    //For all it knows, 'this' is undefined
    //ES6 allows for arrow functions to be bound the the class they were defined in, lexical scoping
    handleChange = e => {
      this.setState( {searchField: e.target.value})
    }

    //this render method needs to be inside the class or it will fail to compile
    //render() comes built-in with React.Component
    render() {
      //Destructuring, pull properties of an object and set them to constants
      const { monsters, searchField } = this.state;
      const filteredMonsters = monsters.filter( monster => 
        monster.name.toLowerCase().includes( searchField.toLowerCase() )
      );

      return (
        <div className="App">
            <h1> Monsters Rolodex </h1>
            <SearchBox
              placeholder='Search monsters'
              handleChange={ this.handleChange  }
            />

            <CardList monsters={ filteredMonsters } />
        </div>
      );
    }
}


export default App;
