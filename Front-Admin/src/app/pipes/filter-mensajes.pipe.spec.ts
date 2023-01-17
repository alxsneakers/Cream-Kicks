import { FilterMensajesPipe } from './filter-mensajes.pipe';

describe('FilterMensajesPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterMensajesPipe();
    expect(pipe).toBeTruthy();
  });
});
