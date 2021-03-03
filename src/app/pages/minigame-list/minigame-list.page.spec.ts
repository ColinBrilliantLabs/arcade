import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MinigameListPage } from './minigame-list.page';

describe('MinigameListPage', () => {
  let component: MinigameListPage;
  let fixture: ComponentFixture<MinigameListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinigameListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MinigameListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
