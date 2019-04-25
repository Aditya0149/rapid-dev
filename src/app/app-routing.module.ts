import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { CopydeckEditorComponent } from './components/copydeck-editor/copydeck-editor.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'copydeck',
        component: CopydeckEditorComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
