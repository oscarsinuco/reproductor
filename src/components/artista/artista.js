import './artista.css'

import React from 'react';

export class Artista extends React.Component {
    render() {
        return (

            <div className="swiper-slide">
                <p>{this.props.name.slice(0, 11)}</p>
                <div className="imagenGenero swiper-slide2">
                    <img src={this.props.img}/>
                </div>
            </div>
        );
    }
}
