<template>
  <q-page class="row items-center justify-evenly">
    <div>
      <p>Opus Recorder</p>
      <q-btn color="primary" label="Start" @click="startBtn()" />
      <q-btn color="primary" label="Stop" @click="stopBtn()" />
      <audio id="player" controls></audio>
    </div>
    <div><a id="link">Download Link</a></div>
  </q-page>
</template>

<script src="src/pages/opus-media-recorder.js"></script>