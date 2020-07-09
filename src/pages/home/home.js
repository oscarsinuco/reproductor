import React from 'react';
import { Artista } from '../../components/artista/artista.js'
import { Cancion } from '../../components/cancionFav/cancionFav.js'
import Swiper from 'react-id-swiper'
import * as store from '../../redux/store';


const urlCat = "api.deezer.com/genre/"
export class Home extends React.Component {

    constructor(props) {

        super(props)
        this.state = {
            categorias: [],
            canciones: []
        }
        
    }


    componentDidMount() {

        if (store.getGeneros() && store.getCanciones()) {
            this.setState((state) => { return { categorias: store.getGeneros(), canciones: store.getCanciones() } })
        } else {

            fetch('https://cors-anywhere.herokuapp.com/' + urlCat)
                .then((response) => {
                    return response.json()
                })
                .then((categorias) => {
                    store.setGeneros(categorias.data)
                    this.setState((state) => { return { categorias: categorias.data } })

                    fetch('https://cors-anywhere.herokuapp.com/' + `api.deezer.com/artist/${Math.round(10000*Math.random())}/top?limit=50`).then(res => {
                        return res.json()
                    }).then(canciones => {
                        store.setCanciones(canciones.data)
                        this.setState((state) => { return { canciones: canciones.data } })

                    }).catch(err => {
                        alert(err)
                    })
                }).catch(err => {
                    alert(err)
                })
        }
    }

    render() {

        const params = {
            slidesPerView: 2.5,
            spaceBetween: 20,
            freeMode: true,
            loop: true,
            auto: true
        }
        let artistas = this.state.categorias.map((el, i) =>
            <Artista id={el.id} name={el.name} key={i} img={el.picture_medium} />
        )
        let canciones = this.state.canciones.map((el, i) =>
            <Cancion data={el} key={i} id={i} />
        )
        return (
            <div className="fondo">
                <div className="content">
                    <h1>
                        Oscar,
                    </h1>
                    <h4>
                        Buenos dias!
                    </h4>
                    <br />
                    <br />
                    {artistas.length > 0 && (
                        <Swiper {...params}>
                            {
                                artistas
                            }
                        </Swiper>
                    )}
                    {this.state.categorias.length == 0 && (
                        <div className="loader2">Loading...</div>
                    )}


                    <br />
                    <h2>Recomendados</h2>
                    <br />
                    {this.state.canciones.length == 0 && (
                        <div className="loader2">Loading...</div>
                    )}
                    {canciones.length > 0 && (
                        canciones
                    )}
                </div>
            </div>
        )

    }
}
