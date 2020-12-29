import ExampleComponent from 'components/CompositionComponent.vue'
import { defineComponent } from '@vue/composition-api'
import { Howl } from 'howler'

export default defineComponent({
  name: 'Howler',
  components: { ExampleComponent },
  data () {
    return {
      mp3: require('assets/music/mp3.mp3'),
      wav: require('assets/music/wav.wav'),
      ogg: require('assets/music/ogg.ogg'),
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
        console.log('mp3 finished!')
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
        console.log('wav finished!')
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
        console.log('ogg finished!')
      })
    }
  }
})