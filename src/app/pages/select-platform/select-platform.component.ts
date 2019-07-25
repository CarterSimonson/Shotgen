import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-select-platform',
  templateUrl: './select-platform.component.html',
  styleUrls: ['./select-platform.component.scss']
})
export class SelectPlatformComponent implements OnInit {
  @Output() platformSelected: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  platformClicked(platform: string) {
    this.platformSelected.emit(platform);
  }
}
