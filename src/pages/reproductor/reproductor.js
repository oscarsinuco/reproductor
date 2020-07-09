import './reproductor.css'
import React from 'react';
import {
    Link,
    Redirect
} from "react-router-dom";
import * as store from '../../redux/store';
export class Reproducir extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isPlaying: false,
            duration: 0,
            durationFinal: 'Cargando',
            cancion: null
        }

    }

    componentWillMount() {
        this.setState({cancion: this.getCancion()})
    }
    componentDidMount(){
        if (this.getCancion()) {
            
            let audio = document.querySelector("#cancion")
            audio.addEventListener('loadedmetadata', (e) => {
                this.setState({ durationFinal: (e.target.duration).toFixed(1) });
                this.play()
            })
        }
    }


    getCancion = () => {
        return store.getCancion()
    }

    getTime = (event) => {
        this.setState({ duration: (event.target.currentTime).toFixed(1) })
        if ((event.target.currentTime).toFixed(1) === this.state.durationFinal) {
            this.pause()
            store.setCancionActual(1)
            this.setCancion()
            this.play()
        }
    }

    update = (event) => {
        this.pause()
        this.setState({ duration: event.target.value })
        const audio = document.querySelector("#cancion")
        audio.currentTime = event.target.value
        audio.play()
        this.setState({ isPlaying: true })

    }

    play = () => {
        this.setState({ isPlaying: true })
        const audio = document.querySelector("#cancion")
        audio.play()
    }
    pause = () => {
        this.setState({ isPlaying: false })
        const audio = document.querySelector("#cancion")
        audio.pause()
    }

    getCancionActual = () => {
        return store.getCancionActual()
    }

    setCancion = ()=>{
        let cancion = store.getCancionActual()
        this.setState({ cancion: cancion.cancion })
        let audio = document.querySelector("#cancion")
            audio.addEventListener('loadedmetadata', (e) => {
                this.setState({ durationFinal: (e.target.duration).toFixed(1) });
                this.play()
            })
    }


    render() {

        if (!this.state.cancion) {
            return <Redirect to="/home" />;
        }

        
        return (
            <div>
                <div className="header">
                    <Link to="/">
                        <div>
                            <span className="material-icons light">
                                keyboard_backspace
                            </span>
                        </div>
                    </Link>
                    <div className="title">
                        {this.state.cancion.title.slice(0, 25)}...
                    </div>
                    <div className="c">
                        <span className="material-icons">
                            keyboard_backspace
                    </span>
                    </div>
                </div>
                <div className="repr">
                    <div className="datos">
                        <div className="divCancion">
                            <img className={`${this.state.isPlaying} imgCancion`} id="conservaPos" src={this.state.cancion.album.cover_medium} />
                        </div>

                        <audio onTimeUpdate={this.getTime} src={`https://getmp3http.herokuapp.com/?url=${this.state.cancion.preview}`} id="cancion">
                            <p>Tu navegador no implementa el elemento audio.</p>
                        </audio>
                        <div className="title">
                            <h3>{this.state.cancion.title}</h3>
                            <small>{this.state.cancion.artist.name} </small>
                        </div>
                        <br />
                        <div className="slidecontainer">
                            <input type="range" min="0" max={this.state.durationFinal} value={this.state.duration} onChange={this.update} className="slider"></input>
                        </div>
                        <div id="currentDuration">
                            <small>{this.state.duration} s</small>
                        </div>
                        <div id="finalDuration">
                            <small>{this.state.durationFinal} s</small>
                        </div>
                        <div className="controls">
                            <div className="previous" onClick={()=> {store.setCancionActual(-1); this.setCancion()}}>
                                <span className="material-icons repic light">
                                    skip_previous
                                </span>
                            </div>
                            <div className="playa">
                                {
                                    !this.state.isPlaying && (
                                        <span className="material-icons repic light" onClick={this.play}>
                                            play_arrow
                                        </span>
                                    )
                                }
                                {
                                    this.state.isPlaying && (
                                        <span className="material-icons repic light" onClick={this.pause}>
                                            pause
                                        </span>
                                    )
                                }

                            </div>
                            <div className="next" onClick={()=> {store.setCancionActual(1); this.setCancion()}}>
                                <span className="material-icons repic light">
                                    skip_next
                                </span>
                            </div>

                        </div>
                    </div>
                </div>

            </div>


        );
    }
}
