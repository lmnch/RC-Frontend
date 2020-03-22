<template>
    <q-page class="bg-premium-layout">
      <div class="rindviech-picture">
        <img id="loading" src="~assets/rindviech.png"/>
      </div>
      <a href="#/main" id="LoadMain" > </a>
    </q-page>
</template>

<script>
export default {
  name: 'PageStart'
}
setTimeout(() => {
  window.location=document.getElementById('LoadMain').href;
}, 5000);
</script>