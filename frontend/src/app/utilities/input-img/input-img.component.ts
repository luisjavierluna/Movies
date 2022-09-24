import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { toBase64 } from '../utilities';

@Component({
  selector: 'app-input-img',
  templateUrl: './input-img.component.html',
  styleUrls: ['./input-img.component.css']
})
export class InputImgComponent implements OnInit {

  constructor() { }

  imageBase64: string;

  @Input()
  urlCurrentImage: string;

  @Output()
  selectedFile: EventEmitter<File> = new EventEmitter<File>();

  ngOnInit(): void {
  }

  change(event){
    if(event.target.files.length > 0){
      const file: File = event.target.files[0];
      toBase64(file).then((value: string) => this.imageBase64 = value)
      .catch(error => console.log(error));
      this.selectedFile.emit(file);
      this.urlCurrentImage = null;
    }
  }
}
