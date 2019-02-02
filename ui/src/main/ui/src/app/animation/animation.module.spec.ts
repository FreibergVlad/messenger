import { AnimationModule } from './animation.module';

describe('AnimationModule', () => {
  let animationModule: AnimationModule;

  beforeEach(() => {
    animationModule = new AnimationModule();
  });

  it('should create an instance', () => {
    expect(animationModule).toBeTruthy();
  });
});
