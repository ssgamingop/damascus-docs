# Agent-Layer.md

Version: 0.1

Status: Architecture Foundation

Priority: Critical

---

# Purpose

This document defines the Damascus Agent Layer.

Agents are specialized reasoning and execution components used inside workflows.

Agents are not the primary Damascus abstraction.

Workflows are the primary execution unit.

The Agent Layer exists to provide reusable, measurable, replaceable role capabilities that workflows may compose when specialized reasoning is useful.

An agent may plan, research, design, code, review, or evaluate.

An agent does not own the workflow, user goal, workspace, permissions, memory, tools, or evolution process.

---

# Foundational Position

Incorrect architecture:

User
↓
Agent
↓
Result

Damascus architecture:

User
↓
Workspace
↓
Workflow
↓
Agent Component
↓
Models, Memory, Tools
↓
Result
↓
Evaluation
↓
Evolution

Agents are workflow components.

A valid workflow may contain:

* one agent
* many agents
* no agents

The system must never require agent-centric organization.

---

# Design Philosophy

## Agents Exist To Serve Workflows

Agents provide specialization.

Workflows provide coordination, state, recovery, approvals, and lifecycle.

## Clear Purpose

Every agent must have a defined responsibility, capability profile, input contract, output contract, and evaluation criteria.

Generic agents without measurable purpose create complexity without evidence of value.

## Replaceability

Agents are replaceable definitions.

Their useful knowledge persists through Memory Architecture and workflow history.

## Bounded Authority

Agents reason within delegated workflow scope.

They may request models, memory, or tools.

They do not inherit unrestricted access.

## Measured Specialization

An agent role is justified only when it improves relevant workflow outcomes.

More agents do not imply more capability.

## Dynamic Organization

Teams may be selected or generated according to task requirements.

Generated teams remain explicit workflow structures subject to validation and benchmarking.

---

# Responsibilities

The Agent Layer owns:

* agent definition contracts
* agent profiles and versions
* Agent Registry schema
* role capability descriptions
* agent invocation interface
* agent context assembly constraints
* agent communication contracts
* agent lifecycle
* agent and team performance telemetry
* agent compatibility metadata
* dynamic team proposal generation
* retirement and deprecation

It coordinates with:

* Core and Runtime for workflow execution
* Workflow Registry for executable workflow definitions
* Model Layer for inference
* Memory Layer for bounded context and durable learning
* Tool Layer for controlled actions
* Workspace System for scope and policy
* Security Layer for authorization
* Benchmark Registry for evaluation
* Evolution Layer for controlled agent and team improvement

---

# Non-Responsibilities

The Agent Layer does not own:

* workflow orchestration
* workflow lifecycle
* workflow state checkpoints
* model provider selection
* durable memory storage
* tool execution
* security authorization
* benchmark definitions
* evolution promotion decisions
* user goals

Agents may propose plans.

They do not become the Core Scheduler.

Agents may propose tool calls.

They do not execute tools outside the Tool Layer.

Agents may propose memories.

They do not write durable memory directly.

---

# Architectural Principles

## AG-001 Workflow Primacy

Agents execute only as workflow components.

## AG-002 Explicit Role

Every agent has bounded responsibility and measurable outputs.

## AG-003 Replaceability

Agent definitions may be changed or retired without losing organizational memory.

## AG-004 Delegated Authority

Agent authority derives from workflow execution scope and expires with it.

## AG-005 Structured Communication

Agent communication occurs through workflow state and typed messages.

## AG-006 Bounded Context

Agents receive only the context required for their role.

## AG-007 Measured Value

Agent and team usefulness must be benchmarkable.

## AG-008 No Hidden Coordination

Agent-to-agent interactions must remain visible to the workflow and runtime.

## AG-009 Provider Independence

Agent definitions request model capabilities, not direct provider APIs.

## AG-010 Controlled Evolution

Agent and team changes require benchmarked promotion.

---

# High-Level Architecture

Workflow Definition
↓
Damascus Core
↓
Runtime Interface
↓
Agent Invocation Interface
↓
Agent Resolver
├── Agent Registry
├── Scope And Policy
├── Model Requirements
├── Tool Requirements
└── Performance Evidence
↓
Agent Execution Context
├── Bounded Memory
├── Model Access
├── Tool Request Access
└── Typed Communication
↓
Agent Result
↓
Workflow State
↓
Observability, Memory, Evaluation

---

# Core Components

Agent Layer
├── Agent Invocation Service
├── Agent Registry
├── Agent Resolver
├── Agent Context Manager
├── Agent State Adapter
├── Communication Service
├── Team Formation Service
├── Team Evaluation Service
├── Performance Tracking Service
└── Agent Lifecycle Manager

## Agent Invocation Service

Provides the stable interface used by workflow nodes to invoke agents.

It validates:

* agent profile
* workflow scope
* input contract
* allowed model capabilities
* allowed memory requests
* allowed tool requests
* output contract

## Agent Resolver

Resolves a pinned agent profile or capability request to an eligible agent.

It may consider:

* required role
* domain capability
* model compatibility
* tool compatibility
* benchmark evidence
* cost
* latency
* lifecycle state

## Agent Context Manager

Assembles bounded context for an agent invocation.

It does not grant permission or retrieve unrestricted workspace memory.

## Agent State Adapter

Maps agent-local reasoning state into workflow node state without making the agent the owner of workflow state.

## Communication Service

Provides typed, traceable messages between agent nodes through workflow channels.

## Team Formation Service

Proposes team structures and workflow fragments for tasks requiring multiple roles.

## Team Evaluation Service

Measures whether a team structure improved outcomes relative to alternatives.

---

# Agent Architecture

## Agent Definition

```text
AgentDefinition
  agent_id
  display_name
  role
  purpose
  capability_requirements
  input_contract
  output_contract
  model_capability_request
  memory_access_profile
  tool_request_profile
  communication_contract
  evaluation_profile
  lifecycle_state
```

## Agent Profile

A versioned operational configuration:

```text
AgentProfile
  agent_profile_id
  agent_id
  profile_version
  instruction_reference
  strategy_reference
  model_routing_policy
  context_policy
  tool_policy_reference
  benchmark_summary
  compatibility
  created_at
```

## Agent Invocation

```text
AgentInvocationRequest
  invocation_id
  workspace_id
  project_id | null
  workflow_execution_id
  node_execution_id
  agent_profile_id_or_capability_request
  goal
  inputs
  context_budget
  allowed_output_contract
  trace_context
```

## Agent Result

```text
AgentInvocationResult
  invocation_id
  resolved_agent_profile_id
  status
  output
  proposals
  communication_events
  model_usage
  memory_usage
  tool_request_history
  warnings
  provenance
```

Proposals may include:

* plan
* tool request
* memory candidate
* workflow adjustment request
* escalation request

Proposals are not automatically authoritative.

---

# Runtime Interaction

The Runtime executes agent nodes as workflow nodes.

Runtime adapters must not create hidden agent conversations or bypass Core state.

Execution:

Agent Node Ready
↓
Core Resolves Scope And Node State
↓
Agent Layer Resolves Profile
↓
Context Manager Builds Bounded Context
↓
Agent Invokes Models And Requests Tools Through Capability Layers
↓
Agent Returns Typed Result
↓
Runtime Updates Workflow State

## Pause And Resume

Long-running agent nodes must support checkpoint-safe pause and resume where the workflow requires it.

Agent-local state needed for resume is stored through Core node state or approved working memory references.

## Cancellation

Cancellation propagates to:

* model invocations
* tool requests
* agent-local work

Cancellation does not erase already observed effects.

---

# Agent Registry

## Purpose

The Agent Registry stores discoverable agent definitions, profiles, capabilities, compatibility, lifecycle, and performance summaries.

It is not a workflow registry or memory store.

## Registry Contents

* agent definitions
* agent profiles and versions
* role and domain tags
* model requirements
* tool requirements
* communication contracts
* benchmark references
* performance summaries
* lifecycle state
* ownership and provenance

## Lifecycle States

* Draft
* Candidate
* Active
* Degraded
* Deprecated
* Retired
* Quarantined

Only eligible profiles may be resolved for new workflows.

## Registry Ownership

The Core Registry Layer provides common registry infrastructure.

The Agent Layer owns agent-specific schema and lifecycle.

---

# Agent Types

Agent types are role patterns, not mandatory fixed classes.

## Planner

Purpose:

Transform goals into structured execution proposals.

Responsibilities:

* decompose goals
* identify dependencies
* identify risks
* propose workflow steps
* identify approval points

Non-responsibilities:

* executing the whole plan independently
* granting permissions
* changing active workflows without authorization

## Researcher

Purpose:

Acquire and synthesize evidence.

Responsibilities:

* identify sources
* collect evidence through approved tools
* compare findings
* preserve citations and provenance
* identify uncertainty

## Architect

Purpose:

Design systems and evaluate structural tradeoffs.

Responsibilities:

* define boundaries
* propose interfaces
* identify failure modes
* assess maintainability
* preserve architectural constraints

## Coder

Purpose:

Implement approved changes.

Responsibilities:

* inspect existing code
* modify scoped resources
* run validation through tools
* report changes and unresolved risks

Coder agents do not receive unrestricted terminal or filesystem authority.

## Reviewer

Purpose:

Find defects, regressions, and missing evidence.

Responsibilities:

* inspect outputs
* compare against requirements
* identify risks
* request correction

Reviewers should be independent enough to challenge producer assumptions.

## Evaluator

Purpose:

Measure outcomes against explicit criteria.

Responsibilities:

* run or interpret benchmarks
* score results
* compare variants
* report confidence and regressions

Evaluators do not independently promote candidates.

---

# Agent Lifecycle

## Lifecycle Flow

Define
↓
Validate Contract
↓
Test In Workflow
↓
Benchmark
↓
Activate
↓
Monitor
↓
Improve, Deprecate, Retire, Or Quarantine

## Creation

Agent creation requires:

* explicit purpose
* input and output contracts
* bounded capability requirements
* evaluation profile
* ownership

## Activation

Activation requires:

* contract validation
* security compatibility
* model and tool compatibility
* benchmark qualification

## Deprecation

Deprecated agents remain available to pinned workflows during migration.

## Quarantine

Agents may be quarantined for:

* repeated unsafe proposals
* contract violations
* unexplained regressions
* prompt injection susceptibility
* policy incompatibility

---

# Agent State

## State Ownership

Core State Manager owns authoritative workflow and node execution state.

Agent state is node-local execution data.

It may include:

* current reasoning phase
* partial plan
* unresolved questions
* pending tool requests
* communication cursor

## State Constraints

Agent state must be:

* serializable where checkpointing is required
* scoped to workflow execution
* bounded
* versioned
* free of raw secrets

## Durable Learning

Agent state does not become durable learning automatically.

Useful lessons are proposed to Memory Layer and validated.

---

# Agent Context Management

## Context Sources

Agent context may include:

* workflow goal
* node instructions
* relevant workflow state
* bounded memory retrieval
* artifact references
* prior typed messages
* applicable policies
* available capability descriptions

## Context Assembly Flow

Agent Invocation
↓
Resolve Role And Scope
↓
Determine Context Budget
↓
Request Eligible Memory
↓
Select Relevant Workflow State
↓
Include Capability And Policy Boundaries
↓
Assemble Context
↓
Record Provenance

## Context Isolation

Agents receive only relevant context.

An agent in one project must not receive sibling project memory by default.

## Context Compression

Long-running agent context may be summarized.

Summaries retain:

* source links
* unresolved decisions
* constraints
* confidence

---

# Agent Communication

## Communication Model

Agents communicate through workflow-managed typed messages and shared state.

They do not create unmanaged peer-to-peer channels.

## Message Contract

```text
AgentMessage
  message_id
  workflow_execution_id
  sender_node_id
  recipient_node_id_or_channel
  message_type
  payload_reference
  schema_version
  created_at
  trace_context
```

## Message Types

* Request
* Response
* Proposal
* Evidence
* Critique
* DecisionRequest
* Escalation
* Status

## Communication Constraints

Messages must be:

* typed
* scoped
* observable
* size-bounded
* persisted when required for recovery

Communication does not bypass workflow dependencies or permissions.

## Loop Prevention

Workflows should enforce:

* message budgets
* iteration limits
* progress criteria
* timeout
* escalation paths

---

# Agent Performance Tracking

## Purpose

Performance tracking determines whether agents contribute measurable value.

## Metrics

Possible metrics:

* task success contribution
* output quality
* factual accuracy
* defect rate
* review findings
* tool request success
* cost
* latency
* context efficiency
* communication overhead
* recovery rate

## Attribution Limits

Agent contribution is difficult to isolate in teams.

Performance reports must distinguish:

* direct evidence
* inferred contribution
* team-level outcome

## Performance Records

Performance summaries live in the Agent Registry.

Detailed evidence remains in Observability, Benchmark Registry, and Evolution Memory.

---

# Dynamic Team Formation

## Purpose

Dynamic Team Formation selects a suitable set of agent roles and coordination structure for a task.

It is optional.

Simple tasks should not incur team overhead.

## Formation Inputs

* task characteristics
* required capabilities
* risk
* budget
* latency objective
* available agent profiles
* model and tool availability
* benchmark evidence
* workspace policy

## Formation Flow

Analyze Task
↓
Determine Whether Team Is Justified
↓
Identify Required Roles
↓
Select Candidate Agent Profiles
↓
Generate Workflow Fragment
↓
Validate Dependencies And Permissions
↓
Estimate Cost And Latency
↓
Execute Or Benchmark

The output is a workflow proposal.

It is not an unmanaged team process.

---

# Team Generation

## Team Definition

```text
TeamDefinition
  team_definition_id
  purpose
  member_agent_profiles
  workflow_fragment_reference
  communication_channels
  coordination_strategy
  budget
  evaluation_profile
  provenance
```

## Generation Strategies

* template selection
* role composition
* retrieval of successful prior teams
* constrained variant generation
* human-defined team

## Constraints

Generated teams must:

* have clear member responsibilities
* define communication paths
* avoid redundant roles unless justified
* fit resource budgets
* satisfy permission policy
* remain workflow-representable

---

# Team Evaluation

Teams are evaluated against:

* single-agent baseline
* simpler workflow baseline
* alternative team structures
* cost and latency budget
* task quality
* reliability
* coordination overhead

## Evaluation Questions

* Did each role contribute?
* Was any role redundant?
* Did communication improve outcomes?
* Did review catch material issues?
* Did the team justify its cost?
* Did the structure generalize?

Team evaluation produces evidence.

It does not directly change production workflows.

---

# Agent Benchmarking

## Benchmark Types

* role-specific benchmarks
* domain benchmarks
* tool-use benchmarks
* context-management benchmarks
* communication benchmarks
* team benchmarks
* safety and policy-compliance benchmarks

## Benchmark Context

Results must record:

* agent profile version
* workflow context
* model routing policy
* tool availability
* memory policy
* benchmark version
* cost and latency

An agent benchmark without its environment is incomplete.

## Comparative Evaluation

Agents should be compared within relevant roles and constraints.

A fast planner and a high-quality architect solve different problems.

---

# Agent Retirement

## Reasons

* persistent underperformance
* redundancy
* policy incompatibility
* obsolete capability
* unavailable dependencies
* unsafe behavior

## Retirement Flow

Identify Candidate
↓
Analyze Active Dependencies
↓
Compare Replacement
↓
Migrate Or Pin Existing Workflows
↓
Retire Agent Profile
↓
Preserve Historical Records And Memory

Retirement removes an agent from new resolution.

It does not delete:

* execution history
* benchmark evidence
* procedural knowledge
* evolution history

---

# Agent Evolution

## Evolution Targets

Evolution may improve:

* instructions
* strategies
* context policy
* model routing policy
* tool request strategy
* communication contract
* team composition

## Evolution Flow

Observe Performance
↓
Identify Weakness
↓
Generate Agent Or Team Variant
↓
Execute In Controlled Benchmark
↓
Compare Against Baseline
↓
Propose Promotion
↓
Approve
↓
Activate New Profile Or Workflow Version

## Boundaries

Evolution may not:

* modify security policy
* grant permissions
* self-deploy production code
* bypass benchmarks
* erase failed experiment history

Agent evolution is subordinate to workflow evolution.

Improving an agent matters only when it improves workflow outcomes.

---

# Failure Modes

## Agent Loop

Mitigation:

* iteration limits
* progress checks
* workflow timeout
* evaluator or human escalation

## Context Drift

Mitigation:

* restate goal and constraints
* bounded context
* checkpointed decisions
* reviewer validation

## Duplicate Work

Mitigation:

* explicit role ownership
* workflow dependency visibility
* shared evidence channels

## Conflicting Outputs

Mitigation:

* typed proposals
* decision node
* evaluator
* human approval where material

## Contract Violation

Mitigation:

* output validation
* bounded repair
* retry or alternate profile
* node failure

## Unsafe Tool Proposal

Mitigation:

* Tool Layer authorization
* approval
* sandboxing
* agent performance penalty

## Agent Dependency Unavailable

Mitigation:

* resolve compatible agent profile
* substitute eligible model or tool through capability layers
* pause or fail explicitly

## Team Explosion

Mitigation:

* maximum members
* cost budget
* role justification
* simpler baseline comparison

---

# Recovery Mechanisms

* restore agent node from Core checkpoint
* retry with same profile
* resolve compatible profile
* reduce context
* escalate to reviewer or human
* simplify team
* quarantine profile
* rollback promoted profile

Recovery remains visible in workflow traces.

---

# Security Considerations

## Agent Identity

Agent identity is not a human principal.

Agents act through bounded workflow execution identities.

## Permission Boundary

Agents request access.

Security Layer authorizes access.

## Model Output

Agent reasoning produced by models is untrusted.

It cannot approve actions or rewrite policy.

## Memory

Agents receive scoped memory and may propose candidates.

They cannot directly promote or delete memory.

## Tools

Agents request tools through Tool Layer.

Tool permissions, isolation, and auditing always apply.

## Prompt Injection

Agents consuming external content must preserve trust boundaries and resist instructions that conflict with workflow or security policy.

## Communication

Messages must not become covert channels across workspaces or projects.

---

# Observability

Every agent invocation should record:

* agent profile
* workflow and node
* context sources
* model usage
* memory retrieval references
* tool requests
* messages
* output validation
* failures and retries
* cost and latency

Content retention follows policy.

Observability supports debugging, benchmarking, and evolution.

---

# Architectural Constraints

## Constraint 1

Workflows are the primary execution unit.

Agents are workflow components.

## Constraint 2

A workflow may contain zero, one, or many agents.

## Constraint 3

Agents may not execute outside Damascus Core and Runtime lifecycle.

## Constraint 4

Agents may not call model providers, memory backends, or tools directly.

## Constraint 5

Agent authority is delegated, scoped, and temporary.

## Constraint 6

Agent communication is workflow-managed and observable.

## Constraint 7

Core State Manager owns workflow and node execution state.

## Constraint 8

Agent state does not become durable memory automatically.

## Constraint 9

Dynamic teams must be represented as workflows or workflow fragments.

## Constraint 10

More agents require measurable justification.

## Constraint 11

Agent and team promotion requires benchmark evidence.

## Constraint 12

Retirement preserves memory, provenance, and historical evidence.

## Constraint 13

Evolution may improve agents only through controlled promotion.

## Constraint 14

Agents may propose actions.

They may not grant themselves authority.

---

# Future Evolution

Future Agent Layer capabilities may include:

* domain-generated role profiles
* adaptive team formation
* learned communication topology
* role-specific context optimization
* cross-workspace published agent templates
* formal agent contracts
* agent contribution attribution
* human-agent mixed teams

Future systems should ask:

Which agent components improve this workflow?

Not:

How many agents can be added?

---

# Open Questions

* What minimum contract should every agent implement?
* How should team contribution be attributed?
* When should a role be an agent versus a deterministic workflow node?
* How should dynamic teams prove value before production use?
* Which agent state must be checkpointed?
* How should communication budgets be allocated?
* How should agent confidence be calibrated?
* What evidence justifies agent retirement?
* How should agent profiles reference evolving procedural memory?
* Should generated agents require human review before benchmark execution?
* How should human collaborators participate in generated teams?

---

# Key Architectural Decisions

Agents are specialized, replaceable workflow components.

They do not organize Damascus.

They do not own execution.

They do not own memory or authority.

Workflows coordinate agents through Damascus Core.

Agents use models, memory, and tools through dedicated capability layers.

Dynamic teams are explicit workflow structures that must justify their complexity through measurable outcomes.

This preserves agent usefulness without allowing agent-centric architecture to replace Damascus's workflow-centric foundation.
