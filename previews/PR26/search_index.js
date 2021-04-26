var documenterSearchIndex = {"docs":
[{"location":"examples-realtime/#Realtime-Audio-Processing","page":"Examples - Realtime ","title":"Realtime Audio Processing","text":"","category":"section"},{"location":"examples-realtime/","page":"Examples - Realtime ","title":"Examples - Realtime ","text":"This example demonstrates how to stream audio and apply real-time signal processing to the signal.","category":"page"},{"location":"examples-realtime/","page":"Examples - Realtime ","title":"Examples - Realtime ","text":"Real-time processing consists of a source, zero or more modifiers, and a sink. Sources generate the raw signal. Modifiers alter the signal. Sinks are a destination for the signals, typically a sound card, but in this example we use a buffer.","category":"page"},{"location":"examples-realtime/","page":"Examples - Realtime ","title":"Examples - Realtime ","text":"First the required packages are loaded and the sample rate and number of audio channels is specified. This package makes extensive use of units to minimise the chance of coding mistakes, below the sample rate is specified in the unit of kHz.","category":"page"},{"location":"examples-realtime/","page":"Examples - Realtime ","title":"Examples - Realtime ","text":"using AuditoryStimuli, Unitful, Plots, Pipe, DSP\n\nsample_rate = 48u\"kHz\"\naudio_channels = 2;\nsource_rms = 0.2\n\ndefault(size=(800, 300)) # hide","category":"page"},{"location":"examples-realtime/#Set-up-the-signal-pipeline-components","page":"Examples - Realtime ","title":"Set up the signal pipeline components","text":"","category":"section"},{"location":"examples-realtime/","page":"Examples - Realtime ","title":"Examples - Realtime ","text":"First we need a source. Here we use a simple white noise source and we specify the type of data we want to work with (Floats), the sample rate, number of channels, and the RMS of each channel.","category":"page"},{"location":"examples-realtime/","page":"Examples - Realtime ","title":"Examples - Realtime ","text":"source = NoiseSource(Float64, sample_rate, audio_channels, source_rms)\nnothing # hide","category":"page"},{"location":"examples-realtime/","page":"Examples - Realtime ","title":"Examples - Realtime ","text":"A sink is also required. This would typically be a sound card, but that is not possible on a web site. Instead, for this website example a dummy sink is used, which simply saves the sample to a buffer.","category":"page"},{"location":"examples-realtime/","page":"Examples - Realtime ","title":"Examples - Realtime ","text":"sink = DummySampleSink(Float64, sample_rate, audio_channels)\n\n# But on a real system you would use something like\n# devices = PortAudio.devices()\n# println(devices)\n# sink = PortAudioStream(devices[3], sample_rate, audio_channels)","category":"page"},{"location":"examples-realtime/","page":"Examples - Realtime ","title":"Examples - Realtime ","text":"And we will apply one signal modifier. This signal modifier simply adjusts the amplitude of the signal with a linear scaling. We specify the desired linear amplification to be 1.0, so no modification to the amplitude. However, we do not want the signal to jump from silent to full intensity, so we specify the current value of the amplitude as 0 (silent) and set the maximum increase per frame to be 0.05. This will ramp the signal from silent to full intensity.","category":"page"},{"location":"examples-realtime/","page":"Examples - Realtime ","title":"Examples - Realtime ","text":"amp = Amplification(current=0.0, target=1.0, change_limit=0.05)\nnothing # hide","category":"page"},{"location":"examples-realtime/#Run-the-real-time-audio-pipeline","page":"Examples - Realtime ","title":"Run the real-time audio pipeline","text":"","category":"section"},{"location":"examples-realtime/","page":"Examples - Realtime ","title":"Examples - Realtime ","text":"Audio is typically processed in small chunks of samples called frames. Here we request a frame from the noise source with length 1/100th of a second, or 480 samples. This is then passed through the signal amplifier, then sent to the sink.","category":"page"},{"location":"examples-realtime/","page":"Examples - Realtime ","title":"Examples - Realtime ","text":"for frame = 1:100\n    @pipe read(source, 0.01u\"s\") |> modify(amp, _) |> write(sink, _)\nend","category":"page"},{"location":"examples-realtime/#Verify-processing-was-correctly-applied","page":"Examples - Realtime ","title":"Verify processing was correctly applied","text":"","category":"section"},{"location":"examples-realtime/","page":"Examples - Realtime ","title":"Examples - Realtime ","text":"plot(sink)","category":"page"},{"location":"examples-realtime/#Apply-a-filter-modifier","page":"Examples - Realtime ","title":"Apply a filter modifier","text":"","category":"section"},{"location":"examples-realtime/","page":"Examples - Realtime ","title":"Examples - Realtime ","text":"A filter can also be applied to the data as a modifier. The filter also maintains its state, so can be used in real time processing. Below a bandpass filter is designed, for more details on filter design using the DSP package see this documentation.","category":"page"},{"location":"examples-realtime/","page":"Examples - Realtime ","title":"Examples - Realtime ","text":"responsetype = Bandpass(500, 4000; fs=48000)\ndesignmethod = Butterworth(4)\nzpg = digitalfilter(responsetype, designmethod)\nnothing # hide","category":"page"},{"location":"examples-realtime/","page":"Examples - Realtime ","title":"Examples - Realtime ","text":"Once the filter is specified as a zero pole gain representation two filters are instansiated using this specification. A filter must be generated for each channel of audio. These DSP.Filters are then passed in to the AuditoryStimuli filter object for further use.","category":"page"},{"location":"examples-realtime/","page":"Examples - Realtime ","title":"Examples - Realtime ","text":"f_left = DSP.Filters.DF2TFilter(zpg)\nf_right = DSP.Filters.DF2TFilter(zpg)\nbandpass = AuditoryStimuli.Filter([f_left, f_right])\nnothing # hide","category":"page"},{"location":"examples-realtime/","page":"Examples - Realtime ","title":"Examples - Realtime ","text":"Once the filters are designed and placed in an AuditoryStimule.Filter object they can be used just like any other modifier. Below the filer is applied to 1 second of audio in 1/100th second frames.","category":"page"},{"location":"examples-realtime/","page":"Examples - Realtime ","title":"Examples - Realtime ","text":"for frame = 1:100\n    @pipe read(source, 0.01u\"s\") |> modify(amp, _) |> modify(bandpass, _) |> write(sink, _)\nend","category":"page"},{"location":"examples-realtime/#Modifying-modifier-parameters","page":"Examples - Realtime ","title":"Modifying modifier parameters","text":"","category":"section"},{"location":"examples-realtime/","page":"Examples - Realtime ","title":"Examples - Realtime ","text":"The parameters of modifiers can be varied at any time. Below the target amplification is set to zero to ramp off the signal.","category":"page"},{"location":"examples-realtime/","page":"Examples - Realtime ","title":"Examples - Realtime ","text":"setproperty!(amp, :target, 0.0)\nfor frame = 1:20\n    @pipe read(source, 0.01u\"s\") |> modify(amp, _) |> modify(bandpass, _) |> write(sink, _)\nend\n nothing # hide","category":"page"},{"location":"examples-realtime/#Verify-output","page":"Examples - Realtime ","title":"Verify output","text":"","category":"section"},{"location":"examples-realtime/","page":"Examples - Realtime ","title":"Examples - Realtime ","text":"The entire signal (both the amplification, then the filtering) can be viewed using the convenience plotting function below. We observe that the signal is ramped on due to the amplification modifier. We can then see that at 1 second the spectral content of the signal was modified. And finally the signal is ramped off.","category":"page"},{"location":"examples-realtime/","page":"Examples - Realtime ","title":"Examples - Realtime ","text":"PlotSpectroTemporal(sink, figure_size=(800, 400), frequency_limits = [0, 8000])","category":"page"},{"location":"examples-realtime/#Other-examples","page":"Examples - Realtime ","title":"Other examples","text":"","category":"section"},{"location":"examples-realtime/","page":"Examples - Realtime ","title":"Examples - Realtime ","text":"Modulation ","category":"page"},{"location":"examples-realtime/","page":"Examples - Realtime ","title":"Examples - Realtime ","text":"using AuditoryStimuli, Unitful, Plots, Pipe, DSP\n\nsample_rate = 48u\"kHz\"\naudio_channels = 2;\nsource_rms = 0.2\n\nsource = NoiseSource(Float64, sample_rate, audio_channels, source_rms)\nsink = DummySampleSink(Float64, sample_rate, audio_channels)\nam = AmplitudeModulation(4, π, 1.5)\n\nfor frame = 1:300\n    @pipe read(source, 0.01u\"s\") |> modify(am, _) |> write(sink, _)\nend\n\nplot(sink)\n","category":"page"},{"location":"examples-realtime/#Other-tips","page":"Examples - Realtime ","title":"Other tips","text":"","category":"section"},{"location":"examples-realtime/","page":"Examples - Realtime ","title":"Examples - Realtime ","text":"This example demonstrates the basics of real-time signal processing with this package. For a real application the following considerations may be required:","category":"page"},{"location":"examples-realtime/","page":"Examples - Realtime ","title":"Examples - Realtime ","text":"Running the audio stream in its own thread so you can process user input or run other code in parallel.   This is easily accomplised using @spawn, see: example\nEnable or disable processing rather than modifying the pipeline.   Each modifier has an enable flag so that it can be disabled,   when disabled the signal is simply passed through and not modified.","category":"page"},{"location":"api/#Library","page":"API","title":"Library","text":"","category":"section"},{"location":"api/","page":"API","title":"API","text":"","category":"page"},{"location":"api/","page":"API","title":"API","text":"CurrentModule = AuditoryStimuli","category":"page"},{"location":"api/#Module","page":"API","title":"Module","text":"","category":"section"},{"location":"api/","page":"API","title":"API","text":"AuditoryStimuli","category":"page"},{"location":"api/#AuditoryStimuli.AuditoryStimuli","page":"API","title":"AuditoryStimuli.AuditoryStimuli","text":"A Julia package for generating auditory stimuli.\n\n\n\n\n\n","category":"module"},{"location":"api/#Signal-generators","page":"API","title":"Signal generators","text":"","category":"section"},{"location":"api/","page":"API","title":"API","text":"NoiseSource\nCorrelatedNoiseSource\nHarmonicComplex","category":"page"},{"location":"api/#AuditoryStimuli.NoiseSource","page":"API","title":"AuditoryStimuli.NoiseSource","text":"NoiseSource(eltype, samplerate, nchannels, std=1)\n\nNoiseSource is a multi-channel noise signal generator. The noise on each channel is independent.\n\nInputs\n\nsamplerate specifies the sample rate of the signal specified in Hz.\nnchannels specifies the number of channels of the signal.  \nstd specifies the desired standard deviation of the signal.  \n\nOutput\n\nSampleSource object\n\nExample\n\nsource_object = NoiseSource(Float64, 48u\"kHz\", 2, 0.3)\nwn = read(source_object, 480)         # Specify number of samples of signal to generate\nwn = read(source_object, 50u\"ms\")     # Specify length of time of signal to generate\n\n\n\n\n\n","category":"type"},{"location":"api/#AuditoryStimuli.CorrelatedNoiseSource","page":"API","title":"AuditoryStimuli.CorrelatedNoiseSource","text":"CorrelatedNoiseSource(eltype, samplerate, nchannels, std, correlation)\n\nCorrelatedNoiseSource is a multi-channel (currently restricted to 2) noise signal generator.\n\nInputs\n\nsamplerate specifies the sample rate of the signal.  \nnchannels specifies the number of channels of the signal.  \nstd specifies the desired standard deviation of the signal.  \ncorrelation specifies the desired correlation between the signals.\n\nOutput\n\nSampleSource object\n\nExample\n\nsource_object = CorrelatedNoiseSource(Float64, 48000, 2, 0.3, 0.75)\ncn = read(source_object, 480)         # Specify number of samples of signal to generate\ncn = read(source_object, 50u\"ms\")     # Specify length of time of signal to generate\n\nIssues\n\nCurrently only supports 2 channels\n\n\n\n\n\n","category":"type"},{"location":"api/#AuditoryStimuli.HarmonicComplex","page":"API","title":"AuditoryStimuli.HarmonicComplex","text":"HarmonicComplex(eltype, samplerate, freqs)\n\nHarmonicComplex is a single-channel sine-tone signal generator. freqs can be an array of frequencies for a multi-frequency source, or a single frequency for a mono source.\n\n\n\n\n\n","category":"type"},{"location":"api/#Online-signal-modifiers","page":"API","title":"Online signal modifiers","text":"","category":"section"},{"location":"api/","page":"API","title":"API","text":"Amplification\nAuditoryStimuli.Filter\nAmplitudeModulation","category":"page"},{"location":"api/#AuditoryStimuli.Amplification","page":"API","title":"AuditoryStimuli.Amplification","text":"Amplification(target, current, change_limit)\n\nApply amplification to the signal\n\nInputs\n\ntarget desired linear amplification factor to be applied to signal.\ncurrent linear amplification currently applied to signal.   Also used to specify the intial value for the process.\namplification_step_change_limit maximum change that can occur per frame.\n\nOutput\n\nSampleBuf \n\nExample\n\namplify = Amplification(0.1, 0.0, 0.05)\nattenuated_sound = write(amplify, original_sound)\n\n\n\n\n\n","category":"type"},{"location":"api/#AuditoryStimuli.Filter","page":"API","title":"AuditoryStimuli.Filter","text":"Filter(filters)\n\nApply filter to the signal\n\nInputs\n\nfilters array of DSP filter objects.\n\nOutput\n\nFilter object \n\nExample\n\nusing DSP\nresponsetype = Bandpass(500, 4000; fs=48000)\ndesignmethod = Butterworth(4)\nzpg = digitalfilter(responsetype, designmethod)\nf_left = DSP.Filters.DF2TFilter(zpg)\nf_right = DSP.Filters.DF2TFilter(zpg)\nbandpass = AuditoryStimuli.Filter([f_left, f_right])\n\n\n\n\n\n","category":"type"},{"location":"api/#AuditoryStimuli.AmplitudeModulation","page":"API","title":"AuditoryStimuli.AmplitudeModulation","text":"AmplitudeModulation(rate, phase, depth)\n\nApply amplitude modulation to the signal\n\nInputs\n\nrate (Hz) desired modulation rate to be applied to signal.\nphase phase of modulation to be applied to signal applied to signal.   Defaults to pi so that modulation starts at a minimum.\ndepth modulation depth.\n\nOutput\n\nSampleBuf \n\nExample\n\nam = AmplitudeModulation(1, 0.0, 0.05)\nattenuated_sound = write(am, original_sound)\n\n\n\n\n\n","category":"type"},{"location":"api/#Signal-modifiers","page":"API","title":"Signal modifiers","text":"","category":"section"},{"location":"api/","page":"API","title":"API","text":"bandpass_noise\nbandpass_filter\nramp_on\nramp_off\nset_RMS\nset_ITD\namplitude_modulate\nITD_modulate","category":"page"},{"location":"api/#AuditoryStimuli.bandpass_noise","page":"API","title":"AuditoryStimuli.bandpass_noise","text":"bandpass_noise(number_samples, number_channels, lower_bound, upper_bound, sample_rate; filter_order=14)\n\nGenerates band pass noise with specified upper and lower bounds using a butterworth filter.\n\n\n\n\n\n","category":"function"},{"location":"api/#AuditoryStimuli.bandpass_filter","page":"API","title":"AuditoryStimuli.bandpass_filter","text":"bandpass_filter(AbstractArray, lower_bound, upper_bound, sample_rate; filter_order=14)\nbandpass_filter(SampledSignal, lower_bound, upper_bound;              filter_order=14)\n\nSignal will be filtered with bandpass butterworth filter between 'lowerbound' and `upperboundwith filter offilter_order`.\n\n\n\n\n\n","category":"function"},{"location":"api/#AuditoryStimuli.ramp_on","page":"API","title":"AuditoryStimuli.ramp_on","text":"ramp_on(data, number_samples)\n\nApply a linear ramp to start of signal\n\n\n\n\n\n","category":"function"},{"location":"api/#AuditoryStimuli.ramp_off","page":"API","title":"AuditoryStimuli.ramp_off","text":"ramp_off(data, number_samples)\n\nApply a linear ramp to end of signal\n\n\n\n\n\n","category":"function"},{"location":"api/#AuditoryStimuli.set_RMS","page":"API","title":"AuditoryStimuli.set_RMS","text":"set_RMS(data, desired_rms)\n\nModify rms of signal to desired value\n\n\n\n\n\n","category":"function"},{"location":"api/#AuditoryStimuli.set_ITD","page":"API","title":"AuditoryStimuli.set_ITD","text":"set_ITD(data, number_samples)\n\nIntroduce an ITD of number_samples\n\n\n\n\n\n","category":"function"},{"location":"api/#AuditoryStimuli.amplitude_modulate","page":"API","title":"AuditoryStimuli.amplitude_modulate","text":"amplitude_modulate(data, modulation_frequency, sample_rate; phase=π)\n\nAmplitude modulates the signal\n\nSee wikipedia\n\n\n\n\n\n","category":"function"},{"location":"api/#AuditoryStimuli.ITD_modulate","page":"API","title":"AuditoryStimuli.ITD_modulate","text":"ITD_modulate(data, modulation_frequency, ITD_1, ITD_2, samplerate)\n\nModulate an applied ITD\n\n\n\n\n\n","category":"function"},{"location":"api/#Plotting","page":"API","title":"Plotting","text":"","category":"section"},{"location":"api/","page":"API","title":"API","text":"PlotSpectroTemporal","category":"page"},{"location":"api/#AuditoryStimuli.PlotSpectroTemporal","page":"API","title":"AuditoryStimuli.PlotSpectroTemporal","text":"PlotSpectroTemporal(data, sample_rate)\n\nThis function plots the time, spectrogram, and periodogram of a signal\n\n\n\n\n\n","category":"function"},{"location":"examples/#Examples","page":"Examples - Offline","title":"Examples","text":"","category":"section"},{"location":"examples/","page":"Examples - Offline","title":"Examples - Offline","text":"In this section we demonstrate some common auditory signals you may wish to generate.","category":"page"},{"location":"examples/","page":"Examples - Offline","title":"Examples - Offline","text":"The examples below all begin with the following imports and default settings.","category":"page"},{"location":"examples/","page":"Examples - Offline","title":"Examples - Offline","text":"using AuditoryStimuli, Unitful, Plots\nusing Random; Random.seed!(0)\n\nsample_rate = 48000\naudio_channels = 2;","category":"page"},{"location":"examples/#Bandpass-noise-signal","page":"Examples - Offline","title":"Bandpass noise signal","text":"","category":"section"},{"location":"examples/","page":"Examples - Offline","title":"Examples - Offline","text":"using AuditoryStimuli, Unitful, Plots # hide\nusing Random; Random.seed!(0) # hide\nsample_rate = 48000 # hide\naudio_channels = 2 # hide\n\nnoise_source = CorrelatedNoiseSource(Float64, sample_rate, audio_channels, 0.3, 0.8)\ncorrelated_noise = read(noise_source, 1.6u\"s\")\nfiltered_noise = bandpass_filter(correlated_noise, 300u\"Hz\", 700u\"Hz\")\nsound_signal = set_RMS(amplitude_modulate(filtered_noise, 10u\"Hz\"), 0.2)\nPlotSpectroTemporal(sound_signal, time_limits = [1.2, 1.5], figure_size=(800, 400))","category":"page"},{"location":"examples/#Noise-with-ITD","page":"Examples - Offline","title":"Noise with ITD","text":"","category":"section"},{"location":"examples/","page":"Examples - Offline","title":"Examples - Offline","text":"using AuditoryStimuli, Unitful, Plots # hide\nusing Random; Random.seed!(0) # hide\nsample_rate = 48000 # hide\naudio_channels = 2 # hide\n\nnoise_source = CorrelatedNoiseSource(Float64, sample_rate, audio_channels, 0.3, 0.8)\ncorrelated_noise = read(noise_source, 1.5u\"s\")\nfiltered_noise = bandpass_filter(correlated_noise, 300u\"Hz\", 700u\"Hz\")\nmodulated_noise = amplitude_modulate(filtered_noise, 40u\"Hz\")\nit = set_ITD(modulated_noise, -24)\n\ntime = 1:size(it, 1); time = time ./ sample_rate\na = plot(time, it, lab = \"\", xlab = \"Time (s)\", ylab = \"Amplitude\", xlims = (0.0, 0.5))\nb = plot(time, it, lab = map(string,[:Left :Right]), xlab = \"Time (s)\", ylab = \"\", xlims = (0.025, 0.05))\nplot(a, b, size = (800, 300))","category":"page"},{"location":"examples/#Harmonic-Complex","page":"Examples - Offline","title":"Harmonic Complex","text":"","category":"section"},{"location":"examples/","page":"Examples - Offline","title":"Examples - Offline","text":"using AuditoryStimuli, Unitful, Plots # hide\nusing Random; Random.seed!(0) # hide\nsample_rate = 48000 # hide\naudio_channels = 2 # hide\n\nsource = HarmonicComplex(Float64, 48000, collect(200:200:2400))\nsound = read(source, 6u\"s\")\nsound = amplitude_modulate(sound, 15u\"Hz\")\nsound = set_RMS(sound, 0.1)\nPlotSpectroTemporal(sound, frequency_limits = [0, 3000], time_limits = [0.135, 0.33], amplitude_limits = [-0.6, 0.6], figure_size=(800, 400))","category":"page"},{"location":"#AuditoryStimuli.jl","page":"Home","title":"AuditoryStimuli.jl","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"A Julia package for generating auditory stimuli.","category":"page"},{"location":"","page":"Home","title":"Home","text":"","category":"page"},{"location":"#Installation","page":"Home","title":"Installation","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"To install this package enter the package manager by pressing ] at the julia prompt and enter:","category":"page"},{"location":"","page":"Home","title":"Home","text":"pkg> add AuditoryStimuli","category":"page"}]
}
