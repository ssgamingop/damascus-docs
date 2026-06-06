# Model-Abstraction-Layer.md

Version: 0.1

Status: Architecture Foundation

Priority: Critical

---

# Purpose

This document defines the Damascus Model Abstraction Layer.

The Model Abstraction Layer provides a vendor-independent, capability-aware interface through which workflows use reasoning, generation, embedding, multimodal, and future model capabilities.

Models are replaceable computational resources.

They are not architectural authorities.

No workflow, agent, runtime adapter, or capability subsystem should depend directly on a model provider's API, naming conventions, request schema, or response schema.

The Model Abstraction Layer exists to:

* isolate provider-specific behavior
* expose normalized model capabilities
* select models according to policy and evidence
* support local and cloud models
* manage fallback without hiding material behavior changes
* measure model performance
* enable cost-, latency-, context-, privacy-, and quality-aware routing
* support multi-model workflows
* preserve model usage provenance

---

# Design Philosophy

## Models Are Resources

A model provides capabilities under constraints.

Examples:

* text generation
* structured generation
* embeddings
* vision understanding
* audio understanding
* tool-call generation
* long-context reasoning

A model does not own:

* workflows
* user intent
* permissions
* memory
* tool execution
* evolution decisions

## Capability Before Provider

Workflows should request capabilities, not vendor model names.

Example:

```text
Required:
  modality: text
  structured_output: true
  minimum_context_tokens: 64000
  data_policy: local_only
  quality_profile: high
```

The Routing Engine resolves this request to an eligible model profile.

Pinning a specific model remains possible when reproducibility or user authority requires it.

## Evidence Before Preference

Routing decisions should use measured model behavior.

Provider marketing claims are useful metadata.

They are not sufficient routing evidence.

## Explicit Tradeoffs

There is no universally best model.

Routing balances:

* capability
* quality
* privacy
* cost
* latency
* availability
* context window
* reliability
* local resource pressure

Tradeoffs must be policy-controlled and observable.

## Local First

Local models should be preferred when they satisfy task requirements and policy.

Cloud models are optional resources.

Cloud routing must never silently authorize data egress.

## Workflow-Centric Use

Models operate inside workflows.

The Model Abstraction Layer may serve many workflow nodes and capabilities.

It must not assume agents are the only or primary caller.

---

# Responsibilities

The Model Abstraction Layer owns:

* normalized model request and response contracts
* provider adapter contracts
* model profiles
* model discovery and health
* capability-based routing
* routing policy evaluation inputs
* provider invocation
* normalized streaming
* retry and fallback coordination
* token, cost, latency, and quality telemetry
* model benchmark integration
* model usage provenance

It coordinates with:

* Core for workflow execution and lifecycle
* Workspace System for scope and policy bindings
* Security Layer for authorization and data egress decisions
* Registry Layer for model metadata
* Observability Layer for traces and metrics
* Benchmark Registry for evaluation evidence
* Evolution Layer for controlled routing and profile improvement

---

# Non-Responsibilities

The Model Abstraction Layer does not own:

* workflow orchestration
* workflow state
* agent design
* memory retrieval policy
* tool execution
* user permissions
* security policy definitions
* benchmark definitions
* workflow evolution decisions
* provider billing accounts
* model training infrastructure

The Layer may report model performance.

It does not independently declare a workflow improved.

---

# Architectural Principles

## MA-001 Provider Independence

Provider-specific concepts must terminate at provider adapter boundaries.

## MA-002 Capability-Based Selection

Routing begins with hard capability and policy constraints before optimization.

## MA-003 Explicit Model Identity

Every invocation must record provider, model profile, resolved model version where available, and routing decision.

## MA-004 Policy Before Optimization

Cost or latency may never override privacy, security, capability, or user pinning constraints.

## MA-005 Observable Fallback

Fallback must be traceable and must not silently violate task semantics.

## MA-006 Reproducibility

Benchmark and critical workflows must support pinned model profiles and invocation parameters.

## MA-007 Replaceable Adapters

Adding or removing a provider must not require workflow redesign.

## MA-008 Measured Routing

Routing scores must incorporate current, scope-relevant evidence where available.

## MA-009 Bounded Autonomy

The Layer may select among authorized candidates.

It may not expand authority or send data to an unauthorized destination.

---

# High-Level Architecture

Workflow Node
↓
Damascus Core
↓
Model Invocation Interface
↓
Request Normalizer
↓
Routing Engine
├── Model Registry
├── Policy Inputs
├── Benchmark Evidence
├── Health And Availability
└── Budget And Latency State
↓
Provider Adapter
↓
Local Or Cloud Model
↓
Response Normalizer
↓
Telemetry And Provenance
↓
Workflow Node Result

---

# Core Components

Model Abstraction Layer
├── Model Invocation Service
├── Request Normalizer
├── Routing Engine
├── Model Registry
├── Provider Adapter Manager
├── Response Normalizer
├── Fallback Coordinator
├── Model Health Monitor
├── Usage And Cost Meter
├── Benchmark Integration Service
└── Model Telemetry Publisher

## Model Invocation Service

The entry point for normalized model requests.

It validates:

* scope
* invocation type
* required capabilities
* budget envelope
* output contract
* policy references

It returns a normalized response or typed failure.

## Request Normalizer

Transforms Damascus model requests into a stable internal representation.

It must not discard semantics merely because a provider lacks a feature.

Unsupported requirements cause candidate exclusion or explicit degradation handling.

## Provider Adapter Manager

Loads, configures, and invokes provider adapters.

Adapter configuration includes:

* endpoint
* authentication reference
* supported transport
* rate limits
* locality
* health-check method

Secrets remain in approved secret storage.

## Response Normalizer

Transforms provider responses into normalized:

* content
* structured output
* usage
* finish reason
* tool-call proposals
* safety refusal
* provider metadata
* error information

Raw provider responses may be retained only according to policy.

## Model Health Monitor

Tracks:

* availability
* recent error rate
* rate-limit state
* observed latency
* local resource readiness
* provider incident state

Health influences routing but does not replace capability validation.

---

# Provider Interface

## Provider Boundary

Each model provider is integrated through a provider adapter implementing a stable Damascus contract.

Illustrative interface:

```text
IModelProvider

provider_metadata()
discover_models()
get_model_capabilities(provider_model_id)
validate_configuration()
health_check()
estimate_usage(request, model_profile)
invoke(request, model_profile, invocation_context)
stream(request, model_profile, invocation_context)
cancel(provider_invocation_id)
```

Optional interfaces may support:

```text
IEmbeddingProvider
IMultimodalProvider
IBatchModelProvider
IFineTuneProvider
```

## Normalized Invocation Request

Minimum fields:

```text
ModelInvocationRequest
  invocation_id
  workspace_id
  project_id | null
  workflow_execution_id
  node_execution_id
  requested_capabilities
  input_messages_or_payload
  output_contract
  routing_policy_reference
  data_classification
  budget_envelope
  latency_objective
  fallback_policy
  deterministic_preferences
  trace_context
```

## Normalized Invocation Response

Minimum fields:

```text
ModelInvocationResponse
  invocation_id
  selected_model_profile_id
  provider_invocation_id | null
  content
  structured_output | null
  finish_reason
  usage
  observed_cost
  latency
  fallback_history
  warnings
  provenance
```

## Provider Adapter Rules

Adapters must:

* translate without leaking provider types outward
* report unsupported features accurately
* normalize errors
* expose usage and rate-limit metadata when available
* support cancellation where the provider permits
* redact secrets from logs
* tolerate additive provider response fields

Adapters must not:

* make independent workspace policy decisions
* silently change requested model behavior
* retry indefinitely
* execute tool calls proposed by a model
* persist user content outside policy

---

# Model Registry

## Purpose

The Model Registry is the discovery and metadata authority for model resources available to Damascus.

It is a registry.

It is not a model provider, routing engine, benchmark store, or memory system.

## Registry Entities

### Provider Definition

Describes an installed provider adapter.

Fields include:

* provider_id
* adapter_type
* locality
* endpoint class
* configuration state
* authentication reference
* supported capabilities
* lifecycle state

### Model Definition

Describes a provider-advertised or manually registered model.

Fields include:

* provider_model_id
* provider_id
* advertised name
* family
* version information
* advertised capabilities
* availability

### Model Profile

A Damascus-owned, versioned operational profile used for routing and invocation.

Profiles separate stable Damascus identity from mutable provider naming.

## Registry Lifecycle

Model profiles may be:

* Discovered
* Unverified
* Active
* Degraded
* Disabled
* Deprecated
* Retired

Only eligible active or explicitly permitted degraded profiles participate in normal routing.

## Registry Ownership

The Core Registry Layer provides shared registry infrastructure.

The Model Abstraction Layer owns model-specific schema, validation, health metadata, and profile lifecycle.

---

# Model Profiles

## Purpose

A model profile is the routing and invocation representation of a model under a defined configuration.

The same provider model may have multiple profiles.

Example:

* local-small-fast
* local-large-quality
* cloud-long-context
* cloud-structured-output

## Profile Fields

```text
ModelProfile
  model_profile_id
  provider_id
  provider_model_id
  profile_version
  locality
  lifecycle_state
  capability_claims
  verified_capabilities
  context_limits
  supported_modalities
  structured_output_support
  tool_call_generation_support
  pricing_profile
  latency_profile
  benchmark_summary
  reliability_profile
  data_handling_profile
  invocation_defaults
  resource_requirements
  created_at
  updated_at
```

## Claimed Versus Verified Capability

Profiles distinguish:

* provider-claimed capability
* configuration-derived capability
* Damascus-verified capability

Routing policy determines when claimed capability is sufficient.

Critical workflows may require verified capability.

## Profile Versioning

Material changes create a new profile version.

Examples:

* provider model revision
* quantization change
* prompt template change
* context limit change
* inference parameter change
* local runtime change

Historical executions retain their original profile references.

---

# Routing Engine

## Purpose

The Routing Engine selects an eligible model profile for an invocation.

It performs constrained optimization.

It does not choose from every installed model blindly.

## Routing Stages

Request
↓
Validate Hard Requirements
↓
Resolve Workspace And Project Policies
↓
Build Eligible Candidate Set
↓
Remove Unhealthy Or Unavailable Candidates
↓
Score Candidates
↓
Apply User Or Workflow Pinning
↓
Select Candidate
↓
Record Routing Decision

## Hard Constraints

Candidates must first satisfy:

* required modality
* minimum context window
* required output contract
* required locality
* data classification policy
* workspace and project permissions
* model lifecycle state
* provider availability
* budget ceiling
* required benchmark qualification

A model that fails a hard constraint may not win through a high optimization score.

## Optimization Dimensions

Eligible candidates may be scored on:

* benchmark quality
* task-specific quality
* estimated cost
* expected latency
* reliability
* context utilization
* local resource pressure
* provider rate-limit pressure
* historical scope-specific performance

## Routing Policies

Example routing policy types:

* Local First
* Lowest Cost Within Quality Threshold
* Lowest Latency Within Quality Threshold
* Highest Verified Quality
* Balanced
* Pinned Model
* Benchmark Reproducible
* Offline Only
* Sensitive Data Local Only

Policies must be versioned and auditable.

## Routing Decision Record

Every decision records:

* candidate set
* excluded candidates and reasons
* scores
* selected profile
* policy version
* relevant evidence version
* fallback plan
* decision timestamp

This record supports debugging, audit, and evolution.

---

# Cost-Aware Routing

Cost-aware routing minimizes expected cost while preserving hard requirements and quality thresholds.

Cost estimates should include:

* input tokens
* output tokens
* cached tokens
* provider request fees
* batch discounts where applicable
* local compute cost estimate
* retry and fallback risk

Local does not mean zero cost.

Local profiles may consume:

* GPU time
* CPU time
* memory
* energy
* user-visible system capacity

Budgets may apply at:

* invocation
* workflow execution
* project
* workspace
* time period

The Scheduler and Workspace System provide budget state.

The Routing Engine uses it.

Cost-aware routing must not send sensitive data to a cheaper unauthorized provider.

---

# Latency-Aware Routing

Latency-aware routing uses:

* recent observed time to first token
* total generation latency
* queue depth
* local model load time
* provider region
* request size
* expected output size
* rate-limit state

Latency objectives may be:

* interactive
* background
* deadline-bound
* best effort

Multi-step workflows should consider end-to-end workflow latency, not only individual invocation latency.

Selecting a fast but low-quality model that causes repeated retries may increase total latency.

---

# Context-Window-Aware Routing

The Routing Engine must estimate required context before selection.

Context estimation includes:

* system instructions
* workflow instructions
* retrieved memory
* user input
* tool schemas
* expected output reserve
* provider-specific tokenization margin

Candidates with insufficient context are excluded.

If no candidate fits, the Layer returns a typed `ContextCapacityExceeded` failure or invokes an explicitly authorized context-reduction strategy.

Context-reduction strategies may include:

* retrieval narrowing
* summarization workflow
* chunked processing
* map-reduce workflow

The Model Layer must not silently truncate authoritative instructions or user data.

---

# Runtime Interaction

## Boundary

The Orchestration Runtime executes workflow nodes through the Damascus Runtime Interface.

Model nodes call the Model Invocation Interface.

Runtime adapters must not call provider SDKs directly.

Architecture:

Workflow Definition
↓
Damascus Core
↓
Runtime Interface
↓
Runtime Adapter
↓
Model Invocation Interface
↓
Model Abstraction Layer

## Invocation Lifecycle

Node Ready
↓
Core Resolves Scope And Policy Snapshot
↓
Runtime Requests Model Invocation
↓
Model Layer Routes And Invokes
↓
Streaming Or Final Result Returned
↓
Runtime Updates Node State
↓
Observability Records Trace

## Streaming

Streaming is normalized as a sequence of typed events.

Examples:

* InvocationStarted
* ContentDelta
* StructuredOutputDelta
* UsageUpdated
* ModelWarning
* InvocationCompleted
* InvocationFailed

Provider-specific streaming events remain inside adapters.

## Cancellation

Core cancellation propagates to the Model Layer.

The Layer attempts provider cancellation and records whether cancellation was:

* confirmed
* requested but unconfirmed
* unsupported
* too late

## Checkpointing

Completed model responses and material routing metadata must be checkpointable.

Partial streams should not be treated as completed outputs unless the workflow explicitly supports partial-result recovery.

---

# Local Model Support

## Local Provider Types

Local model adapters may support:

* Ollama
* local inference servers
* embedded inference runtimes
* containerized model servers
* future hardware-specific runtimes

These are examples, not architectural dependencies.

## Local Model Discovery

Local discovery may identify:

* installed models
* model files
* quantization
* available hardware
* runtime compatibility
* memory requirements

Discovered models begin as unverified until validated.

## Resource Admission

Before local invocation, Damascus should evaluate:

* available RAM and VRAM
* current resource pressure
* model load state
* expected context size
* concurrent execution limits
* user activity policy

The Scheduler coordinates resource admission.

## Local Security

Local models remain untrusted computational components.

They must not receive unrestricted filesystem, tool, memory, or secret access.

Model output is data.

It is not authority.

## Offline Operation

Offline-capable profiles must avoid:

* remote license checks required for inference
* cloud telemetry not explicitly approved
* remote embeddings
* remote fallback

Offline routing failure must be explicit.

---

# Cloud Model Support

Cloud adapters support remote model providers through normalized interfaces.

Cloud invocation requires:

* authorized provider
* valid secret reference
* data classification eligibility
* egress approval where required
* cost budget
* provider health

## Data Egress Record

Each cloud invocation should record:

* destination provider
* data classification
* applied redactions
* policy decision reference
* approval reference where required
* transmitted payload hash or equivalent provenance

Sensitive payload content should not be duplicated into audit logs.

## Provider Terms And Retention

Model profiles should describe known provider data-handling characteristics.

Examples:

* training usage policy
* retention policy
* region availability
* enterprise isolation option

These claims require periodic verification.

## Rate Limits

Cloud rate limits are modeled as provider capacity constraints.

Routing may select another eligible model or queue the request according to policy.

---

# Multi-Model Workflows

Models may be combined inside workflows.

Examples:

## Specialist Routing

Classification Model
↓
Code Model
↓
Review Model

## Draft And Critique

Draft Model
↓
Critic Model
↓
Revision Model

## Parallel Comparison

Model A
+
Model B
+
Model C
↓
Evaluator

## Local-Cloud Escalation

Local Model
↓ if confidence or benchmark threshold fails
Cloud Model

Multi-model behavior must be represented in workflow definitions.

The Routing Engine selects resources for model invocation nodes.

It must not secretly transform one invocation into an unbounded multi-model workflow.

Ensembles increase:

* cost
* latency
* data exposure
* evaluation complexity

They require explicit policy and telemetry.

---

# Fallback Handling

## Fallback Philosophy

Fallback preserves workflow intent where possible.

Fallback is not permission to substitute any available model.

## Fallback Triggers

Examples:

* provider unavailable
* timeout
* rate limit
* local resource exhaustion
* transient transport failure
* invalid provider response
* context estimate mismatch

Quality dissatisfaction is not automatically a runtime failure.

Quality-based escalation should be modeled explicitly or governed by benchmark-supported policy.

## Fallback Eligibility

A fallback model must satisfy all hard constraints.

It must not:

* violate locality requirements
* exceed budget without approval
* weaken required output guarantees
* reduce required context capacity
* use an unauthorized provider

## Fallback Strategies

* retry same profile
* retry alternate endpoint
* select equivalent profile
* select authorized degraded profile
* queue until capacity returns
* pause for human decision
* fail workflow node

## Semantic Compatibility

Fallback classes should define which profile differences are acceptable.

Example:

```text
FallbackClass:
  required_capabilities: [...]
  minimum_benchmark_score: ...
  maximum_cost: ...
  locality: local_only
  output_contract: strict
```

## Fallback Limits

Fallback attempts must be bounded by:

* maximum attempts
* maximum elapsed time
* maximum additional cost
* workflow deadline

Every fallback attempt becomes part of the invocation provenance.

---

# Failure Handling

## Failure Taxonomy

Model failures include:

* ConfigurationFailure
* AuthenticationFailure
* AuthorizationFailure
* PolicyDenied
* ProviderUnavailable
* RateLimited
* Timeout
* ContextCapacityExceeded
* UnsupportedCapability
* InvalidRequest
* InvalidResponse
* StructuredOutputValidationFailure
* SafetyRefusal
* ResourceExhausted
* Cancelled
* BudgetExceeded
* UnknownProviderFailure

## Failure Flow

Detect
↓
Normalize
↓
Record
↓
Evaluate Retry Or Fallback Policy
↓
Retry, Fallback, Queue, Pause, Or Fail
↓
Return Typed Outcome To Runtime

## Invalid Output

An HTTP success is not necessarily a successful model invocation.

The Layer validates:

* output contract
* required fields
* parseability
* finish reason
* truncation

Invalid output may trigger bounded repair or fallback according to policy.

## Circuit Breaking

Repeated provider or profile failures should open a circuit.

The profile is temporarily excluded from normal routing.

Circuit state must be observable and automatically or manually recoverable.

## Recovery

Recovery mechanisms include:

* health recheck
* credential repair
* profile revalidation
* local model reload
* endpoint replacement
* rate-limit cooldown
* benchmark requalification

---

# Benchmark Integration

## Purpose

Benchmark evidence enables Damascus to compare models and improve routing.

Model benchmarking is distinct from workflow benchmarking.

A high-performing model may still perform poorly inside a particular workflow.

## Benchmark Dimensions

Model benchmarks may measure:

* task quality
* structured output reliability
* tool-call proposal accuracy
* hallucination rate
* context retention
* latency
* cost
* refusal behavior
* multilingual performance
* modality-specific performance

## Benchmark Context

Results must record:

* model profile version
* benchmark version
* invocation parameters
* hardware or provider endpoint class
* date
* sample size
* confidence
* data classification

Local model benchmarks are hardware-dependent.

Cloud model behavior may drift without an exposed version change.

## Routing Use

Routing may use benchmark evidence only when:

* benchmark is relevant to requested capability
* profile version is compatible
* evidence is sufficiently recent
* confidence threshold is met

Missing evidence must not be interpreted as poor performance or high performance.

## Continuous Evaluation

Production telemetry may identify candidates for formal re-benchmarking.

Production outcomes must not silently rewrite benchmark results.

The Benchmark Registry remains the authoritative source of benchmark definitions and results.

---

# Telemetry And Observability

Every invocation should capture:

* selected model profile
* routing decision
* provider
* input and output token counts
* estimated and observed cost
* time to first token
* total latency
* retries
* fallback history
* finish reason
* validation outcome
* failure type

Content capture follows workspace policy.

Telemetry must support:

* debugging
* budget reporting
* routing evaluation
* benchmark candidate discovery
* evolution analysis

Telemetry must not become unrestricted memory.

---

# Security Considerations

## Authorization Boundary

The Security Layer decides whether an invocation may use:

* a provider
* a model profile
* a data classification
* a secret
* remote egress

The Routing Engine selects only from authorized candidates.

## Data Minimization

Only required context should be sent to models.

Workspace access does not imply permission to send all workspace data.

## Prompt Injection

Model inputs may contain untrusted instructions.

Model output may contain unsafe action proposals.

Neither may modify policy or execute tools directly.

## Secrets

Provider credentials are referenced through secret storage.

They must not appear in:

* model profiles
* workflow definitions
* traces
* errors
* prompts

## Output Trust

Model output is untrusted until validated for its intended use.

Structured output validation checks shape.

It does not prove truth or safety.

## Local Model Supply Chain

Local model artifacts may be malicious or corrupted.

Damascus should support:

* source verification
* checksums
* signature verification where available
* quarantine
* isolated loading
* license metadata

---

# Lifecycle

## Provider Lifecycle

Install
↓
Configure
↓
Validate
↓
Activate
↓
Monitor
↓
Disable Or Retire

## Model Profile Lifecycle

Discover
↓
Inspect
↓
Verify Capabilities
↓
Benchmark
↓
Activate
↓
Monitor
↓
Degrade, Deprecate, Or Retire

Retired profiles remain referencable by historical traces.

They do not participate in new routing.

## Upgrade

Provider model upgrades must not silently replace reproducible profiles.

When exact provider versioning is unavailable, Damascus must record that limitation and re-benchmark observed changes.

---

# Recovery Mechanisms

* registry reconstruction from adapter discovery and authoritative configuration
* profile revalidation
* benchmark replay
* provider health reconciliation
* stale routing-cache invalidation
* local model reload
* credential rotation
* fallback policy rollback

Derived routing scores must be rebuildable from authoritative profile, benchmark, policy, and telemetry data.

---

# Architectural Constraints

## Constraint 1

No subsystem outside provider adapters may depend on provider-specific request or response types.

## Constraint 2

Workflows request capabilities or explicitly pinned profiles.

They do not call provider SDKs directly.

## Constraint 3

Security and data-egress policy precede routing optimization.

## Constraint 4

Fallback candidates must satisfy all hard constraints.

## Constraint 5

The Model Layer may generate tool-call proposals.

It may not execute tools.

## Constraint 6

Model output is not authority.

## Constraint 7

Every invocation must be attributable to workspace, workflow execution, model profile, and routing decision.

## Constraint 8

Benchmarks and critical reproducibility workflows must support pinned profile versions.

## Constraint 9

Local models are preferred only when they satisfy policy and capability requirements.

## Constraint 10

Cloud models are optional and require authorized data egress.

## Constraint 11

The Core remains provider-agnostic and does not become a model router.

## Constraint 12

The Model Registry is a discovery system, not a memory or benchmark system.

## Constraint 13

Routing changes are versioned, observable, and reversible.

## Constraint 14

Evolution may propose routing and profile changes only through controlled benchmarking and promotion.

---

# Future Model Evolution Support

The Evolution Layer may improve:

* routing weights
* task-to-model policies
* fallback classes
* model profile defaults
* multi-model workflow structures
* context reduction strategies

Evolution flow:

Observe Model Usage
↓
Identify Routing Weakness
↓
Generate Policy Or Workflow Variant
↓
Benchmark
↓
Compare
↓
Propose Promotion
↓
Approve
↓
Activate Versioned Change

The system does not directly self-modify provider adapters or production code.

## Future Capabilities

Future model support may include:

* on-device models
* specialized reasoning models
* multimodal generation
* adaptive model ensembles
* speculative decoding providers
* privacy-preserving remote inference
* user-owned fine-tuned models
* federated benchmark evidence
* hardware-aware local routing

Each remains behind capability and provider interfaces.

---

# Open Questions

* How should task-specific routing quality be estimated before a workflow has sufficient history?
* Which model capabilities require Damascus verification before activation?
* How should cloud model drift be detected when providers do not expose version changes?
* Should local compute cost be represented financially, operationally, or both?
* How should routing balance user-visible latency against total workflow latency?
* Which production outcomes are reliable enough to trigger benchmark requalification?
* How should confidence be normalized across providers and model families?
* When should quality-based escalation be a routing policy versus an explicit workflow structure?
* How should model-generated tool schemas be validated across providers?
* What minimum evidence is required before Evolution can promote a routing change?

---

# Key Architectural Decisions

The Model Abstraction Layer makes models replaceable, measurable resources.

Workflows request capabilities.

The Routing Engine selects authorized model profiles using policy, health, cost, latency, context, and benchmark evidence.

Provider adapters contain vendor-specific behavior.

Local and cloud models participate through the same architecture without receiving the same permissions by default.

Every selection, fallback, and result remains observable, attributable, and eligible for controlled improvement.
