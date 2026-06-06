# Evolution-Engine.md

Version: 0.1

Status: Architecture Foundation

Priority: Defining

---

# Purpose

This document defines the Damascus Evolution Engine.

The Evolution Engine is the defining subsystem of Damascus.

Most systems execute tasks.

Damascus improves how tasks are executed.

The Evolution Engine transforms observations, failures, benchmark evidence, and research into controlled, measurable, reversible improvements.

It does not perform unrestricted self-modification.

It does not directly rewrite production source code.

It does not modify security policies or grant permissions.

It evolves versioned operational artifacts through experimentation, evaluation, promotion, and rollback.

Core loop:

Observe
↓
Evaluate
↓
Generate Variant
↓
Benchmark
↓
Compare
↓
Promote
↓
Monitor
↓
Retain Or Roll Back

---

# Design Philosophy

## Improvement Requires Behavior Change

Storing memories is not improvement.

Collecting traces is not improvement.

Generating alternatives is not improvement.

Improvement occurs only when a measured, superior behavior is safely adopted and continues to perform in practice.

## Evidence Before Promotion

No candidate is promoted because it appears better.

Promotion requires relevant, reproducible evidence.

## Controlled Branch Model

Evolution occurs through versioned branches:

Production Baseline
↓
Candidate Variants
↓
Isolated Experiments
↓
Benchmark Comparison
↓
Promotion Proposal
↓
Approval Gates
↓
Controlled Activation

## Reversibility

Every promoted change must have:

* previous stable version
* activation record
* monitoring plan
* rollback criteria
* rollback mechanism

## Workflow Primacy

Workflows are the primary evolution unit.

Agents, teams, models, tools, prompts, and strategies are components or policies within workflow behavior.

## Human Authority

The Evolution Engine may discover and recommend improvements.

Human authority and workspace policy determine what may enter production.

## Safety Is Non-Optimizable

Security baselines, permissions, approval gates, audit requirements, and human authority are immutable constraints from the perspective of evolution.

---

# Responsibilities

The Evolution Engine owns:

* improvement opportunity analysis
* evolution target selection
* experiment definitions
* variant generation coordination
* Evolution Arena coordination
* evaluation and comparison
* promotion proposals
* rollback coordination
* experiment tracking
* workflow lineage
* regression detection
* evolution telemetry
* interaction with Evolution Memory

It coordinates with:

* Core for scheduling and workflow execution
* Workflow Registry for versions and activation
* Benchmark Registry for benchmark definitions and results
* Memory Layer for Evolution Memory
* Observability Layer for traces and production metrics
* Security Layer for safety constraints and approvals
* Workspace System for ownership and governance
* Agent Layer for team and agent variants
* Tool Layer for tool-selection variants
* Model Layer for routing variants
* Research Layer for candidate techniques

---

# Non-Responsibilities

The Evolution Engine does not own:

* production workflow execution
* security policy
* permission grants
* benchmark definition ownership
* model inference
* tool execution
* agent execution
* source-code deployment
* user approval decisions
* memory storage implementation

It proposes promotion.

It does not bypass promotion authority.

---

# Evolution Principles

## EVO-001 Measured Improvement

Every improvement claim references evidence.

## EVO-002 Reproducibility

Experiments record enough context to reproduce or explain limitations.

## EVO-003 Reversibility

Production activation requires a rollback path.

## EVO-004 Explainability

Promotion proposals state what changed, why, evidence, tradeoffs, and risks.

## EVO-005 Isolation

Candidates execute in the Evolution Arena, not unrestricted production.

## EVO-006 Baseline Comparison

Candidates are evaluated against relevant baselines.

## EVO-007 Multi-Metric Evaluation

One improved metric cannot silently hide regressions elsewhere.

## EVO-008 Safety Constraints

Evolution cannot weaken immutable safety constraints.

## EVO-009 Historical Preservation

Failed, rejected, and rolled-back experiments remain Evolution Memory.

## EVO-010 Workflow-Centric Evolution

Component improvements matter only through their effect on workflows and user capability.

---

# High-Level Architecture

Production Execution And Research
↓
Observation Ingestion
↓
Opportunity Analyzer
↓
Experiment Planner
↓
Variant Generator
↓
Evolution Arena
├── Benchmark Engine
├── Evaluation Engine
├── Safety Validator
└── Resource Controller
↓
Comparison And Regression Detection
↓
Promotion Engine
↓
Approval Gates
↓
Controlled Activation
↓
Production Monitoring
↓
Retain Or Rollback Engine
↓
Evolution Memory And Lineage

---

# Core Components

Evolution Engine
├── Observation Ingestion Service
├── Opportunity Analyzer
├── Experiment Planner
├── Variant Generator
├── Evolution Arena
├── Benchmark Engine
├── Evaluation Engine
├── Regression Detector
├── Promotion Engine
├── Rollback Engine
├── Lineage Service
├── Experiment Tracker
├── Safety Constraint Validator
└── Evolution Telemetry Service

## Observation Ingestion Service

Collects eligible evidence from:

* workflow traces
* failures
* benchmark results
* user feedback
* tool telemetry
* model routing telemetry
* agent and team performance
* research findings
* prior evolution experiments

Raw production telemetry is not automatically a valid optimization objective.

## Opportunity Analyzer

Identifies candidate weaknesses and improvement opportunities.

Examples:

* repeated workflow failure
* high latency
* excessive cost
* redundant agent role
* weak tool reliability
* poor model routing
* recurring human correction

## Experiment Planner

Defines:

* target
* hypothesis
* baseline
* variants
* benchmark suite
* metrics
* safety constraints
* resource budget
* approval requirements
* termination criteria

## Safety Constraint Validator

Rejects variants and plans that violate immutable constraints before execution or promotion.

---

# Evolution Targets

## Workflows

Possible changes:

* node structure
* branching
* ordering
* parallelism
* retries
* checkpoints
* approval placement
* context strategy

Workflow variants remain runtime-independent definitions.

## Teams

Possible changes:

* roles
* agent profiles
* team size
* communication topology
* reviewer placement
* evaluator independence

More agents require measurable justification.

## Tool Selection

Possible changes:

* structured tool preference
* tool selection policy
* fallback selection
* retry strategy
* timeout

Tool permissions and minimum isolation cannot be weakened.

## Strategies

Possible changes:

* planning methods
* retrieval strategies
* decomposition
* critique loops
* verification strategies
* recovery strategies

## Model Routing

Possible changes:

* routing weights
* capability thresholds
* escalation policy
* fallback class
* multi-model structure

Data-egress permissions and provider authorization remain fixed constraints.

---

# Evolution Arena

## Purpose

The Evolution Arena is the controlled environment in which candidates are tested.

It separates experimentation from production behavior.

## Arena Requirements

* isolated execution
* fixed or recorded dependencies
* explicit resource budgets
* benchmark-controlled inputs
* immutable safety constraints
* complete telemetry
* no unauthorized production side effects
* reproducible configuration

## Arena Modes

### Replay Arena

Replays historical or synthetic tasks.

### Shadow Arena

Evaluates candidates against production-like inputs without allowing production effects.

### Simulation Arena

Uses simulated tools or environments.

### Controlled Live Arena

Allows narrow, approved real-world execution with enhanced monitoring.

## Arena Boundary

Arena credentials, resources, memory, and tools are separate from production by default.

Production secrets and unrestricted workspace resources are not inherited.

## Contamination Prevention

Benchmark inputs, expected results, and evaluator internals must be protected from candidates when disclosure would invalidate evaluation.

---

# Variant Generator

## Purpose

The Variant Generator creates candidate alternatives under explicit constraints.

## Variant Sources

* deterministic mutation rules
* prior successful procedures
* research-derived techniques
* model-generated proposals
* human proposals
* recombination of proven components
* failure-driven repair

## Variant Contract

```text
Variant
  variant_id
  experiment_id
  target_type
  baseline_version_id
  parent_variant_ids
  change_set
  hypothesis
  expected_benefits
  known_risks
  required_capabilities
  safety_validation_state
  lifecycle_state
```

## Generation Constraints

Variants may not:

* modify security policy
* grant permissions
* remove mandatory approvals
* change audit requirements
* deploy production source code
* access unauthorized data

## Diversity

Variant diversity helps avoid local optima.

It must remain bounded by resource budgets and hypothesis relevance.

Generating many arbitrary variants is not useful evolution.

---

# Benchmark Engine

## Purpose

The Benchmark Engine coordinates execution of benchmark suites against baselines and candidates.

The Benchmark Registry remains authoritative for benchmark definitions and stored results.

## Benchmark Definition

```text
BenchmarkDefinition
  benchmark_id
  benchmark_version
  purpose
  target_types
  dataset_reference
  metrics
  scoring_rules
  environment_requirements
  safety_requirements
  validity_period
```

## Benchmark Run

```text
BenchmarkRun
  benchmark_run_id
  experiment_id
  target_version_id
  benchmark_version
  environment_snapshot
  capability_snapshot
  started_at
  completed_at
  metrics
  artifacts
  validity_state
```

## Benchmark Categories

* quality
* correctness
* reliability
* safety
* policy compliance
* latency
* cost
* resource usage
* recovery
* user preference

## Reproducibility

Runs should record:

* workflow version
* agent profiles
* model profiles or routing policy
* tool versions
* memory snapshot or policy
* environment
* seeds where applicable
* dataset version

## Benchmark Integrity

Candidates must not:

* alter benchmark definitions
* inspect hidden expected outputs
* tamper with evaluator results
* write to authoritative benchmark storage

---

# Evaluation Engine

## Purpose

The Evaluation Engine interprets benchmark results and determines whether evidence supports improvement.

## Evaluation Inputs

* candidate results
* baseline results
* metric definitions
* confidence thresholds
* regression limits
* resource costs
* safety outcomes
* scope applicability

## Evaluation Methods

* deterministic scoring
* statistical comparison
* human evaluation
* model-assisted evaluation
* pairwise comparison
* adversarial evaluation

Model-assisted evaluation cannot be the sole authority for critical promotion.

## Evaluation Output

```text
EvaluationReport
  evaluation_id
  experiment_id
  baseline_id
  candidate_id
  metric_comparisons
  confidence
  regressions
  safety_findings
  limitations
  recommendation
```

Recommendations:

* Promote
* PromoteWithConditions
* ContinueExperiment
* Reject
* Inconclusive

---

# Promotion Engine

## Purpose

The Promotion Engine converts validated candidates into controlled production activation proposals and coordinates approved activation.

## Promotion Criteria

Promotion requires:

* valid candidate lifecycle state
* relevant benchmark evidence
* baseline comparison
* no blocking safety failure
* acceptable regression profile
* reproducibility threshold
* compatibility validation
* rollback plan
* required approvals

## Promotion Proposal

```text
PromotionProposal
  promotion_id
  target_type
  baseline_version_id
  candidate_version_id
  evidence_references
  expected_benefits
  regressions
  scope
  activation_plan
  monitoring_plan
  rollback_plan
  required_approvals
  lifecycle_state
```

## Promotion Modes

* Manual Activation
* Scheduled Activation
* Canary Activation
* Percentage Rollout
* Workspace-Limited Activation
* Project-Limited Activation

## Activation

Promotion creates a new active version or policy reference.

It does not overwrite historical versions.

---

# Rollback Engine

## Purpose

The Rollback Engine restores a prior stable operational version after failed activation or detected regression.

## Rollback Triggers

* blocking safety event
* regression threshold exceeded
* user rejection
* operational failure
* unexpected cost or latency
* incompatibility
* incident response

## Rollback Plan

Each promotion defines:

* prior stable version
* rollback eligibility
* state compatibility
* active execution handling
* memory and artifact handling
* verification steps

## Rollback Limits

Rollback cannot always undo external effects created by workflows.

It restores future behavior and coordinates compensating actions where possible.

## Rollback Record

Rollback is stored in Evolution Memory with cause, evidence, and outcome.

---

# Regression Detection

## Regression Classes

* quality regression
* safety regression
* policy-compliance regression
* latency regression
* cost regression
* reliability regression
* domain-specific regression
* scope-specific regression

## Detection Sources

* benchmark comparison
* canary telemetry
* production telemetry
* user feedback
* incident reports
* drift analysis

## Detection Windows

Regressions may be:

* immediate
* short-term
* long-term
* rare-event

Promotion monitoring must define relevant windows.

## Blocking Regressions

Safety, permission, audit, or data-exposure regressions are blocking regardless of aggregate quality gains.

---

# Safety Constraints

Immutable constraints from the Evolution Engine perspective:

* no security policy modification
* no permission expansion
* no removal of mandatory approvals
* no audit weakening
* no reduced required isolation
* no unauthorized data access
* no direct production source-code self-modification
* no hidden production deployment
* no deletion of failed experiment history
* no benchmark tampering

Candidates violating constraints are rejected before Arena execution where detectable.

Runtime safety enforcement still applies during experiments.

---

# Approval Gates

Approval gates are defined by target, scope, risk, and policy.

## Gate Types

* Experiment Approval
* Controlled Live Test Approval
* Promotion Approval
* Expanded Rollout Approval
* Rollback Approval
* Emergency Rollback Authority

## Gate Inputs

Approvers receive:

* change summary
* evidence
* benchmark limitations
* regressions
* safety findings
* cost impact
* activation scope
* rollback plan

## Automatic Promotion

Automatic promotion may be permitted only for narrowly scoped, low-risk targets under explicit policy.

Security-related changes are never automatically promoted by Evolution.

---

# Variant Lifecycle

## States

* Proposed
* Validating
* RejectedBySafety
* ReadyForExperiment
* Experimenting
* Evaluating
* Qualified
* Rejected
* PromotionProposed
* Approved
* Activating
* ActiveCanary
* Active
* RolledBack
* Retired
* Inconclusive

## State Machine

Proposed
↓
Validating
├── RejectedBySafety
└── ReadyForExperiment
    ↓
    Experimenting
    ↓
    Evaluating
    ├── Rejected
    ├── Inconclusive
    └── Qualified
        ↓
        PromotionProposed
        ├── Rejected
        └── Approved
            ↓
            Activating
            ↓
            ActiveCanary
            ├── RolledBack
            └── Active
                ├── RolledBack
                └── Retired

Transitions are versioned and auditable.

---

# Experiment Lifecycle

## States

* Draft
* AwaitingApproval
* Scheduled
* Running
* Paused
* Evaluating
* Completed
* Failed
* Cancelled
* Archived

## State Machine

Draft
↓
AwaitingApproval
├── Cancelled
└── Scheduled
    ↓
    Running
    ├── Paused
    ├── Failed
    ├── Cancelled
    └── Evaluating
        ├── Failed
        └── Completed
            ↓
            Archived

Core manages workflow execution states.

Evolution Engine manages experiment-domain states and maps them to Core executions.

---

# Promotion Lifecycle

## States

* Draft
* AwaitingApproval
* Approved
* Rejected
* Scheduled
* Activating
* Canary
* Active
* Failed
* RollingBack
* RolledBack
* Retired

## State Machine

Draft
↓
AwaitingApproval
├── Rejected
└── Approved
    ↓
    Scheduled
    ↓
    Activating
    ├── Failed
    └── Canary
        ├── RollingBack → RolledBack
        └── Active
            ├── RollingBack → RolledBack
            └── Retired

---

# Detailed Data Flows

## Flow 1: Production Observation To Experiment

Workflow Executions
↓
Observability Produces Metrics And Traces
↓
Memory Layer Produces Eligible Episodes
↓
Observation Ingestion Filters Scope And Quality
↓
Opportunity Analyzer Detects Repeated Weakness
↓
Experiment Planner Defines Hypothesis And Baseline
↓
Security Validates Experiment Policy
↓
Experiment Created

## Flow 2: Variant Generation

Experiment Plan
↓
Load Baseline And Constraints
↓
Retrieve Relevant Evolution And Procedural Memory
↓
Generate Bounded Variants
↓
Validate Schemas And Compatibility
↓
Safety Constraint Validation
↓
Register Qualified Candidates

## Flow 3: Arena Execution

Qualified Candidate
↓
Resolve Benchmark Suite
↓
Provision Isolated Arena
↓
Pin Or Record Models, Tools, Agents, Memory, Environment
↓
Core Executes Benchmark Workflows
↓
Capture Results And Effects
↓
Validate Benchmark Integrity
↓
Store Benchmark Results

## Flow 4: Evaluation And Comparison

Candidate Results
+
Baseline Results
↓
Metric Validation
↓
Statistical And Domain Comparison
↓
Regression Detection
↓
Safety Review
↓
Evaluation Report
↓
Qualified, Rejected, Or Inconclusive

## Flow 5: Promotion

Qualified Candidate
↓
Build Promotion Proposal
↓
Validate Compatibility And Rollback
↓
Resolve Approval Gates
↓
Human Or Policy Approval
↓
Register New Version
↓
Activate Canary
↓
Monitor
↓
Expand Activation Or Roll Back

## Flow 6: Rollback

Regression Or Incident Detected
↓
Freeze Rollout
↓
Resolve Prior Stable Version
↓
Pause Or Route New Executions
↓
Activate Prior Version
↓
Handle In-Flight Executions
↓
Verify Recovery
↓
Record Rollback And Evidence
↓
Retire Or Reopen Candidate

## Flow 7: Research-Derived Evolution

Research Finding
↓
Technique Extraction
↓
Applicability Review
↓
Variant Proposal
↓
Safety Validation
↓
Arena Benchmark
↓
Evaluation
↓
Promotion Proposal Or Rejection

Research findings never enter production directly.

---

# Evolution Memory

Evolution Memory is the durable historical record of improvement activity.

It stores:

* opportunities
* hypotheses
* experiments
* variants
* benchmark references
* evaluation reports
* promotions
* rollbacks
* rejections
* human rationale
* lineage

The Memory Layer owns storage and lifecycle.

The Evolution Engine owns creation and interpretation of evolution-domain records.

Evolution Memory is append-oriented and preserves failed experiments.

---

# Experiment Tracking

## Experiment Record

```text
Experiment
  experiment_id
  workspace_id
  project_id | null
  target_type
  target_id
  hypothesis
  baseline_version_id
  benchmark_suite_id
  metric_policy
  safety_constraints
  budget
  lifecycle_state
  created_by
  created_at
```

## Tracking Requirements

Every experiment records:

* ownership
* causation
* inputs
* environment
* candidate lineage
* executions
* costs
* failures
* results
* decisions

Experiment identity remains stable across retries.

---

# Benchmark Storage

The Benchmark Registry is authoritative for:

* benchmark definitions
* benchmark versions
* benchmark run results
* metric schemas

Evolution Memory references benchmark results and records how they influenced decisions.

Large benchmark artifacts remain in approved artifact storage.

Benchmark storage must be protected from candidate mutation.

---

# Workflow Lineage

## Purpose

Workflow lineage explains how active behavior evolved.

## Lineage Relationships

* FORKED_FROM
* MUTATED_FROM
* COMBINED_FROM
* EVALUATED_AGAINST
* PROMOTED_FROM
* REPLACED
* ROLLED_BACK_TO
* RETIRED_BY

## Lineage Record

```text
WorkflowLineage
  lineage_id
  source_version_ids
  destination_version_id
  relationship_type
  experiment_id
  promotion_id | null
  rationale
  created_at
```

Lineage is stored through Evolution Memory and projected into the Knowledge Graph.

No workflow version is silently overwritten.

---

# Promotion Criteria

## Required Criteria

* target-specific success threshold met
* confidence threshold met
* benchmark validity confirmed
* no blocking regression
* no safety constraint violation
* resource impact acceptable
* scope applicability understood
* dependencies available
* rollback plan tested or validated
* approvals satisfied

## Multi-Objective Scoring

Promotion evaluates:

* quality
* reliability
* safety
* cost
* latency
* resource usage
* maintainability

Weighted scores may assist comparison.

They may not override blocking constraints.

## Inconclusive Evidence

Inconclusive results do not become promotion.

The Engine may:

* collect more samples
* refine benchmarks
* narrow scope
* reject the candidate

---

# Failure Handling

## Variant Generation Failure

Record failure, preserve hypothesis, and stop or generate bounded alternatives.

## Arena Provisioning Failure

Do not execute without required isolation.

Retry provisioning or fail experiment.

## Benchmark Failure

Distinguish:

* candidate failure
* benchmark infrastructure failure
* external dependency failure
* invalid benchmark

Do not score infrastructure failure as candidate quality failure.

## Evaluation Failure

Mark experiment inconclusive and preserve raw validated results.

## Promotion Activation Failure

Freeze rollout and invoke rollback plan.

## Rollback Failure

Escalate as critical operational incident.

Pause affected workflows and require human recovery.

## Experiment Explosion

Enforce:

* candidate limits
* budget limits
* time limits
* expected-value thresholds
* duplicate detection

## Benchmark Overfitting

Mitigate through:

* hidden tests
* diverse suites
* production monitoring
* holdout tasks
* periodic benchmark refresh

## False Improvement

Mitigate through:

* multi-metric criteria
* canary rollout
* user feedback
* long-window regression detection
* rollback

---

# Recovery Mechanisms

* restart experiment from immutable plan
* reproduce benchmark run
* quarantine invalid results
* rebuild derived comparison views
* resume from Core checkpoints
* rollback active candidate
* restore prior stable registry reference
* reconcile lineage
* preserve incomplete experiment evidence
* human incident recovery

## Recovery Principles

Recovery must:

* preserve evidence
* avoid promoting uncertain results
* keep production stable
* remain auditable
* avoid repeating known unsafe experiments

---

# Security Considerations

## Arena Isolation

Candidates are untrusted.

They receive only benchmark-required permissions and resources.

## Authority

Evolution cannot grant permissions or approve itself.

## Benchmark Integrity

Candidate access to benchmarks, expected answers, and evaluator internals is controlled.

## Data Scope

Experiments use authorized datasets and memory snapshots.

Production private data is not automatically available.

## Tool And Model Use

Normal Tool and Model Layer permissions remain active in the Arena.

## Generated Content

Generated workflows, strategies, teams, or routing policies are proposals until validated and promoted.

## Audit

Experiments, promotions, approvals, and rollbacks are auditable.

---

# Observability And Metrics

Evolution metrics include:

* opportunities identified
* variants generated
* variants rejected by safety
* experiment completion rate
* benchmark validity rate
* promotion rate
* rollback rate
* realized production improvement
* regression frequency
* experiment cost
* time to validated improvement
* repeated experiment avoidance

The defining success metric is not variants generated.

It is sustained, safe capability improvement.

---

# Lifecycle Reliability

Evolution operations span registries, Core executions, benchmark storage, memory, and approvals.

They require durable operation records and idempotent steps.

Promotion and rollback use coordinated sagas.

Partial activation must never be reported as full success.

---

# Architectural Constraints

## Constraint 1

The Evolution Engine is the defining improvement subsystem of Damascus.

## Constraint 2

Workflows are the primary evolution unit.

## Constraint 3

Evolution occurs through versioned candidates, experiments, benchmarks, and promotion.

## Constraint 4

The Evolution Engine may not directly modify production source code.

## Constraint 5

The Evolution Engine may not modify security policy, permissions, approvals, audit requirements, or minimum isolation.

## Constraint 6

Candidates execute in an isolated Evolution Arena.

## Constraint 7

Promotion requires relevant benchmark evidence and regression analysis.

## Constraint 8

Every promotion has a rollback plan and lineage record.

## Constraint 9

Failed, rejected, and rolled-back experiments remain Evolution Memory.

## Constraint 10

Benchmark definitions and results remain authoritative in Benchmark Registry.

## Constraint 11

Human authority remains final for critical promotion.

## Constraint 12

No candidate may approve or promote itself.

## Constraint 13

Improved aggregate score may not override blocking safety regressions.

## Constraint 14

Production activation is controlled, observable, and reversible.

---

# Implementation Guidance

## Recommended Initial Scope

First implementation should support:

* workflow variants
* deterministic variant generation
* isolated benchmark execution
* baseline comparison
* manual promotion approval
* workflow version lineage
* explicit rollback
* Evolution Memory records

## Deferred Capabilities

May be deferred:

* autonomous opportunity discovery
* generated teams
* model-generated variants
* automatic low-risk promotion
* cross-workspace shared evolution
* advanced statistical experimentation

The initial system should prefer reliable experiment discipline over broad autonomy.

## Minimum Test Categories

* unsafe variant rejected
* benchmark tampering blocked
* candidate cannot access production secrets
* inconclusive result cannot promote
* blocking regression prevents promotion
* approval required before activation
* failed canary triggers rollback
* lineage preserved after rollback
* failed experiments remain queryable
* Evolution cannot modify security policy

---

# Future Evolution

Future Evolution Engine capabilities may include:

* adaptive experiment selection
* multi-objective optimization
* causal performance analysis
* privacy-preserving shared evolution
* automated research-to-experiment pipelines
* portfolio optimization across workflows
* counterfactual evaluation
* learned variant generation
* federated benchmark evidence

Future autonomy must increase only when evidence shows that the governance and recovery architecture remains reliable.

---

# Open Questions

* What minimum benchmark evidence is required per evolution target?
* Which targets may ever support automatic low-risk promotion?
* How should user preference be balanced with objective metrics?
* How should benchmark suites resist long-term overfitting?
* How should production drift trigger re-evaluation?
* How should multi-objective tradeoffs be presented to users?
* Which historical tasks may be replayed without privacy risk?
* How should cross-workspace evolution evidence be shared safely?
* How should stateful workflows migrate across promoted versions?
* What rollback guarantees are possible for workflows with external effects?
* How should Evolution measure its own cost-effectiveness?
* When should repeated inconclusive experiments be retired?

---

# Key Architectural Decisions

The Evolution Engine is the defining Damascus subsystem.

It converts execution into evidence and evidence into controlled improvement.

It evolves workflows, teams, tool selection, strategies, and model routing through isolated experiments.

It does not self-modify production source code or security authority.

Every candidate is versioned.

Every improvement is benchmarked.

Every promotion is gated.

Every activation is monitored.

Every rollback is preserved.

Damascus does not assume it improved.

Damascus proves it improved.
