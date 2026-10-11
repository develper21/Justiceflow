import { describe, it, expect } from 'vitest';
import {
  getCaseStateBadgeVariant,
  getCaseStateLabel,
  isEditableByPolice,
  canSubmitToCourt,
  canIntakeCase,
  isInCourt,
  isLockedForPolice,
} from './caseState';
import { CaseState } from '../types/api.types';

describe('getCaseStateBadgeVariant', () => {
  it('returns default for FIR_REGISTERED', () => {
    expect(getCaseStateBadgeVariant(CaseState.FIR_REGISTERED)).toBe('default');
  });

  it('returns info for active investigation states', () => {
    expect(getCaseStateBadgeVariant(CaseState.CASE_ASSIGNED)).toBe('info');
    expect(getCaseStateBadgeVariant(CaseState.UNDER_INVESTIGATION)).toBe('info');
  });

  it('returns warning for investigation-completed states', () => {
    expect(getCaseStateBadgeVariant(CaseState.INVESTIGATION_COMPLETED)).toBe('warning');
    expect(getCaseStateBadgeVariant(CaseState.CHARGE_SHEET_PREPARED)).toBe('warning');
    expect(getCaseStateBadgeVariant(CaseState.CLOSURE_REPORT_PREPARED)).toBe('warning');
  });

  it('returns info for court submission states', () => {
    expect(getCaseStateBadgeVariant(CaseState.SUBMITTED_TO_COURT)).toBe('info');
    expect(getCaseStateBadgeVariant(CaseState.RETURNED_FOR_DEFECTS)).toBe('info');
    expect(getCaseStateBadgeVariant(CaseState.RESUBMITTED_TO_COURT)).toBe('info');
  });

  it('returns success for court-accepted states', () => {
    expect(getCaseStateBadgeVariant(CaseState.COURT_ACCEPTED)).toBe('success');
    expect(getCaseStateBadgeVariant(CaseState.TRIAL_ONGOING)).toBe('success');
  });

  it('returns default for unknown state', () => {
    expect(getCaseStateBadgeVariant('SOMETHING_ELSE')).toBe('default');
  });
});

describe('getCaseStateLabel', () => {
  it('replaces underscores with spaces', () => {
    expect(getCaseStateLabel(CaseState.FIR_REGISTERED)).toBe('FIR REGISTERED');
    expect(getCaseStateLabel(CaseState.UNDER_INVESTIGATION)).toBe('UNDER INVESTIGATION');
  });
});

describe('isEditableByPolice', () => {
  it('allows CASE_ASSIGNED and UNDER_INVESTIGATION', () => {
    expect(isEditableByPolice(CaseState.CASE_ASSIGNED)).toBe(true);
    expect(isEditableByPolice(CaseState.UNDER_INVESTIGATION)).toBe(true);
  });

  it('blocks court/terminal states', () => {
    expect(isEditableByPolice(CaseState.SUBMITTED_TO_COURT)).toBe(false);
    expect(isEditableByPolice(CaseState.ARCHIVED)).toBe(false);
    expect(isEditableByPolice(CaseState.FIR_REGISTERED)).toBe(false);
  });
});

describe('canSubmitToCourt', () => {
  it('allows only after investigation is complete', () => {
    expect(canSubmitToCourt(CaseState.INVESTIGATION_COMPLETED)).toBe(true);
    expect(canSubmitToCourt(CaseState.CHARGE_SHEET_PREPARED)).toBe(true);
    expect(canSubmitToCourt(CaseState.CLOSURE_REPORT_PREPARED)).toBe(true);
  });

  it('blocks early investigation states', () => {
    expect(canSubmitToCourt(CaseState.UNDER_INVESTIGATION)).toBe(false);
    expect(canSubmitToCourt(CaseState.COURT_ACCEPTED)).toBe(false);
  });
});

describe('canIntakeCase', () => {
  it('allows only submitted states', () => {
    expect(canIntakeCase(CaseState.SUBMITTED_TO_COURT)).toBe(true);
    expect(canIntakeCase(CaseState.RESUBMITTED_TO_COURT)).toBe(true);
    expect(canIntakeCase(CaseState.COURT_ACCEPTED)).toBe(false);
  });
});

describe('isInCourt', () => {
  it('identifies states held by the court', () => {
    expect(isInCourt(CaseState.COURT_ACCEPTED)).toBe(true);
    expect(isInCourt(CaseState.TRIAL_ONGOING)).toBe(true);
    expect(isInCourt(CaseState.JUDGMENT_RESERVED)).toBe(true);
    expect(isInCourt(CaseState.UNDER_INVESTIGATION)).toBe(false);
  });
});

describe('isLockedForPolice', () => {
  it('locks all post-submission states', () => {
    [
      CaseState.SUBMITTED_TO_COURT,
      CaseState.RESUBMITTED_TO_COURT,
      CaseState.COURT_ACCEPTED,
      CaseState.TRIAL_ONGOING,
      CaseState.JUDGMENT_RESERVED,
      CaseState.DISPOSED,
      CaseState.APPEALED,
      CaseState.ARCHIVED,
    ].forEach((state) => {
      expect(isLockedForPolice(state)).toBe(true);
    });
  });

  it('does not lock early investigation states', () => {
    expect(isLockedForPolice(CaseState.UNDER_INVESTIGATION)).toBe(false);
    expect(isLockedForPolice(CaseState.CASE_ASSIGNED)).toBe(false);
  });
});
