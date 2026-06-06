# Memory-Architecture.md

Version: 0.1

Status: Architecture Foundation

Priority: Critical

---

# Purpose

This document defines the Damascus Memory Architecture.

Memory is foundational intelligence infrastructure used by every major Damascus subsystem.

The purpose of memory is not merely to retain information.

The purpose of memory is to improve future decisions while preserving privacy, provenance, scope, and human authority.

The Memory Architecture expands the findings of `01-Research/Memory-Systems.md` into an implementation-grade system design.

It defines:

* Working Memory
* Episodic Memory
* Semantic Memory
* Procedural Memory
* Evolution Memory
* Knowledge Graph Layer
* storage responsibilities
* lifecycle and retrieval
* ranking and validation
* compression and aging
* promotion and inheritance
* interactions with workflows, agents, and Evolution Layer

Memory must survive:

* sessions
* agents
* models
* workflow executions
* runtime adapter changes
* Damascus upgrades

---

# Design Philosophy

## Memory As Infrastructure

Memory is not a chatbot feature.

It is a shared capability consumed by workflows, agents, research, evaluation, and evolution.

No single agent owns Damascus memory.

## Memory Is More Than Storage

Storage answers:

Where is information persisted?

Memory answers:

* What should be retained?
* What does it mean?
* How trustworthy is it?
* Who may retrieve it?
* When is it relevant?
* What supersedes it?
* How did it improve future behavior?

## Multi-Layer Architecture

No single storage technology satisfies all memory requirements.

Damascus uses:

* Redis for fast temporary working memory
* PostgreSQL for authoritative durable memory records
* Qdrant for semantic retrieval
* a Graph Database for meaningful entities and relationships

These systems form one logical memory architecture.

They are not independent sources of truth.

## Provenance Before Recall

A retrieved statement without provenance may be useful.

It is not trustworthy enough for critical decisions.

Memory must preserve where information came from, how it was transformed, and what evidence supports it.

## Scope Before Similarity

Similarity does not grant access.

Scope, permissions, classification, and lifecycle state filter memory before ranking.

## Controlled Learning

Every execution produces observations.

Only validated and policy-eligible observations become durable memory.

Only evidence-supported memories become promoted procedures or evolution knowledge.

## Human Authority

Users must be able to:

* inspect memory
* understand provenance
* correct or supersede memory
* restrict scope
* delete memory where policy permits
* reject promotion
* disable inheritance

---

# Responsibilities

The Memory Layer owns:

* memory record contracts
* memory category semantics
* capture and consolidation
* durable memory persistence
* semantic indexing
* graph linking
* retrieval planning
* ranking
* validation state
* compression
* aging and retention
* promotion
* inheritance manifests
* memory provenance
* memory quality telemetry

It coordinates with:

* Workspace System for ownership scope and policy bindings
* Security Layer for authorization, classification, and deletion policy
* Core State Manager for execution-state references
* Workflows for memory requests and outputs
* Agent Layer for bounded context consumption
* Knowledge Layer for graph reasoning
* Observability Layer for execution evidence
* Benchmark Registry for performance evidence
* Evolution Layer for improvement history

---

# Non-Responsibilities

The Memory Layer does not own:

* workflow execution
* live workflow state transitions
* agent reasoning
* model inference
* tool execution
* security policy definitions
* benchmark execution
* evolution promotion authority
* source document ownership

The Core State Manager owns authoritative live execution state.

Working Memory may cache or enrich execution context, but must not replace Core checkpoints.

The Knowledge Layer may provide graph reasoning services.

The Memory Layer owns the memory-facing graph records and synchronization contract.

---

# Architectural Principles

## MEM-001 Durable Identity

Every durable memory has immutable identity independent of storage backend.

## MEM-002 Explicit Scope

Every memory has an owning workspace and optional narrower scope.

## MEM-003 Authoritative Record

PostgreSQL durable records are the source of truth for long-term memory metadata, provenance, and lifecycle.

## MEM-004 Derived Indexes

Vector and graph representations are derived, rebuildable projections.

## MEM-005 Provenance

Every durable memory records origin, transformation, and evidence.

## MEM-006 Validation State

Memory confidence and validation are explicit.

## MEM-007 Non-Destructive Evolution

Correction and promotion create versioned relationships rather than silently rewriting history.

## MEM-008 Bounded Retrieval

Retrieval is scoped, permission-filtered, ranked, budgeted, and observable.

## MEM-009 Cross-Version Survival

Memory survives software upgrades through versioned schemas and controlled migration.

## MEM-010 Measurable Usefulness

Memory quality is evaluated by its effect on future decisions, not by volume stored.

---

# High-Level Architecture

Memory Producers
├── Workflows
├── Agents
├── Tools
├── Research
├── Observability
└── Evolution
↓
Memory Capture Gateway
↓
Classification And Validation
↓
Authoritative Memory Store
├── PostgreSQL
├── Redis Working Store
├── Qdrant Semantic Index
└── Graph Database
↓
Retrieval Planner
↓
Scope And Permission Filter
↓
Candidate Retrieval
↓
Ranking And Context Assembly
↓
Memory Consumers

---

# Core Components

Memory Layer
├── Memory Capture Gateway
├── Memory Classifier
├── Validation Service
├── Authoritative Memory Repository
├── Working Memory Service
├── Semantic Index Service
├── Knowledge Graph Adapter
├── Retrieval Planner
├── Ranking Engine
├── Compression Service
├── Linking Service
├── Aging And Retention Service
├── Promotion Service
├── Inheritance Manager
└── Memory Telemetry Service

## Memory Capture Gateway

The only supported entry point for durable memory candidates.

It validates:

* source identity
* workspace and project scope
* memory category proposal
* classification
* provenance
* retention policy

## Memory Classifier

Determines whether a candidate is:

* temporary context
* episode
* semantic knowledge
* procedure
* evolution record
* graph relationship candidate
* unsuitable for storage

Classification may use deterministic rules, models, human input, or workflows.

Classification output is a proposal until validated according to policy.

## Validation Service

Evaluates:

* source reliability
* internal consistency
* contradiction
* evidence
* sensitivity
* scope
* freshness

## Authoritative Memory Repository

Persists durable memory records, versions, provenance, validation, and lifecycle state.

## Retrieval Planner

Converts a memory request into a bounded retrieval plan spanning relational, vector, temporal, procedural, evolution, and graph retrieval.

## Ranking Engine

Ranks eligible candidates using relevance, quality, scope, recency, evidence, and task-specific factors.

## Linking Service

Creates and maintains meaningful memory relationships.

## Promotion Service

Coordinates controlled movement or derivation from narrow, provisional memory into broader or more authoritative memory.

## Inheritance Manager

Migrates and exposes eligible memory across Damascus versions without coupling memory to implementation versions.

---

# Unified Memory Record

Minimum durable record:

```text
MemoryRecord
  memory_id
  memory_version_id
  memory_type
  workspace_id
  project_id | null
  workflow_definition_id | null
  workflow_execution_id | null
  principal_id | null
  title
  content_reference
  summary
  provenance
  classification
  validation_state
  confidence
  importance
  lifecycle_state
  retention_policy_id
  created_at
  created_by
  observed_at
  valid_from | null
  valid_until | null
  supersedes_memory_version_id | null
  schema_version
```

## Lifecycle States

* Candidate
* Validating
* Active
* Restricted
* Quarantined
* Superseded
* Archived
* Deletion Pending
* Deleted

## Validation States

* Unverified
* SourceVerified
* Corroborated
* BenchmarkValidated
* HumanValidated
* Disputed
* Invalidated

Validation is multi-dimensional.

A memory may be source-verified but still semantically incorrect.

---

# Working Memory

## Purpose

Working Memory provides fast, temporary context for active workflows and reasoning.

Examples:

* current task context
* intermediate plans
* transient model outputs
* active retrieved context
* short-lived coordination state

## Storage

Primary technology:

Redis

Redis provides:

* low-latency access
* expiration
* bounded caches
* transient coordination

## Boundary With Core State

Core State Manager remains authoritative for:

* workflow lifecycle
* node state
* checkpoints
* retry state

Working Memory contains cognitive and contextual data used during execution.

It must not become the only copy of state required for workflow recovery.

## Lifecycle

Create
↓
Use
↓
Refresh Or Expire
↓
Summarize And Propose Durable Candidates
↓
Delete

## Constraints

Working Memory must be:

* scope-bound
* size-limited
* TTL-controlled
* checkpoint-aware
* excluded from durable inheritance unless consolidated

---

# Episodic Memory

## Purpose

Episodic Memory records what happened.

Examples:

* workflow outcomes
* decisions
* failures
* recoveries
* user corrections
* completed project events

## Storage

Authoritative records:

PostgreSQL

Semantic representations:

Qdrant

Meaningful relationships:

Graph Database

## Episode Structure

An episode should record:

* initiating goal
* relevant scope
* workflow and version
* material decisions
* result
* metrics
* failure and recovery
* lessons proposed
* provenance links

Raw traces remain in Observability.

Episodic Memory stores a durable, meaningful representation rather than duplicating every log line.

## Consolidation

Completed execution
↓
Trace Analysis
↓
Episode Candidate
↓
Validation And Redaction
↓
Durable Episode
↓
Semantic And Graph Indexing

---

# Semantic Memory

## Purpose

Semantic Memory records durable knowledge.

It answers:

What is known?

Examples:

* facts
* concepts
* document-derived knowledge
* research findings
* project conventions

## Storage

PostgreSQL stores authoritative semantic records and provenance.

Qdrant stores embeddings for semantic retrieval.

Graph Database stores relationships among meaningful entities.

## Fact Model

Semantic memories should distinguish:

* claim
* evidence
* confidence
* temporal validity
* scope
* contradictions

Facts are not timeless by default.

## Contradiction Handling

Contradictory memories are linked, not silently overwritten.

Resolution may:

* prefer newer evidence
* prefer authoritative sources
* preserve domain-specific differences
* mark unresolved dispute
* require human decision

---

# Procedural Memory

## Purpose

Procedural Memory records how work should be performed.

Examples:

* workflows
* playbooks
* strategies
* team structures
* tool sequences
* recovery procedures

## Procedure Structure

```text
ProcedureMemory
  procedure_id
  procedure_version
  purpose
  applicability_conditions
  workflow_reference | null
  steps_or_strategy
  required_capabilities
  constraints
  benchmark_evidence
  known_failure_modes
  rollback_reference
  lifecycle_state
```

## Relationship To Workflow Registry

The Workflow Registry stores executable workflow definitions and versions.

Procedural Memory stores learned knowledge about when, why, and how procedures work.

A procedural memory may reference a workflow.

It does not replace the Workflow Registry.

## Promotion

Procedures require stronger promotion evidence than ordinary episodes.

Promotion should consider:

* benchmark score
* repeated success
* failure rate
* scope applicability
* cost and latency
* security compatibility

---

# Evolution Memory

## Purpose

Evolution Memory records what made Damascus better, worse, or unchanged.

It is the historical intelligence of controlled improvement.

## Contents

* baseline definitions
* variants
* experiment configurations
* benchmark results
* comparisons
* promotion decisions
* rejected candidates
* regressions
* rollbacks
* human rationale

## Immutability

Evolution Memory is append-oriented.

Historical evidence and decisions must not be silently rewritten.

Corrections create linked amendments.

## Relationship To Evolution Layer

The Evolution Layer owns:

* variant generation
* experiment execution
* comparison
* promotion proposals

Evolution Memory owns durable records of those activities and their evidence.

## Example

```text
Experiment
  baseline: workflow_v4
  candidate: workflow_v5
  benchmark_suite: coding_suite_v2
  result: candidate +8.3%
  regressions: latency +12%
  decision: promoted
  approved_by: user_...
```

---

# Knowledge Graph Layer

## Purpose

The Knowledge Graph Layer represents meaningful entities and relationships.

Vectors answer:

What is similar?

Graphs answer:

What is connected?

## Boundary

The Knowledge Layer provides graph infrastructure and reasoning capabilities.

The Memory Layer defines memory-specific graph mappings, synchronization, and retrieval use.

## Candidate Entities

* Workspace
* Project
* Task
* Workflow
* Workflow Version
* Execution
* Agent Definition
* Tool
* Model Profile
* Memory
* Artifact
* Benchmark
* Experiment
* Research Source

## Candidate Relationships

* CONTAINS
* PRODUCED
* DERIVED_FROM
* USED
* EXECUTED_BY
* EVALUATED_BY
* IMPROVED_INTO
* SUPERSEDES
* CONTRADICTS
* SUPPORTS
* FAILED_WITH
* PROMOTED_TO

## Entity Selection

Not every message or token becomes a graph node.

Entities and relationships require:

* stable identity
* meaningful future query value
* provenance
* scope
* confidence

## Graph Synchronization

Authoritative memory change
↓
Outbox Event
↓
Graph Projection Update
↓
Verification

Graph projection failure does not corrupt the authoritative memory record.

It marks graph retrieval degraded until reconciled.

---

# Storage Architecture

## PostgreSQL

PostgreSQL is authoritative for:

* durable memory records
* memory versions
* provenance
* validation
* lifecycle
* retention
* promotion records
* inheritance manifests
* projection status

## Redis

Redis stores:

* working memory
* retrieval caches
* bounded context caches
* short-lived ranking features
* consolidation queues

Redis loss must not destroy durable memory.

## Qdrant

Qdrant stores semantic vectors and retrieval metadata.

Every vector point must include:

* memory identity
* memory version
* workspace scope
* optional project scope
* classification
* lifecycle eligibility
* embedding profile

Qdrant is a derived index.

## Graph Database

The graph database stores meaningful relationship projections.

Technology may include:

* Neo4j
* Memgraph
* Apache AGE
* future graph systems

The architecture depends on a graph interface, not a specific vendor.

## Consistency Model

PostgreSQL commits authoritative change and an outbox event atomically.

Vector and graph projections update asynchronously.

Retrieval must detect stale or failed projections and degrade safely.

## Rebuildability

Qdrant and graph projections must be rebuildable from authoritative records, source artifacts, and provenance.

---

# Memory Lifecycle

## Full Lifecycle

Observe
↓
Capture Candidate
↓
Classify
↓
Scope And Authorize
↓
Validate
↓
Store Authoritative Record
↓
Index And Link
↓
Retrieve And Apply
↓
Measure Usefulness
↓
Age, Compress, Promote, Restrict, Supersede, Or Delete

## Capture

Memory capture may be initiated by:

* workflow completion
* agent proposal
* user action
* research ingestion
* benchmark result
* evolution experiment
* system reconciliation

Capture is policy-controlled.

## Consolidation

Consolidation transforms raw observations into durable memory candidates.

It should:

* remove duplication
* preserve provenance
* extract lessons
* classify sensitivity
* identify relationships

## Deletion

Deletion must propagate to:

* authoritative records
* vectors
* graph projections
* caches
* derived summaries
* exports and backups according to policy

Minimal tombstones may remain for integrity and audit.

---

# Memory Retrieval

## Retrieval Request

```text
MemoryRetrievalRequest
  workspace_id
  project_id | null
  workflow_execution_id
  requesting_principal
  query
  requested_memory_types
  temporal_constraints
  relationship_constraints
  validation_threshold
  classification_limit
  result_budget
  token_budget
```

## Retrieval Flow

Request
↓
Resolve Scope And Permissions
↓
Build Retrieval Plan
↓
Query Eligible Stores
↓
Merge And Deduplicate Candidates
↓
Validate Candidate Eligibility
↓
Rank
↓
Assemble Bounded Context
↓
Record Retrieval Provenance

## Retrieval Modes

* exact identifier lookup
* semantic similarity
* temporal retrieval
* graph traversal
* procedural retrieval
* evolution retrieval
* hybrid retrieval

## Hybrid Retrieval

Hybrid retrieval combines:

* lexical match
* vector similarity
* graph proximity
* temporal relevance
* procedural applicability
* validation quality

The Retrieval Planner chooses strategies based on request type and budget.

## Context Assembly

Retrieved memory is assembled with:

* source identity
* confidence
* age
* scope
* relevant warnings
* contradiction markers

The system must not present uncertain memory as unquestioned truth.

---

# Memory Ranking

## Ranking Factors

Candidate ranking may include:

* semantic relevance
* graph relevance
* scope proximity
* task applicability
* validation strength
* source reliability
* recency
* temporal validity
* importance
* prior usefulness
* contradiction status
* diversity

## Hard Filters Before Ranking

Candidates are removed before ranking when they fail:

* authorization
* scope
* classification
* lifecycle eligibility
* retention
* minimum validation

## Ranking Explainability

For critical retrieval, Damascus should expose why a memory ranked highly.

Example:

* project-scoped
* directly linked to current workflow
* human-validated
* used successfully three times

## Feedback

Retrieval outcomes may update usefulness telemetry.

They must not automatically rewrite truth confidence.

---

# Memory Compression

## Purpose

Compression reduces storage and context cost while preserving useful knowledge and provenance.

## Compression Types

* lossless deduplication
* episode summarization
* cluster summarization
* archival compression
* procedural extraction
* graph consolidation

## Compression Rules

Compression must:

* retain source links
* state whether transformation is lossy
* preserve critical decisions and evidence
* avoid broadening scope
* remain reversible where source retention policy allows

## Summary Validation

Generated summaries are new memory candidates.

They require validation and must not replace source records immediately.

---

# Memory Linking

Memory links provide structure across types.

Examples:

Episode
DERIVED
Procedure

Procedure
EVALUATED_BY
Benchmark

Experiment
PROMOTED
Workflow Version

Semantic Claim
SUPPORTED_BY
Research Source

Links include:

* relationship type
* source and target
* confidence
* provenance
* scope
* lifecycle

Links must obey cross-scope policy.

---

# Memory Validation

## Validation Methods

* source verification
* schema validation
* cross-source corroboration
* contradiction detection
* benchmark validation
* workflow outcome validation
* human review

## Validation Flow

Candidate
↓
Validate Source And Scope
↓
Check Existing Knowledge
↓
Detect Contradictions
↓
Assign Confidence And State
↓
Activate, Restrict, Quarantine, Or Reject

## Invalid Memory

Invalid memory is not always deleted.

Failed procedures and rejected hypotheses may be valuable evolution memory.

They must be clearly typed and excluded from ordinary factual retrieval.

---

# Memory Aging

## Purpose

Aging reduces the influence and storage cost of stale or low-value memory.

Memory is not immortal by default.

## Aging Factors

* time since observation
* temporal validity
* retrieval frequency
* demonstrated usefulness
* supersession
* source freshness
* policy retention

## Aging Actions

* reduce ranking weight
* request revalidation
* compress
* archive
* restrict
* delete

## Category-Specific Aging

Working Memory expires quickly.

Episodes may compress over time.

Semantic facts require validity review.

Procedures age when dependencies or environments change.

Evolution Memory is retained longer because failed experiments prevent repeated mistakes.

---

# Memory Promotion

## Purpose

Promotion converts narrower or provisional learning into broader, trusted, reusable memory.

Examples:

* execution observation to episode
* episode lesson to semantic memory
* repeated successful method to procedure
* benchmark result to evolution memory
* project procedure to workspace procedure

## Promotion Flow

Candidate
↓
Validate
↓
Check Scope And Sensitive Data
↓
Check Evidence Threshold
↓
Create Promoted Version
↓
Link Provenance
↓
Approve If Required
↓
Activate

Promotion creates a new memory version or artifact.

It does not silently mutate the source.

## Promotion Authority

The Memory Layer validates and executes memory promotion.

The Workspace and Security policies determine scope authority.

Evolution Layer proposes evidence-based procedural and evolution promotions.

Human approval remains required where policy specifies.

---

# Cross-Version Memory Inheritance

## Purpose

Memory must survive Damascus upgrades and remain usable by future versions.

Cross-version inheritance is schema and meaning preservation, not raw database copying alone.

## Inheritance Contract

Each release defines:

* supported memory schema versions
* migration functions
* compatibility rules
* deprecated memory types
* required re-indexing
* required revalidation

## Inheritance Flow

Pre-Upgrade Integrity Check
↓
Create Inheritance Manifest
↓
Backup Authoritative Memory
↓
Migrate Schema
↓
Validate Scope And Provenance
↓
Rebuild Derived Indexes
↓
Run Compatibility Benchmarks
↓
Activate New Version
↓
Retain Rollback Path

## Inheritance Manifest

Records:

* source Damascus version
* destination version
* memory counts by type and state
* migration operations
* failed records
* quarantined records
* index rebuild status
* validation results

## Behavioral Inheritance

Procedural and evolution memories may describe workflows or capabilities no longer available.

They remain historical knowledge but must be marked incompatible until adapted and re-benchmarked.

---

# Interaction With Workflows

Workflows are primary memory producers and consumers.

## Before Execution

Workflow requests bounded relevant memory.

## During Execution

Workflow uses working memory and may propose memory candidates.

## After Execution

Workflow results, traces, and metrics may be consolidated into episodes, procedures, or evolution records.

## Constraints

Workflows must:

* declare memory scope
* declare retrieval budget
* respect provenance and confidence
* avoid direct storage-backend access
* submit durable candidates through Memory Capture Gateway

---

# Interaction With Agents

Agents consume memory only within workflow-defined context and permissions.

Agents may:

* request retrieval
* use retrieved context
* propose memory candidates
* propose links
* flag contradictions

Agents may not:

* access all workspace memory by default
* directly write durable memory
* promote their own claims without validation
* change memory permissions
* erase audit or evolution history

Agent identity is retained in provenance.

Memory survives agent retirement.

---

# Interaction With Evolution Engine

Evolution depends on Memory Architecture for:

* baseline history
* variant history
* benchmark evidence
* failure patterns
* promotion and rollback history
* procedural knowledge

Evolution writes candidates and experiment records through memory contracts.

Evolution does not directly alter active memory truth or security policy.

Evolution memory closes the loop:

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
Remember Why

---

# Failure Modes

## Redis Loss

Impact:

Working context and caches are lost.

Recovery:

* restore from Core checkpoints where applicable
* rebuild caches
* restart affected nodes according to workflow policy

## PostgreSQL Unavailable

Impact:

Authoritative durable memory cannot be trusted or written.

Recovery:

* deny durable writes and critical retrieval
* buffer only where loss and ordering are explicitly acceptable
* recover database
* reconcile projections

## Qdrant Divergence

Impact:

Semantic retrieval becomes stale or incorrect.

Recovery:

* disable affected semantic index
* rebuild from authoritative records
* validate scope filters

## Graph Divergence

Impact:

Relationship retrieval is incomplete or stale.

Recovery:

* mark graph retrieval degraded
* replay outbox
* rebuild affected projections

## Scope Leakage

Impact:

Unauthorized memory exposure.

Recovery:

* stop retrieval
* invalidate caches
* quarantine derived outputs
* trace exposure through provenance
* notify authorized users

## Corrupted Memory

Recovery:

* quarantine record
* preserve forensic evidence
* restore prior valid version
* rebuild projections

## False Promotion

Recovery:

* deactivate promoted memory
* restore previous active procedure
* record rollback in Evolution Memory
* re-evaluate affected decisions

## Migration Failure

Recovery:

* leave new version inactive
* restore authoritative backup
* preserve inheritance manifest
* quarantine incompatible records

---

# Recovery Mechanisms

* authoritative backups
* point-in-time recovery
* outbox replay
* vector and graph index rebuild
* memory version rollback
* quarantine
* reconciliation jobs
* schema migration rollback
* manual correction and approval

## Reconciliation

Reconciliation detects:

* missing projections
* orphaned vectors
* invalid graph edges
* scope mismatch
* stale lifecycle state
* unresolved contradictions
* failed deletion propagation

Reconciliation must not silently broaden scope or validation.

---

# Security Considerations

## Authorization

Every capture, retrieval, link, promotion, export, and deletion operation requires authorization.

## Data Classification

Memory classification controls:

* eligible consumers
* model egress
* indexing
* sharing
* retention
* export

## Sensitive Memory

Secrets should not become general memory.

References to secrets may be stored.

Secret values remain in approved secret storage.

## Prompt Injection

Retrieved memory is untrusted content.

Provenance and trust metadata must remain visible to consuming workflows.

Memory cannot grant permissions or approve actions.

## Encryption

Durable memory, indexes, backups, and exports should use encryption appropriate to classification.

## Deletion

Deletion must propagate to all derived representations and report incomplete removal.

---

# Observability And Benchmarking

Memory telemetry should capture:

* capture rate
* validation outcomes
* retrieval latency
* retrieval precision and usefulness
* ranking explanations
* stale result rate
* contradiction rate
* promotion outcomes
* compression ratio
* index divergence
* inheritance success

## Memory Benchmarks

Memory benchmarks should evaluate:

* relevant recall
* irrelevant recall
* scope isolation
* factual accuracy
* provenance completeness
* temporal correctness
* procedural usefulness
* impact on workflow outcomes

More retrieved memory is not necessarily better.

---

# Architectural Constraints

## Constraint 1

Memory is infrastructure and survives agents, models, runtimes, and upgrades.

## Constraint 2

PostgreSQL is authoritative for durable memory records and lifecycle.

## Constraint 3

Redis working memory may not replace Core execution checkpoints.

## Constraint 4

Qdrant and Graph Database representations are derived and rebuildable.

## Constraint 5

Every durable memory has explicit workspace scope and provenance.

## Constraint 6

Scope and permission filters apply before ranking.

## Constraint 7

Agents and workflows may not access storage backends directly.

## Constraint 8

Memory promotion is versioned, evidence-aware, and auditable.

## Constraint 9

Contradictory memory must not be silently overwritten.

## Constraint 10

Evolution Memory preserves failed and rejected experiments.

## Constraint 11

Cross-version inheritance requires migration, validation, and rollback.

## Constraint 12

Memory may inform decisions.

It may not grant authority.

---

# Future Evolution

Future Memory Architecture may support:

* learned retrieval planning
* adaptive ranking
* privacy-preserving shared learning
* richer temporal knowledge
* causal relationship modeling
* automated contradiction resolution proposals
* federated memory
* personalized memory policies
* hardware-aware local indexing

Evolution may propose improvements to:

* retrieval strategy
* ranking weights
* compression methods
* promotion thresholds
* memory consolidation workflows

All changes require benchmark evidence and controlled promotion.

---

# Open Questions

* Which PostgreSQL schemas should separate memory categories?
* Which entities deserve graph representation?
* How should ranking quality be benchmarked per workflow class?
* When should an episode become a procedure?
* How should confidence decay over time?
* How should temporal contradictions be represented?
* Which memories may safely exist at installation scope?
* How should private principal memory behave in collaborative workspaces?
* How should source deletion affect derived summaries and procedures?
* What evidence threshold permits automatic promotion?
* How should incompatible procedural memory be adapted across versions?
* How much raw execution history should be retained outside Observability?

---

# Key Architectural Decisions

Damascus Memory is a multi-layer intelligence infrastructure.

Redis provides temporary working memory.

PostgreSQL stores authoritative durable records.

Qdrant enables semantic retrieval.

The Graph Database represents meaningful relationships.

Workflows and agents consume memory through bounded interfaces.

Evolution preserves improvement history through Evolution Memory.

Every memory remains scoped, attributable, validatable, aging-aware, and inheritable across future Damascus versions.
