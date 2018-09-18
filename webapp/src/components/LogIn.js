import React from "react";
import axios from "axios";

class LogIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
        }
    }

    change = (key, value) => {
        this.setState({
            ...this.state,
            [key]: value
        });
    }

    fetchUser = (e) => {
        e.preventDefault();
        axios.post(
            "http://spire-kurs.club/api/auth/login",
            {
                username: this.state.username,
                password: this.state.password,
            }
        ).then(res => {
            console.log(res.data);
        }).catch(errorRes => {
            console.log({...errorRes});
        })
    }

    render() {

        return (
            <form>
                <input value={this.state.username} name="username"
                       onChange={(e) => this.change(e.target.name, e.target.value)} type="text" placeholder="Username"/>
                <input value={this.state.password} name="password"
                       onChange={(e) => this.change(e.target.name, e.target.value)} type="password"
                       placeholder="Passord"/>
                <button onClick={this.fetchUser}>
                    Logg inn
                </button>
            </form>
        )
    }
}


export default LogIn;