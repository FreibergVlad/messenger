import { App.MaterialModule } from './app.material.module';

describe('App.MaterialModule', () => {
  let appMaterialModule: App.MaterialModule;

  beforeEach(() => {
    appMaterialModule = new App.MaterialModule();
  });

  it('should create an instance', () => {
    expect(appMaterialModule).toBeTruthy();
  });
});
