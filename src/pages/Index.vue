<template>
  <q-page class="row items-center justify-evenly">
    <div>
      <p>howleropus</p>
      <q-btn to="howler" label="howler"></q-btn>
      <q-btn to="opusmediarecorder" label="opusmediarec"></q-btn>
      <q-btn to="opusrecorder" label="opusrec"></q-btn>
    </div>
  </q-page>
</template>

<script lang="ts">
import ExampleComponent from 'components/CompositionComponent.vue'
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'PageIndex',
  components: { ExampleComponent }
})
</script>
