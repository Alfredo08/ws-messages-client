import React from 'react';
import './App.css';
import {withRouter, Route} from 'react-router-dom';
import Room from './Room';

class App extends React.Component {

  goToRoom = ( event ) => {
    event.preventDefault();
    this.props.history.push(`/room/${event.target.chatRoom.value}`)

  } 

  render(){
    return (
      <div className="App">
        <h1>
          ¡Welcome to the chat rooms app!
        </h1>
        <form onSubmit={this.goToRoom}>
          <label htmlFor="chatRoom">
            Which room do you want to visit?
          </label>
          <input type="text" id="chatRoom" name="chatRoom" />
          <button type="submit">
            Let's go
          </button>
        </form>
        <Route path="/room/:id" render={ (props) => <Room {...props} />}/>
      </div>
    );
  }
}

export default withRouter( App );
