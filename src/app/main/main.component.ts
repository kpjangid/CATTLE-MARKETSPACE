import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigateToFarmer() {
    this.router.navigate(['farmer', 'register']);
  }

  navigateToDoctor() {
    this.router.navigate(['doctor', 'register']);
  }

  navigateToCompany() {
    this.router.navigate(['company', 'register']);
  }

  navigateToAuditor() {
    this.router.navigate(['auditor', 'home']);
  }

}
