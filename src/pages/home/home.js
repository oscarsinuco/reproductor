import React from "react";
import { Artista } from "../../components/artista/artista.js";
import { Cancion } from "../../components/cancionFav/cancionFav.js";
import Swiper from "react-id-swiper";
import * as store from "../../redux/store";

const urlCat = "http://api.deezer.com/genre/";
export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categorias: [],
      canciones: [],
    };
  }

  componentDidMount() {
    if (store.getGeneros() && store.getCanciones()) {
      this.setState(() => {
        return {
          categorias: store.getGeneros(),
          canciones: store.getCanciones(),
        };
      });
    } else {
      fetch("https://apideezer.herokuapp.com/cors?url=" + urlCat)
        .then((response) => {
          return response.json();
        })
        .then((categorias) => {
          store.setGeneros(categorias.data);
          this.setState(() => {
            return { categorias: categorias.data };
          });

          fetch(
            "https://apideezer.herokuapp.com/cors?url=" +
              `http://api.deezer.com/chart`
          )
            .then((res) => {
              return res.json();
            })
            .then((canciones) => {
              console.log(canciones.tracks);
              store.setCanciones(canciones.tracks.data);
              this.setState(() => {
                return { canciones: canciones.tracks.data };
              });
            })
            .catch((err) => {
              alert(err);
            });
        })
        .catch((err) => {
          alert(err);
        });
    }

    let buscador = document.querySelector("#buscador");
    buscador.onkeyup = (event) => {
      const keycode = event.keyCode;
      if (keycode === 13) {
        this.search(buscador.value);
      }
    };
  }

  search(value) {
    let buscador = document.querySelector("#buscador");
    buscador.blur();
    let resultados = document.querySelector("#resultados");
    window.scroll(0, resultados.getBoundingClientRect().top);
    this.setState(() => {
      return { canciones: [] };
    });
    fetch(
      "https://apideezer.herokuapp.com/cors?url=" +
        `http://api.deezer.com/search?q=${value}`
    )
      .then((res) => {
        return res.json();
      })
      .then((canciones) => {
        store.setCanciones(canciones.data);
        this.setState(() => {
          return { canciones: canciones.data };
        });
      })
      .catch((err) => {
        alert(err);
      });
  }

  render() {
    const params = {
      slidesPerView: 2.5,
      spaceBetween: 20,
      freeMode: true,
      loop: true,
      auto: true,
      breakpoints: {
        320: {
          slidesPerView: 2.5,
        },
        600: {
          slidesPerView: 5.5,
        },
        1000: {
          slidesPerView: 7.5,
        },
      },
    };
    let artistas = this.state.categorias.map((el, i) => (
      <Artista id={el.id} name={el.name} key={i} img={el.picture_medium} />
    ));
    let canciones = this.state.canciones.map((el, i) => (
      <Cancion data={el} key={i} id={i} />
    ));
    return (
      <div className="fondo">
        <div className="content">
          <div id="buscar">
            <span className="material-icons search">search</span>
            <input
              type="text"
              id="buscador"
              autoComplete="off"
              placeholder="Busca aquí..."
            ></input>
          </div>

          <h1>Bienvenido,</h1>
          <h4>Buenos dias!</h4>
          <br />
          <br />
          {artistas.length > 0 && <Swiper {...params}>{artistas}</Swiper>}
          {this.state.categorias.length === 0 && (
            <div className="loader2">Loading...</div>
          )}

          <br />
          <h2 id="resultados">Resultados</h2>
          <br />
          {this.state.canciones.length === 0 && (
            <div className="loader2">Loading...</div>
          )}
          {canciones.length > 0 && canciones}
        </div>
      </div>
    );
  }
}
