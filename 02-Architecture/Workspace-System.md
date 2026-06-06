# Workspace-System.md

Version: 0.1

Status: Architecture Foundation

Priority: Critical

---

# Purpose

This document defines the architecture of the Damascus Workspace System.

The Workspace System is the primary user-facing abstraction of Damascus.

It provides the durable organizational, contextual, policy, and ownership boundary through which users interact with projects, workflows, memories, knowledge, benchmarks, and execution history.

The Workspace System exists because an intelligence operating layer requires a stable unit of context larger than a conversation and more durable than an execution.

A conversation is temporary.

An agent is replaceable.

A model is replaceable.

A workflow execution is transient.

A workspace persists across all of them.

The Workspace System must make it possible for Damascus to understand:

* what body of work is active
* which projects belong together
* which memories may be used
* which capabilities are available
* which permissions apply
* which workflows and results are owned by the user
* which actions require approval
* which improvements are eligible for promotion

The Workspace System is not merely a folder hierarchy or user interface container.

It is the durable context and governance boundary between the user and Damascus capabilities.

---

# Architectural Position

Damascus is organized around the following primary flow:

User
↓
Workspace
↓
Project
↓
Workflow
↓
Damascus Core
↓
Capabilities
↓
Execution Environment

The Workspace System sits above workflow execution and below user interaction.

It translates user-owned organizational context into explicit scope and policy inputs for the Damascus Core and capability systems.

The Workspace System does not execute workflows directly.

It establishes the context within which workflows are created, selected, executed, evaluated, learned from, and evolved.

---

# Design Philosophy

## Workspace As The Primary User-Facing Abstraction

Users should interact with a persistent body of work rather than repeatedly reconstructing context.

A workspace should answer:

* What am I working on?
* What projects belong to this area?
* What has Damascus learned here?
* Which workflows are available here?
* What is currently executing?
* What changed?
* What requires my approval?
* How has capability improved over time?

The workspace is therefore the user's primary point of orientation.

It is not the primary execution unit.

Workflows remain the primary execution unit.

This distinction must remain explicit:

Workspace
→ organizes and governs

Workflow
→ executes

Core
→ coordinates execution

Capabilities
→ provide intelligence and action

## Durable Context Over Session Context

Session-oriented systems encourage context loss.

Damascus workspaces persist independently of:

* UI sessions
* conversations
* workflow runs
* agent instances
* model providers
* application restarts
* Damascus upgrades

Session state may reference a workspace.

A workspace must never depend on a session for its existence or integrity.

## Explicit Scope Over Implicit Context

Every durable artifact and every execution must have an explicit scope.

Scope must not be inferred only from:

* current directory
* active chat
* selected UI tab
* model context
* runtime thread

Implicit context may assist user experience, but it may not be the source of authority.

Every workflow execution must resolve to a workspace identity before it begins.

Project scope may additionally be required.

## Local Ownership By Default

The workspace is the primary local ownership boundary.

Workspace metadata, memories, knowledge, execution records, and policy bindings should remain local by default.

Remote synchronization, collaboration, and cloud services are optional capabilities.

Enabling them must not silently change ownership or weaken local permissions.

## Controlled Learning

Every execution can produce observations.

Not every observation should become durable memory.

Not every project learning should become workspace-wide knowledge.

Not every workspace improvement should become globally available.

The Workspace System must preserve the boundaries through which learning is reviewed, promoted, shared, or rejected.

## Human Authority

Workspace autonomy is delegated authority.

It is not independent authority.

Users must be able to:

* inspect workspace configuration
* understand active permissions
* review pending actions
* pause or disable execution
* revoke capability access
* inspect and delete memories
* reject proposed improvements
* archive or export the workspace

---

# Core Principles

## WS-001 Stable Identity

Every workspace and project must have an immutable system identity independent of its display name or storage path.

Names and paths may change.

Identity must not.

## WS-002 Explicit Ownership

Every workspace must have an owner.

Every durable artifact must resolve to an owning workspace.

## WS-003 Scoped Access

Access to workspace resources must be evaluated using explicit identity, role, policy, and resource scope.

Physical storage location alone does not grant access.

## WS-004 Project Containment

Projects exist inside exactly one owning workspace in the initial architecture.

Projects may reference external resources, but they may not exist without a workspace.

## WS-005 Workflow-Centric Execution

The Workspace System may initiate, configure, and inspect execution.

All executable work must still be represented as workflows and submitted through Damascus Core.

## WS-006 Memory Isolation

Memory retrieval and storage must obey workspace and project scope.

Cross-scope memory use must be explicit, authorized, and auditable.

## WS-007 Reversible Lifecycle

Destructive workspace and project operations must use staged, auditable lifecycle transitions.

Deletion must not be an immediate irreversible action.

## WS-008 Runtime Independence

Workspace concepts must not depend on LangGraph or any other runtime implementation.

Runtime-specific identifiers may be stored only as adapter-owned references.

## WS-009 Capability Portability

Workspace definitions must remain usable when models, agents, tools, runtimes, or storage backends change.

## WS-010 Measurable Improvement

Workspace-level claims of improvement must reference benchmark evidence and promotion history.

---

# Responsibilities

The Workspace System owns:

* workspace identity and metadata
* project identity and containment
* workspace and project lifecycle coordination
* artifact scope assignment
* workspace context resolution
* policy and permission bindings
* capability availability declarations
* default execution policy declarations
* memory scope declarations
* workspace-level activity and approval views
* import, export, archive, and restore coordination
* multi-workspace discovery and selection
* cross-workspace sharing requests

The Workspace System coordinates with other systems to provide:

* workflow discovery and ownership
* memory retrieval and retention
* knowledge graph partitioning
* execution scheduling
* approval enforcement
* audit history
* benchmark and evolution visibility
* resource usage reporting

---

# Non-Responsibilities

The Workspace System does not own:

* workflow execution
* runtime state transitions
* long-term memory storage engines
* knowledge graph implementation
* model inference
* agent reasoning
* tool implementation
* operating system sandboxing
* authentication implementation
* security policy enforcement
* benchmark execution
* evolution decisions
* observability storage

These responsibilities belong to Damascus Core and dedicated capability systems.

The Workspace System may declare scope and policy.

The Security Layer enforces policy.

The Workspace System may request execution.

Damascus Core coordinates execution.

The Workspace System may request memory retrieval.

The Memory Layer performs and governs retrieval.

The Workspace System may display promotion proposals.

The Evolution Layer evaluates and proposes promotions.

---

# Domain Hierarchy

The initial Damascus ownership hierarchy is:

Damascus Installation
└── Workspace
    ├── Workspace Configuration
    ├── Workspace Policies
    ├── Workspace Memories
    ├── Workspace Knowledge
    ├── Workspace Workflows
    ├── Workspace Benchmarks
    ├── Workspace Evolution History
    └── Projects
        └── Project
            ├── Project Configuration
            ├── Project Policies
            ├── Project Resources
            ├── Project Memories
            ├── Project Knowledge
            ├── Project Workflows
            ├── Project Benchmarks
            ├── Project Evolution History
            └── Workflow Executions

## Installation

An installation is a deployed Damascus environment controlled by a user or organization.

It provides:

* local system identity
* global configuration
* shared capability registries
* workspace discovery
* storage backend configuration
* system-wide security defaults

Installation scope is not a substitute for workspace scope.

Only carefully selected artifacts may be installation-scoped.

Examples:

* installed model adapter definitions
* installed tool definitions
* runtime adapter definitions
* system-wide security baselines

User work products, memories, and execution results should not default to installation scope.

## Workspace

A workspace is a durable, user-owned intelligence environment containing related projects, workflows, memories, knowledge, benchmarks, and policies.

A workspace may represent:

* a product
* an organization
* a research domain
* a personal operating context
* a client boundary
* a long-running initiative

A workspace is not required to map to a single filesystem directory.

It may reference multiple local repositories, document collections, applications, and external systems.

## Project

A project is a bounded body of work inside one workspace.

Projects provide narrower context and policy scope than the workspace.

A project may represent:

* a software repository
* a research initiative
* a product release
* a client engagement
* an operational objective
* a document collection

Projects inherit from their owning workspace but may further restrict access and behavior.

Projects must not silently broaden workspace permissions.

## Workflow

A workflow is the primary execution unit.

A workflow belongs to a workspace and may additionally belong to a project.

Workspace-level workflows are appropriate for work spanning multiple projects.

Project-level workflows are appropriate when execution should use a project's narrower context, resources, memory, and policy.

Every workflow execution must include:

* `workspace_id`
* `workflow_definition_id`
* `workflow_version_id`
* requesting principal
* resolved policy snapshot
* resolved capability snapshot

Project-scoped execution must additionally include:

* `project_id`

## Task

A task is a user-facing unit of intent or tracked work.

A task may be fulfilled by one or more workflow executions.

A task is not itself an execution primitive.

Tasks may be workspace-scoped or project-scoped.

## Artifact

An artifact is a durable object created, imported, referenced, or produced within a workspace.

Examples:

* documents
* source repositories
* workflow definitions
* reports
* datasets
* benchmark results
* execution outputs
* research findings
* memory records

Every artifact must have:

* immutable identity
* owning workspace
* artifact type
* lifecycle state
* provenance
* access classification
* timestamps

---

# Scope Model

## Scope Types

Damascus defines the following initial scopes:

* installation scope
* workspace scope
* project scope
* workflow execution scope
* private principal scope

Scope is represented as structured metadata, not as a naming convention.

Example:

```text
scope:
  workspace_id: ws_01...
  project_id: prj_01... | null
  execution_id: exe_01... | null
  principal_id: usr_01... | null
```

## Scope Resolution

Before any operation, Damascus must resolve:

1. requesting principal
2. active workspace
3. optional active project
4. requested resource
5. requested action
6. applicable policies
7. effective permissions
8. required approvals

The result is a scope and authorization context.

No capability should accept an unscoped request for user-owned data.

## Scope Inheritance

Projects inherit workspace defaults.

Inheritance may apply to:

* available capabilities
* default model routing policy
* memory retention defaults
* benchmark requirements
* resource budgets
* approval thresholds
* observability settings

Inheritance follows a restrictive model.

A child scope may:

* accept a parent default
* narrow a parent permission
* add a stricter approval requirement
* lower a budget
* disable a capability

A child scope may broaden authority only when an authorized principal explicitly grants the broader permission and the workspace policy allows delegation.

## Scope Precedence

When policies conflict, the most restrictive applicable policy wins unless a higher-authority policy explicitly defines an override.

Recommended precedence:

System Security Baseline
↓
Workspace Policy
↓
Project Policy
↓
Workflow Policy
↓
Execution Request

Lower layers may request less authority.

They may not assume more authority.

---

# Core Components

The Workspace System consists of:

Workspace System
├── Workspace Service
├── Project Service
├── Context Resolver
├── Scope Manager
├── Workspace Policy Binder
├── Resource Catalog
├── Workspace Activity Service
├── Lifecycle Coordinator
├── Import and Export Service
└── Workspace Repository

## Workspace Service

Purpose:

Manage workspace identity, metadata, configuration, and user-facing operations.

Responsibilities:

* create workspaces
* retrieve workspace metadata
* update mutable metadata
* select active workspace
* list workspace contents
* expose workspace status
* coordinate archive and restore

The Workspace Service does not enforce permissions independently.

Every operation must pass through Security Layer authorization.

## Project Service

Purpose:

Manage projects within workspaces.

Responsibilities:

* create projects
* bind resources to projects
* update project metadata
* resolve project ownership
* coordinate project archive, transfer, and restore
* list project workflows, memories, and activity

## Context Resolver

Purpose:

Produce an explicit, bounded context package for user interactions and workflow execution.

Inputs may include:

* principal identity
* selected workspace
* selected project
* user goal
* requested workflow
* interaction channel

Outputs include:

* resolved scope
* permitted resource references
* relevant policy references
* capability availability
* memory retrieval constraints
* knowledge retrieval constraints
* budget constraints
* approval requirements

The Context Resolver does not retrieve all memory or preload all workspace data.

It defines the boundaries within which dedicated systems may retrieve context.

## Scope Manager

Purpose:

Assign and validate ownership scope for durable artifacts and operations.

Responsibilities:

* validate parent-child relationships
* prevent orphaned projects and artifacts
* validate cross-scope references
* generate scope descriptors
* coordinate scope transfer
* enforce scope metadata requirements before persistence

The Scope Manager is an integrity component.

It is not the authorization engine.

## Workspace Policy Binder

Purpose:

Associate workspace and project resources with policies owned and enforced by the Security Layer.

Responsibilities:

* attach policy references
* resolve inherited policy bindings
* expose effective policy inputs
* version policy bindings
* record policy change provenance

Policy definitions should remain owned by the Security Layer.

The Workspace System owns the binding between policy and workspace resource.

## Resource Catalog

Purpose:

Maintain the workspace-facing catalog of resources available to projects and workflows.

Resources may include:

* local directories
* source repositories
* document collections
* applications
* external services
* datasets
* secrets references

The Resource Catalog stores metadata and references.

It must not duplicate source data unnecessarily.

Secret values must never be stored directly in the Resource Catalog.

## Workspace Activity Service

Purpose:

Provide a coherent user-facing view of workspace events, executions, approvals, failures, benchmark results, and evolution proposals.

The Activity Service is a projection over authoritative system events and records.

It does not replace Observability, Audit, or Event Bus storage.

## Lifecycle Coordinator

Purpose:

Coordinate multi-system lifecycle transitions for workspaces and projects.

Archiving a workspace affects:

* new execution admission
* scheduled workflows
* memory write behavior
* resource access
* search visibility
* retention processing

No single database update can safely implement this transition.

The Lifecycle Coordinator uses durable operations, idempotent steps, and compensating actions.

## Import And Export Service

Purpose:

Support portable, inspectable workspace backup and transfer.

Responsibilities:

* create export manifests
* validate imports
* detect identity conflicts
* migrate schemas
* verify checksums
* report unsupported capabilities
* preserve provenance

## Workspace Repository

Purpose:

Persist authoritative Workspace System metadata.

The Workspace Repository stores workspace-domain records.

It does not become the storage engine for every artifact owned by a workspace.

---

# Internal Architecture

## Service Boundary

The Workspace System exposes a runtime-independent application interface.

Illustrative interface:

```text
IWorkspaceService

create_workspace(command)
get_workspace(workspace_id)
update_workspace(workspace_id, patch, expected_version)
archive_workspace(workspace_id, reason)
restore_workspace(workspace_id)
export_workspace(workspace_id, export_policy)

create_project(workspace_id, command)
get_project(workspace_id, project_id)
archive_project(workspace_id, project_id, reason)
restore_project(workspace_id, project_id)

resolve_context(request)
list_activity(scope, filters)
```

All mutation operations require:

* authenticated principal
* authorization decision
* idempotency key
* expected version or conflict strategy
* correlation identifier
* audit metadata

## Integration Pattern

The Workspace System integrates through:

* synchronous APIs for validation and user-facing commands
* Event Bus events for cross-system propagation
* durable operation records for multi-system lifecycle transitions
* read projections for activity and summary views

Direct synchronous dependencies should be limited to decisions required before an operation can safely proceed.

Examples:

* authorization check before project creation
* scope validation before workflow submission
* policy resolution before execution admission

Events should be used for downstream reactions.

Examples:

* indexing a newly created project
* initializing project memory partitions
* updating activity views
* scheduling retention processing

## Consistency Model

Workspace identity, ownership, lifecycle state, and policy binding updates require strong consistency within the Workspace Repository.

Cross-system projections may be eventually consistent.

Examples of acceptable eventual consistency:

* activity feed updates
* search index updates
* usage summaries

Examples where eventual consistency is not sufficient:

* authorization decisions
* workspace ownership
* archived-state execution admission
* project-to-workspace containment
* deletion eligibility

## Concurrency Control

Workspace and project metadata updates should use optimistic concurrency control.

Every aggregate includes a monotonically increasing version.

Conflicting writes must:

1. fail without silently overwriting
2. return the current version
3. allow the caller to review or retry
4. emit a conflict event when operationally relevant

---

# Domain Data Model

## Workspace Record

Minimum fields:

```text
Workspace
  workspace_id
  display_name
  description
  owner_principal_id
  lifecycle_state
  classification
  default_policy_binding_id
  default_memory_policy_id
  default_execution_policy_id
  storage_profile_id
  created_at
  created_by
  updated_at
  updated_by
  version
```

## Project Record

Minimum fields:

```text
Project
  project_id
  workspace_id
  display_name
  description
  lifecycle_state
  classification
  policy_binding_id
  memory_policy_id
  execution_policy_id
  created_at
  created_by
  updated_at
  updated_by
  version
```

## Resource Binding

Minimum fields:

```text
ResourceBinding
  resource_binding_id
  workspace_id
  project_id | null
  resource_type
  resource_locator
  access_mode
  classification
  policy_binding_id
  verification_state
  created_at
  created_by
  version
```

## Policy Binding

Minimum fields:

```text
PolicyBinding
  policy_binding_id
  workspace_id
  project_id | null
  policy_reference
  policy_version
  binding_state
  effective_from
  created_at
  created_by
  version
```

## Scope Descriptor

Minimum fields:

```text
ScopeDescriptor
  workspace_id
  project_id | null
  workflow_definition_id | null
  execution_id | null
  principal_id | null
  classification
```

Scope descriptors may be passed between systems.

They are not authorization tokens.

## Identity Rules

System identifiers must:

* be globally unique within an installation
* remain stable across rename and path changes
* avoid embedding sensitive information
* avoid encoding mutable hierarchy
* support import collision handling

Human-readable slugs may be used for navigation.

Slugs must not be treated as authoritative identity.

---

# Storage Model

## Storage Philosophy

The Workspace System uses a federated storage model.

Workspace ownership is logical.

Storage is physically distributed across fit-for-purpose systems.

Example:

Workspace
├── Metadata → PostgreSQL
├── Working State → Redis
├── Semantic Retrieval → Qdrant
├── Relationships → Knowledge Graph
├── Large Artifacts → Local Filesystem or Object Store
├── Execution Traces → Observability Store
└── Secrets → Secret Store

This separation prevents the Workspace System from becoming a monolithic data store.

## Authoritative Metadata Store

PostgreSQL is the recommended authoritative store for:

* workspace records
* project records
* lifecycle state
* policy bindings
* resource metadata
* membership and role bindings
* import and export manifests
* durable lifecycle operations

Relational constraints should enforce:

* project ownership by a valid workspace
* unique immutable identifiers
* valid lifecycle transitions where practical
* non-null ownership
* versioned updates

## Working State Store

Redis may store:

* active workspace selection
* short-lived context resolution caches
* transient UI projections
* lifecycle operation locks
* execution admission caches

Redis must not be the sole authoritative store for workspace identity, ownership, policy, or lifecycle state.

Loss of Redis must degrade performance, not destroy ownership data.

## Vector Storage

Qdrant collections or partitions must include workspace and project scope metadata.

Vector retrieval filters must be applied before results are returned.

Post-retrieval filtering alone is insufficient because unauthorized data may influence ranking, logs, caches, or model context.

## Knowledge Graph Storage

Every workspace-owned graph node and relationship must be scope-addressable.

The graph must support questions such as:

* Which project produced this artifact?
* Which workflow execution created this memory?
* Which benchmark justified this promotion?
* Which resource was accessed by this execution?

Cross-workspace graph edges require explicit sharing authorization.

## Artifact Storage

Large or native artifacts should remain in appropriate local storage whenever possible.

Examples:

* source code remains in repositories
* documents remain in user-selected directories
* datasets remain in approved storage locations

The Workspace System stores:

* stable resource binding
* content identity or checksum where applicable
* provenance
* access policy reference
* indexing state

The Workspace System should not copy entire repositories or document stores merely to claim ownership.

## Secret Storage

Workspace and project records may reference secrets.

They must never contain secret values.

Secret references must resolve through the Security Layer or an approved secret-management provider.

## Storage Profiles

A workspace has a storage profile describing where its categories of data reside.

Example profiles:

* fully local
* local with encrypted remote backup
* organization-managed
* hybrid execution with local memory

A storage profile must expose:

* data locations
* encryption requirements
* backup policy
* retention policy
* synchronization policy
* supported export guarantees

Changing a storage profile is a controlled migration, not a metadata toggle.

## Portability Manifest

Workspace export must produce an inspectable manifest containing:

* workspace identity and metadata
* project hierarchy
* schema versions
* included artifact categories
* excluded artifact categories and reasons
* checksums
* policy references
* external resource references
* unresolved dependencies
* encryption metadata

Exports must distinguish:

* embedded data
* referenced data
* unavailable data
* intentionally excluded data

---

# Memory Scoping

## Memory Scope Is Mandatory

Every memory record must declare an owning scope.

Minimum ownership:

* `workspace_id`

Optional narrower ownership:

* `project_id`
* `workflow_definition_id`
* `execution_id`
* `principal_id`

Memory without an owning workspace is invalid unless it belongs to a narrowly defined installation-level system category.

## Memory Categories By Scope

### Working Memory

Typical scope:

* workflow execution
* project

Working memory is temporary and optimized for active reasoning.

It should expire or be summarized according to policy.

### Episodic Memory

Typical scope:

* workflow execution
* project
* workspace

Episodic memory records what happened.

Project episodes should not automatically become workspace-wide experiences.

Promotion may occur after review, summarization, classification, and policy checks.

### Semantic Memory

Typical scope:

* project
* workspace

Semantic memory records durable knowledge.

Project-specific facts remain project-scoped unless explicitly promoted.

### Procedural Memory

Typical scope:

* project
* workspace

Procedural memory records how work should be performed.

A procedure proven in one project may be proposed for workspace-wide use.

Promotion requires evidence and must preserve its benchmark and provenance links.

### Evolution Memory

Typical scope:

* project
* workspace

Evolution memory records:

* variants
* experiments
* benchmark outcomes
* promotion decisions
* rejected proposals
* rollback history

Evolution memory must remain immutable enough to support audit and comparison.

## Retrieval Rules

Default retrieval order for a project-scoped workflow:

1. execution working memory
2. project memory
3. permitted workspace memory
4. explicitly shared external memory

Retrieval must apply:

* scope filter
* permission filter
* classification filter
* retention state filter
* provenance and confidence criteria
* relevance ranking

Similarity does not override authorization.

## Memory Promotion

Memory promotion moves or derives knowledge from a narrower scope to a broader scope.

Example:

Project Episode
↓
Review and Summarize
↓
Validate Provenance
↓
Check Sensitive Data
↓
Approve Promotion
↓
Workspace Procedural Memory

Promotion creates a new versioned memory artifact with links to source memories.

It must not erase or silently mutate its source.

## Memory Demotion And Restriction

If a memory is found to contain sensitive, incorrect, or over-broad information, Damascus must support:

* quarantine
* scope restriction
* correction
* supersession
* deletion where policy permits

Derived memories and indexes must be discoverable so restrictions can propagate.

## Cross-Workspace Memory

Cross-workspace memory retrieval is denied by default.

Future sharing must use explicit grants describing:

* source workspace
* destination workspace
* allowed memory categories
* allowed actions
* duration
* revocation behavior
* downstream derivation rules

A memory copied into another workspace must retain provenance and sharing constraints.

---

# Permissions And Authority

## Security Ownership

The Security Layer owns:

* authentication
* authorization evaluation
* approval enforcement
* sandboxing
* secrets protection
* audit integrity

The Workspace System owns:

* resource ownership metadata
* membership bindings
* role bindings
* policy bindings
* requested scope
* user-facing permission management

The Workspace System must never treat its own role metadata as sufficient authorization without Security Layer evaluation.

## Principals

Initial principal types:

* human user
* local service
* workflow execution
* agent capability
* scheduled operation
* future organization identity

Agents are not users.

Agents act through workflow execution identities with delegated and bounded permissions.

## Roles

Recommended workspace roles:

### Owner

May:

* administer workspace
* manage membership and policies
* authorize export and deletion
* delegate authority
* approve critical changes

A workspace must always have at least one valid owner.

### Administrator

May:

* manage projects
* manage most policy bindings
* manage capability availability
* manage routine lifecycle operations

Administrators may not transfer ownership or bypass owner-only restrictions unless explicitly delegated.

### Contributor

May:

* create and modify project content
* create and run permitted workflows
* inspect permitted memory and results

### Operator

May:

* run approved workflows
* pause and resume executions
* respond to operational approvals

Operators may not modify workflow definitions unless separately permitted.

### Viewer

May:

* inspect permitted workspace resources
* view results and activity

View permission does not imply permission to retrieve all memories into a model context or export data.

### Auditor

May:

* inspect audit records, policies, promotion history, and execution traces

Auditor access should be read-only and independently logged.

## Permission Dimensions

Permissions should evaluate:

* principal
* action
* resource
* scope
* resource classification
* execution context
* policy version
* time or duration
* approval state

Example actions:

* workspace.read
* workspace.configure
* workspace.archive
* workspace.export
* workspace.delete
* project.create
* project.configure
* workflow.define
* workflow.execute
* workflow.cancel
* memory.read
* memory.write
* memory.promote
* resource.bind
* resource.execute
* benchmark.run
* evolution.promote

## Capability Grants

Availability and permission are separate.

A tool may be installed but unavailable in a workspace.

A tool may be available but not permitted for a project.

A tool may be permitted but require approval for a specific action.

Capability resolution:

Installed
↓
Workspace Available
↓
Project Available
↓
Workflow Requested
↓
Security Authorized
↓
Approval Satisfied
↓
Execution Granted

## Approval Policy

Critical actions may require human approval.

Examples:

* write access outside bound project resources
* external publication
* destructive filesystem operation
* secret use
* remote data transfer
* workspace export
* cross-workspace sharing
* evolution promotion to an active workflow

Approvals must bind to:

* exact action or action class
* requesting execution
* resource scope
* expiration
* approving principal
* relevant policy version

Approval for one action must not become general authority.

## Permission Revocation

Revocation must affect:

* new operations immediately
* queued executions before admission
* running executions at the next enforceable boundary
* cached context and credentials
* future scheduled work

The system must define which running actions can be interrupted safely.

Revocation must emit an auditable event.

---

# Workspace Lifecycle

## Workspace States

Minimum workspace lifecycle states:

* Provisioning
* Active
* Suspended
* Archiving
* Archived
* Restoring
* Deletion Pending
* Deleting
* Deleted
* Recovery Required

## Create

Workspace creation flow:

Request
↓
Authorize
↓
Validate Name And Storage Profile
↓
Create Stable Identity
↓
Create Metadata Record
↓
Bind Default Policies
↓
Initialize Storage Partitions
↓
Initialize Audit And Activity Projections
↓
Activate

Creation must be idempotent.

Partial creation must transition to `Recovery Required` or be compensated safely.

## Active

An active workspace accepts permitted:

* project operations
* workflow submissions
* scheduled executions
* memory reads and writes
* capability configuration
* benchmark and evolution operations

## Suspended

Suspension is a reversible safety or administrative state.

While suspended:

* new executions are denied
* scheduled executions do not start
* running executions are paused or cancelled according to policy
* read access may remain available
* configuration access is restricted
* recovery and audit operations remain available

Suspension should be used for:

* suspected compromise
* policy violation
* storage failure
* owner-requested pause

## Archive

Archiving preserves a workspace while removing it from active operation.

Archive flow:

Request
↓
Authorize
↓
Create Archive Plan
↓
Stop New Execution Admission
↓
Resolve Running And Scheduled Work
↓
Flush Durable State
↓
Verify Storage And Index State
↓
Mark Archived

Archived workspaces:

* reject new workflow execution
* retain history and memory according to policy
* remain inspectable
* may be exported
* may be restored

Archiving is not deletion.

## Restore

Restore flow:

Request
↓
Authorize
↓
Validate Data Integrity
↓
Validate Capability And Policy Compatibility
↓
Rebuild Required Projections
↓
Re-enable Resource Bindings
↓
Activate

Restore must report:

* unavailable models
* unavailable tools
* broken resource references
* incompatible policy versions
* missing storage backends

A workspace must not silently become active with reduced security.

## Delete

Deletion is staged.

Recommended flow:

Deletion Requested
↓
Owner Approval
↓
Impact Report
↓
Retention And Legal Checks
↓
Deletion Pending Grace Period
↓
Final Confirmation
↓
Delete Or Cryptographically Erase Data
↓
Delete Derived Indexes And Caches
↓
Retain Minimal Tombstone And Audit Record

Deletion must account for:

* memories
* knowledge graph nodes and edges
* vector indexes
* workflow definitions
* execution traces
* artifacts
* exports and backups
* shared references
* scheduled operations

The deletion report must distinguish fully deleted, retained by policy, externally referenced, and failed-to-delete data.

## Transfer

Future workspace ownership transfer requires:

* current owner authorization
* destination owner acceptance
* policy compatibility validation
* secret and external resource reauthorization
* complete audit record

Ownership transfer must not automatically transfer external credentials.

---

# Project Lifecycle

## Project States

Minimum project lifecycle states:

* Draft
* Active
* Suspended
* Archived
* Deletion Pending
* Deleted
* Recovery Required

## Project Creation

Project creation requires:

* owning workspace
* project identity
* initial classification
* inherited or explicit policies
* authorized creator

Resource binding is optional at creation.

A project may begin as an organizational context before files or repositories are attached.

## Project Activation

Before activation, Damascus should validate:

* policy bindings
* resource bindings
* memory partition readiness
* requested capability availability
* project classification

## Project Archive

Archiving a project:

* blocks new project-scoped executions
* disables project schedules
* preserves project memory and history
* leaves workspace-level operations active

Workspace-level workflows must not accidentally access archived project resources without explicit authorization.

## Project Transfer

Initial architecture should support moving a project between workspaces only as a controlled export and import operation.

It must not be implemented as changing `workspace_id` on the project row.

Transfer affects:

* memory scope
* knowledge relationships
* policy bindings
* workflow ownership
* benchmark history
* resource access
* evolution history
* audit records

The source workspace must retain appropriate provenance and tombstone records.

---

# Data Flow

## User Interaction Flow

User Request
↓
Authenticate Principal
↓
Resolve Active Workspace
↓
Resolve Optional Project
↓
Resolve Context Boundaries
↓
Authorize Requested Operation
↓
Route To Workspace Operation Or Workflow
↓
Record Audit And Activity
↓
Return Result

## Workflow Submission Flow

User Goal
↓
Workspace Context Resolver
↓
Select Or Create Workflow Definition
↓
Resolve Workspace And Project Scope
↓
Resolve Policies And Capability Availability
↓
Security Authorization And Approvals
↓
Submit Workflow To Damascus Core
↓
Core Schedules And Executes Through Runtime Interface
↓
Observability Captures Trace
↓
Memory Layer Stores Approved Learnings
↓
Evolution Layer Evaluates Evidence
↓
Workspace Activity View Updates

The Workspace System does not pass unrestricted workspace data into execution.

It passes explicit references, boundaries, and resolved policy context.

## Project Resource Binding Flow

Bind Resource Request
↓
Authorize
↓
Validate Resource Locator
↓
Classify Resource
↓
Determine Allowed Access Mode
↓
Create Policy Binding
↓
Verify Access
↓
Create Catalog Entry
↓
Emit ResourceBound Event
↓
Index According To Policy

## Memory Write Flow

Workflow Observation
↓
Classify Memory Candidate
↓
Resolve Owning Scope
↓
Apply Memory Policy
↓
Security And Sensitive Data Checks
↓
Write To Memory Layer
↓
Update Vector And Graph Representations
↓
Emit MemoryStored Event
↓
Expose Through Workspace Activity

## Evolution Promotion Flow

Observed Execution History
↓
Evolution Layer Generates Variant
↓
Benchmark In Authorized Scope
↓
Compare Against Baseline
↓
Produce Evidence And Promotion Proposal
↓
Workspace Displays Proposal
↓
Required Human Approval
↓
Registry Updates Promoted Workflow Version
↓
Evolution Memory Records Decision

The Workspace System provides the governance context for promotion.

It does not decide whether a variant is technically superior.

---

# Events

Recommended Workspace System events:

* WorkspaceProvisioningStarted
* WorkspaceCreated
* WorkspaceUpdated
* WorkspaceSuspended
* WorkspaceArchiveStarted
* WorkspaceArchived
* WorkspaceRestoreStarted
* WorkspaceRestored
* WorkspaceDeletionRequested
* WorkspaceDeleted
* WorkspaceRecoveryRequired
* ProjectCreated
* ProjectUpdated
* ProjectSuspended
* ProjectArchived
* ProjectRestored
* ProjectDeletionRequested
* ProjectDeleted
* ResourceBound
* ResourceBindingUpdated
* ResourceUnbound
* WorkspacePolicyBindingChanged
* ProjectPolicyBindingChanged
* WorkspaceMembershipChanged
* CrossWorkspaceShareGranted
* CrossWorkspaceShareRevoked

Every event must include:

* event identifier
* event type and schema version
* workspace identifier
* optional project identifier
* actor principal
* correlation identifier
* causation identifier
* timestamp
* aggregate version
* non-sensitive change summary

Events must not contain secret values or unrestricted artifact content.

---

# Lifecycle Operation Reliability

Workspace and project lifecycle transitions span multiple subsystems.

They should use durable sagas or equivalent coordinated operations.

Example archive operation:

1. Record archive intent.
2. Deny new execution admission.
3. Pause or cancel schedules.
4. resolve running executions.
5. Flush memory and observability writes.
6. Update indexes and projections.
7. Mark workspace archived.
8. Emit completion event.

Each step must be:

* idempotent
* observable
* retryable where safe
* associated with a durable operation record

Compensation must not falsely claim that irreversible actions were undone.

---

# Failure Modes

## Metadata Store Unavailable

Impact:

Workspace identity, scope, and policy bindings cannot be trusted.

Required behavior:

* deny new mutation and execution admission
* avoid relying on stale authorization caches
* preserve already running work only when its signed policy snapshot remains valid
* surface degraded state

## Partial Workspace Provisioning

Impact:

Workspace metadata exists but one or more storage partitions or policy bindings are missing.

Required behavior:

* do not activate workspace
* mark `Recovery Required`
* retry idempotent initialization
* provide an operator-visible failure report

## Scope Leakage

Impact:

Data from one project or workspace becomes visible to another.

This is a critical security incident.

Required behavior:

* stop affected retrieval or execution
* revoke relevant caches and credentials
* quarantine derived outputs
* identify impacted records through provenance
* notify authorized users
* preserve audit evidence

## Stale Policy Cache

Impact:

An execution may operate using outdated authority.

Required behavior:

* use short-lived or version-bound authorization decisions
* revalidate before critical actions
* invalidate on policy change events
* stop or pause affected executions when required

## Resource Path Moved Or Removed

Impact:

A bound local resource can no longer be resolved.

Required behavior:

* mark binding unavailable
* do not silently bind a different resource at the same path
* verify identity using repository identity, checksum, or configured method
* request user repair

## Workspace Archive Interrupted

Impact:

Some subsystems consider the workspace archived while others remain active.

Required behavior:

* keep execution admission closed
* resume the durable archive operation
* report subsystem state
* require recovery before declaring completion

## Memory Index Divergence

Impact:

Authoritative memory differs from vector or graph indexes.

Required behavior:

* treat authoritative records as source of truth
* quarantine uncertain retrieval results
* rebuild affected indexes
* verify scope filters before restoring service

## Import Conflict

Impact:

Imported identities, policies, or capabilities conflict with the destination installation.

Required behavior:

* do not partially activate import
* create a conflict report
* remap identities explicitly
* preserve original provenance
* require approval for policy substitutions

## Orphaned Artifact

Impact:

An artifact references a missing workspace or project.

Required behavior:

* quarantine the artifact
* block normal retrieval
* attempt ownership reconstruction from provenance and audit data
* require authorized repair or deletion

## Owner Loss

Impact:

No valid owner remains available.

Required behavior:

* prevent removal of the final owner during normal operation
* support a separately governed recovery procedure
* log all emergency ownership recovery actions

## Storage Capacity Exhausted

Impact:

Writes, checkpoints, exports, or lifecycle operations may fail.

Required behavior:

* stop admitting operations requiring unavailable durable storage
* preserve integrity over availability
* surface category-specific usage
* allow authorized cleanup and export

---

# Recovery Mechanisms

## Durable Operation Journal

Every multi-system lifecycle operation must have a durable journal recording:

* requested transition
* actor
* current step
* completed steps
* failed steps
* retry count
* compensating actions
* final outcome

## Reconciliation

Periodic reconciliation should detect:

* projects without workspaces
* artifacts without valid scope
* mismatched lifecycle states
* stale indexes
* policy binding version drift
* active schedules in archived scopes
* unresolved deletion records

Reconciliation may propose or execute safe repairs.

It must not silently broaden permissions or reassign ownership.

## Backup And Restore

Backup policy must be defined by storage profile.

Backups should include:

* authoritative workspace metadata
* policy bindings
* memory records
* graph data
* workflow definitions and versions
* benchmark and evolution history
* required audit records

Backups must be encrypted and restorable without dependence on a specific model or runtime provider.

Restore must verify:

* checksums
* schema compatibility
* scope integrity
* policy compatibility
* required encryption keys

## Index Rebuild

Vector, graph, search, and activity projections must be rebuildable from authoritative data and event history where possible.

No derived index should be the only source of workspace ownership or provenance.

## Safe Mode

When integrity cannot be established, a workspace enters safe mode or `Recovery Required`.

Safe mode permits:

* inspection
* export where safe
* audit access
* repair operations

Safe mode denies:

* normal workflow execution
* memory promotion
* capability expansion
* destructive actions unrelated to repair

---

# Security Considerations

## Local-First Security

Local-first does not mean automatically trusted.

Local processes, plugins, models, and tools may still be compromised or over-privileged.

Workspace boundaries must be enforced even on a single-user local installation.

## Data Classification

Workspaces, projects, resources, artifacts, and memories should support classification.

Initial classifications may include:

* public
* internal
* confidential
* restricted

Classification affects:

* eligible models
* remote transmission
* tool access
* export behavior
* retention
* sharing
* logging redaction

## Model Data Egress

Before workspace data is sent to a model provider, the Model Layer and Security Layer must evaluate:

* workspace policy
* project policy
* data classification
* provider capability and location
* user approval requirements
* redaction requirements

Selecting a cloud model must never silently authorize data egress.

## Tool Access

Workspace resource bindings define potential tool targets.

They do not grant unrestricted tool access.

Tool calls must remain scoped to:

* permitted action
* permitted resource
* permitted workflow execution
* permitted duration

## Prompt Injection And Untrusted Content

Documents, repositories, websites, and imported memories may contain adversarial instructions.

Workspace context resolution must preserve trust metadata.

Untrusted content must not modify policies, grant permissions, approve actions, or redefine workspace ownership.

## Audit

Critical workspace actions must be auditable.

Audit records should cover:

* membership and role changes
* policy binding changes
* resource bindings
* approvals
* exports
* lifecycle transitions
* cross-workspace sharing
* evolution promotions
* memory promotion and deletion

Audit records must be protected from ordinary workspace mutation.

## Encryption

Sensitive workspace data should be encrypted:

* at rest
* in transit
* in exports
* in backups

Future multi-user workspaces may require workspace-specific encryption keys and key rotation.

Key destruction may support cryptographic erasure where physical deletion cannot be guaranteed.

---

# Observability And Auditability

The Workspace System must expose operational and learning visibility without duplicating the Observability Layer.

Workspace-facing views should include:

* active executions
* queued and scheduled work
* approvals required
* recent failures
* resource access
* memory changes
* benchmark outcomes
* evolution proposals and promotions
* policy changes
* storage health

Every workflow trace must resolve to:

* owning workspace
* optional owning project
* workflow definition and version
* effective policy snapshot
* requesting principal

Workspace activity is a projection.

Audit is an integrity record.

Observability is operational and learning infrastructure.

These concerns must not be conflated.

---

# Performance And Scalability

## Context Loading

Opening a workspace must not load every project, memory, artifact, or trace.

Workspace interfaces should use:

* paginated catalogs
* bounded summaries
* lazy retrieval
* scoped search
* cached projections

## Large Workspaces

The architecture must support workspaces containing:

* many projects
* long execution histories
* large memory collections
* multiple resource types
* many workflow versions

Operations must avoid unbounded scans.

## Execution Isolation

Resource budgets and concurrency limits should be configurable per workspace and project.

The Scheduler enforces these limits.

The Workspace System provides the applicable bindings and user-facing configuration.

## Derived Views

Activity feeds, summaries, search, and dashboards should be derived views.

They may be rebuilt.

Core ownership and permission decisions must not depend on them.

---

# Future Multi-Workspace Support

## Initial Position

The initial architecture may optimize for one active user and a small number of local workspaces.

It must still model workspaces as isolated, stable identities from the beginning.

Retrofitting isolation after data, memory, and permissions have been stored globally is unsafe.

## Multiple Active Workspaces

Future Damascus versions may allow:

* multiple open workspaces
* background workflows across workspaces
* workspace-specific model and tool policies
* workspace-specific storage profiles
* aggregate system activity views

Every background operation must retain its owning workspace context.

The currently visible workspace must not affect the authority of an already running workflow.

## Cross-Workspace Operations

Cross-workspace operations must be represented explicitly.

Examples:

* compare findings from two research workspaces
* share an approved workflow template
* copy a procedural memory
* run an installation-level maintenance workflow

Such operations require:

* source authorization
* destination authorization
* declared transfer type
* data classification check
* provenance preservation
* auditable result

A cross-workspace workflow should use a dedicated federated scope rather than pretending to belong fully to one project.

## Shared Assets

Future shared assets may include:

* workflow templates
* benchmark definitions
* tool configurations
* approved procedures

Shared assets must distinguish:

* reference
* copy
* fork
* synchronized dependency

Promotion into a shared catalog must be controlled and benchmark-supported.

Shared assets may not contain workspace-private memories by default.

## Organizations And Teams

Future organizational support may add:

Installation
└── Organization
    └── Workspace
        └── Project

Organization support must not require changing the fundamental workspace and project identities.

Organization policy may add a stricter parent policy layer.

It must not weaken workspace or system security baselines.

## Remote Synchronization

Remote synchronization is optional.

Synchronization must define:

* authoritative replica
* conflict resolution
* encryption
* offline behavior
* deletion propagation
* policy propagation
* audit merging
* unsupported artifact handling

Last-write-wins is not acceptable for ownership, policy, permission, or lifecycle state.

## Federated Workspaces

Long-term Damascus deployments may federate across devices or installations.

Federation requires:

* globally stable identities
* trusted installation identities
* signed policy and provenance records
* explicit sharing contracts
* revocation semantics
* conflict-aware synchronization

Federation must remain optional and must not compromise local operation.

---

# Architectural Constraints

## Constraint 1

Workspace is the primary user-facing abstraction.

It is not the primary execution unit.

## Constraint 2

Projects exist inside exactly one owning workspace in the initial architecture.

## Constraint 3

Every user-owned durable artifact must resolve to an owning workspace.

## Constraint 4

Every workflow execution must declare workspace scope before admission.

## Constraint 5

Workspace concepts must remain independent of runtime implementations.

No LangGraph-specific concept may appear in the Workspace System public contract.

## Constraint 6

The Workspace System may bind policies.

It may not bypass Security Layer enforcement.

## Constraint 7

The Workspace System may coordinate execution.

It may not execute workflows outside Damascus Core.

## Constraint 8

Memory retrieval must apply scope restrictions before returning results.

## Constraint 9

Cross-workspace access is denied by default.

## Constraint 10

Project policy may restrict inherited workspace authority.

It may not silently broaden it.

## Constraint 11

Workspace deletion must be staged, auditable, and capable of reporting retained data.

## Constraint 12

Storage paths and display names are not identities.

## Constraint 13

Secrets must not be stored directly in workspace metadata.

## Constraint 14

Derived indexes and views may not become authoritative sources of ownership or permission.

## Constraint 15

Evolution may propose and promote workflow improvements only through authorized, benchmark-supported processes.

It may not modify workspace security policies.

## Constraint 16

Human authority remains final for critical workspace actions.

---

# Implementation Guidance

## Recommended Initial Scope

The first production implementation should support:

* multiple local workspaces
* one owner principal per installation with future-ready membership tables
* projects contained by workspaces
* stable workspace and project identifiers
* PostgreSQL authoritative metadata
* explicit scope metadata on workflow, memory, and artifact records
* workspace and project archive and restore
* role and policy bindings
* local resource catalog
* export manifest generation
* audit events for critical operations

## Deferred Capabilities

The following may be deferred without weakening the core model:

* real-time collaboration
* organization hierarchy
* remote synchronization
* federated workspaces
* cross-workspace workflow execution
* project transfer between workspaces
* shared workflow marketplace

They must not be simulated through unsafe shortcuts.

## Schema Evolution

Workspace schemas must be versioned.

Migrations must preserve:

* stable identity
* ownership
* lifecycle history
* policy bindings
* memory scope
* provenance

Migration failure must leave the workspace recoverable.

## Validation Tests

Minimum architectural test categories:

* project cannot exist without workspace
* archived workspace rejects execution
* project scope cannot retrieve sibling project memory by default
* workspace rename does not change identity
* path reuse does not silently rebind resources
* policy revocation affects queued work
* import preserves provenance and detects conflicts
* deletion identifies and removes derived indexes
* runtime adapter changes do not affect workspace contracts
* cross-workspace access is denied without explicit grant

---

# Future Evolution

The Workspace System may evolve to support:

* multi-user collaborative workspaces
* organization-level governance
* workspace federation across devices
* encrypted remote synchronization
* capability marketplaces
* portable workflow and procedure sharing
* workspace templates
* autonomous workspace maintenance workflows
* adaptive resource budgeting
* richer policy simulation
* project portfolio reasoning
* privacy-preserving cross-workspace learning

Future evolution must preserve the foundational boundary:

The workspace is user-owned context and governance.

It is not an autonomous authority above the user.

## Privacy-Preserving Shared Learning

Future Damascus versions may learn patterns across workspaces.

This must not mean unrestricted pooling of memory.

Possible approaches include:

* sharing benchmark aggregates
* sharing redacted procedural variants
* sharing explicitly published workflow templates
* local evaluation of externally proposed improvements

Cross-workspace learning must remain evidence-based, provenance-aware, and opt-in.

## Workspace-Level Evolution

Future evolution may improve:

* default workflow selection
* project templates
* resource allocation strategies
* memory retrieval strategies
* approval routing

Such improvements must:

* be benchmarked
* be inspectable
* preserve security constraints
* support rollback
* require appropriate promotion authority

---

# Open Questions

## Workspace Versus Organization

Should organization become a first-class parent of workspace, or should organization membership remain an external identity and policy concern?

## Private Memory

How should private principal-scoped memory behave inside a collaborative workspace?

Who may administer, export, or delete it?

## Cross-Workspace Workflow Scope

Should cross-workspace workflows use a dedicated federated scope, or should they execute as linked child workflows within each participating workspace?

## Project Transfer

What evidence and approval are required to move a project and its learned procedures to another workspace?

## Shared Procedural Memory

When a procedure is promoted across workspaces, should it remain linked to its source, become an independent fork, or support both modes?

## Export Completeness

What guarantees can Damascus make when a workspace references external resources that cannot be embedded or redistributed?

## Deletion And Backups

How should user deletion requests interact with immutable audit requirements and offline backups?

## Encryption Keys

Should each workspace receive a distinct encryption key from the first implementation, or should this be introduced with multi-user support?

## Active Workspace Semantics

Should Damascus permit only one interactive active workspace at a time while allowing background work in others?

## Workspace Templates

Which workspace configuration elements may be templated without accidentally copying private memory, credentials, or policy exceptions?

## Installation-Level Memory

Which, if any, learning is safe and valuable at installation scope?

How is it prevented from leaking workspace-specific information?

## Policy Simulation

Should users be able to preview how policy changes would affect running workflows, schedules, capabilities, and memory retrieval before applying them?

---

# Key Architectural Decisions

The Workspace System is the primary user-facing abstraction of Damascus.

Projects exist inside workspaces.

Workflows remain the primary execution unit.

Damascus Core remains the execution coordination system.

Security Layer remains the policy enforcement authority.

Memory Layer remains the memory infrastructure.

The Workspace System binds these systems together through explicit ownership, context, scope, policy, and lifecycle.

The defining hierarchy is:

User
↓
Workspace
↓
Project
↓
Workflow
↓
Execution
↓
Evaluation
↓
Learning
↓
Evolution
↓
Improved Execution

The Workspace System ensures that this improvement remains relevant to the user's body of work, isolated from unrelated contexts, measurable, inspectable, reversible, and under human authority.
