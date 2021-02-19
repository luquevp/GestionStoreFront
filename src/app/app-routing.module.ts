import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';

import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './guards/auth.guard';

import { SectoresComponent } from './pages/mantenimientos/sectores/sectores.component';
import { EmpleadosComponent } from './pages/mantenimientos/empleados/empleados.component';
import { EmpleadoComponent } from './pages/mantenimientos/empleados/empleado.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { RxjsComponent } from './pages/rxjs/rxjs.component';
import { AccountSettingsComponent } from './pages/account-settings/account-settings.component';
import { UsuariosComponent } from './pages/mantenimientos/usuarios/usuarios.component';
import { ModalCambiarimagenComponent } from './components/modal-cambiarimagen/modal-cambiarimagen.component';
import { ClientesComponent } from './pages/mantenimientos/clientes/clientes.component';
import { ClienteComponent } from './pages/mantenimientos/clientes/cliente.component';

const routes: Routes = [

{path: '',  component: DefaultComponent,
children: [
            {path: '', component: DashboardComponent},
            {path: 'sectores', component: SectoresComponent, },


            {path: 'empleados', component: EmpleadosComponent },
            {path: 'empleado', component: EmpleadoComponent },
            {path: 'empleado/:id', component: EmpleadoComponent, data: { titulo: 'Matenimiento de Empleados' } },
           
            {path: 'usuarios', component: UsuariosComponent },
            {path: 'modal', component: ModalCambiarimagenComponent },

            { path: 'accountsettings', component: AccountSettingsComponent , data: { titulo: 'Ajustes de cuenta' }},
            { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs' }},
            { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil de usuario' }},



            { path: 'clientes', component: ClientesComponent },

            {path: 'clientes', component: ClientesComponent },
            {path: 'cliente', component: ClienteComponent },
            {path: 'cliente/:id', component: ClienteComponent, data: { titulo: 'Matenimiento de Clientes' } },

          ], canActivate: [AuthGuard]
},
{ path: 'register', component: RegisterComponent },
{ path: 'login'   , component: LoginComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
