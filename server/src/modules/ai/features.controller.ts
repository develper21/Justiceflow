import { Request, Response } from 'express';
import { prisma } from '../../prisma/client';
import { aiService } from './features.service';
import { ApiError } from '../../utils/ApiError';
import {
  CaseReadinessCheckRequest,
  DocumentValidationRequest,
  CaseBriefRequest,
} from './types';

export class AIFeaturesController {
  /**
   * POST /api/ai/case-readiness
   * Endpoint for SHO to check case readiness
   */
  static async checkCaseReadiness(req: Request, res: Response) {
    try {
      const { caseId, caseType } = req.body;
      const userId = (req.user as any)?.id; // From auth middleware

      if (!caseId || !caseType || !userId) {
        throw new ApiError(400, 'Missing required fields: caseId, caseType');
      }

      // Fetch real case data with all relationships
      const caseData = await prisma.case.findUnique({
        where: { id: caseId },
        include: {
          fir: true,
          documents: true,
          witnesses: true,
          evidence: true,
          state: true,
        },
      });

      if (!caseData) {
        throw new ApiError(404, 'Case not found');
      }

      // Calculate real values from database
      const witnessCount = caseData.witnesses.length;
      const evidenceCount = caseData.evidence.length;
      const daysElapsed = Math.floor(
        (Date.now() - new Date(caseData.fir.createdAt).getTime()) / (1000 * 60 * 60 * 24)
      );
      const documentTypes = caseData.documents.map((d) => d.documentType);

      // Call AI service with real data
      const readinessCheckRequest: CaseReadinessCheckRequest = {
        caseId,
        caseType,
        witnessCount,
        evidenceCount,
        timelineInfo: {
          daysElapsed,
          expectedDays: 90, // Can be configured per case type
        },
      };

      const result = await aiService.checkCaseReadiness(readinessCheckRequest);

      console.log('✅ AI Service returned:', JSON.stringify(result, null, 2));

      // Extract data from AI service response (it returns {success, data})
      const aiData = (result as any).data || result;

      // AI features not implemented yet - using placeholder response
      res.status(200).json({
        success: true,
        data: {
          message: 'AI case readiness check not implemented yet',
          caseId,
          readinessScore: 0,
          status: 'PENDING'
        }
      });
    } catch (error) {
      console.error('❌ Case Readiness Check Error:', error);
      res.status(error instanceof ApiError ? error.statusCode : 500).json({
        success: false,
        error:
          error instanceof ApiError
            ? error.message
            : 'Failed to check case readiness',
      });
    }
  }

  /**
   * POST /api/ai/document-validate
   * Endpoint for Clerk to validate documents
   */
  static async validateDocument(req: Request, res: Response) {
    try {
      const { documentType, caseId, ...otherData } = req.body;
      const userId = (req.user as any)?.id; // From auth middleware

      if (!documentType || !userId) {
        throw new ApiError(400, 'Missing required fields: documentType');
      }

      // Validate case exists if caseId provided
      if (caseId) {
        const caseExists = await prisma.case.findUnique({
          where: { id: caseId },
        });

        if (!caseExists) {
          throw new ApiError(404, 'Case not found');
        }
      }

      // Call AI service
      const validationRequest: DocumentValidationRequest = {
        documentType,
        caseId,
        ...otherData,
      };

      const result = await aiService.validateDocument(validationRequest);

      // AI features not implemented yet - using placeholder response
      res.status(200).json({
        success: true,
        data: {
          ...result,
          message: 'AI document validation not implemented yet'
        }
      });
    } catch (error) {
      res.status(error instanceof ApiError ? error.statusCode : 500).json({
        success: false,
        error:
          error instanceof ApiError
            ? error.message
            : 'Failed to validate document',
      });
    }
  }

  /**
   * POST /api/ai/case-brief
   * Endpoint for Judge to generate case brief
   */
  static async generateCaseBrief(req: Request, res: Response) {
    try {
      const { caseId, caseNumber, caseType } = req.body;
      const userId = (req.user as any)?.id; // From auth middleware

      if (!caseId || !caseNumber || !caseType || !userId) {
        throw new ApiError(
          400,
          'Missing required fields: caseId, caseNumber, caseType'
        );
      }

      // Validate case exists
      const caseExists = await prisma.case.findUnique({
        where: { id: caseId },
      });

      if (!caseExists) {
        throw new ApiError(404, 'Case not found');
      }

      // Call AI service
      const briefRequest: CaseBriefRequest = {
        caseId,
        caseNumber,
        caseType,
      };

      const result = await aiService.generateCaseBrief(briefRequest);

      // AI features not implemented yet - using placeholder response
      res.status(200).json({
        success: true,
        data: {
          ...result,
          message: 'AI case brief generation not implemented yet'
        }
      });
    } catch (error) {
      res.status(error instanceof ApiError ? error.statusCode : 500).json({
        success: false,
        error:
          error instanceof ApiError
            ? error.message
            : 'Failed to generate case brief',
      });
    }
  }

  /**
   * GET /api/ai/case-readiness/:caseId
   * Retrieve case readiness history
   */
  static async getCaseReadinessHistory(req: Request, res: Response) {
    try {
      const { caseId } = req.params;
      const caseIdString = Array.isArray(caseId) ? caseId[0] : caseId;

      // AI features not implemented yet - using placeholder response
      res.status(200).json({
        success: true,
        data: {
          message: 'AI case readiness history not implemented yet',
          history: []
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to retrieve case readiness history',
      });
    }
  }

  /**
   * GET /api/ai/document-validations/:caseId
   * Retrieve document validation history
   */
  static async getDocumentValidationHistory(req: Request, res: Response) {
    try {
      const { caseId } = req.params;
      const caseIdString = Array.isArray(caseId) ? caseId[0] : caseId;

      // AI features not implemented yet - using placeholder response
      res.status(200).json({
        success: true,
        data: {
          message: 'AI document validation history not implemented yet',
          history: []
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to retrieve document validation history',
      });
    }
  }

  /**
   * GET /api/ai/case-brief/:caseId
   * Retrieve latest case brief
   */
  static async getLatestCaseBrief(req: Request, res: Response) {
    try {
      const { caseId } = req.params;
      const caseIdString = Array.isArray(caseId) ? caseId[0] : caseId;

      // AI features not implemented yet
      throw new ApiError(501, 'AI case brief feature not implemented yet');
    } catch (error) {
      res.status(error instanceof ApiError ? error.statusCode : 500).json({
        success: false,
        error:
          error instanceof ApiError
            ? error.message
            : 'Failed to retrieve case brief',
      });
    }
  }

  /**
   * GET /api/ai/features/health
   * Check AI service health
   */
  static async healthCheck(req: Request, res: Response) {
    try {
      const isHealthy = await aiService.healthCheck();

      res.status(isHealthy ? 200 : 503).json({
        success: isHealthy,
        status: isHealthy ? 'AI service is healthy' : 'AI service is down',
        timestamp: new Date(),
      });
    } catch (error) {
      res.status(503).json({
        success: false,
        status: 'AI service is unavailable',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date(),
      });
    }
  }
}
