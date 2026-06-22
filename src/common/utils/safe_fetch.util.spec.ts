import { BadRequestException } from '@nestjs/common';
import { assertSafeRemoteUrl } from './safe_fetch.util';

describe('assertSafeRemoteUrl', () => {
  it('blocks localhost', () => {
    expect(() => assertSafeRemoteUrl('https://localhost/api', ['example.com'])).toThrow(
      BadRequestException,
    );
  });

  it('blocks private IP ranges', () => {
    expect(() => assertSafeRemoteUrl('https://127.0.0.1/api', [])).toThrow(BadRequestException);
    expect(() => assertSafeRemoteUrl('https://10.0.0.1/api', [])).toThrow(BadRequestException);
    expect(() => assertSafeRemoteUrl('https://169.254.169.254/latest/meta-data', [])).toThrow(
      BadRequestException,
    );
  });

  it('blocks non-HTTPS', () => {
    expect(() => assertSafeRemoteUrl('http://example.com/api', ['example.com'])).toThrow(
      BadRequestException,
    );
  });

  it('allows allowlisted HTTPS host', () => {
    const url = assertSafeRemoteUrl('https://api.example.com/v1', ['api.example.com']);
    expect(url.hostname).toBe('api.example.com');
  });
});
