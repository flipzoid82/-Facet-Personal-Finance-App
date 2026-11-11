"""Regression checks for contract text and a pure model, not live GitHub transitions.

Run from repo root: python -m unittest discover -s tests -v
"""
from pathlib import Path
import sys
import unittest
from dataclasses import replace

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))
from post_release_contract_fixture import Action, Request, State, canonical_ref, evaluate  # noqa:E402


class PostReleaseContinuityTests(unittest.TestCase):
    def test_research_is_repeatable_after_any_numbered_release(self):
        for n in (1, 2, 3, 10, 23):
            with self.subTest(iteration=n):
                state = State(iteration=n)
                result = evaluate(state, Request(Action.RESEARCH))
                self.assertEqual((result.permitted, result.scope), (True, "DOCUMENT_ONLY"))
                self.assertEqual(state, State(iteration=n))  # evaluation does not mutate release
                self.assertEqual(canonical_ref(n), f"refs/heads/continuation/iteration-{n + 1:03d}-intake")

    def test_blocked_stage_does_not_block_archival_or_assessment(self):
        state = State(iteration=2)
        self.assertTrue(evaluate(state, Request(Action.RESEARCH, stage_ready=False)).permitted)
        self.assertTrue(evaluate(state, Request(Action.ASSESS, stage_ready=False)).permitted)
        self.assertFalse(evaluate(state, Request(Action.ROADMAP, stage_ready=False)).permitted)

    def test_prerequisite_proof_is_planning_only_and_uses_canonical_ref(self):
        req = Request(Action.PREREQUISITE, stage_ready=False,
                      blocked_gate_documented=True, proof_work_bounded_and_feasible=True)
        for n in (1, 2, 10):
            result = evaluate(State(n), req)
            self.assertEqual((result.permitted, result.scope), (True, "PLANNING_ONLY"))

    def test_prerequisite_does_not_waive_its_own_feasibility(self):
        req = Request(Action.PREREQUISITE, blocked_gate_documented=True)
        self.assertFalse(evaluate(State(10), req).permitted)
        self.assertFalse(evaluate(State(10), replace(req, blocked_gate_documented=False,
                                                    proof_work_bounded_and_feasible=True)).permitted)

    def test_normal_successor_is_ready_only(self):
        self.assertFalse(evaluate(State(10), Request(Action.ROADMAP)).permitted)
        result = evaluate(State(10), Request(Action.ROADMAP, stage_ready=True))
        self.assertEqual(result.scope, "PLANNING_ONLY")

    def test_owner_role_and_proof_required(self):
        for attr in ("explicit_owner_direction", "architect_context", "release_proof"):
            with self.subTest(attr=attr):
                self.assertFalse(evaluate(State(3), replace(Request(Action.RESEARCH), **{attr: False})).permitted)

    def test_consequential_actions_not_disguised_as_research(self):
        for action in Action:
            with self.subTest(action=action):
                req = Request(action, sensitive_or_executable_action=True,
                              stage_ready=True, blocked_gate_documented=True,
                              proof_work_bounded_and_feasible=True)
                self.assertFalse(evaluate(State(3), req).permitted)

    def test_invalid_passive_tuple_and_completed_project_fail_closed(self):
        baseline = State(2)
        for changed in (
            replace(baseline, active_role="ARCHITECT"),
            replace(baseline, next_role="ARCHITECT"),
            replace(baseline, handoff="docs/placeholder.md"),
            replace(baseline, project_lifecycle="COMPLETE"),
            replace(baseline, implementation_authorized=True),
            replace(baseline, status="AWAITING_DIRECTION"),
        ):
            with self.subTest(state=changed):
                self.assertFalse(evaluate(changed, Request(Action.RESEARCH)).permitted)

    def test_canonical_ref_conflict_requires_reclassification(self):
        for status in ("matching_ledger", "matching_active", "conflict", "unverifiable"):
            with self.subTest(status=status):
                req = Request(Action.PREREQUISITE, blocked_gate_documented=True,
                              proof_work_bounded_and_feasible=True,
                              canonical_ref_status=status)
                self.assertFalse(evaluate(State(10), req).permitted)

    def test_missing_attribution_and_roadmap_fail_closed(self):
        self.assertFalse(evaluate(State(2), Request(Action.RESEARCH, source_attributed=False)).permitted)
        self.assertFalse(evaluate(State(2), Request(Action.ASSESS, accepted_roadmap=False)).permitted)
        self.assertFalse(evaluate(State(2), Request(Action.PREREQUISITE,
                blocked_gate_documented=True, proof_work_bounded_and_feasible=True,
                consent_for_resource_obligations=False)).permitted)

    def test_workflow_and_roles_share_same_generic_contract(self):
        workflow = (ROOT / "docs/WORKFLOW.md").read_text(encoding="utf-8")
        for token in (
            "POST_RELEASE_RESEARCH_INTAKE", "POST_RELEASE_READINESS_ASSESSMENT",
            "PREREQUISITE_RESOLUTION", "ANY numbered iteration N",
            "PREREQUISITE_RESOLUTION — bounded successor planning",
            "original UAT/approval/audit/closeout", "exclusive-create",
            "ProjectLifecycle is COMPLETE", "MALFORMED",
        ):
            with self.subTest(token=token):
                self.assertIn(token, workflow)
        for name in ("ARCHITECT", "BUILDER", "CREATIVE", "CLERK"):
            role = (ROOT / f"chatgpt/roles/{name}.md").read_text(encoding="utf-8")
            self.assertIn("POST_RELEASE_RESEARCH_INTAKE", role)
            self.assertIn("POST_RELEASE_READINESS_ASSESSMENT", role)
            self.assertIn("PREREQUISITE_RESOLUTION", role)
        # Historical release behavior is tested from an explicit typed legacy
        # fixture. The active checkout may be a governance or implementation ref.
        legacy_i003 = State(iteration=3)
        self.assertEqual((legacy_i003.phase, legacy_i003.status),
                         ("RELEASE", "RELEASE_COMPLETE"))
        self.assertTrue(evaluate(legacy_i003, Request(Action.RESEARCH)).permitted)
        self.assertFalse(evaluate(legacy_i003, Request(Action.ROADMAP)).permitted)

if __name__ == "__main__":
    unittest.main()
