import { Routes, RouterModule } from '@angular/router';
import { FarmerComponent } from './register/farmer/farmer.component';
import { OtpComponent } from './register/otp/otp.component';
import { Component } from '@angular/core';
import { PasscodeComponent } from './register/passcode/passcode.component';
import { HomeComponent } from './home/home.component';
import { CattleComponent } from './home/cattle/cattle.component';
import { EditCattleComponent } from './home/cattle/edit-cattle/edit-cattle.component';
import { SettingComponent } from './home/setting/setting.component';
import { MarketplaceComponent } from './home/marketplace/marketplace.component';
import { WalletComponent } from './home/wallet/wallet.component';
import { TradeComponent } from './home/trade/trade.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { AddCattleComponent } from './home/cattle/add-cattle/add-cattle.component';
import { LoginComponent } from './register/login/login.component';
import { LandingComponent } from './home/landing/landing.component';
import { MarketCattleComponent } from './home/marketplace/market-cattle/market-cattle.component';
import { MarketMilkComponent } from './home/marketplace/market-milk/market-milk.component';
import { RegisterDoctorComponent } from './doctor/register-doctor/register-doctor.component';
import { LoginDoctorComponent } from './doctor/login-doctor/login-doctor.component';
import { OtpDoctorComponent } from './doctor/otp-doctor/otp-doctor.component';
import { DoctorHomeComponent } from './doctor/home-doctor/doctor-home.component';
import { LandingPageComponent } from './doctor/home-doctor/landing-page/landing-page.component';
import { MainComponent } from './main/main.component';
import { UpdateCowComponent } from './doctor/home-doctor/landing-page/update-cow/update-cow.component';
import { LoginCompanyComponent } from './dairy-company/login-company/login-company.component';
import { OtpCompanyComponent } from './dairy-company/otp-company/otp-company.component';
import { HomeCompanyComponent } from './dairy-company/home-company/home-company.component';
import { RegisterCompanyComponent } from './dairy-company/register-company/register-company.component';
import { CompanyLandingComponent } from './dairy-company/home-company/company-landing/company-landing.component';
import { AddCalfComponent } from './home/cattle/add-calf/add-calf.component';
import { HomeAuditorComponent } from './auditor/home/home-auditor.component';
import { AuditorLandingComponent } from './auditor/home/auditor-landing/auditor-landing.component';
import { AuditorFarmersComponent } from './auditor/home/auditor-farmers/auditor-farmers.component';
import { AuditorCowsComponent } from './auditor/home/auditor-cows/auditor-cows.component';
import { AuditorDoctorsComponent } from './auditor/home/auditor-doctors/auditor-doctors.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'
  }, {
    path: 'farmer/home',
    component: HomeComponent,
    children: [
      {
        path: 'landing',
        canActivate: [AuthGuardService],
        component: LandingComponent
      }, {
        path: 'cattle',
        canActivate: [AuthGuardService],
        component: CattleComponent
      }, {
        path: 'setting',
        canActivate: [AuthGuardService],
        component: SettingComponent
      }, {
        path: 'marketplace',
        canActivate: [AuthGuardService],
        component: MarketplaceComponent
      }, {
        path: 'wallet',
        canActivate: [AuthGuardService],
        component: WalletComponent
      }, {
        path: 'trade',
        canActivate: [AuthGuardService],
        component: TradeComponent
      }
    ]
  }, {
    path: 'farmer/register',
    component: FarmerComponent
  }, {
    path: 'farmer/login',
    component: LoginComponent
  }, {
    path: 'farmer/otp',
    component: OtpComponent
  }, {
    path: 'farmer/passcode',
    component: PasscodeComponent
  }, {
    path: 'farmer/add-cattle',
    component: AddCattleComponent,
    canActivate: [AuthGuardService]
  }, {
    path: 'farmer/add-calf',
    component: AddCalfComponent,
    canActivate: [AuthGuardService]
  }, {
    path: 'farmer/cattle-marketplace',
    component: MarketCattleComponent,
    canActivate: [AuthGuardService]
  }, {
    path: 'farmer/milk-marketplace',
    component: MarketMilkComponent,
    canActivate: [AuthGuardService]
  },

  // routers for doctor
  {
    path: 'doctor/register',
    component: RegisterDoctorComponent
  }, {
    path: 'doctor/login',
    component: LoginDoctorComponent
  }, {
    path: 'doctor/otp',
    component: OtpDoctorComponent
  }, {
    path: 'doctor/home',
    component: DoctorHomeComponent,
    children: [
      {
        path: 'landing',
        component: LandingPageComponent
      }
    ]
  }, {
    path: 'doctor/cow/update/:id',
    component: UpdateCowComponent
  },

  // routers for company
  {
    path: 'company/register',
    component: RegisterCompanyComponent
  }, {
    path: 'company/login',
    component: LoginCompanyComponent
  }, {
    path: 'company/otp',
    component: OtpCompanyComponent
  }, {
    path: 'company/home',
    component: HomeCompanyComponent,
    children: [
      {
        path: 'landing',
        component: CompanyLandingComponent
      }
    ]
  },

  // auditor routing

  {
    path: 'auditor',
    component: HomeAuditorComponent,
    children: [
      {
        path: 'home',
        component: AuditorLandingComponent
      },
      {
        path: 'farmers',
        component: AuditorFarmersComponent
      },
      {
        path: 'cows',
        component: AuditorCowsComponent
      },
      {
        path: 'veterinaries',
        component: AuditorDoctorsComponent
      }
    ]
  },

  // default routers
  {
    path: 'main',
    component: MainComponent
  }, {
    path: '**',
    redirectTo: 'main'
  }
];

export const CattleRouteRoutes = RouterModule.forRoot(routes);
