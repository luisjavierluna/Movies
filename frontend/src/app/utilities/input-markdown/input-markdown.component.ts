import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input-markdown',
  templateUrl: './input-markdown.component.html',
  styleUrls: ['./input-markdown.component.css']
})
export class InputMarkdownComponent implements OnInit {

  contentMarkdown = '';

  @Output()
  changeMarkdown: EventEmitter<string> = new EventEmitter<string>();
  
  constructor() { }

  ngOnInit(): void {
  }


  inputTextArea(text: string){
    this.contentMarkdown = text;
    this.changeMarkdown.emit(text);
  }
}
