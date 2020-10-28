import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  img_list = [];
  constructor(private router: Router) { }

  ngOnInit(): void {
    const list_img = JSON.parse(localStorage.getItem('slider_list'));
    if(list_img !== null){
      this.img_list = list_img;
    }
  }

  handleFileInput(event) { 
      for(var i = 0; i<event.target.files.length; i++ ){
        const file = event.target.files[i];
        var reader = new FileReader();
        reader.onload = (e: any) => {
          const imgSrc = e.target.result as String;
          this.img_list.push(imgSrc);
          localStorage.setItem('slider_list', JSON.stringify(this.img_list))
          console.log(localStorage)
        };
        reader.readAsDataURL(file);
      }
}

  deleteProject(){
    localStorage.clear();
    this.img_list = [];
  }
  
  navigateToSlider() {
    this.router.navigate(['/slider']);
  }

}
