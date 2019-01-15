import React, { Component } from 'react';
import Card from './Card';
import axios from 'axios';
// import uuid from 'uuid/v4';

class Deck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deck_id: '',
      cards: []
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount() {
    try {
      const response = await axios.get(
        'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
      );
      const { deck_id } = response.data;
      this.setState({ deck_id });
    } catch (error) {
      return new Error('Uh-oh');
    }
  }

  async handleClick() {
    try {
      const response = await axios.get(
        `https://deckofcardsapi.com/api/deck/${
          this.state.deck_id
        }/draw/?count=1`
      );
      const card = response.data.cards[0]['image'];
      this.setState(st => ({
        cards: [...st.cards, card]
      }));
    } catch (error) {
      return new Error('Uh-oh');
    }
  }

  render() {
    return (
      <div className="Deck">
        <button onClick={this.handleClick}>Get new card!!</button>
        {this.state.cards.map(c => (
          <Card key={c} image={c} />
        ))}
        <Card />
      </div>
    );
  }
}
export default Deck;
