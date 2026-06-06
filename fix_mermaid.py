import re

# 1. High-Level-Architecture.md
with open('02-Architecture/High-Level-Architecture.md', 'r') as f:
    text = f.read()

hla_old = """User
↓
Workspace System
↓
Workflow
↓
Damascus Core

├── Runtime
├── State
├── Events
├── Scheduler
├── Registry
└── Observability

↓

Capabilities

├── Agents
├── Memory
├── Knowledge
├── Models
├── Tools
├── Research
├── Evolution
└── Security

↓

Execution Environment

↓

Applications

↓

Operating System"""

hla_new = """```mermaid
graph TD
    User --> WS[Workspace System]
    WS --> Workflow
    Workflow --> Core
    
    subgraph Core [Damascus Core]
        direction TB
        Runtime
        State
        Events
        Scheduler
        Registry
        Observability
    end

    Core --> Caps
    
    subgraph Caps [Capabilities]
        direction TB
        Agents
        Memory
        Knowledge
        Models
        Tools
        Research
        Evolution
        Security
    end

    Caps --> Env[Execution Environment]
    Env --> Apps[Applications]
    Apps --> OS[Operating System]
```"""

text = text.replace(hla_old, hla_new)

# Also fix the Core Infrastructure tree
core_old = """Damascus Core

├── Orchestration Runtime
├── State Manager
├── Event Bus
├── Scheduler
├── Registry Layer
└── Observability Layer"""

core_new = """```mermaid
graph TD
    Core[Damascus Core] --> OR[Orchestration Runtime]
    Core --> SM[State Manager]
    Core --> EB[Event Bus]
    Core --> Sch[Scheduler]
    Core --> RL[Registry Layer]
    Core --> OL[Observability Layer]
```"""

text = text.replace(core_old, core_new)

cap_old = """Capabilities

├── Workspace System
├── Agent Layer
├── Memory Layer
├── Knowledge Layer
├── Tool Layer
├── Model Layer
├── Research Layer
├── Evolution Layer
└── Security Layer"""

cap_new = """```mermaid
graph TD
    Caps[Capabilities] --> WS[Workspace System]
    Caps --> AL[Agent Layer]
    Caps --> ML[Memory Layer]
    Caps --> KL[Knowledge Layer]
    Caps --> TL[Tool Layer]
    Caps --> MoL[Model Layer]
    Caps --> RL[Research Layer]
    Caps --> EL[Evolution Layer]
    Caps --> SL[Security Layer]
```"""

text = text.replace(cap_old, cap_new)

with open('02-Architecture/High-Level-Architecture.md', 'w') as f:
    f.write(text)

# 2. Workspace-System.md
with open('02-Architecture/Workspace-System.md', 'r') as f:
    text = f.read()

ws_old = """Damascus Installation
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
            └── Workflow Executions"""

ws_new = """```mermaid
graph LR
    Inst[Damascus Installation] --> WS[Workspace]
    
    WS --> WC[Workspace Configuration]
    WS --> WP[Workspace Policies]
    WS --> WM[Workspace Memories]
    WS --> WK[Workspace Knowledge]
    WS --> WW[Workspace Workflows]
    WS --> WB[Workspace Benchmarks]
    WS --> WE[Workspace Evolution History]
    WS --> Projs[Projects]
    
    Projs --> Proj[Project]
    
    Proj --> PC[Project Configuration]
    Proj --> PP[Project Policies]
    Proj --> PR[Project Resources]
    Proj --> PM[Project Memories]
    Proj --> PK[Project Knowledge]
    Proj --> PW[Project Workflows]
    Proj --> PB[Project Benchmarks]
    Proj --> PE[Project Evolution History]
    Proj --> WE[Workflow Executions]
```"""

text = text.replace(ws_old, ws_new)

ws_core_old = """Workspace System
├── Workspace Service
├── Project Service
├── Context Resolver
├── Scope Manager
├── Workspace Policy Binder
├── Resource Catalog
├── Workspace Activity Service
├── Lifecycle Coordinator
├── Import and Export Service
└── Workspace Repository"""

ws_core_new = """```mermaid
graph TD
    WS[Workspace System] --> S1[Workspace Service]
    WS --> S2[Project Service]
    WS --> S3[Context Resolver]
    WS --> S4[Scope Manager]
    WS --> S5[Workspace Policy Binder]
    WS --> S6[Resource Catalog]
    WS --> S7[Workspace Activity Service]
    WS --> S8[Lifecycle Coordinator]
    WS --> S9[Import and Export Service]
    WS --> S10[Workspace Repository]
```"""

text = text.replace(ws_core_old, ws_core_new)

with open('02-Architecture/Workspace-System.md', 'w') as f:
    f.write(text)

# 3. Core-System.md
with open('02-Architecture/Core-System.md', 'r') as f:
    text = f.read()

core_arch_old = """Damascus Core

├── Orchestration Runtime
├── State Manager
├── Event Bus
├── Scheduler
├── Registry Layer
├── Observability Layer
└── Lifecycle Manager"""

core_arch_new = """```mermaid
graph TD
    Core[Damascus Core] --> OR[Orchestration Runtime]
    Core --> SM[State Manager]
    Core --> EB[Event Bus]
    Core --> Sch[Scheduler]
    Core --> RL[Registry Layer]
    Core --> OL[Observability Layer]
    Core --> LM[Lifecycle Manager]
```"""

text = text.replace(core_arch_old, core_arch_new)

workflow_old = """Workflow
├── Agent Node
├── Tool Node
├── Human Approval Node
├── Model Node
├── Research Node
└── Benchmark Node"""

workflow_new = """```mermaid
graph TD
    WF[Workflow] --> AN[Agent Node]
    WF --> TN[Tool Node]
    WF --> HAN[Human Approval Node]
    WF --> MN[Model Node]
    WF --> RN[Research Node]
    WF --> BN[Benchmark Node]
```"""

text = text.replace(workflow_old, workflow_new)

with open('02-Architecture/Core-System.md', 'w') as f:
    f.write(text)

print("Mermaid replacement done.")
