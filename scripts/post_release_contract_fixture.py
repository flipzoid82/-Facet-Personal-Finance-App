"""Pure contract fixture for post-release gates, NOT an enforcement runtime.

Authoritative rules are docs/WORKFLOW.md and role contracts. This module models
key preconditions for regression scenarios only; passing it does not attest a
real GitHub ref, owner approval, source provenance, host test or release.
"""
from __future__ import annotations
from dataclasses import dataclass
from enum import Enum


class Action(str, Enum):
    RESEARCH = "POST_RELEASE_RESEARCH_INTAKE"
    ASSESS = "POST_RELEASE_READINESS_ASSESSMENT"
    ROADMAP = "NEXT_ITERATION_DIRECTION_INTAKE"
    PREREQUISITE = "PREREQUISITE_RESOLUTION"


@dataclass(frozen=True)
class State:
    iteration: int
    phase: str = "RELEASE"
    status: str = "RELEASE_COMPLETE"
    active_role: str = "none"
    next_role: str = "none"
    work_package: str = "none"
    handoff: str = "none"
    approval_from: str = "none"
    implementation_authorized: bool = False
    project_lifecycle: str = "ACTIVE"


@dataclass(frozen=True)
class Request:
    action: Action
    explicit_owner_direction: bool = True
    architect_context: bool = True
    release_proof: bool = True
    source_attributed: bool = True
    accepted_roadmap: bool = True
    sensitive_or_executable_action: bool = False
    stage_ready: bool = False
    blocked_gate_documented: bool = False
    proof_work_bounded_and_feasible: bool = False
    consent_for_resource_obligations: bool = True
    canonical_ref_status: str = "absent"


@dataclass(frozen=True)
class Decision:
    permitted: bool
    scope: str
    reason: str


def evaluate(state: State, request: Request) -> Decision:
    """Evaluate static gates only. Never performs writes or approvals."""
    deny = lambda reason: Decision(False, "NONE", reason)
    if state.iteration < 1:
        return deny("numbered release required")
    if (state.phase, state.status, state.active_role, state.next_role,
        state.work_package, state.handoff, state.approval_from) != (
        "RELEASE", "RELEASE_COMPLETE", "none", "none", "none", "none", "none"
    ) or state.implementation_authorized:
        return deny("invalid passive completed-release tuple")
    if state.project_lifecycle != "ACTIVE":
        return deny("project not ACTIVE")
    if not request.architect_context or not request.explicit_owner_direction:
        return deny("role or owner instruction missing")
    if not request.release_proof:
        return deny("release proof missing")
    if request.sensitive_or_executable_action:
        return deny("execution or sensitive activity requires separate gates")
    if request.action in (Action.RESEARCH, Action.ASSESS):
        if not request.source_attributed:
            return deny("unattributed evidence")
        if request.action == Action.ASSESS and not request.accepted_roadmap:
            return deny("roadmap linkage missing")
        return Decision(True, "DOCUMENT_ONLY", "no stage, implementation or state activation")
    if request.action not in (Action.ROADMAP, Action.PREREQUISITE):
        return deny("unknown action")
    if not request.accepted_roadmap or not request.consent_for_resource_obligations:
        return deny("roadmap or owner resource consent missing")
    if request.canonical_ref_status != "absent":
        return deny("exact canonical ref not proven absent; reclassify separately")
    if request.action == Action.ROADMAP:
        if not request.stage_ready:
            return deny("normal milestone dependency not cleared")
    else:
        if not (request.blocked_gate_documented and request.proof_work_bounded_and_feasible):
            return deny("bounded prerequisite proof not established")
    return Decision(True, "PLANNING_ONLY", "canonical successor claims require separate exact Git proof")


def canonical_ref(iteration: int) -> str:
    if iteration < 1:
        raise ValueError("numbered predecessor required")
    return f"refs/heads/continuation/iteration-{iteration + 1:03d}-intake"
