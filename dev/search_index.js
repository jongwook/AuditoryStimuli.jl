var documenterSearchIndex = {"docs":
[{"location":"api/#Library","page":"API","title":"Library","text":"","category":"section"},{"location":"api/","page":"API","title":"API","text":"","category":"page"},{"location":"api/","page":"API","title":"API","text":"CurrentModule = AuditoryStimuli","category":"page"},{"location":"api/#Module","page":"API","title":"Module","text":"","category":"section"},{"location":"api/","page":"API","title":"API","text":"AuditoryStimuli","category":"page"},{"location":"api/#AuditoryStimuli.AuditoryStimuli","page":"API","title":"AuditoryStimuli.AuditoryStimuli","text":"A Julia package for generating auditory stimuli.\n\n\n\n\n\n","category":"module"},{"location":"api/#Signal-generators","page":"API","title":"Signal generators","text":"","category":"section"},{"location":"api/","page":"API","title":"API","text":"NoiseSource\nCorrelatedNoiseSource\nSinusoidSource","category":"page"},{"location":"api/#AuditoryStimuli.NoiseSource","page":"API","title":"AuditoryStimuli.NoiseSource","text":"NoiseSource(eltype, samplerate, nchannels, std=1)\n\nNoiseSource is a multi-channel noise signal generator. The noise on each channel is independent.\n\nInputs\n\nsamplerate specifies the sample rate of the signal specified in Hz.\nnchannels specifies the number of channels of the signal.\nstd specifies the desired standard deviation of the signal.\n\nOutput\n\nSampleSource object\n\nExample\n\nsource_object = NoiseSource(Float64, 48u\"kHz\", 2, 0.3)\nwn = read(source_object, 480)         # Specify number of samples of signal to generate\nwn = read(source_object, 50u\"ms\")     # Specify length of time of signal to generate\n\n\n\n\n\n","category":"type"},{"location":"api/#AuditoryStimuli.CorrelatedNoiseSource","page":"API","title":"AuditoryStimuli.CorrelatedNoiseSource","text":"CorrelatedNoiseSource(eltype, samplerate, nchannels, std, correlation)\n\nCorrelatedNoiseSource is a two-channel  noise signal generator with controlled correlation between channels.\n\nInputs\n\nsamplerate specifies the sample rate of the signal.  \nnchannels specifies the number of channels of the signal.  \nstd specifies the desired standard deviation of the signal.  \ncorrelation specifies the desired correlation between the signals.\n\nOutput\n\nSampleSource object\n\nExample\n\nsource_object = CorrelatedNoiseSource(Float64, 48000, 2, 0.3, 0.75)\ncn = read(source_object, 480)         # Specify number of samples of signal to generate\ncn = read(source_object, 50u\"ms\")     # Specify length of time of signal to generate\n\n\n\n\n\n","category":"type"},{"location":"api/#AuditoryStimuli.SinusoidSource","page":"API","title":"AuditoryStimuli.SinusoidSource","text":"SinusoidSource(eltype, samplerate, freqs)\n\nSinusoidSource is a single-channel sine-tone signal generator. freqs can be an array of frequencies for a multi-frequency source, or a single frequency for a single sinusoid source.\n\nInputs\n\nsamplerate specifies the sample rate of the signal.  \nfreqs sinusoid frequencies to generate.  \n\nOutput\n\nSampleSource object\n\nExample\n\nsource_object = SinusoidSource(Float64, 48u\"kHz\", 200:200:2400)\ncn = read(source_object, 50u\"ms\")     # Generate 50 ms of harmonic stack audio\n\n\n\n\n\n","category":"type"},{"location":"api/#Online-signal-modifiers","page":"API","title":"Online signal modifiers","text":"","category":"section"},{"location":"api/","page":"API","title":"API","text":"Amplification\nAuditoryStimuli.Filter\nAmplitudeModulation\nTimeDelay","category":"page"},{"location":"api/#AuditoryStimuli.Amplification","page":"API","title":"AuditoryStimuli.Amplification","text":"Amplification(target, current, change_limit)\n\nApply amplification to the signal.\n\nThis modifier allows the user to specify a target amplification value, the modifier will then increase the amplification of the signal until the desired amplification is achieved. The rate at which the amplification can be changed is parameterised by the change_limit parameter.\n\nTo slowly ramp a signal to a desired value set the target amplification to the desired value, and the change_limit to a small value.\n\nTo instantly change the signal set the change_limit to infinity and modify the target value.\n\nWhen initialising the modifier specify the desired starting point using the current parameter.\n\nYou can access the exact amplification at any time by querying the current parameter.\n\nInputs\n\ntarget desired linear amplification factor to be applied to signal.\ncurrent linear amplification currently applied to signal.   Also used to specify the intial value for the process.\nchange_limit maximum change that can occur per frame.\nenable enable the modifier, if false the signal will be passed through without modification.\n\nExample\n\namplify = Amplification(0.1, 0.0, 0.05)\nattenuated_sound = modify(amplify, original_sound)\n\n\n\n\n\n","category":"type"},{"location":"api/#AuditoryStimuli.Filter","page":"API","title":"AuditoryStimuli.Filter","text":"Filter(filters)\n\nApply filter to the signal\n\nInputs\n\nfilters array of DSP filter objects.\n\nExample\n\nusing DSP\nresponsetype = Bandpass(500, 4000; fs=48000)\ndesignmethod = Butterworth(4)\nzpg = digitalfilter(responsetype, designmethod)\nf_left = DSP.Filters.DF2TFilter(zpg)\nf_right = DSP.Filters.DF2TFilter(zpg)\n\nbandpass = AuditoryStimuli.Filter([f_left, f_right])\nfiltered_sound = modify(bandpass, original_sound)\n\n\n\n\n\n","category":"type"},{"location":"api/#AuditoryStimuli.AmplitudeModulation","page":"API","title":"AuditoryStimuli.AmplitudeModulation","text":"AmplitudeModulation(rate, phase, depth)\n\nApply amplitude modulation to the signal\n\nInputs\n\nrate (Hz) desired modulation rate to be applied to signal.\nphase phase of modulation to be applied to signal applied to signal.   Defaults to pi so that modulation starts at a minimum.\ndepth modulation depth.\n\nExample\n\nmodulate = AmplitudeModulation(1u\"Hz\")\nmodulated_sound = modify(modulate, original_sound)\n\n\n\n\n\n","category":"type"},{"location":"api/#AuditoryStimuli.TimeDelay","page":"API","title":"AuditoryStimuli.TimeDelay","text":"TimeDelay(channel, delay, enable, buffer)\n\nDelay the signal in specified channel.\n\nInputs\n\nchannel which channel should have a time delay applied.\ndelay delay to be applied in samples.  \nenable should the modifier be enabled.\nbuffer initial values with which to pad the time delay. Defaults to zeros.\n\nExample\n\nitd = TimeDelay(2, 12)\nsound_with_itd = modify(itd, original_sound)\n\n\n\n\n\n","category":"type"},{"location":"api/#Offline-Signal-modifiers","page":"API","title":"Offline Signal modifiers","text":"","category":"section"},{"location":"api/","page":"API","title":"API","text":"ramp_on\nramp_off","category":"page"},{"location":"api/#AuditoryStimuli.ramp_on","page":"API","title":"AuditoryStimuli.ramp_on","text":"ramp_on(data, number_samples)\n\nApply a linear ramp to start of signal\n\n\n\n\n\n","category":"function"},{"location":"api/#AuditoryStimuli.ramp_off","page":"API","title":"AuditoryStimuli.ramp_off","text":"ramp_off(data, number_samples)\n\nApply a linear ramp to end of signal\n\n\n\n\n\n","category":"function"},{"location":"api/#Plotting","page":"API","title":"Plotting","text":"","category":"section"},{"location":"api/","page":"API","title":"API","text":"Plot\nPlotSpectroTemporal","category":"page"},{"location":"api/#AuditoryStimuli.PlotSpectroTemporal","page":"API","title":"AuditoryStimuli.PlotSpectroTemporal","text":"PlotSpectroTemporal(data, sample_rate)\n\nThis function plots the time, spectrogram, and periodogram of a signal\n\n\n\n\n\n","category":"function"},{"location":"example-hs/#Example:-Harmonic-Stack-Complex","page":"Harmonic Stacks","title":"Example: Harmonic Stack Complex","text":"","category":"section"},{"location":"example-hs/","page":"Harmonic Stacks","title":"Harmonic Stacks","text":"Harmonic stacks are often used to investigate pitch processing and streaming/grouping. Harmonic complexes contain a set of frequency components which are harmonics.","category":"page"},{"location":"example-hs/","page":"Harmonic Stacks","title":"Harmonic Stacks","text":"In this example we generate a harmonic stack which is modulated at 15 Hz.","category":"page"},{"location":"example-hs/#Realtime-Example","page":"Harmonic Stacks","title":"Realtime Example","text":"","category":"section"},{"location":"example-hs/","page":"Harmonic Stacks","title":"Harmonic Stacks","text":"In this example we process the audio in 10 millisecond frames.","category":"page"},{"location":"example-hs/","page":"Harmonic Stacks","title":"Harmonic Stacks","text":"using AuditoryStimuli, Unitful, Plots, Pipe, DSP\ndefault(size=(700, 300)) # hide\nusing DisplayAs # hide\n\n# Specify the source, modifiers, and sink of our audio pipeline\nstack_frequencies = 200:200:2400\nsource = SinusoidSource(Float64, 48u\"kHz\", stack_frequencies)\namp = Amplification(current=1/length(stack_frequencies),\n                    target=1/length(stack_frequencies),\n                    change_limit=1)\nam = AmplitudeModulation(15u\"hz\")\nsink = DummySampleSink(Float64, 48u\"kHz\", 1)\n\n# Run real time audio processing\nfor frame = 1:100\n    @pipe read(source, 0.01u\"s\") |> modify(amp, _) |> modify(am, _) |> write(sink, _)\nend\n\n# Validate the audio pipeline output\nPlotSpectroTemporal(sink, frequency_limits = [0, 3000], time_limits = [0.135, 0.33])\ncurrent() |> DisplayAs.PNG # hide","category":"page"},{"location":"example-hs/#Offline-Example","page":"Harmonic Stacks","title":"Offline Example","text":"","category":"section"},{"location":"example-hs/","page":"Harmonic Stacks","title":"Harmonic Stacks","text":"It is also possible to generate the audio in an offline (all in one step) manner. This may be useful for creating wav files for use in simpler experiments.","category":"page"},{"location":"example-hs/","page":"Harmonic Stacks","title":"Harmonic Stacks","text":"using AuditoryStimuli, Unitful, Plots, WAV\ndefault(size=(700, 300)) # hide\nusing DisplayAs # hide\n\nstack_frequencies = 200:200:2400\nsource = SinusoidSource(Float64, 48000, stack_frequencies)\nam = AmplitudeModulation(15u\"hz\")\n\naudio = read(source, 1.0u\"s\") \nmodulated_audio = modify(am, audio) \n\n# Write the audio to disk as a wav file\nwavwrite(modulated_audio.data ./ length(stack_frequencies), \"harmonic-stack.wav\",Fs=48000)","category":"page"},{"location":"example-itd/#Example:-Interaural-Time-Delay","page":"Interaural Time Delay","title":"Example: Interaural Time Delay","text":"","category":"section"},{"location":"example-itd/","page":"Interaural Time Delay","title":"Interaural Time Delay","text":"Stimuli with a delay applied to one ear causes the sound to be perceived as coming from a different direction. These stimuli are commonly used to investigate source localisation algorithms [1].","category":"page"},{"location":"example-itd/","page":"Interaural Time Delay","title":"Interaural Time Delay","text":"[1] Luke, R., & McAlpine, D. (2019, May). A spiking neural network approach to auditory source lateralisation. In ICASSP 2019-2019 IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP) (pp. 1488-1492). IEEE. Chicago\t","category":"page"},{"location":"example-itd/#Realtime-Example","page":"Interaural Time Delay","title":"Realtime Example","text":"","category":"section"},{"location":"example-itd/","page":"Interaural Time Delay","title":"Interaural Time Delay","text":"In this example we apply a 48 sample delay to the second channel (right ear). When presented over headphones this causes the sound to be perceived as arriving from the left, as the sound arrives at the left ear first.","category":"page"},{"location":"example-itd/","page":"Interaural Time Delay","title":"Interaural Time Delay","text":"using AuditoryStimuli, Unitful, Plots, Pipe, DSP\ndefault(size=(700, 300)) # hide\nusing DisplayAs # hide\n\n# Specify the source, modifiers, and sink of our audio pipeline\nsource = CorrelatedNoiseSource(Float64, 48u\"kHz\", 2, 0.2, 1)\nitd_left = TimeDelay(2, 48, true)\nsink = DummySampleSink(Float64, 48u\"kHz\", 2)\n\n\n# Run real time audio processing\nfor frame = 1:100\n\n    @pipe read(source, 1/100u\"s\") |> modify(itd_left, _) |> write(sink, _)\n\nend\n\n# Validate the audio pipeline output\nplot(sink, label=[\"Left\" \"Right\"])\ncurrent() |> DisplayAs.PNG # hide","category":"page"},{"location":"example-itd/","page":"Interaural Time Delay","title":"Interaural Time Delay","text":"The stimulus output can be validated by observing that the peak in the cross correlation function occurs at 48 samples.","category":"page"},{"location":"example-itd/","page":"Interaural Time Delay","title":"Interaural Time Delay","text":"using StatsBase\n\nlags = round.(Int, -60:1:60)\nplot(lags, crosscor(sink.buf[:, 1], sink.buf[:, 2], lags),\n     label=\"\", ylab=\"Cross Correlation\", xlab=\"Lag (samples)\")\ncurrent() |> DisplayAs.PNG # hide","category":"page"},{"location":"example-ssr/#Example:-Amplitude-Modulated-Noise","page":"Amplitude Modulated Noise","title":"Example: Amplitude Modulated Noise","text":"","category":"section"},{"location":"example-ssr/","page":"Amplitude Modulated Noise","title":"Amplitude Modulated Noise","text":"In this example we geneate a white noise signal which is modualted at 40 Hz. These signals are commonly used to ellicit auditory steady-state responses [1].","category":"page"},{"location":"example-ssr/","page":"Amplitude Modulated Noise","title":"Amplitude Modulated Noise","text":"[1] Luke, R., Van Deun, L., Hofmann, M., Van Wieringen, A., & Wouters, J. (2015). Assessing temporal modulation sensitivity using electrically evoked auditory steady state responses. Hearing research, 324, 37-45.","category":"page"},{"location":"example-ssr/#Realtime-Example","page":"Amplitude Modulated Noise","title":"Realtime Example","text":"","category":"section"},{"location":"example-ssr/","page":"Amplitude Modulated Noise","title":"Amplitude Modulated Noise","text":"In this example we process the audio in 10 millisecond frames.","category":"page"},{"location":"example-ssr/","page":"Amplitude Modulated Noise","title":"Amplitude Modulated Noise","text":"using AuditoryStimuli, Unitful, Plots, Pipe, DSP\ndefault(size=(700, 300)) # hide\nusing DisplayAs # hide\n\n# Specify the source, modifiers, and sink of our audio pipeline\nsource = NoiseSource(Float64, 48u\"kHz\", 1, 0.2)\nsink = DummySampleSink(Float64, 48u\"kHz\", 1)\nam = AmplitudeModulation(40u\"Hz\")\n\n# Run real time audio processing\nfor frame = 1:100\n    @pipe read(source, 0.01u\"s\") |> modify(am, _) |> write(sink, _)\nend\n\n# Validate the audio pipeline output\nplot(sink, label=\"\")\ncurrent() |> DisplayAs.PNG # hide","category":"page"},{"location":"example-ssr/#Offline-Example","page":"Amplitude Modulated Noise","title":"Offline Example","text":"","category":"section"},{"location":"example-ssr/","page":"Amplitude Modulated Noise","title":"Amplitude Modulated Noise","text":"It is also possible to generate the audio in an offline (all in one step) manner. This may be useful for creating wav files for use in simpler experiments.","category":"page"},{"location":"example-ssr/","page":"Amplitude Modulated Noise","title":"Amplitude Modulated Noise","text":"using AuditoryStimuli, Unitful, Plots, WAV\ndefault(size=(700, 300)) # hide\nusing DisplayAs # hide\n\n# Specify the source, modifiers, and sink of our audio pipeline\nsource = NoiseSource(Float64, 48u\"kHz\", 1, 0.2)\nam = AmplitudeModulation(40)\n\n# Run real time audio processing\naudio = read(source, 1.0u\"s\")\nmodulated_audio = modify(am, audio)\n\n# Write the audio to disk as a wav file\nwavwrite(modulated_audio.data, \"AM-noise.wav\",Fs=48000)","category":"page"},{"location":"realtime-introduction/#Real-Time-Audio-Processing","page":"Introduction / Tutorial","title":"Real-Time Audio Processing","text":"","category":"section"},{"location":"realtime-introduction/","page":"Introduction / Tutorial","title":"Introduction / Tutorial","text":"In this tutorial the basics of real-time audio processing are introduced, and how you can generate real time audio with this package.","category":"page"},{"location":"realtime-introduction/","page":"Introduction / Tutorial","title":"Introduction / Tutorial","text":"It is common to process audio in small chunks of samples called frames. This is more efficient than processing signals on a sample by sample basis, yet allows dynamic adaptation of the audio signal. In this example we use a frame size of 1/100th of a second, or 480 samples when using a sample rate of 48 kHz. However, the frame size can be adjusted to suit your research needs.","category":"page"},{"location":"realtime-introduction/","page":"Introduction / Tutorial","title":"Introduction / Tutorial","text":"Real-time processing consists of a source, zero or more modifiers, and a sink. Sources generate the raw signal. Modifiers alter the signal. Sinks are a destination for the signals, typically a sound card, but in this example we use a buffer.","category":"page"},{"location":"realtime-introduction/","page":"Introduction / Tutorial","title":"Introduction / Tutorial","text":"First the required packages are loaded and the sample rate and number of audio channels is specified. This package makes extensive use of units to minimise the chance of coding mistakes, below the sample rate is specified in the unit of kHz.","category":"page"},{"location":"realtime-introduction/","page":"Introduction / Tutorial","title":"Introduction / Tutorial","text":"using AuditoryStimuli, Unitful, Plots, Pipe, DSP\nusing DisplayAs # hide\n\nsample_rate = 48u\"kHz\"\naudio_channels = 2\nsource_rms = 0.2\n\ndefault(size=(700, 300)) # hide","category":"page"},{"location":"realtime-introduction/#Set-up-the-signal-pipeline-components","page":"Introduction / Tutorial","title":"Set up the signal pipeline components","text":"","category":"section"},{"location":"realtime-introduction/","page":"Introduction / Tutorial","title":"Introduction / Tutorial","text":"First we need a source. In this example a simple white noise source is used. The type of data (floats) is specified, as is the the sample rate, number of channels, and the RMS of each channel.","category":"page"},{"location":"realtime-introduction/","page":"Introduction / Tutorial","title":"Introduction / Tutorial","text":"source = NoiseSource(Float64, sample_rate, audio_channels, source_rms)\nnothing # hide","category":"page"},{"location":"realtime-introduction/","page":"Introduction / Tutorial","title":"Introduction / Tutorial","text":"A sink is also required. This would typically be a sound card, but that is not possible with a web page tutorial. Instead, for this website example a dummy sink is used, which simply saves the sample to a buffer. Dummy sink are also useful for validating our generated stimuli, as we can measure and plot the output.","category":"page"},{"location":"realtime-introduction/","page":"Introduction / Tutorial","title":"Introduction / Tutorial","text":"sink = DummySampleSink(Float64, sample_rate, audio_channels)\n\n# But on a real system you would use something like\n# devices = PortAudio.devices()\n# println(devices)\n# sink = PortAudioStream(devices[3], sample_rate, audio_channels)","category":"page"},{"location":"realtime-introduction/","page":"Introduction / Tutorial","title":"Introduction / Tutorial","text":"In this example a single signal modifier is used. This signal modifier simply adjusts the amplitude of the signal with a linear scaling. We specify the desired linear amplification to be 1.0, so no modification to the amplitude. However, we do not want the signal to jump from silent to full intensity, so we specify the current value of the amplitude as 0 (silent) and set the maximum increase per frame to be 0.05. This will ramp the signal from silent to full intensity.","category":"page"},{"location":"realtime-introduction/","page":"Introduction / Tutorial","title":"Introduction / Tutorial","text":"amp = Amplification(current=0.0, target=1.0, change_limit=0.05)\nnothing # hide","category":"page"},{"location":"realtime-introduction/#Run-the-real-time-audio-pipeline","page":"Introduction / Tutorial","title":"Run the real-time audio pipeline","text":"","category":"section"},{"location":"realtime-introduction/","page":"Introduction / Tutorial","title":"Introduction / Tutorial","text":"To run the real-time processing we generate a pipeline and run it. We use the pipe notation to conveniently describe the audio pipeline. In this simple example we read a frame with duration 1/100th of a second from the source. The frame of white noise is piped through the amplitude modifier, and then piped in to the sink. Modifiers always take the modification object as the first argument, followed by an underscore to represent the piped data. Similarly, when writing the data to a sink, the sink is always the first argument, followed by an underscore to represent the piped data. The pipeline is run 100 times, resulting in 1 second of generated audio.","category":"page"},{"location":"realtime-introduction/","page":"Introduction / Tutorial","title":"Introduction / Tutorial","text":"for frame = 1:100\n    @pipe read(source, 0.01u\"s\") |> modify(amp, _) |> write(sink, _)\nend","category":"page"},{"location":"realtime-introduction/#Verify-processing-was-correctly-applied","page":"Introduction / Tutorial","title":"Verify processing was correctly applied","text":"","category":"section"},{"location":"realtime-introduction/","page":"Introduction / Tutorial","title":"Introduction / Tutorial","text":"We can plot the data from sink (as it was a DummySink, which is simply a buffer) to confirm the signal generated matches our expectations. As expected, we see below that two channels of audio are generated, that the signal is 1 second long, and that there is a ramp applied to the onset.","category":"page"},{"location":"realtime-introduction/","page":"Introduction / Tutorial","title":"Introduction / Tutorial","text":"plot(sink)\ncurrent() |> DisplayAs.PNG # hide","category":"page"},{"location":"realtime-introduction/#Apply-a-filter-modifier","page":"Introduction / Tutorial","title":"Apply a filter modifier","text":"","category":"section"},{"location":"realtime-introduction/","page":"Introduction / Tutorial","title":"Introduction / Tutorial","text":"A more advanced application is to use a filter as a modifier. The filter maintains its state between calls, so can be used for real-time audio processing. Below a bandpass filter is designed, for more details on filter design using the DSP package see this documentation.","category":"page"},{"location":"realtime-introduction/","page":"Introduction / Tutorial","title":"Introduction / Tutorial","text":"responsetype = Bandpass(500, 4000; fs=48000)\ndesignmethod = Butterworth(4)\nzpg = digitalfilter(responsetype, designmethod)\nnothing # hide","category":"page"},{"location":"realtime-introduction/","page":"Introduction / Tutorial","title":"Introduction / Tutorial","text":"Once the filter is specified as a zero pole gain representation two filters are instantiated using this specification. A filter must be generated for each channel of audio. These DSP.Filters are then passed in to the AuditoryStimuli filter object for further use.","category":"page"},{"location":"realtime-introduction/","page":"Introduction / Tutorial","title":"Introduction / Tutorial","text":"f_left = DSP.Filters.DF2TFilter(zpg)\nf_right = DSP.Filters.DF2TFilter(zpg)\nbandpass = AuditoryStimuli.Filter([f_left, f_right])\nnothing # hide","category":"page"},{"location":"realtime-introduction/","page":"Introduction / Tutorial","title":"Introduction / Tutorial","text":"Once the filters are designed and placed in an AuditoryStimuli.Filter object they can be used just like any other modifier. Below the filter is included in the pipeline and applied to 1 second of audio in 1/100th second frames. This example demonstrates how an arbitrary number of modifiers can be chained to create complex audio stimuli.","category":"page"},{"location":"realtime-introduction/","page":"Introduction / Tutorial","title":"Introduction / Tutorial","text":"for frame = 1:100\n    @pipe read(source, 0.01u\"s\") |> modify(amp, _) |> modify(bandpass, _) |> write(sink, _)\nend","category":"page"},{"location":"realtime-introduction/#Modifying-modifier-parameters","page":"Introduction / Tutorial","title":"Modifying modifier parameters","text":"","category":"section"},{"location":"realtime-introduction/","page":"Introduction / Tutorial","title":"Introduction / Tutorial","text":"Further, the parameters of modifiers can be varied at any time. This can be handy to adapt your stimuli to user responses or feedback. Below the target amplification is updated to be set to zero. This effectively ramps off the signal.","category":"page"},{"location":"realtime-introduction/","page":"Introduction / Tutorial","title":"Introduction / Tutorial","text":"setproperty!(amp, :target, 0.0)\nfor frame = 1:20\n    @pipe read(source, 0.01u\"s\") |> modify(amp, _) |> modify(bandpass, _) |> write(sink, _)\nend\n nothing # hide","category":"page"},{"location":"realtime-introduction/#Verify-output","page":"Introduction / Tutorial","title":"Verify output","text":"","category":"section"},{"location":"realtime-introduction/","page":"Introduction / Tutorial","title":"Introduction / Tutorial","text":"The entire signal (both the amplification, then the filtering sections) can be viewed using the convenience plotting function below. We observe that the signal is ramped on due to the amplification modifier. We can then see that at 1 second the spectral content of the signal was modified. And finally the signal is ramped off.","category":"page"},{"location":"realtime-introduction/","page":"Introduction / Tutorial","title":"Introduction / Tutorial","text":"PlotSpectroTemporal(sink, figure_size=(700, 400), frequency_limits = [0, 8000])\ncurrent() |> DisplayAs.PNG # hide","category":"page"},{"location":"example-itmfr/#Example:-Interaural-Time-Delay-Modulation","page":"ITD Modulation","title":"Example: Interaural Time Delay Modulation","text":"","category":"section"},{"location":"example-itmfr/","page":"ITD Modulation","title":"ITD Modulation","text":"This stimuli has an ITD that is modulated from the left to right. This stimulus is used to elicit an interaural time delay following response, which has been related to spatial listening performance [1].","category":"page"},{"location":"example-itmfr/","page":"ITD Modulation","title":"ITD Modulation","text":"[1] Undurraga, J. A., Haywood, N. R., Marquardt, T., & McAlpine, D. (2016). Neural representation of interaural time differences in humans—An objective measure that matches behavioural performance. Journal of the Association for Research in Otolaryngology, 17(6), 591-607.","category":"page"},{"location":"example-itmfr/#Realtime-Example","page":"ITD Modulation","title":"Realtime Example","text":"","category":"section"},{"location":"example-itmfr/","page":"ITD Modulation","title":"ITD Modulation","text":"This example contains several processing steps and a dynamically changing pipeline.","category":"page"},{"location":"example-itmfr/","page":"ITD Modulation","title":"ITD Modulation","text":"A signal is generated which is identical in two channels. This signal is then bandpass filtered between 300 and 700 Hz, and is then modulated at 20 Hz. At the minimum of each modulation the ITD is switched from left to right leading with a 48 sample delay.","category":"page"},{"location":"example-itmfr/","page":"ITD Modulation","title":"ITD Modulation","text":"using AuditoryStimuli, Unitful, Plots, Pipe, DSP\ndefault(size=(700, 300)) # hide\nusing DisplayAs # hide\n\n# Specify the source, modifiers, and sink of our audio pipeline\nsource = CorrelatedNoiseSource(Float64, 48u\"kHz\", 2, 0.2, 1)\nsink = DummySampleSink(Float64, 48u\"kHz\", 2)\nam = AmplitudeModulation(20u\"Hz\")\n\n# Design the filter\nresponsetype = Bandpass(300, 700; fs=48000)\ndesignmethod = Butterworth(14)\nzpg = digitalfilter(responsetype, designmethod)\nf_left = DSP.Filters.DF2TFilter(zpg)\nf_right = DSP.Filters.DF2TFilter(zpg)\nbp = AuditoryStimuli.Filter([f_left, f_right])\n\nitd_left = TimeDelay(2, 48, true)\nitd_right = TimeDelay(1, 48, false)\n\n# Run real time audio processing\nfor frame = 1:4\n\n    @pipe read(source, 1/20u\"s\") |>\n          modify(bp, _) |> modify(am, _) |>\n          modify(itd_left, _) |> modify(itd_right, _) |>\n          write(sink, _)\n\n    # For each modulation cycle switch between left and right leading ITD\n    itd_left.enable = !itd_left.enable\n    itd_right.enable = !itd_right.enable\nend\n\n# Validate the audio pipeline output\nplot(sink, label=[\"Left\" \"Right\"])\ncurrent() |> DisplayAs.PNG # hide","category":"page"},{"location":"example-itmfr/","page":"ITD Modulation","title":"ITD Modulation","text":"In the figure above we observe that in the first and third modulation the signal is left leading, and that in the second and fourth cycle the signal is right leading.","category":"page"},{"location":"advanced/#Advanced-Usage","page":"Advanced Usage","title":"Advanced Usage","text":"","category":"section"},{"location":"advanced/","page":"Advanced Usage","title":"Advanced Usage","text":"The introduction provides a simple example but for efficient use the following considerations may be required.","category":"page"},{"location":"advanced/#Threading","page":"Advanced Usage","title":"Threading","text":"","category":"section"},{"location":"advanced/","page":"Advanced Usage","title":"Advanced Usage","text":"Running the audio stream in its own thread so you can process user input or run other code in parallel. This is easily accomplished using @spawn, see: example.","category":"page"},{"location":"advanced/#Enabling/Disabling-pipeline-components","page":"Advanced Usage","title":"Enabling/Disabling pipeline components","text":"","category":"section"},{"location":"advanced/","page":"Advanced Usage","title":"Advanced Usage","text":"Enable or disable processing rather than modifying the pipeline. Each modifier has an enable flag so that it can be disabled, when disabled the signal is simply passed through and not modified.","category":"page"},{"location":"example-bpnoise/#Example:-Bandpass-Noise","page":"Bandpass Noise","title":"Example: Bandpass Noise","text":"","category":"section"},{"location":"example-bpnoise/","page":"Bandpass Noise","title":"Bandpass Noise","text":"In this example we geneate a bandpass noise signal. This common stimulus is used for determining hearing thresholds.","category":"page"},{"location":"example-bpnoise/#Realtime-Example","page":"Bandpass Noise","title":"Realtime Example","text":"","category":"section"},{"location":"example-bpnoise/","page":"Bandpass Noise","title":"Bandpass Noise","text":"In this example we process the audio in 10 millisecond frames.","category":"page"},{"location":"example-bpnoise/","page":"Bandpass Noise","title":"Bandpass Noise","text":"using AuditoryStimuli, Unitful, Plots, Pipe, DSP\ndefault(size=(700, 300)) # hide\nusing DisplayAs # hide\n\n# Specify the source, modifiers, and sink of our audio pipeline\nsource = NoiseSource(Float64, 48u\"kHz\", 1)\nsink = DummySampleSink(Float64, 48u\"kHz\", 1)\n\n# Design the filter\nresponsetype = Bandpass(300, 700; fs=48000)\ndesignmethod = Butterworth(14)\nzpg = digitalfilter(responsetype, designmethod)\nf_left = DSP.Filters.DF2TFilter(zpg)\nbp = AuditoryStimuli.Filter([f_left])\n\n# Run real time audio processing\nfor frame = 1:100\n    @pipe read(source, 0.01u\"s\") |> modify(bp, _) |> write(sink, _)\nend\n\n# Validate the audio pipeline output\nPlotSpectroTemporal(sink, frequency_limits = [0, 4000])\ncurrent() |> DisplayAs.PNG # hide","category":"page"},{"location":"example-bpnoise/#Offline-Example","page":"Bandpass Noise","title":"Offline Example","text":"","category":"section"},{"location":"example-bpnoise/","page":"Bandpass Noise","title":"Bandpass Noise","text":"It is also possible to generate the audio in an offline (all in one step) manner. This may be useful for creating wav files for use in simpler experiments.","category":"page"},{"location":"example-bpnoise/","page":"Bandpass Noise","title":"Bandpass Noise","text":"using AuditoryStimuli, Unitful, Plots, DSP, WAV\ndefault(size=(700, 300)) # hide\nusing DisplayAs # hide\n\n# Specify the source, modifiers, and sink of our audio pipeline\nsource = NoiseSource(Float64, 48u\"kHz\", 2, 0.2)\n\n# Design the filter\nresponsetype = Bandpass(500, 4000; fs=48000)\ndesignmethod = Butterworth(4)\nzpg = digitalfilter(responsetype, designmethod)\nf_left = DSP.Filters.DF2TFilter(zpg)\nf_right = DSP.Filters.DF2TFilter(zpg)\nbp = AuditoryStimuli.Filter([f_left, f_right])\n\n# Run real time audio processing\naudio = read(source, 1.0u\"s\")\nmodulated_audio = modify(bp, audio)\n\n# Write the audio to disk as a wav file\nwavwrite(modulated_audio.data, \"BP-noise.wav\",Fs=48000)","category":"page"},{"location":"example-signoise/#Example:-Signal-and-Noise","page":"Signal and Noise","title":"Example: Signal and Noise","text":"","category":"section"},{"location":"example-signoise/","page":"Signal and Noise","title":"Signal and Noise","text":"This example demonstrates how to produce a signal of interest and an additive noise signal. The noise signal is only applied during a specified time window.","category":"page"},{"location":"example-signoise/#Realtime-Example","page":"Signal and Noise","title":"Realtime Example","text":"","category":"section"},{"location":"example-signoise/","page":"Signal and Noise","title":"Signal and Noise","text":"using AuditoryStimuli, Unitful, Plots, Pipe, DSP\ndefault(size=(700, 300)) # hide\nusing DisplayAs # hide\n\n# Specify the source, modifiers, and sink of our audio pipeline\nsource = NoiseSource(Float64, 48u\"kHz\", 1, 1)\nnoisesource = NoiseSource(Float64, 48u\"kHz\", 1, 1)\nsink = DummySampleSink(Float64, 48u\"kHz\", 1)\nam = AmplitudeModulation(40u\"Hz\")\n\n# Design the filter\nresponsetype = Bandpass(1500, 2500; fs=48000)\ndesignmethod = Butterworth(14)\nzpg = digitalfilter(responsetype, designmethod)\nf_left = DSP.Filters.DF2TFilter(zpg)\nbp = AuditoryStimuli.Filter([f_left])\n\n# Run real time audio processing\nfor frame = 1:100\n    \n    # Generate the signal of interest\n    output = @pipe read(source, 0.01u\"s\") |> modify(bp, _)  |> modify(am, _) \n\n    # During 0.3-0.7s add a white noise to the output\n    if 30 < frame < 70\n\toutput += read(noisesource, 0.01u\"s\") \n    end\n\n    # Write the output to device\n    write(sink, output)\nend\n\n# Validate the audio pipeline output\nPlotSpectroTemporal(sink, frequency_limits = [0, 4000])\ncurrent() |> DisplayAs.PNG # hide","category":"page"},{"location":"#AuditoryStimuli.jl","page":"Home","title":"AuditoryStimuli.jl","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"A Julia package for generating auditory stimuli.","category":"page"},{"location":"","page":"Home","title":"Home","text":"","category":"page"},{"location":"#Installation","page":"Home","title":"Installation","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"To install this package enter the package manager by pressing ] at the julia prompt and enter:","category":"page"},{"location":"","page":"Home","title":"Home","text":"pkg> add AuditoryStimuli","category":"page"},{"location":"#Overview","page":"Home","title":"Overview","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"This package provides a framework for generating audio in real time. It can also be used to generate audio offline. Tutorials and examples are provided for both approaches.","category":"page"}]
}
