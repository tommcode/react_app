import React, { Component } from "react";
import Select from '../components/Select';
import Header from '../components/Header';

// ./containers/Search.js
export default class Search extends Component {
  state = {
    searchValue: "",
    songs: [],
    musicTabs: [
      'Random',
      'text_Bass_tab',
      'Player',
      'Chords',
      'text_Guitar_tab'
    ],
    result: ''
  };

  filterSongs = selected => {
    return this.state.songs.filter(song => song.tabTypes === selected);
  }

  handleOnChange = event => {
    this.setState({ searchValue: event.target.value });
  };

  handleSelectChange = event => {
    this.setState({
      result: event.target.value
    });
  };

  handleSearch = () => {
    this.makeApiCall(this.state.searchValue);
  };

  makeApiCall = async searchInput => {
    let api_url = `https://www.songsterr.com/a/ra/songs/.json?pattern=${searchInput}`;
    const response = await fetch(api_url);
    const songs = await response.json();
    this.setState({ songs });
  };

  render() {
    return (
      <div>
        <Header />
        <input
          name="text"
          type="search"
          placeholder="Wyszukaj..."
          onChange={event => this.handleOnChange(event)}
          value={this.state.SearchValue}
        />

        <Select optionValue={this.state.musicTabs} change={this.handleSelectChange} value={this.state.result} />

        <br />
        <button onClick={this.handleSearch}>Search</button>

        {
          this.state.songs ? (
            <div>
              {
                this.state.songs.filter(s => this.state.result === 'Random' 
                || s.tabTypes.includes(this.state.result.toUpperCase()))
                .map((song, index) => (
                  <div key={index} className="lists">

                    <h1>Wykonawca: <span>{song.artist.name}</span></h1>
                    <h2>Tytuł piosenki: <span>{song.title}</span></h2>

                    <ol>
                      <b>Dostępne tabulatury:</b>
                      {song.tabTypes.map((tab, index) =>
                        <li key={index}> {song.tabTypes[index]} </li>
                      )}
                    </ol>

                  </div>
                ))
              }
            </div>
          ) : null
        }
      </div>
    );
  }
}



