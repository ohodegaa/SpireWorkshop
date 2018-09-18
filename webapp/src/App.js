import React, {Component} from 'react';
import './App.css';
import Header from "./components/Header";


class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            title: "Logg inn"
        }
    }

    render() {
        return (
            <div className="App">
                <Header title={this.state.title}/>
                <form onSubmit={(e) => console.log(e.target.value)}>
                    <input type="text" placeholder="Username"/>
                    <input type="password" placeholder="Password"/>
                    <input type="submit" value="Logg inn"/>
                </form>
            </div>
        );
    }
}

export default App;
