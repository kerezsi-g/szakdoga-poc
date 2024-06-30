<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router/auto'

onMounted(() => {
  const router = useRouter()

  router.replace({
    name: 'projects-list'
  })
})
</script>
<style lang="scss"></style>
