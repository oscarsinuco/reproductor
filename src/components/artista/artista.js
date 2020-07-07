import './artista.css'

import React from 'react';

export class Artista extends React.Component {
    render() {
        return (
        <div className="swiper-slide" style={{  
            backgroundImage: "url(" + this.props.img + ")",
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
        }}>{this.props.name.slice(0,10)}</div>
            );
        }
    }
