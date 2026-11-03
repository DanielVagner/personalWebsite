import { TestBed } from '@angular/core/testing';
import { LanguageService } from '../../../core/language.service';
import { PreviewState } from './preview-state';

describe('PreviewState', () => {
  let state: PreviewState;
  let lang: LanguageService;

  beforeEach(() => {
    vi.useFakeTimers();
    TestBed.configureTestingModule({ providers: [PreviewState] });
    lang = TestBed.inject(LanguageService);
    lang.set('en');
    state = TestBed.inject(PreviewState);
  });

  afterEach(() => vi.useRealTimers());

  it('describes the picked value as an inlay hint, in the active language', () => {
    state.apply('day', 2);
    expect(state.hint('day')).toBe('selected: Wed');
    lang.set('cs');
    expect(state.hint('day')).toBe('vybráno: St');
    state.apply('swatch', 1);
    expect(state.hint('swatch')).toBe('barva: šedomodrá');
  });

  it('shows a booking toast that hides itself', () => {
    state.apply('day', 2);
    state.apply('book');
    expect(state.toast()).toBe('Booked: Wed 10:30 am');
    expect(state.announcement('book')).toBe(state.toast());
    vi.advanceTimersByTime(2600);
    expect(state.toast()).toBe('');
  });

  it('counts the cart and keeps only the last three terminal lines', () => {
    for (let i = 0; i < 4; i++) state.apply('cart');
    expect(state.cart()).toBe(4);
    expect(state.hint('cart')).toBe('cart: 4');
    expect(state.log().map((l) => l.result)).toEqual(['cart: 2', 'cart: 3', 'cart: 4']);
    expect(state.log()[0]?.fn).toBe('addToCart()');
  });

  it('resets to the sample state', () => {
    state.apply('cart');
    state.apply('star', 3);
    state.apply('bar', 4);
    state.reset();
    expect(state.cart()).toBe(0);
    expect(state.rating()).toBeNull();
    expect(state.bar()).toBeNull();
    expect(state.log()).toEqual([]);
    expect(state.hint('day')).toBe('selected: Tue');
  });
});
