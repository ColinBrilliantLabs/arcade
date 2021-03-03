import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MinigamePlayerPage } from './minigame-player.page';

describe('MinigamePlayerPage', () => {
  let component: MinigamePlayerPage;
  let fixture: ComponentFixture<MinigamePlayerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinigamePlayerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MinigamePlayerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
