import React, {Component} from 'react';
import './App.css';
import Header from "./components/Header";
import LogIn from "./components/LogIn";


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "Logg inn"
        }
    }

    render() {
        return (
            <div className="App">
                <Header title={this.state.title}/>
                <LogIn/>
            </div>
        );
    }
}

export default App;
