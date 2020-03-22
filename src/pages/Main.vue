<template>
    <q-page class="MainBody">
      <div class="rindviech-picture">
        <img id="rotating" src="~assets/rindviech.png" onclick="(function(){ document.getElementById('rotating').setAttribute('id', 'loading');})();"/>
      </div>
    </q-page>
</template>

<script>
export default {
  name: 'PageMain'
}
</script>