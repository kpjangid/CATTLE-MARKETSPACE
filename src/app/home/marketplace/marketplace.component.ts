import { Component, OnInit } from '@angular/core';
import { UtilityService } from '../../shared/services/utilityService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.css']
})
export class MarketplaceComponent implements OnInit {

  item: any = {
    cowName: "cow-1",
    cowAge: "14 years 2 months",
    imageData: "https://www.purinamills.com/2.purinamills.com/media/Images/Content/cattle_lifestage_weaned-calf.png?ext=.png"
  };

  constructor(private utilService: UtilityService, private router: Router) { }

  ngOnInit() {
    this.utilService.activateRouter("Marketplace");
  }

  navigate(route) {
    this.router.navigate([route]);
  }

}
