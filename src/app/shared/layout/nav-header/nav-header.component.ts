import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NavHeaderComponent implements OnInit {

  @Input() routerValue: string;
  @Input() moduleName: string;

  constructor(private _router : Router) { }

  ngOnInit() {

  }

  goToRouter(){
    this._router.navigate([this.routerValue]);
  }

}
