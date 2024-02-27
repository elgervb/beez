import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { AppShellComponent } from './app-shell.component';

describe('AppShellComponent', () => {
  let spectator: Spectator<AppShellComponent>;
  const createComponent = createComponentFactory(AppShellComponent);

  beforeEach(() => spectator = createComponent());

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
