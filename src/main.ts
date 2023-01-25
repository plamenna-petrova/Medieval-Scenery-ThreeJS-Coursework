import './main.css'

import { Experience } from './experience/experience';

const canvasExperienceHTMLElement = document.querySelector('canvas.experience-canvas') as HTMLCanvasElement;

const experience: Experience = new Experience(
  canvasExperienceHTMLElement
);

console.log('test');
console.log(experience.canvas);

