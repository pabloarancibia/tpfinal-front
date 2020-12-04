import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'dispositivo',
    loadChildren: () => import('./dispositivo/dispositivo.module').then(m => m.DispositivoPageModule)
  },

  {
    path: 'dispositivo/:id',
    loadChildren: () => import('./dispositivo/dispositivo.module').then(m => m.DispositivoPageModule)
  },

  {
    path: 'detalle-sensor',
    loadChildren: () => import('./detalle-sensor/detalle-sensor.module').then(m => m.DetalleSensorPageModule)
  },

  {
    path: 'detalle-sensor/:id',
    loadChildren: () => import('./detalle-sensor/detalle-sensor.module').then(m => m.DetalleSensorPageModule)
  },
  {
    path: 'mediciones',
    loadChildren: () => import('./mediciones/mediciones.module').then(m => m.MedicionesPageModule)
  },
  {
    path: 'mediciones/:id',
    loadChildren: () => import('./mediciones/mediciones.module').then(m => m.MedicionesPageModule)
  },
  {
    path: 'riegos',
    loadChildren: () => import('./riegos/riegos.module').then(m => m.RiegosPageModule)
  },
  {
    path: 'riegos/:id',
    loadChildren: () => import('./riegos/riegos.module').then(m => m.RiegosPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
