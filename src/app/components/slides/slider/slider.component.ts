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
    this.changeImgSelected();
    this.animate();
  }

  previousSlide() {
    this.actualIndex--;
    this.changeImgSelected();
    this.animate();
  }

  animate(){
    let el_list = document.getElementsByClassName('img_carousel') as HTMLCollectionOf<HTMLImageElement> ;
    let arry = Array.from(el_list)
    var el_img = arry.find(el => el.currentSrc === this.imgSelected)  
    el_img.scrollIntoView({ behavior: "smooth", block: "start", inline: "center"})

  }

  Leave(){
    this.router.navigate(['/form']);
  }
  End(){
    console.log('end')
  }

  changeImgSelected(){
    this.imgSelected = this.sliderimg_list[this.actualIndex];
  }

  navigateTo(el, img){
    this.actualIndex = this.sliderimg_list.indexOf(img)
    this.changeImgSelected();
    el.scrollIntoView({ behavior: "smooth", block: "start", inline: "center"})
  }
}
