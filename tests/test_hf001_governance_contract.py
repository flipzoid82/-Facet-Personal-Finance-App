"""HF-001 v0.3 pure negative cases; no remote or physical proof is claimed."""
from dataclasses import replace
from pathlib import Path
import sys
import unittest

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))
from hf001_governance_contract_fixture import (  # noqa: E402
    Control, Continuation, FilteredAdoption, FinalRelease, Hf001Publication,
    PausePhase, PauseRequestStatus, PauseTrace, Resume, RoadmapReview,
    TechnicalStart, classify_pause, evaluate_pause_request, evaluate_technical_start,
    evaluate_adoption, evaluate_final_release, evaluate_hf001_publication,
    evaluate_resume, evaluate_roadmap_review, evaluate_successor,
)


class Hf001ContractTests(unittest.TestCase):
    def successor(self):
        return Continuation(Control("CONTINUATION", "AWAITING_NEXT_ITERATION_ACTIVATION",
                                    "none", "none"), "READY", True, True, True)

    def roadmap(self):
        return RoadmapReview(Control("CONTINUATION", "AWAITING_OWNER_PATH_DECISION",
                                     "none", "ARCHITECT"), "BLOCKED", True, "R001",
                             True, True, True)

    def adoption(self):
        receipt = "docs/project-planning/roadmap-revisions/R001/ADOPTION_APPROVAL_RECEIPT.md"
        return FilteredAdoption("H2", "H2", frozenset(("docs/PROJECT_ROADMAP.md", receipt)),
                                receipt, True, True, True, True, True)

    def pause(self):
        return PauseTrace(True, "H", False, False, False, True, True, True)

    def publication(self):
        return Hf001Publication(
            True, True, True, True, True, True, True,
            Control("GOVERNANCE", "AWAITING_HF001_MERGE_APPROVAL", "none",
                    "ARCHITECT", "HF001-WP01", False, "USER"),
            True, True, True, True, True)

    def test_hf01_hf02_ready_successor_is_planning_only(self):
        self.assertTrue(evaluate_successor(self.successor()).allowed)
        for change in (
            {"source": Control("RELEASE", "RELEASE_COMPLETE", "none", "none")},
            {"source": Control("CONTINUATION", "AWAITING_NEXT_ITERATION_ACTIVATION",
                               "ARCHITECT", "none")},
            {"readiness": "BLOCKED"}, {"next_stage_cleared": False},
            {"resource_consent": False}, {"owner_refusal_or_pause": True},
            {"new_sensitive_obligation": True}, {"main_unchanged": False},
            {"canonical_ref_absent": False}, {"atomic_create_only": False},
        ):
            with self.subTest(change=change):
                self.assertFalse(evaluate_successor(replace(self.successor(), **change)).allowed)

    def test_p01_technical_start_requires_h1_and_existing_clerk_state(self):
        h1 = "6fde9a620f222aded127d155de8be2042205f087"
        good = TechnicalStart(h1, h1, True, True, True,
                              "CLERK_IMPLEMENTATION_PREFLIGHT", True, True, True)
        self.assertTrue(evaluate_technical_start(good).allowed)
        for change in ({"source_main": "99284c6c5820dc5cc82dd585aaa2ef4889b8d2b8"},
                       {"source_main": "758f0a97adaa15cda37ba08a1958d5896e9699cd"},
                       {"plan_cycle_004_ready": False}, {"owner_scope_approval": False},
                       {"architect_reconciliation": False},
                       {"clerk_state": "CLERK_PUBLICATION_PREFLIGHT"},
                       {"technical_ref_absent": False}, {"atomic_create_only": False},
                       {"separate_builder_release": False}):
            with self.subTest(change=change):
                self.assertFalse(evaluate_technical_start(replace(good, **change)).allowed)

    def test_hf03_hf04_c02_01_roadmap_requires_passive_blocked_d_and_owner(self):
        self.assertTrue(evaluate_roadmap_review(self.roadmap()).allowed)
        for change in (
            {"source": Control("CONTINUATION", "ARCHITECT_NEXT_ITERATION_PREP",
                               "ARCHITECT", "none")},
            {"source": Control("CONTINUATION", "AWAITING_OWNER_PATH_DECISION",
                               "none", "none")},
            {"readiness": "READY"}, {"owner_review_direction": False},
            {"review_key": ""}, {"receipt_e": False}, {"passive_d0": False},
            {"atomic_claim": False}, {"main_passive": False},
            {"new_sensitive_obligation": True},
        ):
            with self.subTest(change=change):
                self.assertFalse(evaluate_roadmap_review(replace(self.roadmap(), **change)).allowed)

    def test_c02_02_reject_full_review_ref_merge_before_publication(self):
        self.assertTrue(evaluate_adoption(self.adoption()).allowed)
        contaminated = replace(self.adoption(), changed_paths=self.adoption().changed_paths |
                               frozenset((".project/CURRENT_STATE.md",)))
        self.assertFalse(evaluate_adoption(contaminated).allowed)
        self.assertFalse(evaluate_adoption(replace(self.adoption(), source_parent="review-head")).allowed)
        self.assertFalse(evaluate_adoption(replace(self.adoption(), creative_review=False)).allowed)
        self.assertFalse(evaluate_adoption(replace(self.adoption(), separate_exact_head_consent=False)).allowed)

    def test_hf06_hf07_hf10_hf11_p1a_is_not_snapshot_or_pause(self):
        p1a = self.pause()
        self.assertEqual(classify_pause(p1a), PausePhase.CLAIMED_NO_SNAPSHOT)
        self.assertEqual(classify_pause(replace(p1a, main_policy_wip_fresh=False)),
                         PausePhase.PAUSE_PENDING_STALE)
        self.assertEqual(classify_pause(replace(p1a, target_still_h=False)),
                         PausePhase.PAUSE_PENDING_STALE)
        self.assertEqual(classify_pause(replace(p1a, owner_approved_scope_and_id=False)),
                         PausePhase.CONFLICT_OR_UNVERIFIABLE)
        self.assertEqual(classify_pause(replace(p1a, guarded_updates=False)),
                         PausePhase.CONFLICT_OR_UNVERIFIABLE)

    def test_c01_plain_language_stop_is_not_durable_pause_consent(self):
        self.assertEqual(evaluate_pause_request(False, False, False, False, False),
                         PauseRequestStatus.NO_REQUEST)
        self.assertEqual(evaluate_pause_request(True, False, False, False, False),
                         PauseRequestStatus.SAFETY_STOP)
        self.assertEqual(evaluate_pause_request(True, True, False, False, False),
                         PauseRequestStatus.PAUSE_PENDING)
        self.assertEqual(evaluate_pause_request(True, True, True, True, False),
                         PauseRequestStatus.PAUSE_PENDING)
        self.assertEqual(evaluate_pause_request(True, True, True, True, True),
                         PauseRequestStatus.OWNER_PAUSED)

    def test_hf10_x_y_p_interruption_does_not_fake_owner_paused(self):
        p1a = self.pause()
        x = replace(p1a, pause_ref="X", snapshot_x=True)
        y = replace(x, pause_ref="Y", approval_y=True)
        p = replace(y, target_p=True, target_still_h=False)
        self.assertEqual(classify_pause(x), PausePhase.SNAPSHOT_X_MATCHING)
        self.assertEqual(classify_pause(y), PausePhase.APPROVAL_Y_MATCHING)
        self.assertEqual(classify_pause(p), PausePhase.PAUSED_P_MATCHING)
        self.assertEqual(classify_pause(replace(y, snapshot_x=False)),
                         PausePhase.CONFLICT_OR_UNVERIFIABLE)

    def test_hf08_hf09_resume_needs_new_owner_and_fresh_approval(self):
        good = Resume(True, PausePhase.PAUSED_P_MATCHING, True, True, True)
        self.assertTrue(evaluate_resume(good).allowed)
        for change in ({"explicit_owner_resume": False},
                       {"phase": PausePhase.APPROVAL_Y_MATCHING},
                       {"target_main_policy_plan_approval_fresh": False},
                       {"pr_builder_audit_and_external_effects_checked": False},
                       {"previous_approval_still_valid": False}):
            with self.subTest(change=change):
                self.assertFalse(evaluate_resume(replace(good, **change)).allowed)

    def test_hf05_hf12_hf13_final_release_needs_t4_and_distinct_owner_approval(self):
        good = FinalRelease(True, True, True, True, True, True, True)
        self.assertTrue(evaluate_final_release(good).allowed)
        for field in vars(good):
            with self.subTest(field=field):
                self.assertFalse(evaluate_final_release(replace(good, **{field: False})).allowed)

    def test_p01_p02_hf14_hf15_publication_is_one_use_and_actor_bound(self):
        good = self.publication()
        self.assertTrue(evaluate_hf001_publication(good).allowed)
        for field in ("source_h1", "plan_cycle_004_ready", "architect_audit_pass",
                      "z_before_w", "z_sole_parent_h1", "allowlisted_tree",
                      "technical_state_excluded", "w_and_pr_frozen", "owner_exact_decision",
                      "receipt_on_review_ref_only", "architect_actor",
                      "atomic_expected_h1_and_permission"):
            with self.subTest(field=field):
                self.assertFalse(evaluate_hf001_publication(replace(good, **{field: False})).allowed)

    def test_p02_01_wrong_wait_tuple_and_clerk_q_rejected(self):
        good = self.publication()
        for w in (replace(good.w, next_role="none"),
                  replace(good.w, active_role="ARCHITECT"),
                  replace(good.w, approval_from="none"),
                  replace(good.w, state="CLERK_IMPLEMENTATION_PREFLIGHT")):
            with self.subTest(w=w):
                self.assertFalse(evaluate_hf001_publication(replace(good, w=w)).allowed)

    def test_effective_hf001_authority_and_role_limits_remain_in_candidate(self):
        workflow = (ROOT / "docs/WORKFLOW.md").read_text(encoding="utf-8")
        for token in ("HF001_OWNER_APPROVED_CONTINUATION_v0_1",
                      "HF001_OWNER_FILTERED_PUBLICATION_v0_2",
                      "HF001_OWNER_PUBLICATION_DECISION_INTAKE",
                      "HF001_FILTERED_PUBLICATION", "expected_sha=H1",
                      "ITERATION_COMPLETE", "CLAIMED_NO_SNAPSHOT",
                      "ROADMAP_REVISION_DIRECTION_INTAKE",
                      "CLOSE_PROJECT_INCOMPLETE"):
            with self.subTest(token=token):
                self.assertIn(token, workflow)
        for role in ("ARCHITECT", "BUILDER", "CLERK", "CREATIVE"):
            self.assertIn("HF-001 v0.3 prospective", (ROOT / f"chatgpt/roles/{role}.md")
                          .read_text(encoding="utf-8"))


if __name__ == "__main__":
    unittest.main()
