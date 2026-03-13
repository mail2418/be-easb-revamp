export default () => ({
    port: parseInt(process.env.PORT ?? '3000', 10),
    db: {
        url: process.env.DB_URL,
        isRender: process.env.NODE_ENV === 'production' && process.env.DB_URL?.includes('render'),
    },
    jwt: {
        accessSecret: process.env.JWT_ACCESS_SECRET,
        refreshSecret: process.env.JWT_REFRESH_SECRET,
        accessTtl: process.env.JWT_ACCESS_TTL || '8h',
        refreshTtl: process.env.JWT_REFRESH_TTL || '24h',
    },
});
