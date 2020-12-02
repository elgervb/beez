import { AfterContentChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.css']
})
export class TileComponent implements OnInit, AfterContentChecked {

  hasFooter: boolean;
  hasHeader: boolean;

  @ViewChild('header')
  private header!: ElementRef<HTMLElement>;

  @ViewChild('footer')
  private footer!: ElementRef<HTMLElement>;

  constructor() { }

  ngAfterContentChecked() {
    this.hasHeader = this.header?.nativeElement.childElementCount > 0;
    this.hasFooter = this.footer?.nativeElement.childElementCount > 0;
  }

  ngOnInit() { }

}
