"""Pure HF-001 v0.3 governance model for adversarial contract tests.

No Git, network, host, owner decision, or actual role transition is performed.
The normative contract is the prospective section of docs/WORKFLOW.md. Booleans
and SHAs passed here are synthetic test inputs, never observed authorization.
"""
from __future__ import annotations

from dataclasses import dataclass
from enum import Enum
from typing import FrozenSet


class Verdict(str, Enum):
    ALLOW = "ALLOW"
    STOP = "STOP"


@dataclass(frozen=True)
class Result:
    verdict: Verdict
    reason: str

    @property
    def allowed(self) -> bool:
        return self.verdict is Verdict.ALLOW


def allow(reason: str) -> Result:
    return Result(Verdict.ALLOW, reason)


def stop(reason: str) -> Result:
    return Result(Verdict.STOP, reason)


@dataclass(frozen=True)
class Control:
    phase: str
    state: str
    active_role: str
    next_role: str
    work_package: str = "none"
    implementation_authorized: bool = False
    approval_from: str = "none"


@dataclass(frozen=True)
class Continuation:
    source: Control
    readiness: str
    accepted_roadmap: bool
    next_stage_cleared: bool
    resource_consent: bool
    owner_refusal_or_pause: bool = False
    new_sensitive_obligation: bool = False
    main_unchanged: bool = True
    canonical_ref_absent: bool = True
    atomic_create_only: bool = True
    release_proof: bool = True


def evaluate_successor(x: Continuation) -> Result:
    if x.source != Control("CONTINUATION", "AWAITING_NEXT_ITERATION_ACTIVATION",
                           "none", "none"):
        return stop("not a passive READY decision D")
    if x.readiness != "READY" or not x.release_proof:
        return stop("readiness or release proof missing")
    if not (x.accepted_roadmap and x.next_stage_cleared and x.resource_consent):
        return stop("roadmap dependency or resource consent uncleared")
    if x.owner_refusal_or_pause or x.new_sensitive_obligation or not x.main_unchanged:
        return stop("owner or source condition changed")
    if not (x.canonical_ref_absent and x.atomic_create_only):
        return stop("single canonical absent-only claim unproved")
    return allow("ledger-only L and separate planning-only S may be prepared")


@dataclass(frozen=True)
class TechnicalStart:
    source_main: str
    required_h1: str
    plan_cycle_004_ready: bool
    owner_scope_approval: bool
    architect_reconciliation: bool
    clerk_state: str
    technical_ref_absent: bool
    atomic_create_only: bool
    separate_builder_release: bool


def evaluate_technical_start(x: TechnicalStart) -> Result:
    if x.source_main != x.required_h1:
        return stop("technical ref must originate at current H1")
    if not (x.plan_cycle_004_ready and x.owner_scope_approval and
            x.architect_reconciliation):
        return stop("independent plan/owner/Architect gate missing")
    if x.clerk_state != "CLERK_IMPLEMENTATION_PREFLIGHT":
        return stop("only existing Clerk implementation preflight may claim")
    if not (x.technical_ref_absent and x.atomic_create_only and
            x.separate_builder_release):
        return stop("atomic absent-only claim or separate Builder release missing")
    return allow("technical Builder state may be activated; no main publication")


@dataclass(frozen=True)
class RoadmapReview:
    source: Control
    readiness: str
    owner_review_direction: bool
    review_key: str
    receipt_e: bool
    passive_d0: bool
    atomic_claim: bool
    main_passive: bool = True
    new_sensitive_obligation: bool = False


def evaluate_roadmap_review(x: RoadmapReview) -> Result:
    if x.source != Control("CONTINUATION", "AWAITING_OWNER_PATH_DECISION",
                           "none", "ARCHITECT"):
        return stop("roadmap review requires passive blocked D")
    if x.readiness not in ("BLOCKED", "ROADMAP_DECISION_REQUIRED"):
        return stop("READY or false-blocked review entry denied")
    if not x.owner_review_direction or not x.review_key or x.new_sensitive_obligation:
        return stop("fresh bounded owner ReviewKey direction missing")
    if not (x.receipt_e and x.passive_d0 and x.atomic_claim and x.main_passive):
        return stop("E/D0/absent-only A0 sequence incomplete")
    return allow("isolated Architect proposal A0; main stays passive")


ROADMAP_ADOPTION_PATH = "docs/PROJECT_ROADMAP.md"
CONTROL_STATE_PATH = ".project/CURRENT_STATE.md"


@dataclass(frozen=True)
class FilteredAdoption:
    source_parent: str
    current_main: str
    changed_paths: FrozenSet[str]
    receipt_path: str
    candidate_blob_matches_owner_approval: bool
    builder_review: bool
    creative_review: bool
    separate_exact_head_consent: bool
    prospective_tree_verified: bool


def evaluate_adoption(x: FilteredAdoption) -> Result:
    if x.source_parent != x.current_main:
        return stop("Z must be rooted at current main H2")
    allowed = frozenset((ROADMAP_ADOPTION_PATH, x.receipt_path))
    if not x.receipt_path.startswith("docs/project-planning/roadmap-revisions/") or \
            not x.receipt_path.endswith("/ADOPTION_APPROVAL_RECEIPT.md"):
        return stop("unapproved receipt path")
    if x.changed_paths != allowed or CONTROL_STATE_PATH in x.changed_paths:
        return stop("review-ref history/control state contaminates adoption")
    if not (x.candidate_blob_matches_owner_approval and x.builder_review and
            x.creative_review and x.separate_exact_head_consent and
            x.prospective_tree_verified):
        return stop("candidate, reviews, consent or tree proof missing")
    return allow("filtered main-rooted adoption candidate only")


class PausePhase(str, Enum):
    ABSENT = "ABSENT"
    CLAIMED_NO_SNAPSHOT = "CLAIMED_NO_SNAPSHOT"
    SNAPSHOT_X_MATCHING = "SNAPSHOT_X_MATCHING"
    APPROVAL_Y_MATCHING = "APPROVAL_Y_MATCHING"
    PAUSED_P_MATCHING = "PAUSED_P_MATCHING"
    PAUSE_PENDING_STALE = "PAUSE_PENDING_STALE"
    CONFLICT_OR_UNVERIFIABLE = "CONFLICT_OR_UNVERIFIABLE"


class PauseRequestStatus(str, Enum):
    NO_REQUEST = "NO_REQUEST"
    SAFETY_STOP = "SAFETY_STOP"
    PAUSE_PENDING = "PAUSE_PENDING"
    OWNER_PAUSED = "OWNER_PAUSED"


def evaluate_pause_request(clear_stop: bool, affirmative_scope_id: bool,
                           snapshot_x: bool, approval_y: bool,
                           state_only_p: bool) -> PauseRequestStatus:
    if not clear_stop:
        return PauseRequestStatus.NO_REQUEST
    if not affirmative_scope_id:
        return PauseRequestStatus.SAFETY_STOP
    if not (snapshot_x and approval_y and state_only_p):
        return PauseRequestStatus.PAUSE_PENDING
    return PauseRequestStatus.OWNER_PAUSED


@dataclass(frozen=True)
class PauseTrace:
    owner_approved_scope_and_id: bool
    pause_ref: str  # absent, H, X, Y or other
    snapshot_x: bool
    approval_y: bool
    target_p: bool
    target_still_h: bool
    main_policy_wip_fresh: bool
    guarded_updates: bool


def classify_pause(x: PauseTrace) -> PausePhase:
    if not x.owner_approved_scope_and_id:
        return PausePhase.CONFLICT_OR_UNVERIFIABLE
    if x.pause_ref == "absent":
        return PausePhase.ABSENT if not (x.snapshot_x or x.approval_y or x.target_p) \
            else PausePhase.CONFLICT_OR_UNVERIFIABLE
    if not x.guarded_updates:
        return PausePhase.CONFLICT_OR_UNVERIFIABLE
    if not x.target_still_h and not x.target_p:
        return PausePhase.PAUSE_PENDING_STALE
    if not x.main_policy_wip_fresh and not x.target_p:
        return PausePhase.PAUSE_PENDING_STALE
    if x.pause_ref == "H" and not (x.snapshot_x or x.approval_y or x.target_p):
        return PausePhase.CLAIMED_NO_SNAPSHOT
    if x.pause_ref == "X" and x.snapshot_x and not (x.approval_y or x.target_p):
        return PausePhase.SNAPSHOT_X_MATCHING
    if x.pause_ref == "Y" and x.snapshot_x and x.approval_y:
        return PausePhase.PAUSED_P_MATCHING if x.target_p else PausePhase.APPROVAL_Y_MATCHING
    return PausePhase.CONFLICT_OR_UNVERIFIABLE


@dataclass(frozen=True)
class Resume:
    explicit_owner_resume: bool
    phase: PausePhase
    target_main_policy_plan_approval_fresh: bool
    pr_builder_audit_and_external_effects_checked: bool
    previous_approval_still_valid: bool


def evaluate_resume(x: Resume) -> Result:
    if not x.explicit_owner_resume or x.phase is not PausePhase.PAUSED_P_MATCHING:
        return stop("fresh owner RESUME and exact X/Y/P required")
    if not (x.target_main_policy_plan_approval_fresh and
            x.pr_builder_audit_and_external_effects_checked and
            x.previous_approval_still_valid):
        return stop("stale approval or material evidence needs review refresh")
    return allow("separate receipt and guarded state-only restoration required")


@dataclass(frozen=True)
class FinalRelease:
    accepted_roadmap_complete: bool
    real_first_use_plaid_proven: bool
    physical_t4_protection_and_restore: bool
    cost_and_resource_consent: bool
    gates_cleared: bool
    distinct_owner_final_approval: bool
    original_uat_and_iteration_release: bool


def evaluate_final_release(x: FinalRelease) -> Result:
    if not all(vars(x).values()):
        return stop("complete-project proof or distinct owner decision missing")
    return allow("separate final ledger and state-only closeout may be prepared")


@dataclass(frozen=True)
class Hf001Publication:
    source_h1: bool
    plan_cycle_004_ready: bool
    architect_audit_pass: bool
    z_before_w: bool
    z_sole_parent_h1: bool
    allowlisted_tree: bool
    technical_state_excluded: bool
    w: Control
    w_and_pr_frozen: bool
    owner_exact_decision: bool
    receipt_on_review_ref_only: bool
    architect_actor: bool
    atomic_expected_h1_and_permission: bool


def evaluate_hf001_publication(x: Hf001Publication) -> Result:
    if not (x.source_h1 and x.plan_cycle_004_ready and x.architect_audit_pass and
            x.z_before_w and x.z_sole_parent_h1 and x.allowlisted_tree and
            x.technical_state_excluded):
        return stop("H1 source, independent review/audit or Z/T proof missing")
    if x.w != Control("GOVERNANCE", "AWAITING_HF001_MERGE_APPROVAL",
                      "none", "ARCHITECT", "HF001-WP01", False, "USER"):
        return stop("invalid passive technical W")
    if not (x.w_and_pr_frozen and x.owner_exact_decision and
            x.receipt_on_review_ref_only and x.architect_actor and
            x.atomic_expected_h1_and_permission):
        return stop("owner, actor, frozen head or live CAS gate missing")
    return allow("one guarded non-PR main update may be attempted")
