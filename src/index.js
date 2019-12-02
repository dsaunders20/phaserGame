import {Game} from 'phaser';
import {config} from './config'

export var score = 0;
export function setScore(s) {
    score = s;
}
export function getScore() {
    return score;
}
var game = new Game(config);
