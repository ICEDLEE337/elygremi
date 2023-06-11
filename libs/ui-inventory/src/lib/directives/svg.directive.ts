import { Directive, ElementRef, HostListener, OnInit } from "@angular/core";

// https://angular.io/guide/attribute-directives

@Directive({ selector: 'path[id]' })
export class SvgDirective implements OnInit {

    constructor(private el: ElementRef) { }

    ngOnInit(): void {
        console.warn(this.el.nativeElement.style.fill);
    }

    @HostListener('mouseenter') onMouseEnter() {
        this.highlight('yellow');
    }

    @HostListener('mouseleave') onMouseLeave() {
        this.highlight('rgb(0, 0, 255)');
    }

    @HostListener('click') onClick() {
        this.highlight('hotpink');
    }

    private highlight(color: string) {
        this.el.nativeElement.style.fill = color;
    }
}