---
title: 'AuditoryStimuli.jl: A Julia package for generating real-time auditory stimuli'
tags:
  - Julia
  - auditory
  - real-time
authors:
  - name: Robert Luke
    orcid: 0000-0002-4930-8351
    affiliation: "1, 2"
affiliations:
 - name: Macquarie University, Macquarie University Hearing & Department of Linguistics, Australian Hearing Hub, Sydney, New South Wales, Australia
   index: 1
date: 19 July 2021
bibliography: paper.bib

---

# Summary

The `AuditoryStimuli.jl` software package provides researchers with a framework to generate real-time audio signals.
The package is designed for use in auditory research programs, neurofeedback applications, and audio signal processing development.
The package is developed on top of [@sampled-signals] to provide auditory specific functionality and encourage best practices in real-time audio presentation.
Generator functions are provided to create common auditory signals, and are designed to produce offline or real-time audio presentation.
Modifier functions are provided for tasks such as signal modulation and amplitude scaling,
these are designed to encourage best practices and include safe guards for common mistakes which can cause signal distortions which are perceived as clicks.



# Statement of need

Why is this needed

A number of software packages exist for controling the presentation of psychoacoustic experiments [@psychopy2; @pychoacoustics; @Schönwiesner2021].
Simillarly, many packages exist for the analysis of acoustic signals [@python-sofa; @mcfee2015librosa]


# Mathematics

Single dollars ($) are required for inline mathematics e.g. $f(x) = e^{\pi/x}$


# Citations



# Acknowledgements

This software has already been used in
[@luke2021analysis].

# References
