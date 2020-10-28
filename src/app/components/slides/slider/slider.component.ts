import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  sliderimg_list = []
  imgSelected: string;
  actualIndex = 0;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.sliderimg_list = JSON.parse(localStorage.getItem('slider_list'));
    this.imgSelected = this.sliderimg_list[0];
  }
  nextSlide() {
    this.actualIndex++;
    this.imgSelected = this.sliderimg_list[this.actualIndex];
  }

  previousSlide() {
    this.actualIndex--;
    this.imgSelected = this.sliderimg_list[this.actualIndex];
  }
  Leave(){
    this.router.navigate(['/form']);
  }
  End(){
    console.log('end')
  }
}
