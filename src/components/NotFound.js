import React, { Component } from 'react';

class NotFound extends Component {
    render() {
        return (
            <div>
                <div class="number">404</div>
                <div class="text"><span>Ooops...</span><br />page not found</div>
                <a class="me" href="https://codepen.io/uzcho_/pens/popular/?grid_type=list" target="_blank"></a>
            </div>
        );
    }
}

export default NotFound;