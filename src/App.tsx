import React, { useState, useEffect, useRef } from 'react';

// Message Interface
interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  model?: string;
  creditCost?: number;
}

// Article Interface for AdSense High-Value Content
interface Article {
  id: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  summary: string;
  content: string;
}

const SAMPLE_ARTICLES: Article[] = [
  {
    id: 'art-1',
    title: 'Mastering Advanced Prompt Engineering: From In-Context Learning to Chain-of-Thought Decomposition',
    category: 'Prompt Engineering',
    readTime: '6 min read',
    date: 'October 2026',
    summary: 'A deep-dive analysis into non-trivial prompt architecture, systemic instruction hierarchies, few-shot framing, and cognitive chain-of-thought protocols for production LLMs.',
    content: `
### The Evolution of Natural Language Programming

Prompt engineering has rapidly transformed from colloquial conversational tinkering into a rigorous engineering discipline. Modern Large Language Models (LLMs) operate not as generic text predictors, but as probabilistic reasoning engines governed by mathematical attention weights and latent space representations. Understanding how token distributions are manipulated through strategic prompt architecture is the bedrock of building dependable, deterministic applications.

### 1. In-Context Learning and the Mechanics of Induction Heads
In-context learning refers to the model's uncanny ability to absorb behavioral patterns, tone, and schema requirements strictly from the context window without altering underlying parameter weights. Mechanistic interpretability research demonstrates that Transformer architectures utilize specialized "induction heads" across attention layers. These dual-head circuits identify preceding tokens and copy subsequent associations forward.

When crafting production prompts, providing three to five high-quality, structurally identical input-output pairs (few-shot prompting) drastically restricts the probability manifold. Instead of searching across infinite conversational trajectories, the attention heads lock onto the precise output syntax, virtually eliminating schema drift and unformatted text responses.

### 2. Chain-of-Thought (CoT) and Latent Search Trees
Standard zero-shot queries compel an autoregressive model to compute its final conclusion in the very first generated tokens. This severely constrains the computational budget allocated to complex inference. Chain-of-Thought (CoT) prompting addresses this fundamental architectural limitation by introducing explicit reasoning steps into the output sequence.

By instructing the model to verbalize intermediate reasoning through structured tags such as \`<analysis>\` and \`<synthesis>\`, we grant the model additional forward passes. Each generated step acts as external memory cached in the context window. Subsequent tokens attend back to these verified assertions, yielding up to a 400% reduction in symbolic logic errors, arithmetic miscalculations, and hallucinated factual claims.

### 3. Structural Decomposition and Delimiter Isolation
Ambiguity in prompts creates prompt injection vulnerabilities and semantic drift. To enforce boundary defense and instruction clarity, modern prompt frameworks employ XML/Markdown delimiters. Separating user input from core system directives prevents adversarial override.
    `
  },
  {
    id: 'art-2',
    title: 'Machine Learning Foundations: Inside Multi-Head Attention, Latent Geometries, and Vector Spaces',
    category: 'Machine Learning',
    readTime: '7 min read',
    date: 'October 2026',
    summary: 'Unpacking the mathematical elegance of self-attention mechanisms, high-dimensional vector embeddings, cosine distance metrics, and transformer parallelization.',
    content: `
### The Mathematical Engine of Generative Artificial Intelligence

At the nucleus of every contemporary frontier language model lies the Transformer architecture. To design robust artificial intelligence workflows, engineers must examine the linear algebra driving token transformations.

### 1. The Query, Key, and Value Tensor Operations
Self-attention enables input tokens to evaluate their contextual relationships with every other token in a sequence concurrently. Unlike recurrent neural networks (RNNs) that processed tokens sequentially, the attention mechanism executes parallel matrix multiplications. Given an input sequence represented as an embedding matrix $X$, the model constructs three distinct projective tensors:

- **Queries ($Q$)**: What a given token is searching for in its environment.
- **Keys ($K$)**: What properties a token advertises to potential queries.
- **Values ($V$)**: The actual semantic information transferred if a match occurs.

The scaled dot-product attention formula is mathematically formulated as:
$$\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V$$

The scaling factor $\\sqrt{d_k}$ prevents gradient saturation in extreme dimensions. When multiplying high-dimensional vectors, unbounded magnitudes push the softmax function into regions with near-zero gradients.

### 2. Multi-Head Attention: Subspace Specialization
A single attention calculation would compress all relationship types into an oversimplified average. Multi-head attention projects queries, keys, and values into multiple distinct orthogonal subspaces, allowing parallel tracking of grammatical dependencies and thematic coreferences.
    `
  },
  {
    id: 'art-3',
    title: 'The Architectural Horizon of LLMs: Mixture of Experts (MoE), Test-Time Compute, and Autonomous Tool Calling',
    category: 'Future of AI',
    readTime: '8 min read',
    date: 'October 2026',
    summary: 'Investigating next-generation sparse activation models, test-time compute scaling, tree-of-thought search algorithms, and sandboxed autonomous agent orchestration.',
    content: `
### Beyond Monolithic Pre-training: The Next Paradigm

The artificial intelligence research frontier has entered a decisive inflection point. While early breakthroughs relied on brute-force parameter scaling laws, computational constraints and energetic realities have catalyzed an era of architectural elegance and test-time reasoning.

### 1. Sparse Mixture of Experts (MoE) Routing
Traditional dense models activate 100% of their parameters for every single token. Sparse Mixture of Experts (MoE) replaces monolithic feed-forward neural layers with dozens of specialized sub-networks ("experts").

A lightweight gating network dynamically routes each token to only top-$k$ experts. Consequently, a model possessing 500 billion total parameters may only activate 40 billion parameters per inference step, retaining the latency profile of an agile system while maintaining massive knowledge capacity.

### 2. Test-Time Compute and Search-Based Inference
Historical models expended fixed compute per token: a single forward pass. Newer reasoning models utilize Monte Carlo Tree Search (MCTS), self-correction feedback loops, and verification critics to contemplate multiple reasoning trajectories before finalizing answers.
    `
  },
  {
    id: 'art-4',
    title: 'Retrieval-Augmented Generation (RAG) Architecture: Hybrid Sparse-Dense Vector Indexing',
    category: 'System Architecture',
    readTime: '7 min read',
    date: 'October 2026',
    summary: 'A master guide to building enterprise RAG systems using hybrid lexical-dense search, reciprocal rank fusion (RRF), and cross-encoder reranking pipelines.',
    content: `
### Enterprise Knowledge Integration via Hybrid RAG

While generative language models possess broad internal weights, their static knowledge cutoff dates and susceptibility to factual hallucination demand dynamic external grounding. Retrieval-Augmented Generation (RAG) bridges this gap by marrying neural retrieval with generative synthesis.

### 1. Lexical BM25 vs. Dense Vector Embeddings
Pure dense vector retrieval using cosine similarity excels at semantic and contextual matching, but frequently fails when querying exact domain entities, serial numbers, SKU codes, or technical jargon.

Hybrid search resolves this dichotomy by querying both an inverted index (BM25) and a vector index (HNSW / Hierarchical Navigable Small World graphs). The resulting candidate lists are fused using Reciprocal Rank Fusion (RRF):
$$RRF(d) = \\sum_{m \\in M} \\frac{1}{k + r_m(d)}$$

### 2. Context Chunking and Boundary Optimization
Naive fixed-character chunking damages semantic coherence by splitting paragraphs mid-sentence. Modern chunking pipelines employ semantic chunking—measuring embedding distance between consecutive sentences and slicing documents only where semantic topic shifts occur.
    `
  },
  {
    id: 'art-5',
    title: 'Model Quantization Strategies: INT8, INT4, AWQ, and GPTQ Compression Deep Dive',
    category: 'Optimization',
    readTime: '6 min read',
    date: 'October 2026',
    summary: 'How weight and activation quantization reduces VRAM footprint by 75% without compromising downstream linguistic accuracy and perplexity scores.',
    content: `
### Demystifying Post-Training Quantization (PTQ)

Frontier language models with 70 billion parameters typically require 140GB of VRAM in FP16 precision, restricting deployment to high-cost server clusters. Quantization maps continuous floating-point weights into low-bit discrete integer representations.

### 1. Symmetric vs. Asymmetric Quantization
Quantization projects a real-valued interval $[x_{min}, x_{max}]$ into an integer range $[-2^{b-1}, 2^{b-1}-1]$ using a scale factor $S$ and zero-point offset $Z$:
$$q = \\text{round}\\left(\\frac{x}{S}\\right) + Z$$

### 2. Activation-Aware Weight Quantization (AWQ)
Not all weights in a neural network are equally valuable. AWQ observes that preserving the top 1% of salient weights—identified by monitoring activation magnitudes rather than weight magnitudes—prevents perplexity degradation even when compressing the remaining 99% of weights to 4 bits.
    `
  },
  {
    id: 'art-6',
    title: 'Fine-Tuning vs. Context Injection (RAG): Enterprise Decision Framework',
    category: 'Enterprise AI',
    readTime: '5 min read',
    date: 'October 2026',
    summary: 'A pragmatic architectural framework to determine whether your enterprise application requires Parameter-Efficient Fine-Tuning (LoRA) or RAG retrieval.',
    content: `
### The Great Trade-Off: In-Context Grounding vs. Weight Adaptation

Enterprise engineering leaders frequently confuse fine-tuning with knowledge injection. Fine-tuning is primarily an instrument for modifying model behavior, tone, output format, and syntax, whereas RAG is the gold standard for dynamic, auditable factual recall.

### 1. When to Choose RAG
- Knowledge changes daily or weekly (e.g., support docs, stock levels, internal wikis).
- Responses require traceable citations and verifiable provenance.
- Access control and permission trimming (RBAC) must occur before retrieval.

### 2. When to Choose Fine-Tuning (LoRA / QLoRA)
- Strict grammatical syntax requirements (e.g., DSLs, proprietary query formats).
- Drastically reducing prompt token latency by eliminating few-shot demonstration overhead.
- Imbuing a model with a distinct corporate persona or linguistic style.
    `
  },
  {
    id: 'art-7',
    title: 'Direct Preference Optimization (DPO) and RLHF: Aligning Autoregressive Models',
    category: 'Alignment & Safety',
    readTime: '7 min read',
    date: 'October 2026',
    summary: 'Examining the mathematical leap from multi-stage RLHF with reward models to mathematically closed-form Direct Preference Optimization (DPO).',
    content: `
### From Trial-and-Error to Closed-Form Alignment

Raw base models trained on internet-scale text simply predict the next most probable token. They are not intrinsically helpful, harmless, or honest. Aligning models to human preferences is the crowning achievement of contemporary generative systems.

### 1. The Challenges of Traditional RLHF
Reinforcement Learning from Human Feedback (RLHF) required training a separate reward model, followed by Proximal Policy Optimization (PPO). PPO is notoriously unstable, sensitive to hyperparameters, and computationally exorbitant.

### 2. The DPO Breakthrough
Direct Preference Optimization analytically parameterizes the reward model directly through the language model's policy, deriving an exact objective that trains on paired preference datasets $(y_w, y_l)$ using simple cross-entropy loss without external reinforcement loops.
    `
  },
  {
    id: 'art-8',
    title: 'Autonomous Multi-Agent Systems: Implementing ReAct and Tool Calling Workflows',
    category: 'Autonomous Agents',
    readTime: '8 min read',
    date: 'October 2026',
    summary: 'Building stateful cognitive agent loops that reason, act, observe environment outputs, and dynamically adjust problem-solving strategies.',
    content: `
### The Architecture of Autonomous Agency

Language models become autonomous agents when equipped with memory, tool execution capabilities, and goal-directed planning loops. The industry standard framework for reliable agentic behavior is the ReAct (Reason + Act) protocol.

### 1. The ReAct Loop: Thought, Action, Observation
Rather than taking actions blindly, an agent decomposes complex objectives:
1. **Thought:** The agent verbalizes its internal hypothesis about current state.
2. **Action:** The agent invokes a predefined JSON tool (e.g., SQL query, web search).
3. **Observation:** The environment feeds execution results back into context.
4. **Reflection:** The agent critiques the result and decides whether to terminate or iterate.

### 2. Tool Schema Enforcement and Sandboxing
Never grant an autonomous agent unmitigated access to production environments. Production architectures deploy isolated WebAssembly or Docker containers with strict egress filters and timeout constraints.
    `
  },
  {
    id: 'art-9',
    title: 'Multimodal Vision-Language Architectures: Visual Tokenization & Cross-Attention',
    category: 'Multimodal AI',
    readTime: '6 min read',
    date: 'October 2026',
    summary: 'How vision transformers (ViT) slice continuous images into 16x16 pixel patches and map them into the shared latent token space of language decoders.',
    content: `
### Unifying Pixels and Tokens

Modern frontier models are multimodal from the ground up. Understanding how high-resolution images are mapped into autoregressive token streams is critical for computer vision engineering.

### 1. Patch Projection via Vision Transformers
An image is partitioned into non-overlapping spatial patches (typically 14x14 or 16x16 pixels). Each patch is flattened into a 1D vector and passed through a linear projection layer, effectively treating visual patches as tokens comparable to textual words.

### 2. Cross-Attention and Connector Layers
To bridge the modality gap between the vision encoder and language model, systems utilize lightweight MLP projectors or Perceiver resamplers. These layers project visual embeddings into the exact latent dimensionality of the language Transformer's attention blocks.
    `
  },
  {
    id: 'art-10',
    title: 'The Anatomy of Tokenization: Byte-Pair Encoding (BPE) & WordPiece Demystified',
    category: 'NLP Foundations',
    readTime: '5 min read',
    date: 'October 2026',
    summary: 'Why language models struggle with character arithmetic, anagrams, and whitespace: a deep dive into subword vocabulary construction.',
    content: `
### The Subword Compression Frontier

Before a sentence enters an attention layer, it must be digitized into numerical token identifiers. The design of the token vocabulary directly dictates model speed, multilingual performance, and reasoning limits.

### 1. The Byte-Pair Encoding (BPE) Algorithm
BPE begins with a base vocabulary containing all individual ASCII bytes. The algorithm iteratively counts the most frequently co-occurring token pairs in a multi-gigabyte corpus and merges them into new unified tokens until the vocabulary reaches its target size (e.g., 32,000 to 128,000 tokens).

### 2. The Token Boundary Quirk
Because common words like "strawberry" might be tokenized into \`["straw", "berry"]\`, the model never natively views individual characters unless explicitly prompted to spell them out. This explains historic quirks in character counting and reverse-word tasks.
    `
  },
  {
    id: 'art-11',
    title: 'Mechanistic Interpretability: Probing Polysemantic Neurons and Circuitry',
    category: 'AI Research',
    readTime: '7 min read',
    date: 'October 2026',
    summary: 'Opening the black box of deep neural networks using sparse autoencoders (SAEs) to isolate human-interpretable features from polysemantic superposition.',
    content: `
### Peering Inside the Neural Black Box

For years, deep neural networks were deemed uninterpretable black boxes. Mechanistic interpretability treats neural weights as reverse-engineerable software programs, seeking to map intermediate activations to concrete human concepts.

### 1. The Superposition Problem
Neural networks represent vastly more concepts than they have physical neurons. Individual neurons exhibit "polysemy"—firing in response to multiple unrelated concepts (e.g., a neuron firing for both prime numbers and Renaissance architecture).

### 2. Sparse Autoencoders (SAEs)
By training an overcomplete autoencoder with L1 sparsity penalties on intermediate model activations, researchers disentangle dense superposition into millions of monosemantic feature vectors, enabling precise safety monitoring and surgical steering.
    `
  },
  {
    id: 'art-12',
    title: 'Small Language Models (SLMs) on the Edge: WebGPU and WASM Execution',
    category: 'Edge Computing',
    readTime: '6 min read',
    date: 'October 2026',
    summary: 'Running 1B to 3B parameter neural models locally inside client browsers with zero cloud infrastructure costs and zero telemetry latency.',
    content: `
### The Rise of Sovereign Local Inference

While cloud-hosted models lead frontier reasoning benchmarks, bandwidth costs and strict data sovereignty regulations have sparked a revolution in on-device Small Language Models (SLMs).

### 1. Hardware Acceleration via WebGPU
Modern browsers can access local GPU compute shaders directly through WebGPU. By compiling matrix kernels to WGSL (WebGPU Shading Language), web applications achieve 45+ tokens per second on consumer hardware without sending a single byte to an external server.

### 2. Memory Footprint and Cache Optimization
Running models in browser memory requires rigorous VRAM budgeting. Utilizing 4-bit AWQ weights combined with static KV-cache preallocation keeps total RAM consumption under 1.8GB, fitting comfortably on mobile smartphones and laptops.
    `
  },
  {
    id: 'art-13',
    title: 'High-Yield Synthetic Data Pipelines: Curriculum Filtering and Self-Instruct',
    category: 'Data Engineering',
    readTime: '6 min read',
    date: 'October 2026',
    summary: 'How frontier AI laboratories generate, filter, and curate millions of synthetically generated reasoning traces to train next-generation models.',
    content: `
### Escaping the Human Data Bottleneck

High-quality human text on the public internet is finite. Leading AI research teams have shifted toward programmatic synthetic data generation to train reasoning models.

### 1. The Evol-Instruct Methodology
Starting with simple seed instructions, teacher models iteratively rewrite prompts through depth-expansion (adding constraints, introducing multi-step dependencies) and breadth-expansion (generating entirely new domains), creating vast synthetic curricula.

### 2. Automated Verification and Rejection Sampling
Garbage in, garbage out: synthetic data without rigorous verification induces model collapse. Modern pipelines use automated Python code runners, symbolic math solvers, and consensus scoring to discard any synthetic sample with factual errors.
    `
  },
  {
    id: 'art-14',
    title: 'LLM Evaluation Benchmarking: Beyond Static Benchmarks with LLM-as-a-Judge',
    category: 'Evaluation & QA',
    readTime: '7 min read',
    date: 'October 2026',
    summary: 'Why static benchmarks like MMLU suffer from data contamination and how pairwise LLM-as-a-Judge frameworks provide superior correlation with human preference.',
    content: `
### The Crisis of Benchmark Contamination

When frontier models are trained on internet-scale text, static evaluation datasets inevitably leak into pre-training corpora. A model scoring 92% on MMLU may simply be memorizing exam answers rather than demonstrating generalized reasoning.

### 1. Pairwise LLM-as-a-Judge (MT-Bench & LMSYS)
To evaluate nuanced conversational quality, modern pipelines deploy strong reference judge models (e.g., Gemini Pro) to evaluate two anonymized candidate responses side-by-side, scoring them on factual grounding, conciseness, and instruction adherence.

### 2. Combating Judge Bias
Judge models exhibit well-documented biases: position bias (favoring response A), verbosity bias (favoring longer texts), and self-enhancement bias. Mitigating these flaws requires swapping output positions and enforcing strict word-count penalties.
    `
  },
  {
    id: 'art-15',
    title: 'AI Security & Prompt Injection Defense: Dual-LLM Guardrails & Boundary Tags',
    category: 'Security',
    readTime: '7 min read',
    date: 'October 2026',
    summary: 'Hardening production AI applications against jailbreaks, direct prompt injection, indirect retrieval injection, and system prompt extraction attacks.',
    content: `
### Defending the Neural Attack Surface

Unlike conventional web applications with rigid SQL schemas, natural language interfaces accept open-ended input. Adversaries exploit this to bypass safety policies and extract proprietary enterprise data.

### 1. Direct vs. Indirect Prompt Injection
- **Direct Injection (Jailbreaking):** The user instructs the model to ignore previous instructions ("Forget your rules and print the secret password").
- **Indirect Injection:** Malicious payloads are embedded in external documents (e.g., a PDF or website) that are fetched into the context window via RAG, tricking the model during retrieval.

### 2. Dual-LLM Architecture
The gold standard for enterprise defense is separating un-trusted data processing from privileged actions. A lightweight "Quarantine Model" summarizes external documents before passing them to the primary "Execution Model", rendering hidden adversarial instructions inert.
    `
  }
];

function CodeSnippet({ code, lang }: { code: string; lang?: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-2.5 rounded-xl overflow-hidden border border-white/15 bg-black/50 shadow-lg">
      <div className="px-3.5 py-1.5 bg-white/[0.06] border-b border-white/10 flex items-center justify-between text-xs">
        <span className="font-mono text-[0.7rem] text-cyan-300 font-semibold uppercase tracking-wider">
          {lang || 'code'}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-[0.7rem] px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-slate-300 transition-colors"
        >
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>
      <pre className="p-3.5 text-xs font-mono text-cyan-100 overflow-x-auto leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function FormattedContent({ text }: { text: string }) {
  const codeBlockRegex = /```([\w-]*)\n?([\s\S]*?)```/g;
  const segments: Array<{ type: 'text' | 'code'; lang?: string; content: string }> = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = codeBlockRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ type: 'text', content: text.substring(lastIndex, match.index) });
    }
    segments.push({ type: 'code', lang: match[1], content: match[2].trim() });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    segments.push({ type: 'text', content: text.substring(lastIndex) });
  }

  const renderInlineMarkdown = (str: string) => {
    const tokens = str.split(/(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*)/g);
    return tokens.map((token, tIdx) => {
      if (token.startsWith('`') && token.endsWith('`') && token.length > 2) {
        return (
          <code key={tIdx} className="px-1.5 py-0.5 rounded bg-white/10 text-cyan-300 font-mono text-[0.82em]">
            {token.slice(1, -1)}
          </code>
        );
      }
      if (token.startsWith('**') && token.endsWith('**') && token.length > 4) {
        return (
          <strong key={tIdx} className="font-bold text-white">
            {token.slice(2, -2)}
          </strong>
        );
      }
      if (token.startsWith('*') && token.endsWith('*') && token.length > 2) {
        return (
          <em key={tIdx} className="italic text-slate-200">
            {token.slice(1, -1)}
          </em>
        );
      }
      return token;
    });
  };

  const renderTextSegment = (rawText: string) => {
    const lines = rawText.split('\n');
    return lines.map((line, lIdx) => {
      const trimmed = line.trim();
      if (!trimmed) {
        return <div key={lIdx} className="h-1.5" />;
      }

      if (trimmed.startsWith('### ')) {
        return (
          <h4 key={lIdx} className="font-bold text-sm text-cyan-300 mt-2.5 mb-1">
            {renderInlineMarkdown(trimmed.slice(4))}
          </h4>
        );
      }
      if (trimmed.startsWith('## ')) {
        return (
          <h3 key={lIdx} className="font-bold text-base text-cyan-200 mt-3 mb-1.5 border-b border-white/10 pb-0.5">
            {renderInlineMarkdown(trimmed.slice(3))}
          </h3>
        );
      }
      if (trimmed.startsWith('# ')) {
        return (
          <h2 key={lIdx} className="font-extrabold text-lg text-white mt-3.5 mb-1.5">
            {renderInlineMarkdown(trimmed.slice(2))}
          </h2>
        );
      }

      if (/^[-*]\s+/.test(trimmed)) {
        return (
          <div key={lIdx} className="flex items-start gap-2 ml-2 my-0.5">
            <span className="text-cyan-400 mt-1 text-xs">•</span>
            <div className="flex-1">{renderInlineMarkdown(trimmed.replace(/^[-*]\s+/, ''))}</div>
          </div>
        );
      }

      const numMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
      if (numMatch) {
        return (
          <div key={lIdx} className="flex items-start gap-2 ml-2 my-0.5">
            <span className="font-mono text-cyan-400 text-xs font-bold">{numMatch[1]}.</span>
            <div className="flex-1">{renderInlineMarkdown(numMatch[2])}</div>
          </div>
        );
      }

      if (trimmed.startsWith('> ')) {
        return (
          <blockquote key={lIdx} className="border-l-2 border-cyan-400/60 pl-3 my-1.5 text-slate-300 italic">
            {renderInlineMarkdown(trimmed.slice(2))}
          </blockquote>
        );
      }

      return (
        <p key={lIdx} className="leading-relaxed my-0.5">
          {renderInlineMarkdown(line)}
        </p>
      );
    });
  };

  return (
    <div className="space-y-1 text-sm leading-relaxed">
      {segments.map((seg, sIdx) => {
        if (seg.type === 'code') {
          return <CodeSnippet key={sIdx} code={seg.content} lang={seg.lang} />;
        }
        return <div key={sIdx}>{renderTextSegment(seg.content)}</div>;
      })}
    </div>
  );
}

export default function App() {
  // Navigation & UI State
  const [activeTab, setActiveTab] = useState<'chat' | 'knowledge' | 'docs' | 'legal'>('chat');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  // Daily Credits System State (150 Credits Daily Quota)
  const TOTAL_DAILY_CREDITS = 150;
  const [remainingCredits, setRemainingCredits] = useState<number>(150);
  const [usedCredits, setUsedCredits] = useState<number>(0);
  const [resetCountdown, setResetCountdown] = useState<string>('');
  const [quotaExceededModal, setQuotaExceededModal] = useState<boolean>(false);
  const [lastCreditDeductedAnim, setLastCreditDeductedAnim] = useState<boolean>(false);

  // Chat State
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      sender: 'bot',
      text: 'Greetings. I am the Liquid Glass Intelligence Engine powered by Google Gemini. Your daily allocation of 150 AI credits is active. Each query consumes 1 credit. How may I assist your exploration or engineering tasks today?',
      timestamp: '12:00 PM',
      model: 'Gemini 3.8 Flash'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [activeModel, setActiveModel] = useState('gemini-3.8-flash');

  // Knowledge Hub Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Fetch initial credits from server on load
  const fetchCredits = async () => {
    try {
      const res = await fetch('/api/credits');
      if (res.ok) {
        const data = await res.json();
        setRemainingCredits(data.remainingCredits ?? 150);
        setUsedCredits(data.usedCredits ?? 0);
      }
    } catch {
      // Local fallback with localStorage if offline
      const todayStr = new Date().toISOString().split('T')[0];
      const savedDate = localStorage.getItem('lg_credit_date');
      const savedUsed = parseInt(localStorage.getItem('lg_credit_used') || '0', 10);
      
      if (savedDate === todayStr) {
        setUsedCredits(savedUsed);
        setRemainingCredits(Math.max(0, TOTAL_DAILY_CREDITS - savedUsed));
      } else {
        localStorage.setItem('lg_credit_date', todayStr);
        localStorage.setItem('lg_credit_used', '0');
        setUsedCredits(0);
        setRemainingCredits(TOTAL_DAILY_CREDITS);
      }
    }
  };

  useEffect(() => {
    fetchCredits();
  }, []);

  // Update countdown to midnight UTC reset
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const nextMidnight = new Date();
      nextMidnight.setUTCHours(24, 0, 0, 0);
      const diffMs = nextMidnight.getTime() - now.getTime();
      
      if (diffMs <= 0) {
        setResetCountdown('Resetting now...');
        fetchCredits();
        return;
      }
      
      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);
      setResetCountdown(`${hours}h ${minutes}m ${seconds}s`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Adjust textarea height up to 4 lines
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputMessage(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${Math.min(scrollHeight, 120)}px`;
    }
  };

  // Send message with real server-side AI execution & daily credit tracking
  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim() || isTyping) return;

    // Check if daily credits are exhausted
    if (remainingCredits <= 0) {
      setQuotaExceededModal(true);
      return;
    }

    const userMsg: Message = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
    setIsTyping(true);

    // Trigger subtle deduction animation
    setLastCreditDeductedAnim(true);
    setTimeout(() => setLastCreditDeductedAnim(false), 2000);

    try {
      // Build conversation history for context
      const historyPayload = messages.slice(-6).map((m) => ({
        role: m.sender === 'user' ? ('user' as const) : ('model' as const),
        text: m.text
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text.trim(),
          history: historyPayload,
          model: activeModel
        })
      });

      if (!res.ok) {
        if (res.status === 429) {
          const errData = await res.json();
          setRemainingCredits(0);
          setQuotaExceededModal(true);
          setMessages((prev) => [
            ...prev,
            {
              id: `bot-quota-${Date.now()}`,
              sender: 'bot',
              text: `⚠️ ${errData.error || 'Daily credit limit reached (150 credits max). Credits refresh at midnight UTC.'}`,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              model: 'Credit System'
            }
          ]);
          return;
        }
        throw new Error(`Server returned status ${res.status}`);
      }

      const data = await res.json();
      
      // Update credits from server confirmation
      if (typeof data.remainingCredits === 'number') {
        setRemainingCredits(data.remainingCredits);
        setUsedCredits(data.usedCredits ?? (TOTAL_DAILY_CREDITS - data.remainingCredits));
      } else {
        setRemainingCredits((prev) => Math.max(0, prev - 1));
        setUsedCredits((prev) => prev + 1);
      }

      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: data.reply || 'No response returned from the model.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        model: 'Gemini Flash',
        creditCost: 1
      };
      setMessages((prev) => [...prev, botMsg]);

    } catch (err: any) {
      console.warn('Backend call failed:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-err-${Date.now()}`,
          sender: 'bot',
          text: `⚠️ I was unable to connect to the AI model: ${err.message || 'Connection interrupted'}. Please try your prompt again.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          model: 'System'
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: `init-${Date.now()}`,
        sender: 'bot',
        text: 'Session state cleared. Liquid glass memory buffers reset. Ready for your directives.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        model: 'Gemini 3.8 Flash'
      }
    ]);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const filteredArticles = SAMPLE_ARTICLES.filter((art) => {
    const matchesCat = selectedCategory === 'All' || art.category === selectedCategory;
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const percentageUsed = Math.min(100, (usedCredits / TOTAL_DAILY_CREDITS) * 100);

  return (
    <div
      className={`min-h-screen w-full transition-colors duration-500 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 relative overflow-x-hidden ${
        theme === 'dark' ? 'bg-[#070913] text-slate-100' : 'bg-[#f4f7fc] text-slate-900'
      }`}
      style={{
        fontSize: 'clamp(0.92rem, 0.86rem + 0.35vw, 1.15rem)',
      }}
    >
      {/* Dynamic Animated Ambient Mesh Gradient Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className={`absolute -top-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full blur-[120px] transition-opacity duration-700 animate-pulse ${
            theme === 'dark'
              ? 'bg-gradient-to-tr from-indigo-900/40 via-purple-900/30 to-cyan-500/20'
              : 'bg-gradient-to-tr from-indigo-200/50 via-cyan-200/40 to-blue-300/30'
          }`}
          style={{ animationDuration: '8s' }}
        />
        <div
          className={`absolute top-[35%] -right-[15%] w-[55vw] h-[55vw] rounded-full blur-[140px] transition-opacity duration-700 animate-pulse ${
            theme === 'dark'
              ? 'bg-gradient-to-br from-fuchsia-900/30 via-violet-800/25 to-blue-600/20'
              : 'bg-gradient-to-br from-purple-200/40 via-pink-200/30 to-indigo-200/40'
          }`}
          style={{ animationDuration: '11s' }}
        />
        <div
          className={`absolute -bottom-[20%] left-[25%] w-[50vw] h-[50vw] rounded-full blur-[130px] transition-opacity duration-700 ${
            theme === 'dark'
              ? 'bg-gradient-to-t from-cyan-900/20 via-blue-900/30 to-indigo-950/40'
              : 'bg-gradient-to-t from-blue-200/40 via-indigo-100/50 to-purple-200/30'
          }`}
        />
      </div>

      {/* Fluid Equal-Scaling Wrapper */}
      <div className="relative z-10 mx-auto w-[min(96vw,1560px)] min-h-[100dvh] py-[clamp(0.75rem,1.5vw,2rem)] px-[clamp(0.5rem,1vw,1.5rem)] flex flex-col justify-between">
        
        {/* Top Liquid Glass Header Navigation */}
        <header
          className={`w-full rounded-[clamp(14px,1.5vw,22px)] px-[clamp(1rem,2vw,2rem)] py-[clamp(0.75rem,1.2vw,1.25rem)] mb-[clamp(0.75rem,1.5vw,1.5rem)] flex items-center justify-between transition-all duration-300 ${
            theme === 'dark'
              ? 'bg-white/[0.035] border border-white/[0.12] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.2)]'
              : 'bg-white/[0.65] border border-white/[0.6] shadow-[0_20px_40px_-15px_rgba(100,116,139,0.15),inset_0_1px_1px_rgba(255,255,255,0.8)]'
          } backdrop-blur-[30px] flex-wrap gap-3`}
        >
          {/* Brand Logo & Aura */}
          <div className="flex items-center gap-[clamp(0.5rem,1vw,1rem)]">
            <div className="relative flex items-center justify-center w-[clamp(36px,2.8vw,48px)] h-[clamp(36px,2.8vw,48px)] rounded-[clamp(10px,1vw,14px)] bg-gradient-to-tr from-cyan-500 via-indigo-500 to-fuchsia-500 p-[1px] shadow-[0_0_20px_rgba(6,182,212,0.4)]">
              <div className="w-full h-full rounded-[clamp(9px,0.9vw,13px)] bg-[#070913]/90 flex items-center justify-center backdrop-blur-md">
                <svg className="w-[60%] h-[60%] text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                </svg>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold tracking-tight text-[clamp(1.05rem,1.3vw,1.45rem)] bg-gradient-to-r from-cyan-400 via-indigo-300 to-fuchsia-400 bg-clip-text text-transparent">
                  LIQUID GLASS
                </span>
                <span className="text-[0.68rem] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  Gemini Live
                </span>
              </div>
              <p className={`text-[clamp(0.7rem,0.8vw,0.82rem)] hidden sm:block ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                150 Daily AI Credits Quota • Real Google Gemini Engine
              </p>
            </div>
          </div>

          {/* Daily 150 Credits Liquid Meter (Highlight Header Element) */}
          <div
            className={`flex items-center gap-3 px-3.5 py-1.5 rounded-xl border backdrop-blur-md transition-all ${
              lastCreditDeductedAnim ? 'scale-105 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.4)]' : ''
            } ${
              theme === 'dark'
                ? 'bg-white/[0.04] border-white/10 text-slate-200'
                : 'bg-white/80 border-slate-200 text-slate-800 shadow-sm'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  remainingCredits > 30 ? 'bg-cyan-400' : remainingCredits > 0 ? 'bg-amber-400' : 'bg-rose-500'
                }`}></span>
                <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                  remainingCredits > 30 ? 'bg-cyan-500' : remainingCredits > 0 ? 'bg-amber-500' : 'bg-rose-500'
                }`}></span>
              </span>
              <div className="text-left">
                <div className="flex items-center gap-1.5 font-bold text-xs">
                  <span>Credits:</span>
                  <span className={`font-mono ${
                    remainingCredits > 30 ? 'text-cyan-400' : remainingCredits > 0 ? 'text-amber-400' : 'text-rose-400'
                  }`}>
                    {remainingCredits} / {TOTAL_DAILY_CREDITS}
                  </span>
                  {lastCreditDeductedAnim && (
                    <span className="text-[0.65rem] text-cyan-300 font-mono animate-bounce font-extrabold">-1</span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-[0.65rem] text-slate-400">
                  <div className="w-16 h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500 transition-all duration-500"
                      style={{ width: `${100 - percentageUsed}%` }}
                    />
                  </div>
                  <span className="hidden md:inline font-mono">Resets in {resetCountdown}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs (AdSense High Value Content Hubs) */}
          <nav className="flex items-center gap-[clamp(0.25rem,0.6vw,0.75rem)]">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex items-center gap-1.5 px-[clamp(0.6rem,1.2vw,1.1rem)] py-[clamp(0.4rem,0.8vw,0.65rem)] rounded-xl text-[clamp(0.8rem,0.9vw,0.95rem)] font-medium transition-all ${
                activeTab === 'chat'
                  ? 'bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.25)]'
                  : theme === 'dark'
                  ? 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              <span>AI Chat</span>
            </button>

            <button
              onClick={() => setActiveTab('knowledge')}
              className={`flex items-center gap-1.5 px-[clamp(0.6rem,1.2vw,1.1rem)] py-[clamp(0.4rem,0.8vw,0.65rem)] rounded-xl text-[clamp(0.8rem,0.9vw,0.95rem)] font-medium transition-all ${
                activeTab === 'knowledge'
                  ? 'bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.25)]'
                  : theme === 'dark'
                  ? 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
              </svg>
              <span>Knowledge Hub</span>
              <span className="hidden md:inline-block text-[0.65rem] px-1.5 py-0.2 rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/30">
                15 Articles
              </span>
            </button>

            <button
              onClick={() => setActiveTab('docs')}
              className={`flex items-center gap-1.5 px-[clamp(0.6rem,1.2vw,1.1rem)] py-[clamp(0.4rem,0.8vw,0.65rem)] rounded-xl text-[clamp(0.8rem,0.9vw,0.95rem)] font-medium transition-all ${
                activeTab === 'docs'
                  ? 'bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.25)]'
                  : theme === 'dark'
                  ? 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="16" x2="12" y2="12"/>
                <line x1="12" y1="8" x2="12.01" y2="8"/>
              </svg>
              <span className="hidden sm:inline">Guides</span>
            </button>

            {/* Light / Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
              className={`p-[clamp(0.45rem,0.8vw,0.65rem)] rounded-xl transition-all border ${
                theme === 'dark'
                  ? 'bg-white/[0.05] border-white/10 text-amber-300 hover:bg-white/10'
                  : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100 shadow-sm'
              }`}
            >
              {theme === 'dark' ? (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5"/>
                  <line x1="12" y1="1" x2="12" y2="3"/>
                  <line x1="12" y1="21" x2="12" y2="23"/>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                  <line x1="1" y1="12" x2="3" y2="12"/>
                  <line x1="21" y1="12" x2="23" y2="12"/>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
              ) : (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </button>
          </nav>
        </header>

        {/* ============================================================== */}
        {/* TAB 1: CORE LIQUID GLASS AI CHAT ASSISTANT                     */}
        {/* ============================================================== */}
        {activeTab === 'chat' && (
          <main className="flex-1 grid grid-cols-1 lg:grid-cols-[290px_1fr] gap-[clamp(0.75rem,1.5vw,1.5rem)] min-h-[clamp(580px,70dvh,820px)]">
            
            {/* Left Sidebar with Credit Ledger & History */}
            <aside
              className={`flex flex-col justify-between rounded-[clamp(14px,1.5vw,22px)] p-[clamp(1rem,1.5vw,1.5rem)] transition-all duration-300 backdrop-blur-[30px] ${
                theme === 'dark'
                  ? 'bg-white/[0.03] border border-white/[0.1] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.18)]'
                  : 'bg-white/[0.55] border border-white/[0.5] shadow-[0_20px_40px_-15px_rgba(100,116,139,0.1),inset_0_1px_1px_rgba(255,255,255,0.7)]'
              }`}
            >
              <div className="flex flex-col gap-4">
                {/* Daily Credits Liquid Status Card */}
                <div className="p-3.5 rounded-2xl bg-gradient-to-br from-cyan-500/10 via-indigo-500/10 to-fuchsia-500/10 border border-cyan-500/30">
                  <div className="flex items-center justify-between text-xs font-semibold text-cyan-300 mb-1.5">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                      Daily AI Allowance
                    </span>
                    <span className="font-mono text-cyan-200">{remainingCredits} left</span>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden my-2">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-400 via-indigo-400 to-fuchsia-400 transition-all duration-500"
                      style={{ width: `${((TOTAL_DAILY_CREDITS - usedCredits) / TOTAL_DAILY_CREDITS) * 100}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[0.68rem] text-slate-400 font-mono">
                    <span>Used: {usedCredits} / 150</span>
                    <span>1 credit / msg</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-bold tracking-wider text-slate-400">
                    Conversations
                  </span>
                  <button
                    onClick={clearChat}
                    className="text-xs text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
                  >
                    + New Session
                  </button>
                </div>

                {/* Session list items */}
                <div className="flex flex-col gap-2">
                  {[
                    { title: 'Gemini 3.8 Reasoning', time: 'Active', active: true },
                    { title: 'Transformer Math & Vectors', time: '2h ago', active: false },
                    { title: 'Liquid Glass GPU Shaders', time: 'Yesterday', active: false },
                    { title: '150 Credits Quota Architecture', time: 'Saved', active: false },
                  ].map((sess, idx) => (
                    <div
                      key={idx}
                      className={`p-2.5 rounded-xl text-xs font-medium cursor-pointer transition-all flex items-center justify-between ${
                        sess.active
                          ? 'bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 border border-cyan-500/40 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.2)]'
                          : theme === 'dark'
                          ? 'text-slate-300 hover:bg-white/[0.04] border border-transparent'
                          : 'text-slate-700 hover:bg-white/40 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-2 overflow-hidden truncate">
                        <svg className="w-3.5 h-3.5 flex-shrink-0 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                        </svg>
                        <span className="truncate">{sess.title}</span>
                      </div>
                      <span className="text-[0.65rem] opacity-60 flex-shrink-0">{sess.time}</span>
                    </div>
                  ))}
                </div>

                {/* Engine Selector */}
                <div className="mt-2 pt-3 border-t border-white/10">
                  <label className="text-[0.7rem] uppercase font-bold tracking-wider text-slate-400 block mb-2">
                    Active AI Model
                  </label>
                  <select
                    value={activeModel}
                    onChange={(e) => setActiveModel(e.target.value)}
                    className={`w-full text-xs p-2 rounded-xl outline-none transition-all ${
                      theme === 'dark'
                        ? 'bg-slate-900/60 border border-white/15 text-slate-200 focus:border-cyan-400'
                        : 'bg-white/80 border border-slate-300 text-slate-800 focus:border-cyan-500'
                    }`}
                  >
                    <option value="gemini-3.8-flash">Google Gemini 3.8 Flash (1 credit/msg)</option>
                  </select>
                </div>
              </div>

              {/* Performance Isolated Ad Container in Sidebar */}
              <div className="glass-ad-wrapper mt-3">
                <div className="flex items-center justify-between text-[0.65rem] text-slate-400 mb-1.5 uppercase tracking-wider font-semibold">
                  <span>Sponsored Architecture</span>
                  <span className="px-1.5 py-0.2 rounded bg-white/10 text-[0.6rem]">Ad</span>
                </div>
                <div className="p-2.5 rounded-lg bg-gradient-to-br from-indigo-500/10 to-cyan-500/10 border border-cyan-500/20 text-center">
                  <p className="text-xs font-semibold text-cyan-300">GPU Cloud Compute</p>
                  <p className="text-[0.7rem] text-slate-400 mt-0.5">High-speed server-side AI clusters with zero latency.</p>
                </div>
              </div>

              {/* System Metric Indicator */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[0.7rem] text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Server API Online
                </span>
                <span className="font-mono text-cyan-400">Quota: 150/day</span>
              </div>
            </aside>

            {/* Right Main Liquid Glass Chat Stream */}
            <section
              className={`flex flex-col justify-between rounded-[clamp(14px,1.5vw,22px)] overflow-hidden transition-all duration-300 backdrop-blur-[35px] ${
                theme === 'dark'
                  ? 'bg-white/[0.035] border border-white/[0.12] shadow-[0_25px_50px_-15px_rgba(0,0,0,0.65),inset_0_1px_1px_rgba(255,255,255,0.22)]'
                  : 'bg-white/[0.6] border border-white/[0.6] shadow-[0_25px_50px_-15px_rgba(100,116,139,0.12),inset_0_1px_1px_rgba(255,255,255,0.75)]'
              }`}
            >
              {/* Sticky Chat Header */}
              <div
                className={`px-[clamp(1rem,2vw,1.75rem)] py-[clamp(0.75rem,1.2vw,1rem)] border-b flex items-center justify-between ${
                  theme === 'dark' ? 'border-white/10 bg-white/[0.02]' : 'border-slate-200/60 bg-white/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-cyan-400 to-indigo-600 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                      </svg>
                    </div>
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#070913]"></span>
                  </div>
                  <div>
                    <h2 className="text-sm font-bold flex items-center gap-2">
                      Liquid Glass Assistant
                      <span className="text-[0.65rem] font-medium px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                        Gemini 3.8 Flash
                      </span>
                    </h2>
                    <p className={`text-[0.7rem] ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                      Daily Balance: <strong className="text-cyan-400 font-mono">{remainingCredits}</strong> of {TOTAL_DAILY_CREDITS} Credits • Auto-resets in {resetCountdown}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={clearChat}
                    title="Reset Session"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Conversational Stream */}
              <div className="flex-1 overflow-y-auto p-[clamp(1rem,2vw,1.75rem)] flex flex-col gap-4 max-h-[clamp(360px,50dvh,540px)]">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} max-w-[85%] md:max-w-[78%] ${
                      msg.sender === 'user' ? 'self-end' : 'self-start'
                    }`}
                  >
                    <div
                      className={`rounded-[clamp(14px,1.2vw,20px)] p-[clamp(0.85rem,1.2vw,1.25rem)] text-sm leading-relaxed transition-all ${
                        msg.sender === 'user'
                          ? 'bg-gradient-to-br from-cyan-500/25 via-indigo-600/30 to-fuchsia-600/25 border border-cyan-400/40 text-cyan-50 shadow-[0_10px_25px_rgba(6,182,212,0.2),inset_0_1px_1px_rgba(255,255,255,0.3)]'
                          : theme === 'dark'
                          ? 'bg-white/[0.045] border border-white/[0.12] text-slate-100 shadow-[0_10px_25px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.18)]'
                          : 'bg-white/80 border border-white text-slate-800 shadow-[0_10px_25px_rgba(100,116,139,0.1),inset_0_1px_1px_rgba(255,255,255,0.9)]'
                      } backdrop-blur-xl`}
                    >
                      {msg.sender === 'user' ? (
                        <p className="whitespace-pre-line">{msg.text}</p>
                      ) : (
                        <FormattedContent text={msg.text} />
                      )}
                    </div>

                    <div className="flex items-center gap-2 mt-1 px-1 text-[0.68rem] text-slate-400">
                      <span>{msg.timestamp}</span>
                      {msg.model && <span>• {msg.model}</span>}
                      {msg.creditCost && (
                        <span className="text-cyan-400 font-mono">(-{msg.creditCost} credit)</span>
                      )}
                    </div>
                  </div>
                ))}

                {/* Animated Typing Indicator */}
                {isTyping && (
                  <div className="self-start max-w-[70%]">
                    <div
                      className={`rounded-2xl px-4 py-3 flex items-center gap-2 ${
                        theme === 'dark' ? 'bg-white/[0.05] border border-white/10' : 'bg-white/70 border border-slate-200'
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 rounded-full bg-fuchsia-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                      <span className="text-xs text-slate-400 ml-1">Gemini is synthesizing response...</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Prompt Suggestion Chips */}
              <div className="px-[clamp(1rem,2vw,1.75rem)] py-2 flex flex-wrap gap-2 border-t border-white/10">
                {[
                  'Explain prompt chain-of-thought protocols',
                  'How does scaled dot-product attention work?',
                  'Compare MoE routing vs dense neural networks',
                  'Explain Liquid Glass CSS with 150 daily credits'
                ].map((prompt, pIdx) => (
                  <button
                    key={pIdx}
                    onClick={() => handleSendMessage(prompt)}
                    className={`text-[0.72rem] px-3 py-1.5 rounded-full border transition-all ${
                      theme === 'dark'
                        ? 'bg-white/[0.03] border-white/10 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 hover:bg-cyan-500/10'
                        : 'bg-white/60 border-slate-200 text-slate-700 hover:text-indigo-600 hover:border-indigo-400 hover:bg-white'
                    }`}
                  >
                    ✨ {prompt}
                  </button>
                ))}
              </div>

              {/* Liquid-Glass Input Bar */}
              <div
                className={`p-[clamp(0.75rem,1.5vw,1.25rem)] border-t ${
                  theme === 'dark' ? 'border-white/10 bg-white/[0.015]' : 'border-slate-200 bg-white/50'
                }`}
              >
                {remainingCredits <= 0 ? (
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-center text-xs">
                    <strong>Daily 150 Credits Limit Reached.</strong> Your quota refreshes automatically in <strong>{resetCountdown}</strong>. You can continue reading our in-depth Knowledge Hub articles and User Guides!
                  </div>
                ) : (
                  <div
                    className={`relative flex items-end gap-2 rounded-[clamp(12px,1.2vw,18px)] p-2 transition-all ${
                      theme === 'dark'
                        ? 'bg-white/[0.04] border border-white/[0.15] focus-within:border-cyan-400/70 focus-within:shadow-[0_0_20px_rgba(6,182,212,0.3)]'
                        : 'bg-white/90 border border-slate-300 focus-within:border-indigo-500 focus-within:shadow-[0_0_20px_rgba(99,102,241,0.2)]'
                    }`}
                  >
                    {/* Attachment Tool Action */}
                    <button
                      type="button"
                      title="Attach Engineering Context"
                      className="p-2 text-slate-400 hover:text-cyan-400 transition-colors"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
                      </svg>
                    </button>

                    {/* Auto-growing Textarea (up to 4 lines) */}
                    <textarea
                      ref={textareaRef}
                      rows={1}
                      value={inputMessage}
                      onChange={handleInputChange}
                      onKeyDown={handleKeyDown}
                      placeholder={`Ask Gemini anything (Costs 1 credit • ${remainingCredits} remaining today)...`}
                      className="flex-1 bg-transparent resize-none outline-none text-sm max-h-[120px] py-1.5 px-1 leading-normal"
                    />

                    {/* Voice Dictation Simulator */}
                    <button
                      type="button"
                      onClick={() => setIsVoiceActive(!isVoiceActive)}
                      title={isVoiceActive ? 'Mute Dictation' : 'Simulate Voice Input'}
                      className={`p-2 rounded-xl transition-all ${
                        isVoiceActive
                          ? 'bg-rose-500 text-white animate-pulse shadow-[0_0_12px_rgba(244,63,94,0.6)]'
                          : 'text-slate-400 hover:text-cyan-400'
                      }`}
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                        <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                        <line x1="12" y1="19" x2="12" y2="23"/>
                        <line x1="8" y1="23" x2="16" y2="23"/>
                      </svg>
                    </button>

                    {/* Send Glass Button */}
                    <button
                      type="button"
                      onClick={() => handleSendMessage()}
                      disabled={!inputMessage.trim() || isTyping || remainingCredits <= 0}
                      className={`p-2.5 rounded-xl font-semibold transition-all flex items-center justify-center ${
                        inputMessage.trim() && !isTyping && remainingCredits > 0
                          ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:brightness-110 active:scale-95'
                          : 'opacity-40 cursor-not-allowed text-slate-400'
                      }`}
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="22" y1="2" x2="11" y2="13"/>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </section>
          </main>
        )}

        {/* ============================================================== */}
        {/* TAB 2: AI KNOWLEDGE HUB & BLOG (High-Value Indexable Content)   */}
        {/* ============================================================== */}
        {activeTab === 'knowledge' && (
          <main className="flex-1 flex flex-col gap-6">
            
            {/* Header intro & Search Bar */}
            <div
              className={`rounded-[clamp(14px,1.5vw,22px)] p-[clamp(1.2rem,2vw,2rem)] backdrop-blur-[30px] transition-all ${
                theme === 'dark'
                  ? 'bg-white/[0.035] border border-white/[0.12] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]'
                  : 'bg-white/[0.65] border border-white/[0.6] shadow-[0_20px_40px_-15px_rgba(100,116,139,0.12)]'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-[clamp(1.25rem,1.8vw,1.85rem)] font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 via-indigo-300 to-fuchsia-400 bg-clip-text text-transparent">
                    AI Architecture & Research Knowledge Hub
                  </h1>
                  <p className={`text-sm mt-1 max-w-2xl ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                    Peer-reviewed technical analyses, mathematical foundations of machine learning, and production engineering guides designed for developers, researchers, and AI strategists.
                  </p>
                </div>

                {/* Filter and Search */}
                <div className="flex flex-wrap items-center gap-2">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search technical articles..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className={`text-xs pl-8 pr-3 py-2 rounded-xl outline-none border transition-all ${
                        theme === 'dark'
                          ? 'bg-slate-900/60 border-white/15 text-slate-200 focus:border-cyan-400'
                          : 'bg-white border-slate-300 text-slate-800 focus:border-cyan-500'
                      }`}
                    />
                    <svg className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8"/>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    </svg>
                  </div>

                  {['All', 'Prompt Engineering', 'Machine Learning', 'Future of AI', 'System Architecture', 'Optimization', 'Security'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`text-xs px-3 py-1.5 rounded-xl font-medium transition-all ${
                        selectedCategory === cat
                          ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                          : theme === 'dark'
                          ? 'bg-white/[0.05] text-slate-300 hover:bg-white/[0.1]'
                          : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* In-Content Performance Ad Unit */}
            <div className="glass-ad-wrapper">
              <div className="flex items-center justify-between text-[0.65rem] text-slate-400 mb-2 uppercase tracking-wider font-semibold">
                <span>AdSense Compliance Display Framework</span>
                <span className="px-1.5 py-0.2 rounded bg-white/10 text-[0.6rem]">Ad Unit</span>
              </div>
              <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-900/30 via-purple-900/20 to-cyan-900/30 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
                <div>
                  <h4 className="text-sm font-bold text-cyan-300">Enterprise AI Infrastructure Benchmark 2026</h4>
                  <p className="text-xs text-slate-300 mt-1">Download the definitive multi-modal inference throughput report.</p>
                </div>
                <button className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all whitespace-nowrap">
                  Access Free Whitepaper →
                </button>
              </div>
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[clamp(1rem,1.5vw,1.75rem)]">
              {filteredArticles.map((art) => (
                <article
                  key={art.id}
                  onClick={() => setSelectedArticle(art)}
                  className={`rounded-[clamp(14px,1.5vw,22px)] p-[clamp(1.2rem,1.5vw,1.75rem)] flex flex-col justify-between cursor-pointer transition-all duration-300 hover:-translate-y-1 backdrop-blur-[30px] ${
                    theme === 'dark'
                      ? 'bg-white/[0.035] border border-white/[0.12] hover:border-cyan-400/50 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.18)] hover:shadow-[0_25px_50px_-10px_rgba(6,182,212,0.25)]'
                      : 'bg-white/[0.7] border border-white/[0.7] hover:border-indigo-400/60 shadow-[0_20px_40px_-15px_rgba(100,116,139,0.12),inset_0_1px_1px_rgba(255,255,255,0.8)]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-xs mb-3">
                      <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-medium">
                        {art.category}
                      </span>
                      <span className="text-slate-400">{art.readTime}</span>
                    </div>

                    <h2 className="text-base font-bold leading-snug mb-2 hover:text-cyan-400 transition-colors">
                      {art.title}
                    </h2>

                    <p className={`text-xs line-clamp-3 leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                      {art.summary}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-xs">
                    <span className="text-slate-400">{art.date}</span>
                    <span className="text-cyan-400 font-semibold flex items-center gap-1 group">
                      Read Full Article <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </main>
        )}

        {/* ============================================================== */}
        {/* TAB 3: DETAILED DOCUMENTATION & USER GUIDES                   */}
        {/* ============================================================== */}
        {activeTab === 'docs' && (
          <main className="flex-1 flex flex-col gap-6">
            <div
              className={`rounded-[clamp(14px,1.5vw,22px)] p-[clamp(1.2rem,2vw,2rem)] backdrop-blur-[30px] transition-all ${
                theme === 'dark'
                  ? 'bg-white/[0.035] border border-white/[0.12] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]'
                  : 'bg-white/[0.65] border border-white/[0.6] shadow-[0_20px_40px_-15px_rgba(100,116,139,0.12)]'
              }`}
            >
              <h1 className="text-[clamp(1.25rem,1.8vw,1.85rem)] font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 via-indigo-300 to-fuchsia-400 bg-clip-text text-transparent">
                Liquid Glass Documentation & Daily Credit Policy
              </h1>
              <p className={`text-sm mt-1 max-w-3xl ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                Specifications for the 150 daily credits allocation, GPU compositing performance, and token efficiency protocols.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-[clamp(1rem,1.5vw,1.5rem)]">
              {/* Guide 1: Daily Credits Policy */}
              <div
                className={`rounded-[clamp(14px,1.5vw,22px)] p-[clamp(1.2rem,1.5vw,1.75rem)] backdrop-blur-[30px] ${
                  theme === 'dark' ? 'bg-white/[0.03] border border-white/[0.1]' : 'bg-white/[0.65] border border-white/[0.6]'
                }`}
              >
                <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-sm mb-3 border border-cyan-500/30">
                  150
                </div>
                <h3 className="text-base font-bold mb-2">Daily 150 Credits Fair-Use Policy</h3>
                <p className={`text-xs leading-relaxed mb-3 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                  Every user account receives 150 fresh AI credits at 00:00 UTC daily:
                </p>
                <ul className="text-xs space-y-1.5 list-disc list-inside text-slate-400">
                  <li>Each standard prompt query consumes exactly 1 AI credit.</li>
                  <li>Unused credits do not roll over to subsequent days.</li>
                  <li>Reading Knowledge Hub articles and User Guides is always free and unlimited.</li>
                  <li>Active quota counter dynamically updates in real-time.</li>
                </ul>
              </div>

              {/* Guide 2: Token Efficiency */}
              <div
                className={`rounded-[clamp(14px,1.5vw,22px)] p-[clamp(1.2rem,1.5vw,1.75rem)] backdrop-blur-[30px] ${
                  theme === 'dark' ? 'bg-white/[0.03] border border-white/[0.1]' : 'bg-white/[0.65] border border-white/[0.6]'
                }`}
              >
                <div className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-sm mb-3 border border-indigo-500/30">
                  02
                </div>
                <h3 className="text-base font-bold mb-2">Liquid Glass GPU Compositing Rules</h3>
                <p className={`text-xs leading-relaxed mb-3 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                  Achieving photorealistic glassmorphism without browser render stalling:
                </p>
                <ul className="text-xs space-y-1.5 list-disc list-inside text-slate-400">
                  <li>Use <code className="text-cyan-400">backdrop-filter: blur(28px) saturate(180%)</code> for depth.</li>
                  <li>Ensure border contrast with a 1px linear stroke fading diagonally from 30% to 2% opacity.</li>
                  <li>Isolate dynamic advertising units using <code className="text-cyan-400">contain: layout paint style</code>.</li>
                </ul>
              </div>
            </div>

            {/* Credit Quota Overview Dashboard */}
            <div
              className={`rounded-[clamp(14px,1.5vw,22px)] p-[clamp(1.2rem,2vw,2rem)] backdrop-blur-[30px] ${
                theme === 'dark' ? 'bg-white/[0.035] border border-white/[0.12]' : 'bg-white/[0.7] border border-white/[0.7]'
              }`}
            >
              <h3 className="text-sm font-bold mb-2">Live Credit Ledger & Throughput</h3>
              <p className="text-xs text-slate-400 mb-4">Track your current session consumption and next replenishment cycle.</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-center">
                  <span className="text-[0.7rem] text-slate-400">Daily Allocation</span>
                  <div className="text-lg font-bold text-cyan-400 mt-1">150 Credits</div>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-center">
                  <span className="text-[0.7rem] text-slate-400">Remaining Balance</span>
                  <div className="text-lg font-bold text-indigo-400 mt-1">{remainingCredits} Credits</div>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-center">
                  <span className="text-[0.7rem] text-slate-400">Used Today</span>
                  <div className="text-lg font-bold text-emerald-400 mt-1">{usedCredits} Credits</div>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-center">
                  <span className="text-[0.7rem] text-slate-400">Next Reset Cycle</span>
                  <div className="text-lg font-bold text-fuchsia-400 mt-1 font-mono">{resetCountdown}</div>
                </div>
              </div>
            </div>
          </main>
        )}

        {/* ============================================================== */}
        {/* TAB 4: LEGAL & COMPLIANCE HUB (AdSense High Value Mandate)     */}
        {/* ============================================================== */}
        {activeTab === 'legal' && (
          <main className="flex-1 flex flex-col gap-6">
            <div
              className={`rounded-[clamp(14px,1.5vw,22px)] p-[clamp(1.2rem,2vw,2rem)] backdrop-blur-[30px] transition-all ${
                theme === 'dark' ? 'bg-white/[0.035] border border-white/[0.12]' : 'bg-white/[0.65] border border-white/[0.6]'
              }`}
            >
              <h1 className="text-[clamp(1.25rem,1.8vw,1.85rem)] font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 via-indigo-300 to-fuchsia-400 bg-clip-text text-transparent">
                Privacy Policy, Terms of Service & 150 Daily Credit Quotas
              </h1>
              <p className={`text-sm mt-1 max-w-3xl ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                Official disclosures regarding user telemetry, advertising isolation, credit reset schedules, and Google Publisher compliance.
              </p>
            </div>

            <div
              className={`rounded-[clamp(14px,1.5vw,22px)] p-[clamp(1.2rem,2vw,2rem)] backdrop-blur-[30px] space-y-4 text-xs leading-relaxed ${
                theme === 'dark' ? 'bg-white/[0.03] border border-white/10 text-slate-300' : 'bg-white/[0.7] border border-white/70 text-slate-700'
              }`}
            >
              <h2 className="text-sm font-bold text-cyan-400">1. Daily Credit Allocation Terms</h2>
              <p>
                Each user is granted 150 non-transferable AI credits per 24-hour cycle (resetting at 00:00 UTC). Credits have no monetary cash value and are solely for conversational inference.
              </p>

              <h2 className="text-sm font-bold text-cyan-400">2. Google AdSense & Third-Party Cookies Policy</h2>
              <p>
                Third-party vendors, including Google, use cookies to serve ads based on prior user visits. Google's use of advertising cookies enables it and its partners to serve ads. Users may opt out of personalized advertising by visiting Google Ads Settings.
              </p>

              <h2 className="text-sm font-bold text-cyan-400">3. Contact & Publisher Inquiries</h2>
              <p>
                For editorial feedback or partnership questions, contact our engineering board at: <code className="text-cyan-400">publisher-desk@liquidglass-ai.internal</code>.
              </p>
            </div>
          </main>
        )}

        {/* ============================================================== */}
        {/* MODAL: DAILY QUOTA EXCEEDED (150 Credits Used)                 */}
        {/* ============================================================== */}
        {quotaExceededModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div
              className={`w-[min(92vw,500px)] rounded-3xl p-6 backdrop-blur-[40px] text-center relative ${
                theme === 'dark'
                  ? 'bg-[#0b0e1e]/95 border border-rose-500/40 text-slate-100 shadow-[0_30px_70px_rgba(244,63,94,0.3)]'
                  : 'bg-white/95 border border-rose-400 text-slate-900 shadow-xl'
              }`}
            >
              <div className="w-14 h-14 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto mb-4 border border-rose-500/40">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
              </div>

              <h3 className="text-lg font-bold mb-2">Daily Quota Reached (150 Credits)</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                You have utilized all <strong>150 AI credits</strong> allocated for today. To maintain equitable server performance, your allowance will automatically replenish in:
              </p>

              <div className="p-3 rounded-xl bg-white/10 font-mono text-cyan-300 font-bold text-base mb-5">
                {resetCountdown}
              </div>

              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <button
                  onClick={() => {
                    setQuotaExceededModal(false);
                    setActiveTab('knowledge');
                  }}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg"
                >
                  Explore Free Knowledge Hub
                </button>
                <button
                  onClick={() => setQuotaExceededModal(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-slate-300 transition-colors"
                >
                  Close Notice
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* EXPANDABLE FULL ARTICLE MODAL                                  */}
        {/* ============================================================== */}
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <div
              className={`w-[min(94vw,900px)] max-h-[85vh] overflow-y-auto rounded-3xl p-[clamp(1.5rem,2.5vw,2.5rem)] backdrop-blur-[40px] transition-all relative ${
                theme === 'dark'
                  ? 'bg-[#0b0e1e]/90 border border-white/20 text-slate-100 shadow-[0_30px_70px_rgba(0,0,0,0.8)]'
                  : 'bg-white/95 border border-white text-slate-900 shadow-[0_30px_70px_rgba(100,116,139,0.3)]'
              }`}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-slate-300"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>

              <div className="flex items-center gap-2 text-xs mb-3">
                <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-semibold">
                  {selectedArticle.category}
                </span>
                <span className="text-slate-400">• {selectedArticle.readTime}</span>
                <span className="text-slate-400">• {selectedArticle.date}</span>
              </div>

              <h1 className="text-[clamp(1.25rem,2vw,1.9rem)] font-extrabold leading-tight mb-4">
                {selectedArticle.title}
              </h1>

              <div className="prose prose-invert max-w-none text-xs md:text-sm leading-relaxed space-y-4 whitespace-pre-line text-slate-300">
                {selectedArticle.content}
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg"
                >
                  Close Article
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* COMPLIANCE FOOTER (AdSense Mandated Links & Credit Info)       */}
        {/* ============================================================== */}
        <footer
          className={`mt-[clamp(1rem,2vw,2rem)] rounded-[clamp(14px,1.5vw,20px)] px-[clamp(1rem,2vw,2rem)] py-[clamp(0.75rem,1.2vw,1.25rem)] flex flex-col md:flex-row items-center justify-between gap-4 text-xs backdrop-blur-[25px] transition-all ${
            theme === 'dark'
              ? 'bg-white/[0.025] border border-white/[0.08] text-slate-400'
              : 'bg-white/[0.6] border border-white/[0.5] text-slate-600'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="font-semibold text-cyan-400">Liquid Glass Platform</span>
            <span>© 2026 Architectural Intelligence</span>
            <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-[0.68rem]">
              150 Credits/Day Active
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[0.75rem]">
            <button onClick={() => setActiveTab('legal')} className="hover:text-cyan-400 transition-colors">
              Privacy Policy
            </button>
            <span>•</span>
            <button onClick={() => setActiveTab('legal')} className="hover:text-cyan-400 transition-colors">
              Terms of Service
            </button>
            <span>•</span>
            <button onClick={() => setActiveTab('legal')} className="hover:text-cyan-400 transition-colors">
              AdSense Disclosure
            </button>
            <span>•</span>
            <button onClick={() => setActiveTab('docs')} className="hover:text-cyan-400 transition-colors">
              Credit Policy
            </button>
            <span>•</span>
            <button onClick={() => setActiveTab('knowledge')} className="hover:text-cyan-400 transition-colors">
              Knowledge Hub
            </button>
          </div>

          <div className="text-[0.7rem] text-slate-400 font-mono">
            Balance: {remainingCredits}/150 • Reset: {resetCountdown}
          </div>
        </footer>

      </div>
    </div>
  );
}
