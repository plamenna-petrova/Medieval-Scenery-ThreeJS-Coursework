import './main.css'

import { Experience } from './experience/experience';

const experience1 = Experience.getInstance();
const experience2 = Experience.getInstance();

if (experience1 === experience2) {
  console.log('singleton works');
}

console.log('from main ts?');

console.log('test');
console.log(experience1.canvas);

