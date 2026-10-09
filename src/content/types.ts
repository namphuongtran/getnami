export type Status = "available" | "in-progress" | "roadmap";

/** v1 is the committed scope (milestones M1 to M5); later is proposed beyond v1. */
export type Horizon = "v1" | "later";

export type MilestoneId = "M1" | "M2" | "M3" | "M4" | "M5" | "later";

export type PhaseId = "01" | "02" | "03" | "04" | "05" | "06" | "07" | "08" | "09";

export type Category =
  | "protocol"
  | "tenancy"
  | "keys"
  | "users"
  | "federation"
  | "admin"
  | "security"
  | "platform"
  | "privacy"
  | "developer";

export interface Feature {
  id: string;
  title: string;
  summary: string;
  category: Category;
  status: Status;
  horizon: Horizon;
  milestone: MilestoneId;
  phase?: PhaseId;
  /** Standards the feature implements, e.g. "RFC 7636". */
  specs?: readonly string[];
  /** Path in the nami repository that proves the feature exists. Required when available. */
  evidence?: string;
  /** Shown on the landing page feature grid. */
  highlight?: boolean;
}
