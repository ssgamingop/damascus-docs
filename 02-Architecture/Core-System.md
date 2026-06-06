# Core-System.md

Version: 0.1

Status: Architecture Foundation

Priority: Critical

---

# Purpose

The Damascus Core is the central coordination system of the platform.

It is responsible for orchestrating execution, managing workflow state, routing events, coordinating subsystems, and maintaining operational consistency across the entire intelligence environment.

The Core is not responsible for reasoning, memory storage, tool execution, or model inference.

Instead, it coordinates the systems that provide those capabilities.

This distinction is fundamental.

Damascus is not an agent framework.

Damascus is an intelligence operating layer.

Agents are capabilities.

The Core is infrastructure.

---

# Design Philosophy

Most AI systems are built around agents.

User
↓
Agent
↓
Result

Damascus is built around workflows.

User
↓
Workspace
↓
Workflow
↓
Runtime
↓
State
↓
Result
↓
Learning
↓
Evolution

This architectural decision affects every subsystem.

Agents are execution primitives inside workflows.

Workflows are the primary execution unit.

The platform evolves workflows, not agents.

---

# Core Responsibilities

The Damascus Core owns:

* Workflow orchestration
* Execution coordination
* State management
* Event routing
* Scheduling
* Lifecycle management
* Registry management
* Observability infrastructure

The Damascus Core does not own:

* Long-term memory
* Tool implementations
* Model implementations
* Security policies
* Agent reasoning
* Evolution decisions

Those responsibilities belong to dedicated subsystems.

---

# Core Architecture

Damascus Core

├── Orchestration Runtime
├── State Manager
├── Event Bus
├── Scheduler
├── Registry Layer
├── Observability Layer
└── Lifecycle Manager

The Core provides the execution environment within which all Damascus capabilities operate.

---

# Architectural Principle

The most important principle of Damascus Core is:

Execution is workflow-centric.

Not agent-centric.

Everything executes as part of a workflow.

Examples:

Workflow
├── Agent Node
├── Tool Node
├── Human Approval Node
├── Model Node
├── Research Node
└── Benchmark Node

Future workflow types may contain entirely different node structures.

The architecture must not assume agents are always present.

---

# Orchestration Runtime

## Purpose

The Orchestration Runtime is responsible for executing workflows.

It acts as the execution engine of Damascus.

The runtime receives workflow definitions and coordinates their execution.

---

## Responsibilities

The runtime is responsible for:

* workflow execution
* task routing
* dependency management
* state transitions
* checkpoint creation
* workflow recovery
* execution tracing

The runtime is not responsible for:

* workflow design
* workflow evolution
* memory storage
* security decisions

---

## Runtime Contract

Damascus defines a runtime interface.

The architecture depends on the interface.

Not the implementation.

Example:

IRuntime

execute_workflow()

pause_workflow()

resume_workflow()

cancel_workflow()

get_workflow_state()

get_execution_trace()

emit_event()

This contract represents the boundary between Damascus Core and runtime implementations.

---

## Initial Runtime Implementation

V1 Runtime:

LangGraph Runtime Adapter

Architecture:

Damascus Core
↓
Runtime Interface
↓
LangGraph Runtime Adapter

The rest of Damascus must remain unaware of LangGraph-specific concepts.

Future runtime implementations must be replaceable without requiring architectural changes.

---

# State Manager

## Purpose

The State Manager maintains execution state throughout workflow lifecycles.

State is treated as a first-class architectural concern.

---

## Responsibilities

Track:

* workflow state
* node state
* execution progress
* dependencies
* checkpoints
* retry status

---

## Workflow States

Minimum workflow states:

Draft

Pending

Running

Paused

Waiting Approval

Completed

Failed

Cancelled

Archived

Future workflow types may introduce additional states.

---

## Checkpointing

The State Manager should support execution checkpoints.

Purpose:

* crash recovery
* pause and resume
* rollback
* long-running execution

No workflow should be required to restart from the beginning after failure.

---

# Event Bus

## Purpose

The Event Bus enables communication between subsystems.

Subsystems should communicate through events rather than direct dependencies whenever possible.

---

## Example Events

WorkflowCreated

WorkflowStarted

WorkflowPaused

WorkflowCompleted

MemoryStored

BenchmarkCompleted

ResearchDiscovered

AgentAssigned

ToolExecuted

EvolutionCandidateGenerated

---

## Benefits

Advantages:

* loose coupling
* easier observability
* extensibility
* scalability
* easier debugging

The Event Bus becomes the nervous system of Damascus.

---

# Scheduler

## Purpose

The Scheduler controls execution priorities and resource allocation.

Not all workflows should execute immediately.

The Scheduler determines:

* what runs
* when it runs
* where it runs

---

## Responsibilities

Manage:

* workflow queues
* execution priorities
* concurrency limits
* resource allocation
* background jobs

---

## Future Scheduling Domains

The Scheduler should eventually support:

User Workflows

Research Jobs

Benchmark Jobs

Evolution Jobs

Maintenance Jobs

Each domain may require different scheduling policies.

---

# Registry Layer

## Purpose

The Registry Layer stores metadata about Damascus capabilities.

Registries are discovery systems.

Not memory systems.

---

# Workflow Registry

Stores:

* workflow definitions
* workflow versions
* benchmark history
* promotion history
* ownership information

Workflows become first-class assets.

---

# Agent Registry

Stores:

* agent definitions
* capabilities
* performance metrics
* compatibility information

---

# Tool Registry

Stores:

* tool definitions
* permissions
* capabilities
* reliability metrics

---

# Model Registry

Stores:

* provider information
* capabilities
* context limits
* performance metrics
* routing metadata

---

# Benchmark Registry

Stores:

* benchmark definitions
* benchmark history
* benchmark metrics
* evaluation results

---

# Research Registry

Stores:

* research artifacts
* extracted techniques
* experimental findings

---

# Observability Layer

## Purpose

Observability exists to support transparency, debugging, benchmarking, and evolution.

Observability is not logging.

Observability is learning infrastructure.

---

## Responsibilities

Capture:

* execution traces
* workflow performance
* agent activity
* tool usage
* benchmark results
* evolution events
* failures
* costs

---

## Trace Model

Every workflow execution should generate a trace.

Example:

Workflow
↓
Node
↓
Action
↓
Result
↓
Metric

This trace becomes an input for future analysis.

---

## Metrics

Core metrics may include:

Success Rate

Latency

Cost

Resource Usage

Benchmark Score

Failure Rate

Recovery Rate

Observability should support future evolution systems.

---

# Lifecycle Manager

## Purpose

Manage workflow lifecycles.

---

## Responsibilities

Create Workflow

Start Workflow

Pause Workflow

Resume Workflow

Cancel Workflow

Archive Workflow

Delete Workflow

Lifecycle transitions must remain auditable.

---

# Workflow Lifecycle

Example:

Create
↓
Validate
↓
Schedule
↓
Execute
↓
Observe
↓
Complete
↓
Store Results
↓
Evaluate
↓
Archive

Every execution becomes part of organizational learning.

---

# Failure Handling

Failures are expected.

The architecture must assume workflows will fail.

Examples:

* model failure
* tool failure
* timeout
* permission denial
* dependency failure

---

## Failure Strategy

Detect
↓
Record
↓
Classify
↓
Recover
↓
Escalate

Failure information becomes future learning data.

---

# Recovery Mechanisms

Recovery strategies may include:

Retry

Rollback

Checkpoint Restore

Alternative Model

Alternative Tool

Human Intervention

Recovery actions must be observable.

---

# Architectural Constraints

## Constraint 1

Workflows are the primary execution unit.

Not agents.

---

## Constraint 2

The Core never stores long-term memory.

---

## Constraint 3

The Core never performs reasoning.

---

## Constraint 4

The Core never directly depends on model providers.

---

## Constraint 5

All executions must be observable.

---

## Constraint 6

All executions must be recoverable.

---

## Constraint 7

All critical actions must be auditable.

---

## Constraint 8

The Core must remain runtime-independent.

---

## Constraint 9

Subsystems should communicate through events whenever possible.

---

## Constraint 10

Security boundaries may never be bypassed by the Core.

---

# Future Evolution

Future versions of Damascus may introduce:

* distributed execution
* remote workers
* workflow marketplaces
* runtime federation
* adaptive scheduling
* autonomous workflow generation

The Core should support these possibilities without architectural redesign.

---

# Key Insight

The Damascus Core is not an agent manager.

It is not a model router.

It is not a memory database.

The Damascus Core is an execution coordination system.

Its responsibility is to coordinate workflows, state, events, and system operations while enabling the rest of the platform to reason, learn, evolve, and improve.

Everything else in Damascus depends on this foundation.
