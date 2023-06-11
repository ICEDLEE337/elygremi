import { Directive, ElementRef, HostListener, OnInit } from "@angular/core";

// https://angular.io/guide/attribute-directives

@Directive({ selector: 'g[id]' })
export class SvgDirective implements OnInit {
    processable = false;
    nativeElement: HTMLBaseElement;
    _children: HTMLBaseElement[] | undefined;
    _paths: HTMLBaseElement[] | undefined;
    _title: HTMLBaseElement | undefined;

    constructor(private el: ElementRef) { }

    get children() {
        if (!this._children) {
            this._children = this.nativeElement
                ? Array.from(this.nativeElement.children) as HTMLBaseElement[]
                : [];
        }

        return this._children;
    }

    get paths() {
        if (!this._paths) {
            this._paths = this.children.filter(c => c.tagName === 'path');
        }
        return this._paths;
    }

    get title() {
        if (!this._title) {
            this._title = this.children.find(c => c.tagName === 'title');
        }
        return this._title;
    }

    get id() {
        return this.nativeElement ? this.nativeElement.getAttribute('id') : '';
    }

    get data() {
        return this.id
            ? {
                title: this.title ? this.title?.textContent : 'TITLE N/A',
                ...this.id.split(':')
                    .map(keyValueString => keyValueString.split('_'))
                    .reduce((acc, [key, value]) => {
                        acc[key] = value;
                        return acc;
                    }, {} as any)
            }
            : {};
    }

    ngOnInit(): void {
        const id = this.el.nativeElement.id;
        if (id && id.includes('sku')) {
            this.processable = true;
            this.nativeElement = this.el.nativeElement;
        }
    }

    @HostListener('mouseenter') onMouseEnter() {
        if (this.processable) {
            this.highlight('yellow');
        }
    }

    @HostListener('mouseleave') onMouseLeave() {
        if (this.processable) {
            this.highlight('rgb(0, 0, 255)');
        }
    }

    @HostListener('click') onClick() {
        if (this.processable) {
            this.highlight('hotpink');
            console.warn(this.title?.textContent);
            console.warn(this.data);
        }
    }

    private highlight(color: string) {
        if (this.paths) {
            this.paths.forEach(path => path.style.fill = color);
        }
    }
}