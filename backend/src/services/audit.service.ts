/**
 * Audit log - immutable trail for regulators and compliance.
 * Production: write to audit_logs table or dedicated audit store.
 */

export function auditLog(
  userId: string | null,
  action: string,
  resourceType?: string,
  resourceId?: string,
  payload?: Record<string, unknown>
): void {
  if (process.env.NODE_ENV !== 'test') {
    console.info('[AUDIT]', { userId, action, resourceType, resourceId, payload, at: new Date().toISOString() })
  }
  // TODO: INSERT INTO audit_logs (user_id, action, resource_type, resource_id, payload) VALUES (...)
}
