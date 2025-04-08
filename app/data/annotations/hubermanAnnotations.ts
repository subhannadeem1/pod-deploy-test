const hubermanWordIndices = (episode: string, lineIndex: number) => {
    if (episode == "1" && lineIndex == 0) return [3, 4, 17, 18]
    if (episode == "1" && lineIndex == 2) return [4, 5]
    if (episode == "1" && lineIndex == 3) return [8]
    if (episode == "1" && lineIndex == 4) return [160, 161]
    if (episode == "1" && lineIndex == 5) return [74, 75, 76, 79, 80, 158]
    if (episode == "1" && lineIndex == 6) return [110]
    if (episode == "1" && lineIndex == 8) return [42]
    if (episode == "1" && lineIndex == 12) return [134, 136, 138, 139]
    if (episode == "1" && lineIndex == 16) return [197]
    if (episode == "1" && lineIndex == 17) return [168, 169, 170, 171, 172]
    if (episode == "1" && lineIndex == 22) return [138, 139, 140]
    if (episode == "1" && lineIndex == 26) return [64, 65, 66]
    if (episode == "1" && lineIndex == 28) return [126, 127, 133, 134]

    if (episode == "19" && lineIndex == 0) return [3, 4, 17, 18]
    if (episode == "19" && lineIndex == 1) return [4]
    if (episode == "19" && lineIndex == 2) return [8, 9]
    if (episode == "19" && lineIndex == 3) return [8]
    
    if (episode == "20" && lineIndex == 0) return [3, 4, 17, 18]
    if (episode == "20" && lineIndex == 1) return [4, 5, 6]
    if (episode == "20" && lineIndex == 2) return [8]
    if (episode == "20" && lineIndex == 3) return [8, 9]
    if (episode == "20" && lineIndex == 6) return [55, 56]
    if (episode == "20" && lineIndex == 9) return [146, 147]
    if (episode == "20" && lineIndex == 15) return [39, 40, 41]
    if (episode == "20" && lineIndex == 22) return [92, 93, 94]
    if (episode == "20" && lineIndex == 34) return [3, 25]
    if (episode == "20" && lineIndex == 84) return [23]
}

const hubermanAnnotation = (episode: string, lineIndex: number, wordIndex: number) => {
    if (episode == "1" && lineIndex == 0 && (wordIndex == 3 || wordIndex == 4)) return "The Huberman Lab podcast is hosted by Dr. Andrew Huberman, a neuroscientist and tenured professor of neurobiology and ophthalmology at Stanford School of Medicine.,,,The podcast discusses neuroscience and science-based tools, including how our brain and its connections with the organs of our body control our perceptions, our behaviors, and our health, as well as existing and emerging tools for measuring and changing how our nervous system works."
    if (episode == "1" && lineIndex == 0 && (wordIndex == 17 || wordIndex == 18)) return "Andrew Huberman is an American neuroscientist and podcaster. He is an associate professor of neurobiology and ophthalmology at the Stanford University School of Medicine.,,,Since 2021, he has hosted the Huberman Lab podcast."
    if (episode == "1" && lineIndex == 2 && (wordIndex == 4 || wordIndex == 5)) return "Athletic Greens is a comprehensive blend of 9 products — a multivitamin, minerals, probiotics, adaptogens and more — working together to deliver a strong foundation for better health.,,,For complete nutritional information, visit their website."
    if (episode == "1" && lineIndex == 3 && wordIndex == 8) return "InsideTracker uses uses data from DNA tests, blood samples, and reported habits to create custom plans.,,,Every biomarker is well explained and they provide specific recommendations to improvement your health."
    if (episode == "1" && lineIndex == 4 && (wordIndex == 160 || wordIndex == 161)) return "The Möbius strip is a one-sided nonorientable surface.,,,It is obtained by cutting a closed band into a single strip, giving one of the two ends thus produced a half twist, and then reattaching the two ends."
    if (episode == "1" && lineIndex == 5 && (wordIndex >= 74 && wordIndex <= 76)) return "Santiago Ramón y Cajal was a Spanish neuroscientist, pathologist, and histologist specializing in neuroanatomy and the central nervous system.,,,He received the Nobel Prize in Physiology or Medicine in 1906 for his work on the structure of the nervous system."
    if (episode == "1" && lineIndex == 5 && (wordIndex == 79 || wordIndex == 80)) return "Camillo Golgi was an Italian biologist and pathologist known for his works on the central nervous system.,,,He received the Nobel Prize in Physiology or Medicine in 1906 for his work on the structure of the nervous system."
    if (episode == "1" && lineIndex == 5 && wordIndex == 158) return "A synapse is a fluid-filled gap between two nerves.,,,When stimulated, one nerve cell will release chemicals called neurotransmitters into the synapse. These chemicals can then interact with receptors in the other nerve cell.,,,If enough of these interactions occur, the next nerve will be stimulated and release neurotransmitter to any synapses down the line."
    if (episode == "1" && lineIndex == 6 && wordIndex == 110) return "The hippocampus is most notably the memory integration center of the brain.,,,It is located deep in the brain, hidden within the medial part of the temporal lobe."
    if (episode == "1" && lineIndex == 8 && wordIndex == 42) return "The paper “Invariant visual representation by single neurons in the human brain” was written by R. Quiroga et al.,,,It was published in the journal Nature in 2005."
    if (episode == "1" && lineIndex == 12 && wordIndex == 134) return "Dopamine is a neuromodulatory molecule. It is most notably involved in helping us feel pleasure as part of the brain's reward system.,,,It is produced in the substantia nigra, ventral tegmental area, and hypothalamus of the brain."
    if (episode == "1" && lineIndex == 12 && wordIndex == 136) return "Serotonin is a neuromodulatory molecule. At normal levels, it helps us feel more focused, emotionally stable, happier, and calmer. Low levels of serotonin are associated with depression.,,,It is produced in the intestines and the raphe nuclei located in the midline of the brainstem."
    if (episode == "1" && lineIndex == 12 && wordIndex == 138) return "Acetylcholine is a neuromodulatory molecule. It plays in an important role in important role in memory, learning, and attention.,,,It is produced in the nucleus basalis of Meynert in the basal forebrain."
    if (episode == "1" && lineIndex == 12 && wordIndex == 139) return "Epinephrine is a neuromodulatory molecule. It is most notably involved in helping us feel alert and plays an important role in your body's “fight-or-flight” response.,,,It is produced in the adrenal medulla."
    if (episode == "1" && lineIndex == 16 && wordIndex == 197) return "Sir Charles Scott Sherrington was a British neurophysiologist.,,,He received the Nobel Prize in Physiology or Medicine in 1932 for his discoveries regarding the functions of neurons."
    if (episode == "1" && lineIndex == 17 && (wordIndex >= 168 && wordIndex <= 172)) return "Duration-path-outcome (DPO) is a decision-making framework introduced by Andrew Huberman.,,,He describes DPO as a very conscious process that involves considering the timeframe (duration), the route or method (path), and the desired result (outcome) of an action."
    if (episode == "1" && lineIndex == 22 && (wordIndex >= 138 && wordIndex <= 140)) return "Non-sleep, deep rest (NSDR) is a term introduced by Andrew Huberman.,,, He describes NSDR as the practices that lead to deep relaxation without entering sleep. These practices include meditation, yoga nidra, and hypnosis."
    if (episode == "1" && lineIndex == 26 && (wordIndex >= 64 && wordIndex <= 66)) return "The autonomic nervous system is a network of nerves that handle unconscious tasks like heartbeat and breathing.,,,It has three divisions: the sympathetic nervous system, the parasympathetic nervous system, and the enteric nervous system."
    if (episode == "1" && lineIndex == 28 && (wordIndex == 126 || wordIndex == 127)) return "In chronobiology, an ultradian rhythm is a recurrent period or cycle repeated throughout a 24-hour day.,,,They are approximately 90 minutes."
    if (episode == "1" && lineIndex == 28 && (wordIndex == 133 || wordIndex == 134)) return "In chronobiology, a circadian rhythm a is a natural oscillation that repeats roughly every 24 hours.,,,It is this continuous cycle of turning on and off certain functions in body at regular intervals. It happens as chemicals build up, and then fade away."

    if (episode == "19" && lineIndex == 0 && (wordIndex == 3 || wordIndex == 4)) return "The Huberman Lab podcast is hosted by Dr. Andrew Huberman, a neuroscientist and tenured professor of neurobiology and ophthalmology at Stanford School of Medicine.,,,The podcast discusses neuroscience and science-based tools, including how our brain and its connections with the organs of our body control our perceptions, our behaviors, and our health, as well as existing and emerging tools for measuring and changing how our nervous system works."
    if (episode == "19" && lineIndex == 0 && (wordIndex == 17 || wordIndex == 18)) return "Andrew Huberman is an American neuroscientist and podcaster. He is an associate professor of neurobiology and ophthalmology at the Stanford University School of Medicine.,,,Since 2021, he has hosted the Huberman Lab podcast."
    if (episode == "19" && lineIndex == 1 && wordIndex == 4) return "InsideTracker uses uses data from DNA tests, blood samples, and reported habits to create custom plans.,,,Every biomarker is well explained and they provide specific recommendations to improvement your health."
    if (episode == "19" && lineIndex == 2 && (wordIndex == 8 || wordIndex == 9)) return "Helix Sleep is a US-based, e-commerce platform, that sells home goods brands.,,,All mattresses and sofas are manufactured in the US and the company ships product to the United States and Canada."
    if (episode == "19" && lineIndex == 3 && wordIndex == 8) return "Therabody makes massagers and other self-care tools that treats muscle soreness and pain."

    if (episode == "20" && lineIndex == 0 && (wordIndex == 3 || wordIndex == 4)) return "The Huberman Lab podcast is hosted by Dr. Andrew Huberman, a neuroscientist and tenured professor of neurobiology and ophthalmology at Stanford School of Medicine.,,,The podcast discusses neuroscience and science-based tools, including how our brain and its connections with the organs of our body control our perceptions, our behaviors, and our health, as well as existing and emerging tools for measuring and changing how our nervous system works."
    if (episode == "20" && lineIndex == 0 && (wordIndex == 17 || wordIndex == 18)) return "Andrew Huberman is an American neuroscientist and podcaster. He is an associate professor of neurobiology and ophthalmology at the Stanford University School of Medicine.,,,Since 2021, he has hosted the Huberman Lab podcast."
    if (episode == "20" && lineIndex == 1 && (wordIndex >= 4 && wordIndex <= 6)) return "Belcampo Meat Company an Oakland-based supplier of sustainably-sourced meat.,,,The company operated a 20,000 square foot, USDA-approved multi-species slaughter facility designed by animal welfare expert Temple Grandin, and a nearby 27,000-acre farm."
    if (episode == "20" && lineIndex == 2 && wordIndex == 8) return "InsideTracker uses uses data from DNA tests, blood samples, and reported habits to create custom plans.,,,Every biomarker is well explained and they provide specific recommendations to improvement your health."
    if (episode == "20" && lineIndex == 3 && (wordIndex == 8 || wordIndex == 9)) return "Athletic Greens is a comprehensive blend of 9 products — a multivitamin, minerals, probiotics, adaptogens and more — working together to deliver a strong foundation for better health.,,,For complete nutritional information, visit their website."
    if (episode == "20" && lineIndex == 6 && (wordIndex == 55 || wordIndex == 56)) return "Dr. Craig Heller is a Professor of Biology at Stanford University and an expert in the science of temperature regulation.,,,He has made significant contributions to cooling technology, significantly enhancing anaerobic performance and aiding endurance athletes."
    if (episode == "20" && lineIndex == 9 && (wordIndex >= 146 && wordIndex <= 147)) return "The phrenic nerve is a mixed motor/sensory nerve that originates from the C3-C5 spinal nerves in the neck.,,,The nerve is important for breathing because it provides exclusive motor control of the diaphragm, the primary muscle of respiration."
    if (episode == "20" && lineIndex == 15 && (wordIndex >= 39 && wordIndex <= 41)) return "Central pattern generators are self-organizing biological neural circuits that produce rhythmic outputs in the absence of rhythmic input.,,,They are the source of the tightly-coupled patterns of neural activity that drive rhythmic and stereotyped motor behaviors like walking, swimming, breathing, or chewing."
    if (episode == "20" && lineIndex == 22 && (wordIndex >= 92 && wordIndex <= 94)) return "In his book, “Outliers”, Malcolm Gladwell repeatedly refers to the “10 000-hour rule”, asserting that the key to achieving true expertise in any skill is simply a matter of 10,000 hours of deliberate practice.,,,The book offers examples that include the band the Beatles, Microsoft's co-founder Bill Gates, and the theoretical physicist J. Robert Oppenheimer."
    if (episode == "20" && lineIndex == 34 && wordIndex == 3) return "The paper “Post-error recruitment of frontal sensory cortical projections promotes attention in mice” was written by the Norman et al.,,,It was published in the journal Neuron in 2021."
    if (episode == "20" && lineIndex == 34 && wordIndex == 25) return "Neuron is a biweekly peer-reviewed scientific journal published by Cell Press, an imprint of Elsevier.,,,Established in 1988, it is one of the most influential and relied upon journals in the field of neuroscience."
    if (episode == "20" && lineIndex == 84 && wordIndex == 23) return "The paper “From mental power to muscle power--gaining strength by using the mind” was written by the Ranganathan et al.,,,It was published in the journal Neuropsychologia in 2004."
}

const hubermanAnnotationLink = (episode: string, lineIndex: number, wordIndex: number) => {
    if (episode == "1" && lineIndex == 0 && (wordIndex == 3 || wordIndex == 4)) return "https://www.youtube.com/@hubermanlab"
    if (episode == "1" && lineIndex == 0 && (wordIndex == 17 || wordIndex == 18)) return "https://med.stanford.edu/profiles/andrew-huberman"
    if (episode == "1" && lineIndex == 2 && (wordIndex == 4 || wordIndex == 5)) return "https://drinkag1.com/about-ag1/ingredients/ctr"
    if (episode == "1" && lineIndex == 3 && wordIndex == 8) return "https://info.insidetracker.com/huberman"
    if (episode == "1" && lineIndex == 4 && (wordIndex == 160 || wordIndex == 161)) return "https://en.wikipedia.org/wiki/Möbius_strip"
    if (episode == "1" && lineIndex == 5 && (wordIndex >= 74 && wordIndex <= 76)) return "https://en.wikipedia.org/wiki/Santiago_Ramón_y_Cajal"
    if (episode == "1" && lineIndex == 5 && (wordIndex == 79 || wordIndex == 80)) return "https://en.wikipedia.org/wiki/Camillo_Golgi"
    if (episode == "1" && lineIndex == 5 && wordIndex == 158) return "https://en.wikipedia.org/wiki/Synapse"
    if (episode == "1" && lineIndex == 6 && wordIndex == 110) "https://en.wikipedia.org/wiki/Hippocampus"
    if (episode == "1" && lineIndex == 8 && wordIndex == 42) return "https://www.nature.com/articles/nature03687"
    if (episode == "1" && lineIndex == 12 && wordIndex == 134) return "https://en.wikipedia.org/wiki/Dopamine"
    if (episode == "1" && lineIndex == 12 && wordIndex == 136) return "https://en.wikipedia.org/wiki/Serotonin"
    if (episode == "1" && lineIndex == 12 && wordIndex == 138) return "https://en.wikipedia.org/wiki/Acetylcholine"
    if (episode == "1" && lineIndex == 12 && wordIndex == 139) return "https://en.wikipedia.org/wiki/Adrenaline"
    if (episode == "1" && lineIndex == 16 && wordIndex == 197) return "https://en.wikipedia.org/wiki/Charles_Scott_Sherrington"
    if (episode == "1" && lineIndex == 28 && (wordIndex == 126 || wordIndex == 127)) return "https://en.wikipedia.org/wiki/Ultradian_rhythm"
    if (episode == "1" && lineIndex == 28 && (wordIndex == 133 || wordIndex == 134)) return "https://en.wikipedia.org/wiki/Circadian_rhythm"
    
    if (episode == "19" && lineIndex == 0 && (wordIndex == 3 || wordIndex == 4)) return "https://www.youtube.com/@hubermanlab"
    if (episode == "19" && lineIndex == 0 && (wordIndex == 17 || wordIndex == 18)) return "https://med.stanford.edu/profiles/andrew-huberman"
    if (episode == "19" && lineIndex == 1 && wordIndex == 4) return "https://info.insidetracker.com/huberman"
    if (episode == "19" && lineIndex == 2 && (wordIndex == 8 || wordIndex == 9)) return "http://helixsleep.com"
    if (episode == "19" && lineIndex == 3 && wordIndex == 8) return "https://www.therabody.com"

    if (episode == "20" && lineIndex == 0 && (wordIndex == 3 || wordIndex == 4)) return "https://www.youtube.com/@hubermanlab"
    if (episode == "20" && lineIndex == 0 && (wordIndex == 17 || wordIndex == 18)) return "https://med.stanford.edu/profiles/andrew-huberman"
    if (episode == "20" && lineIndex == 1 && (wordIndex >= 4 && wordIndex <= 6)) return "https://web.archive.org/web/20170707184151/http://www.newyorker.com/magazine/2014/11/03/elite-meat"
    if (episode == "20" && lineIndex == 2 && wordIndex == 8) return "https://info.insidetracker.com/huberman"
    if (episode == "20" && lineIndex == 3 && (wordIndex == 8 || wordIndex == 9)) return "https://drinkag1.com/about-ag1/ingredients/ctr"
    if (episode == "20" && lineIndex == 6 && (wordIndex == 55 || wordIndex == 56)) return "https://med.stanford.edu/profiles/h-craig-heller"
    if (episode == "20" && lineIndex == 9 && (wordIndex >= 146 && wordIndex <= 147)) return "https://en.wikipedia.org/wiki/Phrenic_nerve"
    if (episode == "20" && lineIndex == 15 && (wordIndex >= 39 && wordIndex <= 41)) return "https://en.wikipedia.org/wiki/Central_pattern_generator"
    if (episode == "20" && lineIndex == 22 && (wordIndex >= 92 && wordIndex <= 94)) return "https://amzn.to/4bemoxy"
    if (episode == "20" && lineIndex == 34 && wordIndex == 3) return "https://doi.org/10.1016/j.neuron.2021.02.001"
    if (episode == "20" && lineIndex == 34 && wordIndex == 25) return "https://www.cell.com/neuron/home"
    if (episode == "20" && lineIndex == 84 && wordIndex == 23) return "https://doi.org/10.1016/j.neuropsychologia.2003.11.018"
}

export { hubermanWordIndices, hubermanAnnotation, hubermanAnnotationLink }