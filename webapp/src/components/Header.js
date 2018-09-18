import React, {Component} from 'react';
import Title from "./Title";


class Header extends Component {

    constructor(props) {
        super(props)
        this.state = {
            title: "Logg inn"
        }
    }

    render() {
        return (
            <div className="Header">
                <Title/>
            </div>
        );
    }
}

export default Header;