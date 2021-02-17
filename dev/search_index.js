var documenterSearchIndex = {"docs":
[{"location":"api/#Library","page":"API","title":"Library","text":"","category":"section"},{"location":"api/","page":"API","title":"API","text":"","category":"page"},{"location":"api/","page":"API","title":"API","text":"CurrentModule = AuditoryStimuli","category":"page"},{"location":"api/#Module","page":"API","title":"Module","text":"","category":"section"},{"location":"api/","page":"API","title":"API","text":"AuditoryStimuli","category":"page"},{"location":"api/#AuditoryStimuli.AuditoryStimuli","page":"API","title":"AuditoryStimuli.AuditoryStimuli","text":"A Julia package for generating auditory stimuli.\n\n\n\n\n\n","category":"module"},{"location":"api/#Signal-generators","page":"API","title":"Signal generators","text":"","category":"section"},{"location":"api/","page":"API","title":"API","text":"CorrelatedNoiseSource\nNoiseSource\nHarmonicComplex","category":"page"},{"location":"api/#AuditoryStimuli.CorrelatedNoiseSource","page":"API","title":"AuditoryStimuli.CorrelatedNoiseSource","text":"CorrelatedNoiseSource(eltype, samplerate, nchannels, std, correlation)\n\nCorrelatedNoiseSource is a multi-channel (currently restricted to 2) noise signal generator.\n\nInputs\n\nsamplerate specifies the sample rate of the signal.  \nnchannels specifies the number of channels of the signal.  \nstd specifies the desired standard deviation of the signal.  \ncorrelation specifies the desired correlation between the signals.\n\nOutput\n\nSampleSource object\n\nExample\n\nsource_object = CorrelatedNoiseSource(Float64, 48000, 2, 0.3, 0.75)\ncn = read(source_object, 480)         # Specify number of samples of signal to generate\ncn = read(source_object, 50u\"ms\")     # Specify length of time of signal to generate\n\nIssues\n\nCurrently only supports 2 channels\n\n\n\n\n\n","category":"type"},{"location":"api/#AuditoryStimuli.NoiseSource","page":"API","title":"AuditoryStimuli.NoiseSource","text":"NoiseSource(eltype, samplerate, nchannels, std)\n\nNoiseSource is a multi-channel noise signal generator. The noise on each channel is independent.\n\nInputs\n\nsamplerate specifies the sample rate of the signal.  \nnchannels specifies the number of channels of the signal.  \nstd specifies the desired standard deviation of the signal.  \n\nOutput\n\nSampleSource object\n\nExample\n\nsource_object = NoiseSource(Float64, 48000, 2, 0.3)\nwn = read(source_object, 480)         # Specify number of samples of signal to generate\nwn = read(source_object, 50u\"ms\")     # Specify length of time of signal to generate\n\n\n\n\n\n","category":"type"},{"location":"api/#AuditoryStimuli.HarmonicComplex","page":"API","title":"AuditoryStimuli.HarmonicComplex","text":"HarmonicComplex(eltype, samplerate, freqs)\n\nHarmonicComplex is a single-channel sine-tone signal generator. freqs can be an array of frequencies for a multi-frequency source, or a single frequency for a mono source.\n\n\n\n\n\n","category":"type"},{"location":"api/#Signal-modifiers","page":"API","title":"Signal modifiers","text":"","category":"section"},{"location":"api/","page":"API","title":"API","text":"bandpass_noise\nbandpass_filter\nramp_on\nramp_off\nset_RMS\nset_ITD\namplitude_modulate\nITD_modulate","category":"page"},{"location":"api/#AuditoryStimuli.bandpass_noise","page":"API","title":"AuditoryStimuli.bandpass_noise","text":"bandpass_noise(number_samples, number_channels, lower_bound, upper_bound, sample_rate; filter_order=14)\n\nGenerates band pass noise with specified upper and lower bounds using a butterworth filter.\n\n\n\n\n\n","category":"function"},{"location":"api/#AuditoryStimuli.bandpass_filter","page":"API","title":"AuditoryStimuli.bandpass_filter","text":"bandpass_filter(AbstractArray, lower_bound, upper_bound, sample_rate; filter_order=14)\nbandpass_filter(SampledSignal, lower_bound, upper_bound;              filter_order=14)\n\nSignal will be filtered with bandpass butterworth filter between 'lowerbound' and `upperboundwith filter offilter_order`.\n\n\n\n\n\n","category":"function"},{"location":"api/#AuditoryStimuli.ramp_on","page":"API","title":"AuditoryStimuli.ramp_on","text":"ramp_on(data, number_samples)\n\nApply a linear ramp to start of signal\n\n\n\n\n\n","category":"function"},{"location":"api/#AuditoryStimuli.ramp_off","page":"API","title":"AuditoryStimuli.ramp_off","text":"ramp_off(data, number_samples)\n\nApply a linear ramp to end of signal\n\n\n\n\n\n","category":"function"},{"location":"api/#AuditoryStimuli.set_RMS","page":"API","title":"AuditoryStimuli.set_RMS","text":"set_RMS(data, desired_rms)\n\nModify rms of signal to desired value\n\n\n\n\n\n","category":"function"},{"location":"api/#AuditoryStimuli.set_ITD","page":"API","title":"AuditoryStimuli.set_ITD","text":"set_ITD(data, number_samples)\n\nIntroduce an ITD of number_samples\n\n\n\n\n\n","category":"function"},{"location":"api/#AuditoryStimuli.amplitude_modulate","page":"API","title":"AuditoryStimuli.amplitude_modulate","text":"amplitude_modulate(data, modulation_frequency, sample_rate; phase=π)\n\nAmplitude modulates the signal\n\nSee wikipedia\n\n\n\n\n\n","category":"function"},{"location":"api/#AuditoryStimuli.ITD_modulate","page":"API","title":"AuditoryStimuli.ITD_modulate","text":"ITD_modulate(data, modulation_frequency, ITD_1, ITD_2, samplerate)\n\nModulate an applied ITD\n\n\n\n\n\n","category":"function"},{"location":"api/#Plotting","page":"API","title":"Plotting","text":"","category":"section"},{"location":"api/","page":"API","title":"API","text":"PlotSpectroTemporal","category":"page"},{"location":"api/#AuditoryStimuli.PlotSpectroTemporal","page":"API","title":"AuditoryStimuli.PlotSpectroTemporal","text":"PlotSpectroTemporal(data, sample_rate)\n\nThis function plots the time, spectrogram, and periodogram of a signal\n\n\n\n\n\n","category":"function"},{"location":"examples/#Examples","page":"Examples","title":"Examples","text":"","category":"section"},{"location":"examples/","page":"Examples","title":"Examples","text":"The examples below all begin with the following imports and default settings.","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"using AuditoryStimuli, Unitful, Plots\nusing Random; Random.seed!(0)\n\nsample_rate = 48000\naudio_channels = 2;","category":"page"},{"location":"examples/#Bandpass-noise-signal","page":"Examples","title":"Bandpass noise signal","text":"","category":"section"},{"location":"examples/","page":"Examples","title":"Examples","text":"using AuditoryStimuli, Unitful, Plots # hide\nusing Random; Random.seed!(0) # hide\nsample_rate = 48000 # hide\naudio_channels = 2 # hide\n\nnoise_source = CorrelatedNoiseSource(Float64, sample_rate, audio_channels, 0.3, 0.8)\ncorrelated_noise = read(noise_source, 1.6u\"s\")\nfiltered_noise = bandpass_filter(correlated_noise, 300u\"Hz\", 700u\"Hz\")\nsound_signal = set_RMS(amplitude_modulate(filtered_noise, 10u\"Hz\"), 0.2)\nPlotSpectroTemporal(sound_signal, time_limits = [1.2, 1.5], figure_size=(800, 400))","category":"page"},{"location":"examples/#Noise-with-ITD","page":"Examples","title":"Noise with ITD","text":"","category":"section"},{"location":"examples/","page":"Examples","title":"Examples","text":"using AuditoryStimuli, Unitful, Plots # hide\nusing Random; Random.seed!(0) # hide\nsample_rate = 48000 # hide\naudio_channels = 2 # hide\n\nnoise_source = CorrelatedNoiseSource(Float64, sample_rate, audio_channels, 0.3, 0.8)\ncorrelated_noise = read(noise_source, 1.5u\"s\")\nfiltered_noise = bandpass_filter(correlated_noise, 300u\"Hz\", 700u\"Hz\")\nmodulated_noise = amplitude_modulate(filtered_noise, 40u\"Hz\")\nit = set_ITD(modulated_noise, -24)\n\ntime = 1:size(it, 1); time = time ./ sample_rate\na = plot(time, it, lab = \"\", xlab = \"Time (s)\", ylab = \"Amplitude\", xlims = (0.0, 0.5))\nb = plot(time, it, lab = map(string,[:Left :Right]), xlab = \"Time (s)\", ylab = \"\", xlims = (0.025, 0.05))\nplot(a, b, size = (800, 400))","category":"page"},{"location":"examples/#Harmonic-Complex","page":"Examples","title":"Harmonic Complex","text":"","category":"section"},{"location":"examples/","page":"Examples","title":"Examples","text":"using AuditoryStimuli, Unitful, Plots # hide\nusing Random; Random.seed!(0) # hide\nsample_rate = 48000 # hide\naudio_channels = 2 # hide\n\nsource = HarmonicComplex(Float64, 48000, collect(200:200:2400))\nsound = read(source, 6u\"s\")\nsound = amplitude_modulate(sound, 15u\"Hz\")\nsound = sound .* 0.03\nPlotSpectroTemporal(sound, frequency_limits = [0, 3000], time_limits = [0.135, 0.33], amplitude_limits = [-0.6, 0.6], figure_size=(800, 400))","category":"page"},{"location":"#AuditoryStimuli.jl","page":"Home","title":"AuditoryStimuli.jl","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"A Julia package for generating auditory stimuli.","category":"page"},{"location":"","page":"Home","title":"Home","text":"","category":"page"},{"location":"#Authors","page":"Home","title":"Authors","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Robert Luke","category":"page"},{"location":"#Installation","page":"Home","title":"Installation","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"AuditoryStimuli.jl is not yet a registered package, so simply installed by running","category":"page"},{"location":"","page":"Home","title":"Home","text":"pkg> add(\"https://github.com/rob-luke/AuditoryStimuli.jl.git\")","category":"page"}]
}
