import React from 'react';
import websocket from './config';

class Room extends React.Component{
    constructor( props ){
        super( props );
        this.state = {
            currentRoomChat : []
        }
    }

    componentDidUpdate( prevProps ){
        if (this.props.location.pathname !== prevProps.location.pathname) {
            this.setState({
                currentRoomChat : []
            })
        }
        
    }

    componentDidMount(){
        websocket.onopen = ( message ) => {
            console.log( "Connected with websocket server" );
        }
    
        websocket.onmessage = ( message ) => {
            console.log( message );
    
            let obj = JSON.parse( message.data );
                
            if( obj.id === this.props.match.params.id ){
                this.setState({
                    currentRoomChat : [...this.state.currentRoomChat, obj.newMessage ]
                });
            }
        }
    }

    sendMessage = ( event ) => {
        event.preventDefault();
        let newMessage = event.target.newMessage.value;

        websocket.send( JSON.stringify({id: this.props.match.params.id, newMessage}) );
        this.setState({
            currentRoomChat : [...this.state.currentRoomChat, newMessage ]
        });
    }

    render(){
        console.log( "Entering route " + this.props.match.params.id );
        return(
            <div>
                <form onSubmit={this.sendMessage}>
                    <label htmlFor="newMessage">
                        New message:
                    </label>
                    <input type="text" name="newMessage" id="newMessage" /> 
                    <button type="submit">
                        Send
                    </button>
                </form>

            {this.state.currentRoomChat.map( (message, key) => {
            return (
                <p key={key}>
                    {message}
                </p>);
            })}
        </div>)
    }
};

export default Room;
