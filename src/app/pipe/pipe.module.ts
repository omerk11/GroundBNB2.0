import { NgModule }      from '@angular/core';

@NgModule({
  imports: [],
  declarations: [
  ],
  exports: [
  ],
})
export class PipeModule {
  static forRoot() {
    return {
      ngModule: PipeModule,
      providers: [],
    };
  }
}
