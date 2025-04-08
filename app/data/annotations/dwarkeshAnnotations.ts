const dwarkeshWordIndices = (episode: string, lineIndex: number) => {
    if (episode == "64" && lineIndex == 0) return [8, 9, 12, 22, 23, 24, 25, 26, 27, 28, 29, 30]
    if (episode == "64" && lineIndex == 3) return [21, 39, 40]
    if (episode == "64" && lineIndex == 4) return [9, 10, 16, 44, 45, 50]
    if (episode == "64" && lineIndex == 9) return [24, 25, 26]

    if (episode == "65" && lineIndex == 0) return [9, 10, 16]
    if (episode == "65" && lineIndex == 2) return [19, 20, 21]
    if (episode == "65" && lineIndex == 4) return [11]
    if (episode == "65" && lineIndex == 5) return [33, 34, 35, 36]

    if (episode == "66" && lineIndex == 0) return [14, 16]
    if (episode == "66" && lineIndex == 1) return [0, 1, 5, 6, 41, 44, 45]
    if (episode == "66" && lineIndex == 3) return [5, 6, 25, 26, 27, 28]
    if (episode == "66" && lineIndex == 5) return [12]

    if (episode == "67" && lineIndex == 2) return [31, 32]
    if (episode == "67" && lineIndex == 3) return [38]
}

const dwarkeshAnnotation = (episode: string, lineIndex: number, wordIndex: number) => {
    if (episode == "66" && lineIndex == 0 && wordIndex == 14) return "Sholto Douglas is an Australian computer scientist working in machine learning.,,,He is currently working at Google DeepMind working on their multimodal large language model, Gemini."
    if (episode == "66" && lineIndex == 0 && wordIndex == 16) return "Trenton Bricken is an English computer scientist working in machine learning.,,,He is currently working at Anthropic working on their large language model, Claude."
    if (episode == "66" && lineIndex == 1 && (wordIndex == 0 || wordIndex == 1)) return "Noam Brown is a research scientist working in machine learning.,,,He is currently working at OpenAI on research related to multi-step reasoning, self-play, and multi-agent AI."
    if (episode == "66" && lineIndex == 1 && (wordIndex == 5 || wordIndex == 6)) return "The paper “Human-level play in the game of Diplomacy by combining language models with strategic reasoning” was written by the Fundamental AI Research (FAIR) team at Meta.,,,It was published in the journal Science in 2022."
    if (episode == "66" && lineIndex == 1 && wordIndex == 41) return "Anthropic is a US-based artificial intelligence startup company, founded in 2021.,,,Anthropic has developed a family of large language models (LLMs) named Claude."
    if (episode == "66" && lineIndex == 1 && (wordIndex == 44 || wordIndex == 45)) return "Mechanistic interpretability seeks to reverse engineer neural networks, similar to how one might reverse engineer a compiled binary computer program.,,,After all, neural network parameters are in some sense a binary computer program which runs on one of the exotic virtual machines we call a neural network architecture."
    if (episode == "66" && lineIndex == 3 && (wordIndex == 5 || wordIndex == 6)) return "Context length is the number of tokens a language model can process at once. It is the maximum length of the input sequence.,,,It’s like the memory or attention span of the model. It is a predefined number in a transformer-based model such as ChatGPT and Llama."
    if (episode == "66" && lineIndex == 3 && (wordIndex >= 25 && wordIndex <= 28)) return "Gemini 1.5 Pro comes with a standard 128,000 token context window.,,,But starting February 2024, a limited group of developers and enterprise customers can try it with a context window of up to 1 million tokens via AI Studio and Vertex AI in private preview."
    if (episode == "66" && lineIndex == 5 && wordIndex == 12) return "The report “Gemini 1.5: Unlocking multimodal understanding across millions of tokens of context” was published by Google in 2024.,,,In the paper, they present the latest model of the Gemini family, Gemini 1.5 Pro."

    if (episode == "67" && lineIndex == 2 && (wordIndex == 31 || wordIndex == 32)) return "Meta AI is an artificial intelligence laboratory owned by Meta Platforms Inc. (formerly known as Facebook, Inc.). Meta AI develops various forms of artificial intelligence, including augmented and artificial reality technologies. Meta AI is also an academic research laboratory focused on generating knowledge for the AI community. This is in contrast to Facebook's Applied Machine Learning (AML) team, which focuses on practical applications of its products."
    if (episode == "67" && lineIndex == 3 && wordIndex == 38) return "LLaMA (Large Language Model Meta AI) is a family of autoregressive large language models (LLMs), released by Meta AI starting in February 2023.,,,On April 19, 2024, Meta released Llama-3. The models have been pre-trained on approximately 15 trillion tokens of text gathered from “publicly available sources”."
}

const dwarkeshAnnotationLink = (episode: string, lineIndex: number, wordIndex: number) => {
    if (episode == "66" && lineIndex == 0 && wordIndex == 14) return "https://twitter.com/_sholtodouglas"
    if (episode == "66" && lineIndex == 0 && wordIndex == 16) return "https://www.trentonbricken.com/about"
    if (episode == "66" && lineIndex == 1 && (wordIndex == 0 || wordIndex == 1)) return "https://noambrown.github.io"
    if (episode == "66" && lineIndex == 1 && (wordIndex == 5 || wordIndex == 6)) return "https://noambrown.github.io/papers/22-Science-Diplomacy-TR.pdf"
    if (episode == "66" && lineIndex == 1 && wordIndex == 41) return "https://www.anthropic.com"
    if (episode == "66" && lineIndex == 1 && (wordIndex == 44 || wordIndex == 45)) return "https://www.transformer-circuits.pub/2022/mech-interp-essay"
    if (episode == "66" && lineIndex == 3 && (wordIndex == 5 || wordIndex == 6)) return "https://blog.google/technology/ai/long-context-window-ai-models"
    if (episode == "66" && lineIndex == 3 && (wordIndex >= 25 && wordIndex <= 28)) return "https://blog.google/technology/ai/google-gemini-next-generation-model-february-2024/#context-window"
    if (episode == "66" && lineIndex == 5 && wordIndex == 12) return "https://arxiv.org/abs/2403.05530"

    if (episode == "67" && lineIndex == 2 && (wordIndex == 31 || wordIndex == 32)) return "https://ai.meta.com"
    if (episode == "67" && lineIndex == 5 && wordIndex == 12) return "https://llama.meta.com"
}

export { dwarkeshWordIndices, dwarkeshAnnotation, dwarkeshAnnotationLink }