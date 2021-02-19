import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { DashboardComponent } from '../../modules/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardService } from '../../services/dashboard.service';
import { AngularMaterialModule } from '../../angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '../../pipes/pipes.module';
import { ComponentsModule } from '../../components/components.module';
import { RxjsComponent } from '../../pages/rxjs/rxjs.component';
import { PromesasComponent } from '../../pages/promesas/promesas.component';
import { EmpleadoComponent } from '../../pages/mantenimientos/empleados/empleado.component';
import { EmpleadosComponent } from '../../pages/mantenimientos/empleados/empleados.component';
import { SectoresComponent } from '../../pages/mantenimientos/sectores/sectores.component';
import { UsuariosComponent } from '../../pages/mantenimientos/usuarios/usuarios.component';
import { PerfilComponent } from '../../pages/perfil/perfil.component';
import { AccountSettingsComponent } from '../../pages/account-settings/account-settings.component';
import { BreadcrumbsComponent } from '../../shared/breadcrumbs/breadcrumbs.component';
import { ClienteComponent } from '../../pages/mantenimientos/clientes/cliente.component';
import { ClientesComponent } from '../../pages/mantenimientos/clientes/clientes.component';




@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    RxjsComponent,
    PromesasComponent,
    EmpleadoComponent,
    EmpleadosComponent,
    SectoresComponent,
    UsuariosComponent,
    PerfilComponent,
    AccountSettingsComponent,
    ClienteComponent,
    ClientesComponent






  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    MatDividerModule,
    FlexLayoutModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    AngularMaterialModule,
    FormsModule,
    PipesModule,
    ComponentsModule,
    ReactiveFormsModule,
  ],
  providers:[
    DashboardService
  ]
})
export class DefaultModule { }
