import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'bee-legder',
  templateUrl: './legder.component.html',
  styleUrls: [ './legder.component.css' ]
})
export class LegderComponent implements OnInit {

  year: number | null;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.year = this.route.snapshot.paramMap.get('year') as number | null;
  }

}
