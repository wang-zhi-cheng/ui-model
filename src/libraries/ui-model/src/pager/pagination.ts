import { Pager } from './pager';
export class Pagination extends Pager {
  constructor(size: number = 10, viewport: number = 5) {
    super(size);
    this.viewport = viewport;
  }

  private _originViewport: number;
  private _viewport: number;
  get viewport(): number {
    return Math.min(this._viewport, this.count);
  }

  set viewport(value: number) {
    if (value !== this._originViewport) {
      this._originViewport = value;
      this._viewport = value;
      this.changed();
    }
  }

  private get halfViewport(): number {
    return Math.floor(this.viewport / 2);
  }

  get hasFirst(): boolean {
    return this.hasMore && this.index > this.halfViewport;
  }

  get hasMore(): boolean {
    return this.count > this.viewport;
  }

  get hasPrevMore(): boolean {
    return this.hasMore && this.index > this.halfViewport + 1;
  }

  get hasNextMore(): boolean {
    return this.hasMore && this.index < this.count - this.halfViewport - 2;
  }

  get hasLast(): boolean {
    return this.hasMore && this.index < this.count - this.halfViewport - 1;
  }

  get visibleBegin(): number {
    return Math.min(Math.max(this.index - this.halfViewport, 0), this.count - this.viewport);
  }

  get visibleEnd(): number {
    return this.visibleBegin + this.viewport;
  }

  get pages(): number[] {
    const result = [];
    for (let i = this.visibleBegin; i < this.visibleEnd; ++i) {
      result.push(i);
    }
    return result;
  }

  get required(): boolean {
    return this.hasPrev && this.hasNext;
  }
}
