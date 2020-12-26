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
    <div><a id="link">Download Link</a></div>
  </q-page>
</template>

<script lang="ts">
import ExampleComponent from 'components/CompositionComponent.vue'
import { defineComponent } from '@vue/composition-api'
import { Howl } from 'howler'

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

      navigator.mediaDevices.getUserMedia({ audio: true, video: false })
      .then((stream) => {
        if (this.recorder && this.recorder.state !== 'inactive') {
          console.log('Stop the recorder first');
          throw new Error('Stop the recorder first');
        }

        console.log("opus-media-recorder stream created: ", stream)
        return stream;
      }).catch(e => {
        console.log(`MediaRecorder is failed: ${e.message}`);
        Promise.reject(new Error());
      }).then(this.createMediaRecorder)
    },
    createMediaRecorder (stream: any) {
      console.log("media recorder creating")
      // Choose desired format like audio/webm. Default is audio/ogg
      let options = { mimeType: 'audio/ogg' }
      console.log("media recorder options: ", options)
      // Web worker and .wasm configuration. Note: This is NOT a part of W3C standard.
      const workerOptions = {
        OggOpusEncoderWasmPath: 'https://cdn.jsdelivr.net/npm/opus-media-recorder@latest/OggOpusEncoder.wasm',
        WebMOpusEncoderWasmPath: 'https://cdn.jsdelivr.net/npm/opus-media-recorder@latest/WebMOpusEncoder.wasm'
      }

      this.recorder = new OpusMediaRecorder(stream, options, workerOptions);
      console.log("recorder info: ", this.recorder)
      let dataChunks: any[];
      let link = document.querySelector('#link');
      this.recorder.start()
      // Recorder Event Handlers
      this.recorder.onstart = _ => {
        dataChunks = [];

        console.log('Recorder started');
      };
      this.recorder.ondataavailable = (e) => {
        dataChunks.push(e.data);

        console.log('Recorder data available');
      };
      this.recorder.onstop = (e) => {
        // When stopped add a link to the player and the download link
        let blob = new Blob(dataChunks, {'type': this.recorder.mimeType});
        dataChunks = [];
        let audioURL = URL.createObjectURL(blob);
        link.href = audioURL;
        let extension = this.recorder.mimeType.match(/ogg/) ? '.ogg'
                      : this.recorder.mimeType.match(/webm/) ? '.webm'
                      : this.recorder.mimeType.match(/wav/) ? '.wav'
                      : '';
        link.download = 'recording' + extension;

        console.log('Recorder stopped');
      };
      this.recorder.onerror = e => console.log('Recorder encounters error:' + e.message);

      return stream;
    },
    startBtn () {
      this.createStream()
    },
    stopBtn () {
      // Stop recording  
    }
  }
})
</script>
