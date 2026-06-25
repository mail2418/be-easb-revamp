export class AuditEvent {
    id: number;
    /** Null for unauthenticated events (e.g. failed login). */
    idUser: number | null;
    /** Username captured at event time (survives even if the user is deleted). */
    username: string | null;
    /** Logical action, e.g. "login_success", "user_create", "usulan_verify". */
    action: string;
    /** Resource type, e.g. "auth", "users", "usulan_jalan". */
    resource: string | null;
    /** Affected resource id, when applicable. */
    resourceId: string | null;
    /** HTTP method for request-derived events. */
    method: string | null;
    /** Request path for request-derived events. */
    path: string | null;
    /** Resulting HTTP status code, when applicable. */
    statusCode: number | null;
    ipAddress: string | null;
    userAgent: string | null;
    createdAt?: Date;
}
