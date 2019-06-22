import { LayoutModule } from '@angular/cdk/layout';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatDatepickerModule, MatDialogModule, MatFormFieldModule, MatGridListModule, MatIconModule, MatListModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule, MatSelectModule, MatSidenavModule, MatSortModule, MatTableModule, MatToolbarModule, MatRadioModule, MatExpansionModule, MatBadgeModule, MatRippleModule, MatTabsModule, MatBottomSheetModule, MatCheckboxModule, MatProgressSpinner, MatProgressSpinnerModule, MatChipsModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DropdownDirective } from './directive/dropdown.directive';
import { HeaderComponent } from './header/header.component';
import { FarmerComponent } from './register/farmer/farmer.component';
import { TableComponent } from './table/table.component';
import { GrayHeaderComponent } from './shared/layout/gray-header/gray-header.component';
import { OtpComponent } from './register/otp/otp.component';
import { PasscodeComponent } from './register/passcode/passcode.component';
import { CattleRouteRoutes } from './cattle-route.routing';
import { HomeComponent } from './home/home.component';
import { CattleComponent } from './home/cattle/cattle.component';
import { NavHeaderComponent } from './shared/layout/nav-header/nav-header.component';
import { EditCattleComponent } from './home/cattle/edit-cattle/edit-cattle.component';
import { DeleteCattleComponent } from './home/cattle/delete-cattle/delete-cattle.component';
import { SellCattleComponent } from './home/cattle/sell-cattle/sell-cattle.component';
import { HttpService } from './shared/services/httpService';
import { AppService } from './shared/services/appService';
import { AppConfigService } from './shared/services/appConfigService';
import { SessionService } from './shared/services/sessionService';
import { WalletComponent } from './home/wallet/wallet.component';
import { SettingComponent } from './home/setting/setting.component';
import { TradeComponent } from './home/trade/trade.component';
import { MarketplaceComponent } from './home/marketplace/marketplace.component';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { UtilityService } from './shared/services/utilityService';
import { AuthGuardService } from './guards/auth-guard.service';
import { CattleService } from './home/cattle/cattle.service';
import { AddCattleComponent } from './home/cattle/add-cattle/add-cattle.component';
import { LoginComponent } from './register/login/login.component';
import { LandingComponent } from './home/landing/landing.component';
import { MarketCattleComponent } from './home/marketplace/market-cattle/market-cattle.component';
import { MarketMilkComponent } from './home/marketplace/market-milk/market-milk.component';
import { MarketService } from './home/marketplace/market.service';
import { BreedFilterSheetComponent } from './home/marketplace/market-cattle/breedFilterSheet/breedFilterSheet.component';
import { AgeFilterSheetComponent } from './home/marketplace/market-cattle/ageFilterSheet/ageFilterSheet.component';
import { TehsilFilterSheetComponent } from './home/marketplace/market-cattle/tehsilFilterSheet/tehsilFilterSheet.component';
import { DoctorHomeComponent } from './doctor/home-doctor/doctor-home.component';
import { LoginDoctorComponent } from './doctor/login-doctor/login-doctor.component';
import { RegisterDoctorComponent } from './doctor/register-doctor/register-doctor.component';
import { OtpDoctorComponent } from './doctor/otp-doctor/otp-doctor.component';
import { DoctorServiceService } from './doctor/doctor-service.service';
import { LandingPageComponent } from './doctor/home-doctor/landing-page/landing-page.component';
import { MainComponent } from './main/main.component';
import { OfferPriceComponent } from './home/marketplace/market-cattle/offer-price/offer-price.component';
import { UpdateCowComponent } from './doctor/home-doctor/landing-page/update-cow/update-cow.component';
import { AgeCalculatorPipe } from './shared/pipe/age-calculator.pipe';
import { DefaultFilterComponent } from './home/marketplace/market-cattle/default-filter/default-filter.component';
import { WalletService } from './home/wallet/wallet.service';
import { AddBalanceComponent } from './home/wallet/add-balance/add-balance.component';
import { SellCowComponent } from './home/marketplace/market-cattle/sell-cow/sell-cow.component';
import { BuyCowComponent } from './home/marketplace/market-cattle/buy-cow/buy-cow.component';
import { MakePaymentComponent } from './home/landing/makePayment/makePayment.component';
import { TransferCowComponent } from './home/marketplace/market-cattle/transfer-cow/transfer-cow.component';
import { RatingComponent } from './home/wallet/rating/rating.component';
import { LimitCharPipe } from './shared/pipe/limit-char.pipe';
import { RegisterCompanyComponent } from './dairy-company/register-company/register-company.component';
import { LoginCompanyComponent } from './dairy-company/login-company/login-company.component';
import { OtpCompanyComponent } from './dairy-company/otp-company/otp-company.component';
import { HomeCompanyComponent } from './dairy-company/home-company/home-company.component';
import { CompanyLandingComponent } from './dairy-company/home-company/company-landing/company-landing.component';
import { CompanyService } from './dairy-company/company.service';
import { ShowRatingComponent } from './home/wallet/show-rating/show-rating.component';
import { BarRatingModule } from 'ngx-bar-rating';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FilterTextPipe } from './shared/pipe/filter-text.pipe';
import { AddCalfComponent } from './home/cattle/add-calf/add-calf.component';
import { RejectBidComponent } from './home/landing/reject-bid/reject-bid.component';
import { MakeOfferBidComponent } from './home/landing/make-offer-bid/make-offer-bid.component';
import { AuditorLandingComponent } from './auditor/home/auditor-landing/auditor-landing.component';
import { HomeAuditorComponent } from './auditor/home/home-auditor.component';
import { AuditorService } from './auditor/auditor.service';
import { AppServiceAuditor } from './shared/services/appServiceAuditor';
import { HttpServiceAuditor } from './shared/services/httpServiceAuditor';
import { AuditorFarmersComponent } from './auditor/home/auditor-farmers/auditor-farmers.component';
import { AuditorCowsComponent } from './auditor/home/auditor-cows/auditor-cows.component';
import { AuditorDoctorsComponent } from './auditor/home/auditor-doctors/auditor-doctors.component';

export function initApp(appConfigService: AppConfigService) {
  return () => new Promise<void>(
    (resolve, reject) => {
      appConfigService.loadConfig("assets/config/config.json").then(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    TableComponent,
    DropdownDirective,
    FarmerComponent,
    GrayHeaderComponent,
    OtpComponent,
    PasscodeComponent,
    HomeComponent,
    CattleComponent,
    AddCattleComponent,
    NavHeaderComponent,
    EditCattleComponent,
    AddCalfComponent,
    DeleteCattleComponent,
    SellCattleComponent,
    WalletComponent,
    SettingComponent,
    TradeComponent,
    MarketplaceComponent,
    LoginComponent,
    LandingComponent,
    MarketCattleComponent,
    MarketMilkComponent,
    BreedFilterSheetComponent,
    AgeFilterSheetComponent,
    TehsilFilterSheetComponent,
    DoctorHomeComponent,
    LoginDoctorComponent,
    RegisterDoctorComponent,
    OtpDoctorComponent,
    LandingPageComponent,
    MainComponent,
    MakePaymentComponent,
    OfferPriceComponent,
    UpdateCowComponent,
    AgeCalculatorPipe,
    DefaultFilterComponent,
    AddBalanceComponent,
    SellCowComponent,
    BuyCowComponent,
    TransferCowComponent,
    RatingComponent,
    LimitCharPipe,
    RegisterCompanyComponent,
    LoginCompanyComponent,
    OtpCompanyComponent,
    HomeCompanyComponent,
    CompanyLandingComponent,
    ShowRatingComponent,
    FilterTextPipe,
    RejectBidComponent,
    MakeOfferBidComponent,
    AuditorLandingComponent,
    HomeAuditorComponent,
    AuditorFarmersComponent,
    AuditorCowsComponent,
    AuditorDoctorsComponent
  ],
  imports: [
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatSelectModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    FlexLayoutModule,
    MatProgressBarModule,
    MatDialogModule,
    FormsModule,
    CattleRouteRoutes,
    HttpClientModule,
    MatRadioModule,
    MatExpansionModule,
    MatBadgeModule,
    MatRippleModule,
    MatTabsModule,
    MatBottomSheetModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    BarRatingModule,
    NgbModule,
    MatTableModule
  ],
  entryComponents: [
    PasscodeComponent,
    DeleteCattleComponent,
    SellCattleComponent,
    BreedFilterSheetComponent,
    TehsilFilterSheetComponent,
    AgeFilterSheetComponent,
    OfferPriceComponent,
    DefaultFilterComponent,
    AddBalanceComponent,
    MakePaymentComponent,
    RatingComponent,
    ShowRatingComponent,
    RejectBidComponent,
    MakeOfferBidComponent
  ],
  providers: [
    HttpService,
    HttpServiceAuditor,
    AppServiceAuditor,
    AppService,
    CookieService,
    SessionService,
    AppConfigService,
    UtilityService,
    AuthGuardService,
    CattleService,
    MarketService,
    DoctorServiceService,
    WalletService,
    CompanyService,
    AuditorService,
    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      deps: [
        AppConfigService
      ],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }