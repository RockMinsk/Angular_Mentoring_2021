import { Directive, OnInit, OnChanges, TemplateRef, ViewContainerRef, Input } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Directive({
  selector: '[appIsAuthenticated]'
})
export class IsAuthenticatedDirective implements OnInit, OnChanges {

  @Input()
  public isAuthenticated = false;

  private hasView = false;

  public constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
    ) { }

  public configureView() {
    this.isAuthenticated = this.authService.isAutenticated();

    if (this.isAuthenticated && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (!this.isAuthenticated && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }

  public ngOnInit() {
    this.configureView();
  }

  public ngOnChanges(){
    this.configureView();
  }

}
