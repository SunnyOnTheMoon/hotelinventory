import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsComponent } from './rooms.component';
import { ConfigService } from '../services/config.service';
import { RoomsService } from './services/rooms.service';
import { APP_SERVICE_CONFIG } from '../AppConfig/appconfig.service';
import { RouteConfigToken } from '../services/routeConfig.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { RoomsRoutingModule } from './rooms-routing.module';

describe('RoomsComponent', () => {
  let component: RoomsComponent;
  let fixture: ComponentFixture<RoomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomsRoutingModule],
      declarations: [RoomsComponent],
      providers: [RoomsService, ConfigService,
        {
          provide: APP_SERVICE_CONFIG,
          useValue: { apiEndpoint: "http://localhost:3000" },
        },
        {
          provide: RouteConfigToken,
          useValue: { title: 'Room', },
        },
        provideHttpClient(withInterceptorsFromDi()),
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
