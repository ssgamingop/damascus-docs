# Security-Architecture.md

Version: 0.1

Status: Architecture Foundation

Priority: Critical

---

# Purpose

This document defines the Damascus Security Architecture.

Security is cross-cutting.

It applies to every workspace, workflow, capability, execution, memory, model invocation, tool action, benchmark, and evolution operation.

The Security Layer provides the common trust, identity, authorization, approval, audit, encryption, and incident-response architecture required to keep Damascus under human authority.

Damascus is local-first.

Local-first improves ownership and reduces unnecessary data transfer.

It does not make local processes, models, tools, plugins, files, or users automatically trustworthy.

The security objective is:

Enable useful autonomous execution while ensuring that authority remains explicit, bounded, inspectable, revocable, and recoverable.

---

# Design Philosophy

## Security Is An Architectural Boundary

Security cannot be added only at the user interface or tool layer.

Every request crossing a trust boundary must carry:

* authenticated identity
* explicit scope
* requested action
* resource identity
* policy context
* trace context

## Local Does Not Mean Trusted

A local model may be compromised.

A local tool may be over-privileged.

A local document may contain prompt injection.

A local plugin may be malicious.

A local user account may be compromised.

Locality is a policy input.

It is not proof of trust.

## Least Authority

Every principal and execution receives only the authority required for the current operation and duration.

## Deny By Default

Unspecified access is denied.

Discovery, installation, registration, and availability do not grant permission.

## Human Authority

Critical actions require meaningful human visibility and, where policy requires, explicit approval.

Autonomy operates only inside delegated authority.

## Defense In Depth

Authorization, approvals, isolation, encryption, auditing, and recovery are complementary controls.

No single control is sufficient.

## Secure Failure

When identity, scope, policy, or isolation cannot be established, Damascus fails closed for affected operations.

---

# Responsibilities

The Security Layer owns:

* identity and principal contracts
* authentication coordination
* authorization evaluation
* policy definitions and versions
* permission grants and revocation
* approval lifecycle and enforcement
* security classification rules
* secret-management interfaces
* encryption policy and key lifecycle
* sandbox policy
* audit integrity
* security event classification
* incident-response coordination
* security posture reporting

It coordinates with:

* Workspace System for ownership, membership, roles, and policy bindings
* Core for execution admission and lifecycle
* Tool Layer for action and effect enforcement
* Model Layer for provider and data-egress authorization
* Memory Layer for scoped retrieval, retention, and deletion
* Agent Layer for delegated execution identity
* Execution Environment for isolation enforcement
* Observability Layer for security telemetry
* Evolution Layer for safety constraints and approval gates

---

# Non-Responsibilities

The Security Layer does not own:

* workflow orchestration
* tool implementation
* model provider implementation
* memory storage
* workspace lifecycle
* operating system security itself
* identity-provider operation
* benchmark execution
* evolution decisions

The Security Layer defines and evaluates required controls.

Subsystems remain responsible for enforcing controls at their boundaries and reporting outcomes.

---

# Security Principles

## SEC-001 Explicit Identity

Every privileged action is attributable to a principal and execution context.

## SEC-002 Explicit Scope

Every request declares workspace, optional project, resource, and action scope.

## SEC-003 Least Privilege

Permissions are narrow, temporary where practical, and revocable.

## SEC-004 Deny By Default

Missing or ambiguous authorization is denial.

## SEC-005 Human Authority

Critical operations remain subject to human approval and override.

## SEC-006 Isolation

Untrusted execution occurs in risk-appropriate isolation.

## SEC-007 Audit Integrity

Critical security decisions and actions are recorded in tamper-resistant audit history.

## SEC-008 Data Minimization

Only required data is exposed to models, tools, users, or remote services.

## SEC-009 Recovery

Security controls include containment, restoration, and evidence preservation.

## SEC-010 Evolution Cannot Weaken Security

The Evolution Layer may not alter security policy, permissions, approval requirements, or minimum isolation.

---

# High-Level Architecture

Requesting Principal Or Workflow
↓
Authentication
↓
Identity And Scope Resolution
↓
Policy Decision Point
├── Policy Store
├── Workspace Bindings
├── Resource Classification
├── Risk Engine
└── Approval State
↓
Allow, Deny, Or Require Approval
↓
Policy Enforcement Point
├── Core Admission
├── Tool Layer
├── Model Layer
├── Memory Layer
└── Execution Environment
↓
Audit And Security Telemetry

---

# Core Components

Security Layer
├── Identity Service
├── Authentication Adapter Layer
├── Policy Store
├── Authorization Service
├── Permission Grant Service
├── Approval Service
├── Risk Classification Service
├── Secret Management Interface
├── Key Management Service
├── Sandbox Policy Service
├── Audit Service
├── Security Event Service
└── Incident Response Coordinator

## Identity Service

Maintains stable Damascus principal identities and their relationships to external or local authentication identities.

## Authorization Service

Evaluates requests using identity, action, resource, scope, policy, risk, and approval state.

## Permission Grant Service

Issues, tracks, and revokes bounded grants.

## Approval Service

Coordinates human approval requests and binds approvals to exact actions.

## Sandbox Policy Service

Determines minimum isolation requirements for actions and capabilities.

## Audit Service

Produces and protects security-relevant audit records.

## Incident Response Coordinator

Coordinates containment, evidence preservation, recovery, and post-incident actions.

---

# Trust Boundaries

## Boundary 1: User To Damascus

Risks:

* account compromise
* unauthorized local access
* session hijacking
* social engineering

Controls:

* authentication
* session protection
* approval confirmation
* audit

## Boundary 2: Workspace To Workspace

Workspaces are isolated ownership and policy boundaries.

Cross-workspace access is denied by default.

## Boundary 3: Workflow To Capability

A workflow execution receives delegated authority.

It does not inherit all permissions of the initiating user.

## Boundary 4: Agent And Model Output To Action

Agent reasoning and model output are untrusted proposals.

They cannot authorize actions.

## Boundary 5: Damascus To Tool

Tools may produce real effects.

They require authorization, isolation, and effect auditing.

## Boundary 6: Damascus To Cloud Provider

Remote model and API providers receive data outside the local trust domain.

Data egress requires policy authorization.

## Boundary 7: Damascus To Local Execution Environment

Local processes and containers may access host resources if misconfigured.

Isolation must be verified.

## Boundary 8: External Content To Context

Websites, files, repositories, memory imports, and API responses are untrusted content.

They cannot redefine policy or authority.

## Boundary 9: Plugin, Adapter, And MCP Integration

Installed integrations extend executable code and capability surfaces.

They require source verification, permissions, isolation, and lifecycle control.

## Boundary 10: Evolution Arena To Production

Experimental variants are untrusted candidates.

They cannot become production behavior without benchmark evidence and promotion gates.

---

# Threat Model

## Protected Assets

* user data
* workspace resources
* memories
* credentials and keys
* workflow definitions
* audit history
* benchmark integrity
* evolution history
* system availability
* human authority

## Threat Actors

* unauthorized local user
* compromised user account
* malicious document or website
* malicious or compromised tool
* malicious plugin or adapter
* compromised model provider
* compromised local model artifact
* external attacker
* over-privileged workflow
* faulty autonomous behavior
* malicious insider in future collaborative deployments

## Threat Categories

### Unauthorized Access

Access outside granted workspace, project, memory, or resource scope.

### Prompt Injection

Untrusted content attempts to override instructions or induce unsafe actions.

### Privilege Escalation

A workflow, agent, tool, or plugin attempts to gain broader authority.

### Data Exfiltration

Sensitive data is sent to unauthorized models, APIs, tools, logs, or workspaces.

### Destructive Action

Files, repositories, services, memories, or configurations are destroyed or corrupted.

### Supply Chain Compromise

Models, tools, adapters, plugins, containers, or dependencies are malicious.

### Audit Tampering

An actor attempts to hide or rewrite actions.

### Benchmark Manipulation

An evolution candidate optimizes for or tampers with evaluation.

### Resource Exhaustion

Autonomous work consumes unbounded compute, storage, tokens, or external quotas.

### Cross-Scope Leakage

Data or authority leaks across projects or workspaces.

---

# Identity Management

## Principal Types

* Human User
* Local Service
* Workflow Execution
* Scheduled Operation
* Agent Component
* Tool Execution
* Future Organization
* Future Remote Installation

## Stable Identity

Damascus principal identity is stable and independent of display name or authentication provider.

## Authentication

Authentication mechanisms may include:

* local operating-system identity
* local credentials
* hardware-backed credentials
* external identity providers
* service credentials
* signed installation identity

The architecture depends on authentication adapters.

It does not depend on one identity provider.

## Delegation

Human User
↓ delegates bounded authority
Workflow Execution
↓ delegates narrower authority
Agent Or Tool Invocation

Delegation may only narrow authority.

## Session Management

Interactive sessions must include:

* principal identity
* authentication strength
* expiration
* revocation state
* device or installation context

Critical approvals may require re-authentication.

## Service Identity

Services and background jobs use dedicated identities.

They must not impersonate users through shared credentials.

---

# Permission System

## Model

Damascus uses policy-based authorization with role and attribute inputs.

Roles simplify administration.

Attributes and policies preserve precise control.

## Permission Request

```text
AuthorizationRequest
  principal_id
  delegated_identity_chain
  workspace_id
  project_id | null
  resource_id
  action
  effect_classes
  data_classification
  execution_context
  requested_duration
  policy_versions
```

## Decision

```text
AuthorizationDecision
  decision_id
  outcome
  obligations
  required_approvals
  effective_scope
  expiration
  policy_versions
  explanation
```

Outcomes:

* Allow
* Deny
* RequireApproval

## Policy Decision Points

The Authorization Service is the policy decision point.

## Policy Enforcement Points

Enforcement occurs at:

* Core execution admission
* Workspace operations
* Memory capture and retrieval
* Model invocation and egress
* Tool invocation
* Execution Environment provisioning
* Evolution promotion

## Permission Inheritance

System security baseline
↓
Workspace policy
↓
Project policy
↓
Workflow policy
↓
Invocation request

Lower levels may narrow authority.

They may not silently broaden it.

## Grants

Execution grants are:

* action-specific
* scope-specific
* time-bound
* attributable
* revocable

## Revocation

Revocation affects:

* new operations immediately
* queued operations before admission
* running operations at enforceable boundaries
* credentials
* cached decisions
* schedules

---

# Workspace Permissions

Workspace System owns membership, role, resource ownership, and policy bindings.

Security Layer evaluates and enforces them.

Workspace permission classes include:

* read
* configure
* manage membership
* bind resource
* execute workflow
* export
* archive
* delete
* share

A workspace role is not a universal system role.

Cross-workspace access requires explicit grants.

---

# Agent Permissions

Agents are not human principals.

They act through workflow execution identities.

Agent permissions:

* derive from workflow grants
* are narrowed by agent profile
* expire with invocation
* cannot be expanded by agent output

Agents may request actions.

They cannot approve their own requests.

---

# Tool Permissions

Tool permissions bind:

* tool
* operation
* resource
* effect class
* execution
* duration
* isolation profile

Broad tools such as terminals and generic HTTP clients require stricter controls.

Tool registration does not grant use.

---

# Memory Permissions

Memory permissions apply to:

* capture
* read
* link
* promote
* restrict
* export
* delete

Memory retrieval applies authorization and scope filters before ranking.

Private principal memory and cross-workspace memory require explicit policy.

Memory content cannot grant permissions.

---

# Model And Data-Egress Permissions

Model invocation authorization includes:

* provider
* profile
* locality
* data classification
* transmitted scope
* retention characteristics
* budget

Selecting a cloud model does not authorize data egress.

---

# Approval System

## Purpose

Approvals provide explicit human authorization for critical or exceptional actions.

## Approval Request

```text
ApprovalRequest
  approval_request_id
  requesting_principal
  workflow_execution_id
  action
  resource_scope
  predicted_effects
  risk_level
  expiration
  policy_reference
```

## Approval States

* Requested
* Pending
* Approved
* Denied
* Expired
* Revoked
* Consumed
* Cancelled

## Binding

An approval binds to the exact action class, scope, effects, execution, and expiration.

Approval for one action is not general permission.

## Approval Quality

Users must receive meaningful information:

* what will happen
* where
* why
* expected effects
* reversibility
* data exposure
* cost where material

## Separation Of Duties

Future collaborative deployments may require a different principal to approve sensitive operations.

## Emergency Approval

Emergency override must be exceptional, strongly authenticated, time-bound, and heavily audited.

---

# Audit System

## Purpose

Audit provides durable accountability for critical decisions and actions.

Audit is distinct from operational logs and observability traces.

## Audit Record

```text
AuditRecord
  audit_id
  event_type
  principal_id
  delegated_identity_chain
  workspace_id
  project_id | null
  action
  resource_reference
  authorization_decision_id
  approval_reference | null
  outcome
  timestamp
  integrity_metadata
```

## Audit Coverage

Audit must cover:

* authentication events
* permission and policy changes
* approvals
* critical tool actions
* model data egress
* memory export, promotion, and deletion
* workspace sharing and deletion
* evolution promotion and rollback
* incident-response actions

## Tamper Resistance

Audit storage should support:

* append-oriented records
* integrity chains or signatures
* restricted mutation
* independent backups
* retention policy

## Data Minimization

Audit records preserve accountability without duplicating secrets or unrestricted content.

---

# Encryption Strategy

## Data At Rest

Sensitive data should be encrypted in:

* PostgreSQL storage
* Redis persistence where enabled
* Qdrant
* graph storage
* artifact storage
* backups
* exports

## Data In Transit

Internal and external communications use authenticated encryption appropriate to deployment.

## Key Hierarchy

Recommended hierarchy:

Installation Root Key
↓
Workspace Key
↓
Data Category Or Export Key

Future multi-user deployments may add principal-specific wrapping keys.

## Key Management

Keys must support:

* generation
* secure storage
* rotation
* revocation
* backup and recovery
* destruction

## Secret Management

Secrets remain in approved secret storage.

Subsystem records contain references, not secret values.

## Cryptographic Erasure

Key destruction may support erasure when physical deletion cannot be guaranteed.

The system must report residual backups and limitations.

---

# Sandbox Architecture

## Purpose

Sandboxes isolate untrusted or high-risk execution from host resources and unrelated workspace data.

## Control Flow

Tool Or Workflow Requests Execution
↓
Security Classifies Risk
↓
Sandbox Policy Service Selects Minimum Profile
↓
Execution Environment Provisions Isolation
↓
Security Verifies Required Controls
↓
Execution Begins
↓
Telemetry And Effect Monitoring
↓
Cleanup And Verification

## Sandbox Profiles

* Read-Only Resource
* Project Write
* Network Restricted
* Disposable Browser
* Container Build
* Benchmark Arena
* Host Action Exception

## Isolation Controls

* process isolation
* filesystem mounts
* network policy
* resource limits
* environment filtering
* credential injection
* device access control
* disposable state

## Fail Closed

If required isolation cannot be provisioned or verified, execution is denied.

## Sandbox Escape

Suspected escape triggers:

* immediate containment
* tool and worker quarantine
* credential revocation
* evidence preservation
* incident response

---

# Secure Execution

## Execution Admission

Before execution:

1. authenticate requester
2. resolve scope
3. evaluate permission
4. resolve required approvals
5. issue bounded grant
6. provision isolation
7. inject scoped credentials
8. begin audit and telemetry

## During Execution

Security monitors:

* grant expiration
* policy revocation
* resource use
* sandbox violations
* unexpected effects
* data egress

## After Execution

Security coordinates:

* credential revocation
* sandbox cleanup
* effect reconciliation
* audit completion
* anomaly evaluation

---

# Local-First Security Model

## Local Ownership

Local data remains under user-controlled storage and keys whenever possible.

## Local Attack Surface

Local-first deployments must account for:

* host compromise
* malicious local software
* shared user accounts
* insecure backups
* exposed local APIs
* over-privileged containers
* untrusted local models

## Default Local Posture

Recommended defaults:

* loopback-only service binding
* authenticated local APIs
* encrypted sensitive storage
* deny-by-default network egress for tools
* sandboxed execution
* no automatic cloud fallback
* no automatic cross-workspace access
* explicit secret use

## Offline Security

Offline mode must disable remote fallback, telemetry, and synchronization that require network access.

Offline does not disable audit or local authorization.

## Host Trust

Damascus cannot fully protect data from a fully compromised host administrator.

The architecture should state this limitation clearly and reduce exposure through encryption, isolation, and minimized persistence.

---

# Security Events

Recommended events:

* AuthenticationSucceeded
* AuthenticationFailed
* AuthorizationAllowed
* AuthorizationDenied
* ApprovalRequested
* ApprovalGranted
* ApprovalDenied
* ApprovalRevoked
* PermissionGranted
* PermissionRevoked
* PolicyChanged
* SecretAccessed
* DataEgressAuthorized
* DataEgressDenied
* SandboxProvisioned
* SandboxViolationDetected
* AuditIntegrityFailure
* SecurityIncidentDeclared
* SecurityIncidentContained
* RecoveryCompleted

Events must avoid secret or unrestricted content.

---

# Incident Response

## Incident Classes

* Unauthorized Access
* Data Exposure
* Sandbox Escape
* Credential Compromise
* Audit Integrity Failure
* Supply Chain Compromise
* Malicious Integration
* Cross-Workspace Leakage
* Destructive Autonomous Action
* Benchmark Or Evolution Tampering

## Incident Lifecycle

Detect
↓
Classify
↓
Contain
↓
Preserve Evidence
↓
Assess Impact
↓
Eradicate
↓
Recover
↓
Notify
↓
Review And Improve

## Containment Actions

* suspend workspace
* pause workflows
* revoke grants
* rotate credentials
* quarantine tool, model, plugin, or worker
* disable network access
* isolate affected storage

## Evidence Preservation

Incident actions must preserve:

* audit records
* relevant traces
* policy versions
* approvals
* execution identities
* artifact hashes

Evidence handling must avoid spreading sensitive content.

---

# Recovery Procedures

## Credential Compromise

1. revoke credential
2. stop dependent operations
3. rotate secret
4. identify usage
5. validate affected resources
6. restore service

## Cross-Workspace Leakage

1. stop affected retrieval and execution
2. invalidate caches
3. quarantine derived outputs
4. trace exposure through provenance
5. correct policy or implementation
6. notify owners
7. verify isolation

## Sandbox Escape

1. terminate worker where possible
2. isolate host or worker
3. revoke credentials
4. quarantine integration
5. preserve evidence
6. rebuild from trusted state

## Audit Failure

1. stop critical autonomous actions
2. preserve available records
3. restore audit integrity
4. reconcile actions from other evidence
5. require review before reactivation

## Recovery Authority

Recovery operations may require elevated authority.

Elevated recovery authority must be narrowly scoped, time-bound, and audited.

---

# Failure Modes

## Identity Provider Unavailable

Fail closed for new privileged sessions.

Existing sessions continue only according to cached-decision policy and risk.

## Policy Store Unavailable

Deny new privileged operations.

Do not interpret missing policy as permission.

## Stale Authorization Cache

Use version-bound, short-lived decisions and invalidate on policy events.

## Approval Service Unavailable

Actions requiring approval remain paused.

## Key Service Unavailable

Encrypted data and secret-dependent actions remain unavailable.

## Audit Store Unavailable

Critical actions requiring audit fail closed.

Low-risk operations may continue only under explicit policy.

## Sandbox Provisioning Failure

Execution fails closed.

## Revocation Propagation Failure

Pause affected execution domain and reconcile grants before resuming.

---

# Observability And Security Metrics

Metrics include:

* authorization allow and denial rates
* approval wait and denial rates
* privilege usage
* secret access
* data-egress volume
* sandbox violations
* failed cleanup
* cross-scope denial
* incident detection and recovery time
* stale grant count
* audit integrity status

Security telemetry is access-controlled and may itself contain sensitive metadata.

---

# Architectural Constraints

## Constraint 1

Security applies across all Damascus layers.

## Constraint 2

Missing or ambiguous authorization is denial.

## Constraint 3

Local resources are not automatically trusted.

## Constraint 4

Agents, models, tools, and workflows cannot approve their own authority expansion.

## Constraint 5

Permissions are scoped, attributable, revocable, and time-bound where practical.

## Constraint 6

Critical actions require audit integrity.

## Constraint 7

Required sandbox failure causes execution denial.

## Constraint 8

Secrets are referenced, not stored in workflows, profiles, logs, memory, or audit content.

## Constraint 9

Cross-workspace access and cloud data egress are denied by default.

## Constraint 10

Evolution may not modify security policy, permissions, approvals, or minimum isolation.

## Constraint 11

Security policy changes are versioned and auditable.

## Constraint 12

Human authority remains final.

---

# Future Evolution

Future security capabilities may include:

* hardware-backed installation identity
* workspace-specific keys by default
* remote attestation
* policy simulation
* formal policy verification
* organization-level separation of duties
* privacy-preserving audit aggregation
* anomaly detection
* isolated remote workers

Security automation may improve detection and response recommendations.

It may not autonomously weaken controls.

---

# Open Questions

* Which authentication mechanism should the first local deployment use?
* Should each workspace receive a separate encryption key initially?
* Which operations require mandatory approval by default?
* How should local host administrator risk be communicated?
* Which audit integrity mechanism best fits local-first deployments?
* How should emergency recovery authority be governed?
* How should MCP and plugin trust be attested?
* Which low-risk operations may continue when audit storage is unavailable?
* How should collaborative workspace separation of duties work?
* How should users simulate policy changes before activation?

---

# Key Architectural Decisions

Security is a cross-cutting control system.

The Security Layer owns identity contracts, policy decisions, approvals, audit integrity, encryption policy, and incident coordination.

Subsystems enforce security at their operational boundaries.

Local-first reduces unnecessary exposure but does not eliminate trust boundaries.

Every autonomous action remains explicit, scoped, isolated, attributable, revocable, and subordinate to human authority.
