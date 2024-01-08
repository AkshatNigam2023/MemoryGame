import { Component } from '@angular/core';

interface Card {
  image: string;
  flipped: boolean;
  matched: boolean;
}

@Component({
  selector: 'app-card-game',
  templateUrl: './card-game.component.html',
  styleUrls: ['./card-game.component.scss']
})
export class CardGameComponent {
  cards: Card[] = [
    { image: './../assets/game1.jpg', flipped: false, matched: false },
    { image: './../assets/game2.jpg', flipped: false, matched: false },
    { image: './../assets/game3.jpg', flipped: false, matched: false },
    { image: './../assets/game1.jpg', flipped: false, matched: false },
    { image: './../assets/game2.jpg', flipped: false, matched: false },
    { image: './../assets/game3.jpg', flipped: false, matched: false },
  ];

  flippedCards: Card[] = [];
  isFlipping: boolean = false;
  totalMoves: number = 0;
  successfulMatches: number = 0;
  rounds: number = 0;

  flipCard(card: Card) {
    if (!this.isFlipping && !card.flipped && this.flippedCards.length < 2) {
      this.totalMoves++;
      card.flipped = true;
      this.flippedCards.push(card);

      if (this.flippedCards.length === 2) {
        this.isFlipping = true;
        setTimeout(() => {
          this.checkMatch();
          this.isFlipping = false;

          // Check if all cards are matched to restart the game
          if (this.successfulMatches === this.cards.length / 2) {
            this.restartGame();
          }
        }, 1000);
      }
    }
  }

  checkMatch() {
    if (this.flippedCards[0].image === this.flippedCards[1].image) {
      this.flippedCards.forEach((card) => (card.matched = true));
      this.successfulMatches++;
    } else {
      this.flippedCards.forEach((card) => (card.flipped = false));
    }

    this.flippedCards = [];
  }

  restartGame() {
    // Reset all game-related variables
    this.cards.forEach((card) => {
      card.flipped = false;
      card.matched = false;
    });

    this.flippedCards = [];
    this.isFlipping = false;
    this.totalMoves = 0;
    this.successfulMatches = 0;
    this.rounds++;

    // Shuffle the cards for a new game
    this.shuffleCards();
  }

  shuffleCards() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }
}
