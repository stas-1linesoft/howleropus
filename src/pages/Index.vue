<template>
  <q-page class="row items-center justify-evenly">
    <q-btn color="primary" label="playmp3" @click="playmp3()" />
    <q-btn color="primary" label="playwav" @click="playwav()" />
    <q-btn color="primary" label="playogg" @click="playogg()" />
  </q-page>
</template>

<script lang="ts">
import ExampleComponent from 'components/CompositionComponent.vue'
import { defineComponent } from '@vue/composition-api'
import { Howl } from 'howler'

export default defineComponent({
  name: 'PageIndex',
  components: { ExampleComponent },

  data () {
    return {
      // need to configure webpack to use
      // music: require('@/assets/music/A1.mp3')
      mp3: require('assets/music/mp3.mp3'),
      wav: require('assets/music/wav.wav'),
      ogg: require('assets/music/ogg.ogg')
    }
  },
  methods: {
    playmp3 () {
      console.log('play button')

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
      console.log('play button')

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
      console.log('play button')

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
    }
  }
})
</script>
