import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  img_list = [];
  constructor() { }

  ngOnInit(): void {
  }

  handleFileInput(event) { 
      for(var i = 0; i<event.target.files.length; i++ ){
        const file = event.target.files[i];
        var reader = new FileReader();
        reader.onload = (e: any) => {
          const imgSrc = e.target.result;
          this.img_list.push(imgSrc);
        };
        reader.readAsDataURL(file);
      }
}

  deleteProject(){
    this.img_list = [];
  }

}
