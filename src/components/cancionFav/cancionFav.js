import "./cancionFav.css";
import React from "react";
import { Link } from "react-router-dom";
import * as store from "../../redux/store";
export class Cancion extends React.Component {
  setCancion = (url) => {
    store.setCancion(url);
  };
  cancion = this.props.data;
  id = this.props.id;

  render() {
    return (
      <Link to={`/cancion/`}>
        <div
          className="container"
          onClick={() => {
            this.setCancion({ id: this.id, cancion: this.cancion });
          }}
        >
          <div className="left">
            <div className="imgSong">
              <img src={this.props.data.album.cover_medium} alt="background" />
            </div>
            <div className="description">
              <h4>{this.props.data.title}</h4>
              <h5 className="gris">{this.props.data.artist.name}</h5>
            </div>
          </div>
          <div className="play">
            <span className="material-icons">play_arrow</span>
          </div>
        </div>
      </Link>
    );
  }
}
