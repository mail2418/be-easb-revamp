import { BadRequestException } from '@nestjs/common';
import { isIP } from 'node:net';

const BLOCKED_HOSTNAMES = new Set(['localhost', 'metadata.google.internal']);

function isPrivateOrReservedIp(ip: string): boolean {
    if (ip === '::1' || ip === '0:0:0:0:0:0:0:1') return true;
    if (!isIP(ip)) return false;
    if (ip.startsWith('10.') || ip.startsWith('127.') || ip.startsWith('169.254.')) return true;
    if (ip.startsWith('192.168.')) return true;
    if (ip.startsWith('172.')) {
        const second = Number(ip.split('.')[1]);
        if (second >= 16 && second <= 31) return true;
    }
    if (ip.startsWith('fc') || ip.startsWith('fd') || ip.startsWith('fe80')) return true;
    return false;
}

export function assertSafeRemoteUrl(
    rawUrl: string,
    allowedHostnames: string[] = (process.env.SAFE_FETCH_ALLOWED_HOSTS ?? '')
        .split(',')
        .map((h) => h.trim().toLowerCase())
        .filter(Boolean),
): URL {
    let parsed: URL;
    try {
        parsed = new URL(rawUrl);
    } catch {
        throw new BadRequestException('Invalid URL');
    }

    if (parsed.protocol !== 'https:') {
        throw new BadRequestException('Only HTTPS URLs are allowed');
    }

    const hostname = parsed.hostname.toLowerCase();
    if (BLOCKED_HOSTNAMES.has(hostname) || isPrivateOrReservedIp(hostname)) {
        throw new BadRequestException('URL target is not allowed');
    }

    if (allowedHostnames.length > 0 && !allowedHostnames.includes(hostname)) {
        throw new BadRequestException('URL hostname is not in allowlist');
    }

    return parsed;
}

export async function safeFetch(
    rawUrl: string,
    init?: RequestInit,
    allowedHostnames?: string[],
): Promise<Response> {
    const url = assertSafeRemoteUrl(rawUrl, allowedHostnames);
    return fetch(url.toString(), init);
}
