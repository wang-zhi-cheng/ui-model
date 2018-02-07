import { Component, EventEmitter, forwardRef, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SafeHtml } from '@angular/platform-browser';
import { isFunction, Supplier, Transformer } from '@ui-model/common';
import { Toggle } from '@ui-model/core';
import { debounceTime, skipWhile, tap } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

const TYPE_AHEAD_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TypeAheadComponent),
  multi: true,
};

@Component({
  selector: 'ui-type-ahead',
  template: require('./type-ahead.component.html'),
  styles: [require('./type-ahead.component.scss')],
  providers: [TYPE_AHEAD_ACCESSOR],
})
export class TypeAheadComponent<T extends { format?: Supplier<SafeHtml>, parse?: Supplier<string> }>
  implements ControlValueAccessor, OnInit, OnDestroy {

  dropDown = new Toggle();

  checker = new Subject();

  @Input() items: T[];
  @Input() displayField = 'name';
  @Input() placeholder = '-';
  @Input() formatter: Transformer<any, SafeHtml> = this.defaultFormatter.bind(this);
  @Input() parser: Transformer<any, string> = this.defaultParser.bind(this);
  @Output() search = new EventEmitter<string>();

  defaultFormatter(value: T): string | SafeHtml {
    if (!value) {
      return '';
    }

    if (value.hasOwnProperty('format') && isFunction(value.format)) {
      return value.format();
    } else {
      return value[this.displayField];
    }
  }

  defaultParser(value: T): string {
    if (!value) {
      return '';
    }
    if (value.hasOwnProperty('parse') && isFunction(value.format)) {
      return value.parse();
    } else {
      return value[this.displayField];
    }
  }

  sub: Subscription;

  ngOnInit(): void {
    this.sub = this.checker.asObservable().pipe(
      skipWhile((term) => !term),
      debounceTime(200),
      tap(() => {
        this.search.emit(this.term);
      }),
    ).subscribe(() => {
      this.dropDown.open();
    });
  }

  ngOnDestroy(): void {
    this.checker.complete();
    this.sub.unsubscribe();
  }

  term = '';
  _value: T;
  get value(): T {
    return this._value;
  }

  set value(value: T) {
    this._value = value;
    this.term = value && this.parser(value);
  }

  _change: (value: T) => void;
  _touched: () => void;

  protected changed(): void {
    if (this._change) {
      this._change(this.value);
    }
  }

  writeValue(value: T): void {
    this.value = value;
  }

  registerOnChange(fn: (value: T) => void): void {
    this._change = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._touched = fn;
  }

  @Input() disabled = false;

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }


  select(item: T): void {
    this.value = item;
    this.changed();
  }

  clear(): void {
    this.select(undefined);
  }
}
