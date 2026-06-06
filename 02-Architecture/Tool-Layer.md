# Tool-Layer.md

Version: 0.1

Status: Architecture Foundation

Priority: Critical

---

# Purpose

This document defines the Damascus Tool Layer.

The Tool Layer provides controlled, observable, permission-bound interaction with applications, filesystems, terminals, browsers, IDEs, version control systems, containers, APIs, and future tool protocols.

Tools are first-class execution primitives inside workflows.

They are not informal extensions attached only to agents.

A workflow may invoke a tool directly, through an agent node, through a deterministic node, or through a future execution primitive.

The Tool Layer exists to make real-world action:

* explicit
* discoverable
* permission-bound
* isolated
* auditable
* recoverable
* benchmarkable

---

# Design Philosophy

## Tools Are First-Class Execution Primitives

Damascus workflows may contain:

Workflow
├── Model Node
├── Agent Node
├── Tool Node
├── Human Approval Node
├── Benchmark Node
└── Future Node

Tools do not require an agent to be valid workflow components.

## Capability Is Not Authority

A registered tool describes what Damascus can potentially do.

Registration does not grant permission to use it.

Discovery does not grant permission.

Model selection does not grant permission.

A tool invocation requires explicit authorization in the active scope.

## Isolation By Default

Tool execution interacts with systems that may be damaged, compromised, or sensitive.

Every tool must execute within an isolation profile appropriate to its risk.

Unrestricted host execution is exceptional and requires explicit authority.

## Structured Actions

Tools expose typed operations and typed inputs.

Damascus should prefer:

```text
git.commit(message, paths)
```

over:

```text
run arbitrary shell string
```

when an appropriate structured tool exists.

General tools remain necessary, but they carry broader permissions and higher risk.

## Observable Effects

Tool success is not merely a successful process exit.

The Tool Layer should capture intended and observed effects where practical.

## Human Authority

Critical actions must remain inspectable, approvable, cancellable where possible, and auditable.

---

# Responsibilities

The Tool Layer owns:

* normalized Tool Interface
* tool definitions and versions
* tool-specific registry schema
* tool discovery and capability metadata
* invocation validation
* execution adapter coordination
* isolation profile selection inputs
* typed result normalization
* tool lifecycle
* tool health
* retry and failure classification
* tool telemetry and effect reporting
* audit event generation inputs

The Tool Layer coordinates with:

* Core for workflow execution
* Runtime Interface for tool-node invocation
* Workspace System for resource scope
* Security Layer for authorization, approvals, and sandbox policy
* Execution Environment for process and environment isolation
* Registry Layer for discovery metadata
* Observability Layer for traces and telemetry
* Benchmark Registry for tool evaluation
* Evolution Layer for controlled tool-selection improvement

---

# Non-Responsibilities

The Tool Layer does not own:

* workflow orchestration
* user authentication
* security policy definitions
* permission approval decisions
* operating system isolation implementation
* model reasoning
* memory storage
* external application correctness
* benchmark definitions
* evolution promotion decisions

The Tool Layer requests isolation.

The Execution Environment implements isolation.

The Tool Layer provides action and scope metadata.

The Security Layer authorizes and enforces permission policy.

---

# Architectural Principles

## TL-001 Explicit Invocation

Every tool action must be represented as a typed invocation.

## TL-002 Least Authority

Each invocation receives the minimum permissions, resources, credentials, and duration required.

## TL-003 Tool Identity

Every tool and operation has stable, versioned identity.

## TL-004 Scoped Effects

Tool actions must be bounded to authorized workspace, project, resource, and execution scope.

## TL-005 Isolation Appropriate To Risk

Isolation requirements are determined by action risk, not convenience.

## TL-006 Observable Execution

Inputs, decisions, outputs, effects, failures, and approvals must be attributable.

## TL-007 Structured Before General

Prefer narrow structured tools over broad interpreters when both satisfy the task.

## TL-008 No Implicit Tool Authority

Model output and agent intent are requests, not authorization.

## TL-009 Replaceable Implementations

Workflows depend on tool contracts, not a specific operating system command or vendor integration.

## TL-010 Measured Reliability

Tool selection and evolution use observed, benchmarked evidence.

---

# High-Level Architecture

Workflow Node
↓
Damascus Core
↓
Tool Invocation Interface
↓
Tool Resolution And Validation
├── Tool Registry
├── Workspace Resource Catalog
├── Security Authorization
└── Isolation Policy
↓
Tool Execution Coordinator
↓
Execution Environment
↓
Tool Adapter
↓
External System
↓
Result And Effect Normalization
↓
Audit, Telemetry, And Workflow Result

---

# Core Components

Tool Layer
├── Tool Invocation Service
├── Tool Registry
├── Tool Discovery Service
├── Tool Resolver
├── Permission And Approval Coordinator
├── Tool Execution Coordinator
├── Isolation Profile Resolver
├── Result And Effect Normalizer
├── Tool Health Monitor
├── Tool Telemetry Publisher
└── Tool Lifecycle Manager

## Tool Invocation Service

The stable entry point for all tool actions.

It validates:

* tool and operation identity
* input schema
* workflow execution context
* resource scope
* authorization context
* isolation requirements
* idempotency and retry policy

## Tool Resolver

Resolves a capability request or pinned tool reference to an eligible tool definition.

Resolution may consider:

* required operation
* supported resource type
* operating environment
* permissions
* reliability
* latency
* benchmark evidence

## Permission And Approval Coordinator

Collects the exact action, resource, scope, and effect class needed by the Security Layer.

It does not approve its own request.

## Tool Execution Coordinator

Coordinates invocation with the Execution Environment and selected adapter.

Responsibilities:

* create execution request
* provision scoped credentials
* enforce timeout
* stream output
* propagate cancellation
* normalize completion
* record observed effects

## Isolation Profile Resolver

Maps invocation risk and policy to an isolation profile.

It may request:

* process isolation
* container isolation
* network restrictions
* filesystem restrictions
* disposable browser profile
* credential scoping
* resource limits

The Execution Environment implements the profile.

## Result And Effect Normalizer

Normalizes tool-specific results into:

* status
* typed output
* stdout and stderr references
* produced artifacts
* observed effects
* warnings
* failure type
* provenance

---

# Tool Interface

## Tool Contract

Every tool implements a stable Damascus interface.

Illustrative contract:

```text
ITool

definition()
operations()
validate_configuration()
health_check()
estimate_effects(operation, input, context)
execute(operation, input, execution_context)
cancel(tool_execution_id)
```

Optional lifecycle methods:

```text
prepare(execution_context)
cleanup(tool_execution_id)
rollback(tool_execution_id, rollback_context)
```

Rollback is optional and must never be claimed when effects are irreversible.

## Tool Definition

```text
ToolDefinition
  tool_id
  tool_version
  display_name
  category
  adapter_type
  operations
  required_permissions
  isolation_requirements
  supported_environments
  lifecycle_state
  reliability_profile
  benchmark_summary
```

## Operation Definition

```text
ToolOperation
  operation_id
  description
  input_schema
  output_schema
  effect_class
  idempotency_class
  reversibility_class
  required_permissions
  default_timeout
  isolation_requirements
```

## Invocation Request

```text
ToolInvocationRequest
  invocation_id
  workspace_id
  project_id | null
  workflow_execution_id
  node_execution_id
  tool_id_or_capability_request
  operation_id
  input
  resource_bindings
  permission_context
  approval_references
  isolation_policy_reference
  timeout
  idempotency_key | null
  trace_context
```

## Invocation Result

```text
ToolInvocationResult
  invocation_id
  resolved_tool_id
  resolved_tool_version
  status
  typed_output
  produced_artifacts
  observed_effects
  warnings
  telemetry
  failure | null
  provenance
```

## Effect Classes

Initial effect classes:

* ReadOnly
* Create
* Modify
* Delete
* Execute
* NetworkTransmit
* ExternalPublish
* CredentialUse
* PrivilegeChange

An operation may have multiple effect classes.

## Idempotency Classes

* Idempotent
* IdempotentWithKey
* ConditionallyIdempotent
* NonIdempotent
* Unknown

Retry behavior depends on this classification.

## Reversibility Classes

* Reversible
* Compensatable
* Irreversible
* Unknown

Critical irreversible operations require stronger approval and audit.

---

# Tool Registry

## Purpose

The Tool Registry stores metadata required to discover and resolve tool capabilities.

It is a discovery system.

It is not an authorization engine or execution environment.

## Registry Contents

The Registry stores:

* tool definitions
* operation definitions
* versions
* capability tags
* supported environments
* required permissions
* isolation requirements
* health state
* reliability summaries
* benchmark references
* deprecation state

## Stable Identity

Tool identity is independent of:

* executable path
* container image tag
* API endpoint
* display name

Those are implementation configuration.

## Registry Lifecycle States

* Discovered
* Unverified
* Active
* Degraded
* Disabled
* Deprecated
* Retired
* Quarantined

Quarantined tools cannot execute until reviewed and reactivated.

## Registry Ownership

The Core Registry Layer provides common registry infrastructure.

The Tool Layer owns tool-specific schema, validation, discovery, and lifecycle semantics.

---

# Tool Categories

## Browser Tools

Capabilities may include:

* navigate
* search
* read page
* interact with page
* download
* submit forms
* capture screenshot

Security concerns:

* untrusted content
* prompt injection
* credential leakage
* downloads
* external publication
* session isolation

Browser sessions should use isolated profiles by default.

## File System Tools

Capabilities may include:

* read
* list
* search
* create
* modify
* move
* delete

Filesystem access must use bound resources or explicit approved paths.

Path normalization must prevent traversal and symbolic-link escape.

## Terminal Tools

Capabilities may include:

* execute command
* stream output
* manage process
* inspect environment

Terminal tools are broad-capability tools.

They require strict isolation, command auditing, resource limits, and scoped working directories.

Structured tools should be preferred where practical.

## IDE Tools

Capabilities may include:

* inspect diagnostics
* navigate symbols
* apply edits
* format
* run tests
* invoke language services

IDE tools must distinguish editor state from filesystem state and report unsaved or conflicting changes.

## Git Tools

Capabilities may include:

* inspect status
* view history
* diff
* create branch
* stage
* commit
* fetch
* push
* open review requests through integrations

Remote writes, force operations, history rewrites, and destructive cleanup require elevated policy.

Git operations must preserve user changes unless explicitly authorized.

## Docker Tools

Capabilities may include:

* build image
* run container
* inspect container
* view logs
* stop container
* manage compose applications

Container execution is not automatically safe.

Privileged containers, host mounts, socket mounts, and broad network access require explicit restrictions.

## API Tools

Capabilities may include structured calls to approved external services.

API tools must define:

* endpoint classes
* methods
* schemas
* credentials
* rate limits
* data classifications
* side-effect semantics

Generic HTTP tools are broad-capability tools and require stricter permissions.

## Future MCP Tools

Future Model Context Protocol tools may be integrated through an MCP adapter.

MCP tool metadata remains untrusted until:

* discovered
* inspected
* mapped to Damascus permission and effect classes
* assigned an isolation policy
* approved

MCP does not replace Damascus authorization, auditing, isolation, or lifecycle controls.

Provider-specific MCP concepts must terminate at the adapter boundary.

---

# Tool Discovery

## Discovery Sources

Tools may be discovered from:

* built-in Damascus capabilities
* installed adapters
* local executables
* IDE integrations
* container images
* configured APIs
* future MCP servers
* approved plugin packages

## Discovery Flow

Discover Candidate
↓
Extract Metadata
↓
Verify Source And Identity
↓
Inspect Operations And Schemas
↓
Classify Effects And Permissions
↓
Assign Isolation Requirements
↓
Validate In Controlled Environment
↓
Register As Unverified Or Active

Discovery must not automatically activate execution authority.

## Workflow Discovery

Workflows may request:

* a pinned tool version
* a named tool capability
* an operation class

The Tool Resolver returns only eligible tools authorized in the active scope.

## Capability Matching

Capability matching uses structured metadata.

It must not rely solely on natural-language descriptions generated by a tool provider.

---

# Tool Permissions

## Permission Model

Tool permission evaluation includes:

* principal
* workflow execution identity
* tool
* operation
* resource
* effect class
* workspace and project scope
* data classification
* isolation profile
* approval state
* duration

## Authorization Flow

Invocation Requested
↓
Resolve Tool And Operation
↓
Resolve Resource Scope
↓
Estimate Effects
↓
Security Layer Evaluates Policy
↓
Collect Required Approval
↓
Issue Bounded Execution Grant
↓
Execute

## Execution Grants

A grant should bind:

* exact tool and operation
* resource scope
* effect classes
* workflow execution
* expiration
* credential references
* isolation requirements

Grants must not be reusable across unrelated workflows.

## Approval Boundaries

Actions commonly requiring approval:

* deletion
* external publication
* remote push
* secret use
* host-level command execution
* access outside project bindings
* privileged containers
* irreversible API actions

Approvals must describe meaningful effects to the user.

## Revocation

Revocation prevents new actions immediately and interrupts running actions where safe and supported.

Credentials and execution grants must be invalidated.

---

# Tool Execution

## Execution Flow

Tool Node Ready
↓
Core Resolves Workflow State
↓
Tool Layer Resolves Tool
↓
Validate Input And Scope
↓
Authorize And Approve
↓
Provision Isolation Environment
↓
Provision Bounded Credentials
↓
Execute Tool
↓
Capture Output And Effects
↓
Validate Result
↓
Cleanup Environment
↓
Publish Telemetry And Audit Inputs
↓
Return Typed Result To Runtime

## Runtime Interaction

Runtime adapters invoke tools through the Tool Invocation Interface.

They must not execute shell commands, call external APIs, or manipulate files directly outside the Tool Layer.

Architecture:

Workflow
↓
Damascus Core
↓
Runtime Interface
↓
Runtime Adapter
↓
Tool Invocation Interface
↓
Tool Layer
↓
Execution Environment

## Streaming

Long-running tools may emit:

* ToolExecutionStarted
* ProgressUpdated
* OutputChunk
* EffectObserved
* ApprovalRequired
* ToolExecutionCompleted
* ToolExecutionFailed

Streaming output remains subject to redaction policy.

## Cancellation

Cancellation attempts to:

* stop the process or request
* revoke credentials
* stop further side effects
* preserve partial output
* run safe cleanup

Cancellation does not imply rollback.

## Timeouts And Resource Limits

Every invocation has bounded:

* time
* CPU
* memory
* storage
* output volume
* network access

Limits vary by operation and policy.

---

# Tool Isolation

## Isolation Goals

Isolation limits:

* system damage
* data exposure
* privilege escalation
* cross-workspace access
* persistence after execution
* uncontrolled network activity

## Isolation Profiles

Example profiles:

### Read-Only Resource Profile

* approved resources mounted read-only
* no network by default
* no secrets
* bounded process resources

### Project Write Profile

* approved project resources writable
* other workspace resources inaccessible
* network denied or allowlisted
* bounded credentials

### Disposable Browser Profile

* isolated browser storage
* controlled downloads
* restricted credential access
* domain policy

### Container Build Profile

* isolated build environment
* controlled registry access
* no privileged mode
* bounded storage and network

### Host Action Profile

* exceptional
* explicit approval
* exact command or operation
* narrow resource scope
* enhanced audit

## Isolation Boundaries

Possible mechanisms:

* operating system process sandbox
* containers
* virtual machines
* filesystem namespaces
* network namespaces
* capability restrictions
* disposable application profiles
* remote isolated workers

No single mechanism is sufficient for every tool.

## Isolation Verification

The Tool Layer should verify that the requested isolation profile was actually provisioned.

If required isolation cannot be established, execution fails closed.

---

# Tool Sandboxing

Sandboxing is the enforcement of an isolation profile for a specific invocation.

Sandbox requirements include:

* clean or known starting state
* explicit mounts
* explicit environment variables
* explicit network policy
* bounded resource use
* output capture
* cleanup policy

## Filesystem Sandbox

Must address:

* path traversal
* symbolic links
* hard links
* mount escape
* sensitive temporary files
* file ownership

## Network Sandbox

Must support:

* deny by default
* domain or endpoint allowlists
* protocol restrictions
* egress logging
* credential scoping

## Credential Sandbox

Credentials should be:

* short-lived
* operation-scoped
* injected only after authorization
* hidden from model context
* revoked after execution

## Sandbox Cleanup

Cleanup records whether:

* temporary resources were removed
* credentials were revoked
* processes were stopped
* artifacts were retained
* cleanup failed

Cleanup failure is a security-relevant event.

---

# Tool Auditing

## Audit Scope

Audit records should capture:

* requester
* workflow execution
* tool and operation
* tool version
* authorization decision
* approvals
* resource scope
* requested and observed effect classes
* isolation profile
* result
* timestamps
* rollback or compensation

## Sensitive Data

Audit records should preserve accountability without copying unrestricted:

* file contents
* secrets
* terminal output
* API payloads

Hashes, references, classifications, and redacted summaries should be used where appropriate.

## Audit Integrity

Ordinary tools and workflows may not modify their own audit records.

---

# Tool Telemetry

Telemetry supports operations, benchmarking, and evolution.

Metrics may include:

* success rate
* failure type
* latency
* queue time
* resource usage
* retry rate
* cancellation rate
* cleanup success
* permission denial rate
* approval wait time
* observed effects
* output validation rate

Telemetry must retain:

* workspace scope
* project scope where applicable
* workflow and node identity
* tool version

Telemetry is not permission to store sensitive content.

---

# Tool Failure Handling

## Failure Taxonomy

Tool failures include:

* ToolUnavailable
* ToolMisconfigured
* UnsupportedOperation
* InvalidInput
* AuthorizationDenied
* ApprovalDenied
* ApprovalExpired
* IsolationUnavailable
* SandboxViolation
* ResourceUnavailable
* ResourceConflict
* Timeout
* RateLimited
* ExternalSystemFailure
* PartialEffect
* OutputValidationFailure
* CleanupFailure
* Cancelled
* UnknownFailure

## Failure Flow

Detect
↓
Stop Further Effects Where Possible
↓
Capture Partial Effects
↓
Classify
↓
Record And Audit
↓
Evaluate Retry, Compensation, Or Escalation
↓
Return Typed Outcome To Runtime

## Retry Rules

Retry is allowed only when:

* policy permits
* idempotency is known
* partial effects are understood
* retry remains within budget and deadline

Non-idempotent operations must not be retried automatically without a safe idempotency key or explicit strategy.

## Partial Effects

A tool may fail after changing an external system.

Partial effects must be reported explicitly.

The runtime must not treat these failures as if nothing happened.

## Compensation And Rollback

Rollback is used only when the tool can verify restoration.

Compensation performs a separate corrective action.

Examples:

* revert a created file
* delete a temporary branch
* cancel an external request

Compensation itself requires authorization and audit.

## Quarantine

A tool may be quarantined after:

* sandbox escape
* repeated unexplained effects
* supply-chain compromise
* schema mismatch
* dangerous behavior

Quarantined tools are excluded from discovery and execution.

---

# Tool Lifecycle

## Lifecycle States

* Discovered
* Unverified
* Active
* Degraded
* Disabled
* Deprecated
* Retired
* Quarantined

## Lifecycle Flow

Discover
↓
Verify Source
↓
Inspect Contract
↓
Classify Permissions And Effects
↓
Assign Isolation Profile
↓
Test In Sandbox
↓
Benchmark
↓
Activate
↓
Monitor
↓
Upgrade, Degrade, Disable, Retire, Or Quarantine

## Tool Upgrade

Tool upgrades require:

* new version identity
* contract compatibility check
* permission and effect review
* isolation review
* benchmark requalification where material
* controlled activation

Historical executions retain the original tool version reference.

## Deprecation

Deprecated tools remain available only to explicitly permitted workflows during migration.

Retired tools cannot execute new invocations.

## Removal

Removal must preserve:

* historical definition metadata
* execution provenance
* audit records
* migration guidance

---

# Tool Benchmarking

Tools should be benchmarked for:

* correctness
* effect accuracy
* latency
* reliability
* resource efficiency
* recovery behavior
* sandbox compliance
* output schema stability

Benchmark records include:

* tool version
* operation
* environment
* isolation profile
* benchmark version
* sample size
* outcome

Tool benchmarks can inform selection among equivalent tools.

They do not grant permission.

---

# Security Considerations

## Model-To-Tool Boundary

Models may propose tool calls.

Every proposal must pass through:

* schema validation
* scope resolution
* authorization
* approval where required
* isolation

Model-generated text may never directly become authority.

## Untrusted Tool Output

Tool output may contain:

* prompt injection
* malicious code
* false claims
* secrets
* oversized data

Output must be classified and bounded before entering model context or memory.

## Supply Chain

Tool packages, executables, container images, plugins, and MCP servers may be compromised.

Damascus should support:

* trusted sources
* checksums
* signatures
* pinned versions
* vulnerability metadata
* quarantine

## Confused Deputy Prevention

A tool must not use Damascus authority to perform an action that the requesting workflow could not perform directly.

Delegation remains scoped to the original authorized intent.

## Cross-Workspace Isolation

Tool invocations must never inherit resources from the currently visible workspace.

They use the immutable scope attached to the workflow execution.

## Secrets

Secrets are resolved only after authorization and injected only into the authorized tool environment.

They must be redacted from output, telemetry, and errors.

## External Side Effects

External publication, financial action, account mutation, and irreversible API calls require explicit policies and usually human approval.

---

# Recovery Mechanisms

Recovery mechanisms include:

* process termination
* credential revocation
* sandbox destruction
* effect reconciliation
* safe retry
* compensation workflow
* tool quarantine
* resource snapshot restore
* manual human recovery

## Effect Reconciliation

Where external systems support inspection, Damascus should compare intended and observed state after uncertain failures.

Reconciliation may determine:

* no effect occurred
* full effect occurred
* partial effect occurred
* effect remains unknown

Unknown effects require escalation.

## Recovery Artifacts

Recovery information should include:

* tool invocation
* intended action
* known effects
* unknown effects
* suggested repair
* required permissions

---

# Data Flow Examples

## File Edit

Workflow Requests File Modification
↓
Resolve Project Resource Binding
↓
Validate Path
↓
Authorize Write
↓
Create Project Write Sandbox
↓
Apply Structured Edit
↓
Validate Result
↓
Record Changed Artifact
↓
Return Diff And Provenance

## Terminal Command

Workflow Requests Command
↓
Classify Command And Effects
↓
Authorize
↓
Provision Restricted Environment
↓
Execute With Limits
↓
Stream Redacted Output
↓
Capture Exit And Effects
↓
Cleanup
↓
Return Typed Result

## API Mutation

Workflow Requests API Action
↓
Resolve Approved Endpoint
↓
Validate Payload
↓
Authorize Credential And Effect
↓
Collect Approval If Required
↓
Execute With Idempotency Key
↓
Validate Response
↓
Record External Effect
↓
Return Result

---

# Events

Recommended events:

* ToolDiscovered
* ToolVerified
* ToolActivated
* ToolDegraded
* ToolDisabled
* ToolDeprecated
* ToolRetired
* ToolQuarantined
* ToolInvocationRequested
* ToolAuthorizationDenied
* ToolApprovalRequired
* ToolExecutionStarted
* ToolEffectObserved
* ToolExecutionCompleted
* ToolExecutionFailed
* ToolExecutionCancelled
* ToolCleanupFailed
* ToolCompensationStarted
* ToolCompensationCompleted

Events must not contain secrets or unrestricted tool output.

---

# Performance And Scalability

## Execution Pools

Tool executions may use separate pools by:

* risk
* resource class
* tool category
* workspace
* isolation mechanism

## Warm Environments

Warm sandboxes may reduce latency.

They must not leak:

* workspace data
* credentials
* process state
* browser sessions

Reuse requires verified cleanup and compatible scope.

## Output Limits

Tool output must be bounded and stored by reference when large.

Unbounded terminal or API output must not overwhelm runtime state or model context.

## Concurrency

Concurrency limits protect:

* external services
* local resources
* workspace budgets
* filesystem integrity

The Scheduler enforces allocation.

The Tool Layer reports requirements and current tool capacity.

---

# Architectural Constraints

## Constraint 1

Tools are first-class workflow execution primitives.

They are not limited to agent usage.

## Constraint 2

Every tool invocation must pass through the Tool Invocation Interface.

## Constraint 3

Runtime adapters may not execute tools directly.

## Constraint 4

Registration and discovery do not grant execution permission.

## Constraint 5

The Security Layer remains the authorization and approval authority.

## Constraint 6

The Execution Environment remains responsible for implementing isolation.

## Constraint 7

Every invocation must declare workspace scope and workflow execution identity.

## Constraint 8

Cross-workspace resource access is denied by default.

## Constraint 9

Model output may propose an action.

It may not authorize or directly execute it.

## Constraint 10

Retries must respect idempotency and known partial effects.

## Constraint 11

Irreversible and unknown-effect actions require explicit handling.

## Constraint 12

Secrets must not appear in tool definitions, workflows, telemetry, or audit output.

## Constraint 13

Required isolation failure causes execution to fail closed.

## Constraint 14

Tool versions and effects must remain attributable in historical executions.

## Constraint 15

MCP and future tool protocols remain behind Damascus adapters and security controls.

## Constraint 16

Evolution may improve tool selection and workflow usage only through benchmarked, controlled promotion.

It may not weaken permissions or isolation.

---

# Future Evolution

The Tool Layer may evolve to support:

* remote isolated workers
* hardware and robotics tools
* richer MCP integration
* capability marketplaces
* automatically generated structured adapters
* effect simulation
* policy simulation
* stronger transactional tools
* formal verification of tool contracts
* privacy-preserving shared reliability data

## Tool Selection Evolution

Evolution may improve:

* selection among equivalent tools
* timeout policy
* retry policy
* isolation profile efficiency
* structured tool preference
* workflow tool sequences

Promotion requires:

* benchmark evidence
* security compatibility
* effect compatibility
* rollback plan
* human approval where critical

Evolution may not automatically grant new permissions, install untrusted tools, or weaken isolation.

## Generated Tools

Future Damascus versions may generate adapters or tools.

Generated tools must follow the full lifecycle:

Generate
↓
Inspect
↓
Classify Effects
↓
Sandbox Test
↓
Benchmark
↓
Security Review
↓
Controlled Activation

Generated code must never enter production execution directly.

---

# Open Questions

* Which operations should Damascus standardize across tool categories?
* How should tool capability matching balance semantic discovery with strict schemas?
* What is the minimum acceptable isolation for local terminal execution?
* How should effect estimation be validated before execution?
* Which tool actions can support reliable rollback?
* How should unknown partial effects block downstream workflow nodes?
* How should MCP server trust and lifecycle be represented?
* Should tool permissions be operation-specific from the first implementation?
* How should browser authentication sessions be isolated and reused safely?
* How should local GUI and IDE tools prove observed effects?
* What benchmark evidence is required before preferring one tool over another?
* How should generated tools be signed and attributed?

---

# Key Architectural Decisions

Tools are first-class execution primitives inside workflows.

The Tool Layer defines and resolves controlled actions.

The Security Layer authorizes those actions.

The Execution Environment isolates and executes them.

Damascus Core coordinates their workflow lifecycle.

Every tool action is explicit, scoped, versioned, observable, and subject to least authority.

This makes real execution a production-grade capability without allowing agents, models, runtimes, or tool providers to bypass human authority.
