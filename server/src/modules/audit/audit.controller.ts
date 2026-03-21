import { Request, Response } from 'express';
import { AuditService } from './audit.service';
import { asyncHandler } from '../../utils/asyncHandler';
import { toString } from '../../utils/params.helper';

const auditService = new AuditService();

/**
 * GET /api/cases/:caseId/audit-logs
 */
export const getAuditLogs = asyncHandler(async (req: Request, res: Response) => {
  const { caseId } = req.params;
  const organizationId = req.user!.organizationId;
  const userRole = req.user!.role;

  const logs = await auditService.getAuditLogs(toString(caseId), organizationId, userRole);

  res.status(200).json({
    success: true,
    data: logs,
  });
});
