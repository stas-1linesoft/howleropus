<template>
  <q-page class="row items-center justify-evenly">
    <q-btn color="primary" label="playmp3" @click="playmp3()" />
    <q-btn color="primary" label="playwav" @click="playwav()" />
    <q-btn color="primary" label="playogg" @click="playogg()" />

    <div>
      <p>Opus Recorder</p>
      <q-btn color="primary" label="Start" @click="startBtn()" />
      <q-btn color="primary" label="Stop" @click="stopBtn()" />
      <audio id="player" controls></audio>
    </div>
  </q-page>
</template>

<script lang="ts">
import ExampleComponent from 'components/CompositionComponent.vue'
import { defineComponent } from '@vue/composition-api'
import { Howl } from 'howler'
// opus-media-recorder
import OpusMediaRecorder from 'opus-media-recorder'

export default defineComponent({
  name: 'Howleropus',
  components: { ExampleComponent },
  data () {
    return {
      // need to configure webpack to use
      // music: require('@/assets/music/A1.mp3')
      mp3: require('assets/music/mp3.mp3'),
      wav: require('assets/music/wav.wav'),
      ogg: require('assets/music/ogg.ogg'),
      recorder: null
    }
  },
  methods: {
    playmp3 () {
      console.log('play mp3')

      const sound = new Howl({
        src: [this.mp3],
        html5: true,
        autoplay: true,
        volume: 1.0
      })

      sound.play()

      // Fires when the sound finishes playing.
      sound.on('end', function () {
        console.log('Finished!')
      })
    },
    playwav () {
      console.log('play wav')

      const sound = new Howl({
        src: [this.wav],
        html5: true,
        autoplay: true,
        volume: 1.0
      })

      sound.play()

      // Fires when the sound finishes playing.
      sound.on('end', function () {
        console.log('Finished!')
      })
    },
    playogg () {
      console.log('play ogg')

      const sound = new Howl({
        src: [this.ogg],
        html5: true,
        autoplay: true,
        volume: 1.0
      })

      sound.play()

      // Fires when the sound finishes playing.
      sound.on('end', function () {
        console.log('Finished!')
      })
    },
    // this creates mediaRecorder object
    createStream () {
      console.log('starting stream ...')

      // Choose desired format like audio/webm. Default is audio/ogg
      const options = { mimeType: 'audio/ogg' }
      // Web worker and .wasm configuration. Note: This is NOT a part of W3C standard.
      const workerOptions = {
        OggOpusEncoderWasmPath: 'https://cdn.jsdelivr.net/npm/opus-media-recorder@latest/OggOpusEncoder.wasm',
        WebMOpusEncoderWasmPath: 'https://cdn.jsdelivr.net/npm/opus-media-recorder@latest/WebMOpusEncoder.wasm'
      }

      navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
        this.recorder = new OpusMediaRecorder(stream, options, workerOptions)
        // recorder.start()
        // const dataChunks = [];
        // Recorder Event Handlers
        /*
        this.recorder.onstart = _ => {
          const dataChunks = [];
          console.log('Recorder started');  
        };
        this.recorder.ondataavailable = (e) => {
          dataChunks.push(e.data);
          console.log('Recorder data available');
        };
        */
        console.log("opus-media-recorder stream created: ", stream)
        return stream;
      })
    },
    startBtn () {
      // start
      console.log("start button")
      /*
      if (this.recorder) {
        console.log('Stop the recorder first');
        throw new Error('Stop the recorder first');
      }
      */
     this.createStream()
    },
    stopBtn () {
      // Stop recording  
    }
  }
})
</script>
